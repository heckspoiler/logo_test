import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';
import {
  EffectComposer,
  ChromaticAberration,
  Bloom,
  Glitch,
  Vignette,
  Noise,
  RenderPass,
  MaskPass,
} from '@react-three/postprocessing';

export const TextContent = () => {
  const mesh = useRef();
  const controls = useRef();
  const { viewport, camera } = useThree();
  const [scaleValue, setScaleValue] = useState(1);
  const [upperYValue, setUpperYValue] = useState(0);
  const [lowerYValue, setLowerYValue] = useState(0);
  const [upperFontSize, setUpperFontSize] = useState(0);
  const [lowerFontSize, setLowerFontSize] = useState(0);
  const isMobile = window.innerWidth < 600;

  const { nodes } = useGLTF('/medias/logo__3d.glb');

  const effectProps = useControls('Effects', {
    chromaticAberration: { value: 0.5, min: 0, max: 20 },
    bloomIntensity: { value: 0.3, min: 0, max: 1 },
    glitchIntensity: { value: 0.5, min: 0, max: 1 },
    vignetteDarkness: { value: 0.5, min: 0, max: 10 },
    noiseOpacity: { value: 0.2, min: 0, max: 10 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scale = scaleValue + Math.sin(time) * 0.008;
    const y = Math.sin(time) * 0.01;
  });

  useEffect(() => {
    setUpperYValue(isMobile ? -2.3 : 1.3);
    setLowerYValue(isMobile ? 2.1 : 1.8);
    setUpperFontSize(isMobile ? 0.6 : 0.7);
    setLowerFontSize(isMobile ? 0.3 : 0.15);
  }, [isMobile]);

  return (
    <>
      <Text
        position={[0, upperYValue, -2.5]}
        fontSize={upperFontSize}
        fontWeight={800}
        color="yellow"
        font="/Nohemi-SemiBold.woff"
      >
        COMING SOON
      </Text>
      <Text
        position={[-1.5, lowerYValue, -2.5]}
        fontSize={lowerFontSize}
        fontWeight={300}
        color="yellow"
        font="/Nohemi-Regular.woff"
      >
        404Hz
      </Text>
      {/* <EffectComposer>
        <Bloom intensity={effectProps.bloomIntensity} />
        <Glitch active={effectProps.glitchIntensity} />
        <Vignette eskil={false} darkness={effectProps.vignetteDarkness} />
        <Noise opacity={effectProps.noiseOpacity} />
      </EffectComposer> */}
    </>
  );
};
