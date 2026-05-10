import { Entity, Curve, BLEND_NORMAL, EMITTERSHAPE_BOX } from 'playcanvas';

export function createCrowd(app, root) {
  const crowd = new Entity('crowd-particles');
  crowd.addComponent('particlesystem', {
    numParticles: 300,
    lifetime: 5,
    rate: 0.02,
    emitterShape: EMITTERSHAPE_BOX,
    emitterExtents: [25, 2, 25],
    initialVelocity: 0.3,
    loop: true,
    autoPlay: true,
    blendType: BLEND_NORMAL,
    lighting: true,
    depthWrite: true,
    localSpace: true,
    orientation: 3,
  });

  const alphaCurve = new Curve([0, 0.6, 0.5, 0.8, 1, 0]);
  crowd.particlesystem.alphaGraph = alphaCurve;

  const scaleCurve = new Curve([0, 0.3, 1, 0.3]);
  crowd.particlesystem.scaleGraph = scaleCurve;

  crowd.setPosition(0, 0, -10);
  root.addChild(crowd);

  return crowd;
}


