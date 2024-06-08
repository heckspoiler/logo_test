import { Text } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { useControls } from 'leva';

export const TextContent = ({ isMobile }) => {
  const [upperYValue, setUpperYValue] = useState(0);
  const [lowerYValue, setLowerYValue] = useState(0);
  const [upperFontSize, setUpperFontSize] = useState(0);
  const [lowerFontSize, setLowerFontSize] = useState(0);

  // const lightProps = useControls('Lights', {
  //   intensity: { value: 2, min: 0, max: 10 },
  //   positionX: { value: 2, min: -10, max: 10 },
  //   positionY: { value: 5, min: -10, max: 10 },
  //   positionZ: { value: 2, min: -10, max: 10 },
  //   shadowMapSizeWidth: { value: 1024, min: 512, max: 2048, step: 128 },
  //   shadowMapSizeHeight: { value: 1024, min: 512, max: 2048, step: 128 },
  //   shadowCameraFar: { value: 50, min: 0, max: 100 },
  //   shadowCameraLeft: { value: -10, min: -50, max: 0 },
  //   shadowCameraRight: { value: 10, min: 0, max: 50 },
  //   shadowCameraTop: { value: 10, min: 0, max: 50 },
  //   shadowCameraBottom: { value: -10, min: -50, max: 0 },
  // });

  const lightProps = {
    intensity: 2,
    positionX: 2,
    positionY: 5,
    positionZ: 2,
    shadowMapSizeWidth: 1024,
    shadowMapSizeHeight: 1024,
    shadowCameraFar: 50,
    shadowCameraLeft: -10,
    shadowCameraRight: 10,
    shadowCameraTop: 10,
    shadowCameraBottom: -10,
  };

  // const fourOFourProps = useControls('404', {
  //   outlineWidth: { value: 0.2, min: 0, max: 10 },
  //   outlineOffsetX: { value: -0.1, min: -10, max: 10 },
  //   outlineOffsetY: { value: 0.1, min: -10, max: 10 },
  //   outlineBlur: { value: 0.5, min: 0, max: 10 },
  //   outlineColor: { value: '#FAFF00' },
  //   outlineOpacity: { value: 0.06, min: 0, max: 1 },
  // });

  const fourOFourProps = {
    outlineWidth: 0.2,
    outlineOffsetX: -0.1,
    outlineOffsetY: 0.1,
    outlineBlur: 0.5,
    outlineColor: '#FAFF00',
    outlineOpacity: 0.06,
  };

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
        outlineWidth={fourOFourProps.outlineWidth}
        outlineOffsetX={fourOFourProps.outlineOffsetX}
        outlineOffsetY={fourOFourProps.outlineOffsetY}
        outlineBlur={fourOFourProps.outlineBlur}
        outlineColor={fourOFourProps.outlineColor}
        outlineOpacity={fourOFourProps.outlineOpacity}
      >
        COMING SOON
      </Text>
      <Text
        position={[-1.5, lowerYValue, -2.5]}
        fontSize={lowerFontSize}
        fontWeight={300}
        color="yellow"
        font="/Nohemi-Regular.woff"
        outlineWidth={fourOFourProps.outlineWidth}
        outlineOffsetX={fourOFourProps.outlineOffsetX}
        outlineOffsetY={fourOFourProps.outlineOffsetY}
        outlineBlur={fourOFourProps.outlineBlur}
        outlineColor={fourOFourProps.outlineColor}
        outlineOpacity={fourOFourProps.outlineOpacity}
      >
        404Hz
      </Text>
      <directionalLight
        intensity={lightProps.intensity}
        position={[
          lightProps.positionX,
          lightProps.positionY,
          lightProps.positionZ,
        ]}
        shadow-mapSize-width={lightProps.shadowMapSizeWidth}
        shadow-mapSize-height={lightProps.shadowMapSizeHeight}
        shadow-camera-far={lightProps.shadowCameraFar}
        shadow-camera-left={lightProps.shadowCameraLeft}
        shadow-camera-right={lightProps.shadowCameraRight}
        shadow-camera-top={lightProps.shadowCameraTop}
        shadow-camera-bottom={lightProps.shadowCameraBottom}
      />
      <directionalLight
        intensity={5.5}
        position={[-2, 5, -2]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
};
