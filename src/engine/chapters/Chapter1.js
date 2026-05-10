import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, PlaneGeometry, BoxGeometry } from 'playcanvas';
import { createStarfield } from '../particles/starfield.js';

export function Chapter1(app, root) {
  createStarfield(app, root, 800, 60);
  createNebulaDust(app, root);
}

function createNebulaDust(app, root) {
  const material = new StandardMaterial();
  material.diffuse = new Color(0.15, 0.1, 0.3);
  material.opacity = 0.06;
  material.blendType = 0;
  material.update();

  for (let i = 0; i < 30; i++) {
    const geo = new PlaneGeometry({ halfExtents: new Vec2(3 + Math.random() * 8, 3 + Math.random() * 8) });
    const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
    const mi = new MeshInstance(mesh, material);
    const e = new Entity('nebula');
    e.addComponent('render', { meshInstances: [mi] });
    e.setPosition(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 40 - 10,
    );
    e.setEulerAngles(Math.random() * 360, Math.random() * 360, Math.random() * 360);
    root.addChild(e);
  }
}


