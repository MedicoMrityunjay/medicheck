import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// DNA Helix Component
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  const helixPoints = useMemo(() => {
    const points = [];
    const numPoints = 20;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const y = (i / numPoints) * 4 - 2;
      points.push({
        pos1: [Math.cos(t) * 0.8, y, Math.sin(t) * 0.8] as [number, number, number],
        pos2: [Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8] as [number, number, number],
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={[-2.5, 0, -1]}>
        {helixPoints.map((point, i) => (
          <group key={i}>
            {/* DNA backbone spheres */}
            <mesh position={point.pos1}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color="#00ffff" 
                emissive="#00ffff" 
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={point.pos2}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color="#ff00ff" 
                emissive="#ff00ff" 
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Connecting bars */}
            {i % 2 === 0 && (
              <mesh position={[(point.pos1[0] + point.pos2[0]) / 2, point.pos1[1], (point.pos1[2] + point.pos2[2]) / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  opacity={0.5} 
                  transparent 
                />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </Float>
  );
}

// Heartbeat/Pulse Line
function HeartbeatLine() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 6 - 3;
      let y = 0;
      // Create heartbeat pattern
      const normalized = (i % 25) / 25;
      if (normalized < 0.1) y = 0;
      else if (normalized < 0.15) y = 0.8;
      else if (normalized < 0.2) y = -0.4;
      else if (normalized < 0.25) y = 0.3;
      else if (normalized < 0.3) y = 0;
      else y = 0;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -1.5, 1]}>
        {points.map((point, i) => (
          i < points.length - 1 && (
            <mesh key={i} position={[point.x, point.y, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color="#00ffff" 
                emissive="#00ffff" 
                emissiveIntensity={0.5}
              />
            </mesh>
          )
        ))}
      </group>
    </Float>
  );
}

// Medical Cross
function MedicalCross() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <group ref={meshRef} position={[2.5, 0.5, -1]}>
        {/* Vertical bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.08]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff" 
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Horizontal bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.15, 0.08]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff" 
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Animated Pill/Capsule
function AnimatedPill({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

// Central Molecule/Atom representation
function CentralMolecule() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Electron orbits */}
      {[0, Math.PI / 3, -Math.PI / 3].map((rotation, i) => (
        <mesh key={i} rotation={[rotation, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshStandardMaterial 
            color={i === 0 ? "#00ffff" : "#ff00ff"} 
            transparent 
            opacity={0.4}
            emissive={i === 0 ? "#00ffff" : "#ff00ff"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </Float>
  );
}

// Particle field representing molecules
function MoleculeParticles() {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00ffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" angle={0.3} />
        
        <CentralMolecule />
        <DNAHelix />
        <MedicalCross />
        <HeartbeatLine />
        
        {/* Floating pills */}
        <AnimatedPill position={[-1.8, 1.2, -0.5]} color="#00ffff" scale={0.8} />
        <AnimatedPill position={[1.5, -1, -1]} color="#ff00ff" scale={0.6} />
        <AnimatedPill position={[2, 1.5, 0.5]} color="#00ffff" scale={0.5} />
        <AnimatedPill position={[-2, -1.5, 0]} color="#ff00ff" scale={0.7} />
        
        <MoleculeParticles />
      </Canvas>
    </div>
  );
}
