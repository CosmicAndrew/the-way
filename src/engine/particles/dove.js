import { Entity, Color, CURVE_LINEAR, BLEND_ADDITIVE, EMITTERSHAPE_SPHERE, Curve } from 'playcanvas';

export function createDove(app, root) {
  const dove = new Entity('dove-particles');
  dove.addComponent('particlesystem', {
    numParticles: 40,
    lifetime: 3,
    rate: 0.05,
    emitterShape: EMITTERSHAPE_SPHERE,
    emitterRadius: 0.3,
    initialVelocity: 0.8,
    loop: true,
    autoPlay: true,
    blendType: BLEND_ADDITIVE,
    lighting: false,
    depthWrite: false,
    localSpace: false,
    orientation: 3, // ORIENTATION_SCREEN
  });

  const alphaCurve = new Curve([0, 0, 0.3, 1, 0.8, 0.5, 1, 0]);
  alphaCurve.type = CURVE_LINEAR;
  dove.particlesystem.alphaGraph = alphaCurve;

  dove.setPosition(0, 5, -5);
  root.addChild(dove);

  app.on('update', (dt) => {
    const t = performance.now() * 0.001;
    dove.setPosition(Math.sin(t * 0.5) * 1.5, 5 + Math.sin(t * 0.7) * 1, -5 + Math.cos(t * 0.3) * 0.5);
  });

  return dove;
}
