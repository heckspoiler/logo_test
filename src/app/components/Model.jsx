import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';

export const Model = () => {
  const mesh = useRef();
  const { viewport } = useThree();
  const [scaleValue, setScaleValue] = useState(1);
  const [upperYValue, setUpperYValue] = useState(0);
  const [lowerYValue, setLowerYValue] = useState(0);
  const [upperFontSize, setUpperFontSize] = useState(0);
  const [lowerFontSize, setLowerFontSize] = useState(0);
  const [logoXValue, setLogoXValue] = useState(0);

  const { nodes } = useGLTF('/medias/logo__3d.glb');

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  // const materialProps = {
  //   thickness: 0.2,
  //   roughness: 0.25,
  //   transmission: 1,
  //   ior: 1.2,
  //   chromaticAberration: 0.02,
  //   backside: true,
  //   dispersion: 0.1,
  // };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scale = scaleValue + Math.sin(time) * 0.008;
    const y = Math.sin(time) * 0.01;
    mesh.current.scale.set(scale, scale, scale);
    mesh.current.rotation.z += 0.001;
    mesh.current.position.y = y;
    mesh.current.position.x = y;
  });

  useEffect(() => {
    setScaleValue(window.innerWidth < 600 ? 20 : 6);
    setUpperYValue(window.innerWidth < 600 ? -2.3 : 1.3);
    setLowerYValue(window.innerWidth < 600 ? 2.1 : 1.8);
    setUpperFontSize(window.innerWidth < 600 ? 0.6 : 0.7);
    setLowerFontSize(window.innerWidth < 600 ? 0.3 : 0.15);
  }, [window.innerWidth]);

  return (
    <group dispose={null} scale={viewport.width / 3}>
      <Text
        position={[0, upperYValue, -2.5]}
        fontSize={upperFontSize}
        fontWeight={800}
        color="yellow"
        strokeColor="yellow"
        strokeWidth={0.02}
        font="/Nohemi-SemiBold.woff"
      >
        COMING SOON
      </Text>
      <Text
        position={[-1.5, lowerYValue, -2.5]}
        fontSize={lowerFontSize}
        fontWeight={300}
        color="transparent"
        strokeColor="yellow"
        strokeWidth={0.02}
        font="/Nohemi-Regular.woff"
      >
        404HERTZ
      </Text>
      <mesh ref={mesh} {...nodes.Rig} geometry={nodes.Rig.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};
