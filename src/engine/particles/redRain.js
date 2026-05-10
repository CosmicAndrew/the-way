import { Entity, Color, Curve, CURVE_LINEAR, BLEND_ADDITIVE, EMITTERSHAPE_BOX } from 'playcanvas';

export function createRedRain(app, root) {
  const rain = new Entity('red-rain-particles');
  rain.addComponent('particlesystem', {
    numParticles: 500,
    lifetime: 4,
    rate: 0.008,
    emitterShape: EMITTERSHAPE_BOX,
    emitterExtents: [30, 1, 20],
    initialVelocity: 2,
    loop: true,
    autoPlay: true,
    blendType: BLEND_ADDITIVE,
    lighting: false,
    depthWrite: false,
    localSpace: true,
    orientation: 3,
  });

  const alphaCurve = new Curve([0, 0.4, 0.6, 0.7, 0.9, 0.3, 1, 0]);
  alphaCurve.type = CURVE_LINEAR;
  rain.particlesystem.alphaGraph = alphaCurve;

  rain.setPosition(0, 10, -5);
  root.addChild(rain);

  return rain;
}
