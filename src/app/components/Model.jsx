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

    roughness: { value: 0, min: 0, max: 1, step: 0.1 },

    transmission: { value: 1, min: 0, max: 1, step: 0.1 },

    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

    chromaticAberration: { value: 0.02, min: 0, max: 1 },

    backside: { value: true },
  });
  useFrame(() => {
    mesh.current.rotation.z += 0.001;
  });
  return (
    <group dispose={null} scale={viewport.width / 3}>
      <Text
        position={[-1, 0.5, -2.5]}
        fontSize={0.8}
        fontWeight={800}
        color="yellow"
        font="/Nohemi-SemiBold.woff"
      >
        404HERTZ
      </Text>
      <Text
        position={[1, -0.5, -2.5]}
        fontSize={0.3}
        fontWeight={800}
        color="yellow"
        font="/Nohemi-SemiBold.woff"
      >
        COMING SOON
      </Text>
      <mesh
        ref={mesh}
        {...nodes.Rig}
        scale={[scaleValue, scaleValue, scaleValue]}
        geometry={nodes.Rig.geometry}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};
