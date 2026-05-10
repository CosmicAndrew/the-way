import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, BoxGeometry, PlaneGeometry } from 'playcanvas';
import { createRedRain } from '../particles/redRain.js';

export function Chapter6(app, root) {
  createGround(app, root);
  createCrosses(app, root);
  createDarkSky(app, root);
  createRedRain(app, root);
}

function createGround(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.1, 0.05, 0.03);
  mat.update();
  const geo = new PlaneGeometry({ halfExtents: new Vec2(30, 30) });
  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('ground');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setEulerAngles(-90, 0, 0);
  e.setPosition(0, -4, -8);
  root.addChild(e);
}

function createCrosses(app, root) {
  const woodMat = new StandardMaterial();
  woodMat.diffuse = new Color(0.2, 0.1, 0.06);
  woodMat.update();

  const positions = [0, -5, 5];
  for (const x of positions) {
    const vertGeo = new BoxGeometry({ halfExtents: new Vec3(0.15, 3, 0.15) });
    const vertMesh = Mesh.fromGeometry(app.graphicsDevice, vertGeo);
    const vert = new Entity('cross-vert');
    vert.addComponent('render', { meshInstances: [new MeshInstance(vertMesh, woodMat)] });
    vert.setPosition(x, -1, -5);
    root.addChild(vert);

    const horGeo = new BoxGeometry({ halfExtents: new Vec3(1, 0.12, 0.12) });
    const horMesh = Mesh.fromGeometry(app.graphicsDevice, horGeo);
    const hor = new Entity('cross-hor');
    hor.addComponent('render', { meshInstances: [new MeshInstance(horMesh, woodMat)] });
    hor.setPosition(x, 1.2, -5);
    root.addChild(hor);
  }
}

function createDarkSky(app, root) {
  const dimLight = new Entity('dim-light');
  dimLight.addComponent('light', {
    type: 'directional',
    color: new Color(0.3, 0.05, 0.05),
    intensity: 0.5,
  });
  dimLight.setEulerAngles(20, 10, 0);
  root.addChild(dimLight);
}
