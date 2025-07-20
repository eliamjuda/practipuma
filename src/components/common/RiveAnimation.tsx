'use client'

import { useRive } from '@rive-app/react-canvas';

export default function RiveAnimation() {
  const { rive, RiveComponent } = useRive({
    src: '/rive/MainCharacterPractiPuma.riv',
    // stateMachines: "bumpy",
    autoplay: true,
  });

  return (
    <RiveComponent
      onMouseEnter={() => rive && rive.play()}
    />
  );
}