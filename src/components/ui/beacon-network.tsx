import * as THREE from "three";
import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const ACCENT_LOW = "#8a4a30"; // deep coral (troughs)
const ACCENT_HIGH = "#e8975f"; // bright coral (peaks)
const R = 4.2; // disk radius
const COLS = 180; // grid resolution per axis
const MAX_RIPPLES = 16;
const CYCLE = 1.1; // seconds per heartbeat cycle (~55 bpm resting)
const DUB_DELAY = 0.3; // gap between "lub" and "dub"
const TAU = 0.22; // pulse upswing time constant
const BEACON_AMP = 0.6; // amplitude of a heartbeat ripple
const CURSOR_AMP = 0.16; // amplitude of a cursor ripple (small + local)

const alpha = (x: number) => (x > 0 ? Math.E * x * Math.exp(-x) : 0);

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uBeaconPos[2];
  uniform float uBeaconPulse[2];
  uniform vec2 uRippleOrigin[${MAX_RIPPLES}];
  uniform float uRippleTime[${MAX_RIPPLES}];
  uniform float uRippleAmp[${MAX_RIPPLES}];
  varying float vHeight;

  float ripples(vec2 p) {
    float h = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      float st = uRippleTime[i];
      float age = uTime - st;
      if (age < 0.0 || age > 5.0) continue;
      float dist = distance(p, uRippleOrigin[i]);
      float front = age * 1.4;            // wavefront speed
      float g = exp(-pow((dist - front) / 0.45, 2.0));
      float ageDecay = exp(-age * 0.5);
      float distDecay = 1.0 / (1.0 + dist * 0.28);
      h += g * ageDecay * distDecay * uRippleAmp[i];
    }
    return h;
  }

  void main() {
    vec2 p = vec2(position.x, position.z);
    float distC = length(p);

    // gentle ambient morph
    float amb = (sin(p.x * 0.55 + uTime * 0.38) + cos(p.y * 0.55 + uTime * 0.3)) * 0.06;

    // two beacons: soft, rounded domes that pulse (lub-dub)
    float beacon = 0.0;
    for (int i = 0; i < 2; i++) {
      float dd = distance(p, uBeaconPos[i]);
      beacon += exp(-pow(dd / 0.85, 2.0)) * (0.02 + uBeaconPulse[i] * 0.14);
    }

    float h = amb + beacon + ripples(p);

    // soft circular falloff at the disk edge
    float edge = smoothstep(4.2, 3.6, distC);
    h *= edge;

    vec3 pos = vec3(position.x, h, position.z);
    vHeight = h;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixelRatio * (2.0 + h * 3.2) * (6.0 / -mv.z) * edge;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  varying float vHeight;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, d);
    float hN = clamp(vHeight * 1.1, 0.0, 1.0);
    vec3 col = mix(uColorLow, uColorHigh, hN);
    gl_FragColor = vec4(col, alpha * (0.55 + hN * 0.45));
  }
`;

function RippleField({ clickRef }: { clickRef: RefObject<boolean> }) {
  const cycleStart = useRef(0);
  const firedLub = useRef(false);
  const firedDub = useRef(false);
  const lastCursor = useRef(0);
  const head = useRef(0);
  const prevPointer = useRef({ x: 999, y: 999 });
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  // second beacon at a random spot on the disk (chosen once)
  const beaconB = useMemo(() => {
    const ang = Math.random() * Math.PI * 2;
    const rad = 1.6 + Math.random() * 1.4;
    return new THREE.Vector2(Math.cos(ang) * rad, Math.sin(ang) * rad);
  }, []);

  const positions = useMemo(() => {
    const step = (R * 2) / COLS;
    const pts: number[] = [];
    for (let i = 0; i <= COLS; i++) {
      for (let j = 0; j <= COLS; j++) {
        const x = -R + i * step;
        const z = -R + j * step;
        if (Math.hypot(x, z) <= R) pts.push(x, 0, z);
      }
    }
    return new Float32Array(pts);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uBeaconPos: { value: [new THREE.Vector2(0, 0), beaconB.clone()] },
      uBeaconPulse: { value: [0, 0] },
      uRippleOrigin: {
        value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector2(0, 0)),
      },
      uRippleTime: { value: Array.from({ length: MAX_RIPPLES }, () => -100) },
      uRippleAmp: { value: Array.from({ length: MAX_RIPPLES }, () => 0) },
      uColorLow: { value: new THREE.Color(ACCENT_LOW) },
      uColorHigh: { value: new THREE.Color(ACCENT_HIGH) },
    }),
    [beaconB]
  );

  const addRipple = (t: number, x: number, z: number, amp: number) => {
    const i = head.current % MAX_RIPPLES;
    uniforms.uRippleOrigin.value[i].set(x, z);
    uniforms.uRippleTime.value[i] = t;
    uniforms.uRippleAmp.value[i] = amp;
    head.current++;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;

    // heartbeat cycle
    if (t - cycleStart.current >= CYCLE) {
      cycleStart.current = t;
      firedLub.current = false;
      firedDub.current = false;
    }
    const cs = cycleStart.current;
    if (!firedLub.current) {
      addRipple(t, 0, 0, BEACON_AMP); // "lub" from the central beacon
      firedLub.current = true;
    }
    if (!firedDub.current && t - cs >= DUB_DELAY) {
      addRipple(t, beaconB.x, beaconB.y, BEACON_AMP * 0.8); // "dub" from the 2nd
      firedDub.current = true;
    }
    uniforms.uBeaconPulse.value[0] = alpha((t - cs) / TAU);
    uniforms.uBeaconPulse.value[1] = alpha((t - cs - DUB_DELAY) / TAU);

    // cursor ripples: only on actual movement or a click
    const moved =
      Math.hypot(
        state.pointer.x - prevPointer.current.x,
        state.pointer.y - prevPointer.current.y
      ) > 0.004;
    prevPointer.current.x = state.pointer.x;
    prevPointer.current.y = state.pointer.y;

    const clicked = clickRef.current;
    clickRef.current = false;

    if (moved || clicked) {
      state.raycaster.setFromCamera(state.pointer, state.camera);
      if (state.raycaster.ray.intersectPlane(plane, hit)) {
        const within = Math.hypot(hit.x, hit.z) < R;
        if (within && (clicked || t - lastCursor.current > 0.09)) {
          addRipple(t, hit.x, hit.z, CURSOR_AMP);
          lastCursor.current = t;
        }
      }
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function BeaconNetwork() {
  const clickRef = useRef(false);
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.7, 6.3], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
      onPointerDown={() => {
        clickRef.current = true;
      }}
    >
      <RippleField clickRef={clickRef} />
    </Canvas>
  );
}
