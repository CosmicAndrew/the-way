import { Entity, Vec2, Color, StandardMaterial, Vec3, MeshInstance, Mesh, PlaneGeometry } from 'playcanvas';
import { createCrowd } from '../particles/crowd.js';

export function Chapter4(app, root) {
  createTerrain(app, root);
  createCrowd(app, root);
  createSunlight(app, root);
}

function createTerrain(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.45, 0.35, 0.2);
  mat.update();

  const geo = new PlaneGeometry({ halfExtents: new Vec2(40, 40), widthSegments: 60, lengthSegments: 60 });
  const positions = geo.positions;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const z = positions[i + 2];
    const dist = Math.sqrt(x * x + z * z);
    positions[i + 1] = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2 + Math.max(0, 5 - dist) * 0.4;
  }

  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('terrain');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setPosition(0, -3, -10);
  e.setEulerAngles(-90, 0, 0);
  root.addChild(e);
}

function createSunlight(app, root) {
  const sun = new Entity('sun');
  sun.addComponent('light', {
    type: 'directional',
    color: new Color(1, 0.9, 0.7),
    intensity: 2,
  });
  sun.setEulerAngles(-40, 30, 0);
  root.addChild(sun);

  const amb = new Entity('ambient');
  amb.addComponent('light', {
    type: 'omni',
    color: new Color(0.4, 0.3, 0.2),
    intensity: 0.4,
    range: 50,
  });
  amb.setPosition(0, 5, -5);
  root.addChild(amb);
}
