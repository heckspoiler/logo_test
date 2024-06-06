import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useControls } from 'leva';

export const Model = () => {
  const mesh = useRef();
  const scaleValue = 6;
  const { nodes } = useGLTF('/medias/logo__3d.glb');
  const { viewport } = useThree();

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scale = scaleValue + Math.sin(time) * 0.008;
    const y = Math.sin(time) * 0.001;
    mesh.current.scale.set(scale, scale, scale);
    mesh.current.rotation.z += 0.001;
    mesh.current.position.y = y;
  });

  return (
    <group dispose={null} scale={viewport.width / 3}>
      <Text
        position={[0, 0.8, -2.5]}
        fontSize={0.7}
        fontWeight={800}
        color="yellow"
        font="/Nohemi-SemiBold.woff"
      >
        404HERTZ
      </Text>
      <Text
        position={[0, -1, -2.5]}
        fontSize={0.15}
        fontWeight={300}
        color="yellow"
        font="/Nohemi-Regular.woff"
      >
        COMING SOON
      </Text>
      <mesh ref={mesh} {...nodes.Rig} geometry={nodes.Rig.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};
