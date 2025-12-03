import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { MapPin, Search, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#26aa7e"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingPin({ position, delay = 0 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + delay) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <coneGeometry args={[0.15, 0.4, 8]} />
      <meshStandardMaterial color="#ffc107" emissive="#ffc107" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function Hero3D({ onSearchClick, onLocationClick }) {
  const { t } = useTranslation();

  const pins = useMemo(() => [
    { position: [-2, 0, 0], delay: 0 },
    { position: [2, 0, -1], delay: 1 },
    { position: [0, 0, 2], delay: 2 },
    { position: [-1.5, 0, -2], delay: 1.5 },
  ], []);

  return (
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-[#26aa7e] via-[#1f8865] to-[#18664c] overflow-hidden">
      {/* Canvas 3D */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffc107" />
          <AnimatedSphere />
          {pins.map((pin, i) => (
            <FloatingPin key={i} position={pin.position} delay={pin.delay} />
          ))}
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Contenu superposé */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[600px] text-white">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Logo ou icône */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
            <MapPin size={40} className="text-[#ffc107]" />
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {t('app.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {t('app.description')}
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={onSearchClick}
              className="group flex items-center gap-3 bg-white text-[#26aa7e] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#ffc107] hover:text-[#0d0f11] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Search size={24} />
              {t('search.placeholder')}
            </button>
            
            <button
              onClick={onLocationClick}
              className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#26aa7e] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Navigation size={24} />
              {t('search.useLocation')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#ffc107]">50+</div>
              <div className="text-sm mt-2 text-white/80">Administrations</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#ffc107]">10+</div>
              <div className="text-sm mt-2 text-white/80">Quartiers</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#ffc107]">24/7</div>
              <div className="text-sm mt-2 text-white/80">Disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#f8f9fa"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}