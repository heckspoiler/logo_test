import { TextContent } from './TextContent';
import {
  useGLTF,
  OrbitControls,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';

export const Model = () => {
  const mesh = useRef();
  const controls = useRef();
  const { viewport, camera } = useThree();
  const [scaleValue, setScaleValue] = useState(1);
  const isMobile = window.innerWidth < 600;

  const { nodes } = useGLTF('/medias/logo__3d.glb');

  // const materialProps = useControls('Material', {
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.39, min: 0, max: 1 },
  //   backside: { value: true },
  // });

  const materialProps = {
    thickness: 0.2,
    roughness: 0.25,
    transmission: 1,
    ior: 1.3,
    chromaticAberration: 0.39,
    backside: true,
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() / 2;
    const floatAmplitude = Math.sin(0.0004);
    const floatFrequency = Math.sin(0.0004);
    const rotationSpeed = Math.sin(0.0004);

    const scale = scaleValue + Math.sin(time) * 0.008;
    const y = Math.sin(time * floatFrequency) * floatAmplitude;
    const x = Math.cos(time * floatFrequency) * floatAmplitude;

    if (mesh.current) {
      mesh.current.scale.set(scale, scale, scale);
      mesh.current.position.set(x, y, 0);
      mesh.current.rotation.x = 1.5 + Math.cos(time * Math.sin(1.5)) / 10;
      mesh.current.rotation.y = Math.cos(time * Math.sin(1.5)) / 15;
      mesh.current.rotation.z = Math.cos(time * Math.sin(1)) / 5;
    }
  });

  useEffect(() => {
    setScaleValue(isMobile ? 20 : 6);
  }, [isMobile]);

  useEffect(() => {
    if (controls.current && mesh.current) {
      controls.current.target.copy(mesh.current.position);
      controls.current.update();
    }
  }, [mesh.current]);

  return (
    <group dispose={null} scale={viewport.width / 3}>
      <TextContent isMobile={isMobile} />
      <mesh ref={mesh} {...nodes.Rig} geometry={nodes.Rig.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <OrbitControls
        ref={controls}
        minAzimuthAngle={-Math.PI / 8}
        maxAzimuthAngle={Math.PI / 8}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI - Math.PI / 2}
        enableZoom={false}
      />
    </group>
  );
};
