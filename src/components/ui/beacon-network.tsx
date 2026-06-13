import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const ACCENT = "#c2683f"; // clay-coral brand

/** Soft round sprite so points read as glowing nodes. */
function makeCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function PulsingBeacon({
  position,
  phase,
}: {
  position: [number, number, number];
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + phase);
    if (ref.current) {
      const s = 0.9 + pulse * 0.5;
      ref.current.scale.setScalar(s);
    }
    if (mat.current) {
      mat.current.emissiveIntensity = 1.2 + pulse * 2.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        ref={mat}
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const pointsMat = useRef<THREE.PointsMaterial>(null);
  const tex = useMemo(makeCircleTexture, []);

  const { nodes, lines, beacons } = useMemo(() => {
    const N = 56;
    const R = 3.4;
    const verts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      // random point in a sphere (rejection-free via cube root radius)
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = R * Math.cbrt(Math.random());
      verts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7, // flatten slightly
          r * Math.cos(phi)
        )
      );
    }

    const nodePos = new Float32Array(N * 3);
    verts.forEach((p, i) => {
      nodePos[i * 3] = p.x;
      nodePos[i * 3 + 1] = p.y;
      nodePos[i * 3 + 2] = p.z;
    });

    // connect nearby nodes
    const seg: number[] = [];
    const threshold = 1.55;
    for (let i = 0; i < N; i++) {
      let count = 0;
      for (let j = i + 1; j < N && count < 3; j++) {
        if (verts[i].distanceTo(verts[j]) < threshold) {
          seg.push(
            verts[i].x,
            verts[i].y,
            verts[i].z,
            verts[j].x,
            verts[j].y,
            verts[j].z
          );
          count++;
        }
      }
    }

    // pick a handful of nodes to be bright pulsing beacons
    const beaconList = verts
      .filter((_, i) => i % 11 === 0)
      .slice(0, 5)
      .map((p, i) => ({
        position: [p.x, p.y, p.z] as [number, number, number],
        phase: i * 1.3,
      }));

    return {
      nodes: nodePos,
      lines: new Float32Array(seg),
      beacons: beaconList,
    };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    const { x, y } = state.pointer;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      y * 0.22,
      0.04
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      x * 0.5,
      0.04
    );
    if (pointsMat.current) {
      pointsMat.current.size =
        0.16 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMat}
          map={tex}
          color={ACCENT}
          size={0.16}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {beacons.map((b, i) => (
        <PulsingBeacon key={i} position={b.position} phase={b.phase} />
      ))}
    </group>
  );
}

export default function BeaconNetwork() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 6, 8]} intensity={60} color={ACCENT} />
      <Network />
    </Canvas>
  );
}
