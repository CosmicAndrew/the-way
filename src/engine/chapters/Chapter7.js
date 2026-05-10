import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, BoxGeometry, SphereGeometry } from 'playcanvas';

export function Chapter7(app, root) {
  createTomb(app, root);
  createBlindingLight(app, root);
  createGround(app, root);
}

function createTomb(app, root) {
  const stoneMat = new StandardMaterial();
  stoneMat.diffuse = new Color(0.5, 0.45, 0.4);
  stoneMat.update();

  const leftGeo = new BoxGeometry({ halfExtents: new Vec3(0.8, 2.5, 1.5) });
  const leftMesh = Mesh.fromGeometry(app.graphicsDevice, leftGeo);
  const left = new Entity('tomb-left');
  left.addComponent('render', { meshInstances: [new MeshInstance(leftMesh, stoneMat)] });
  left.setPosition(-1.5, -0.5, -5);
  root.addChild(left);

  const rightGeo = new BoxGeometry({ halfExtents: new Vec3(0.8, 2.5, 1.5) });
  const rightMesh = Mesh.fromGeometry(app.graphicsDevice, rightGeo);
  const right = new Entity('tomb-right');
  right.addComponent('render', { meshInstances: [new MeshInstance(rightMesh, stoneMat)] });
  right.setPosition(1.5, -0.5, -5);
  root.addChild(right);

  const topGeo = new BoxGeometry({ halfExtents: new Vec3(2.5, 0.4, 1.5) });
  const topMesh = Mesh.fromGeometry(app.graphicsDevice, topGeo);
  const top = new Entity('tomb-top');
  top.addComponent('render', { meshInstances: [new MeshInstance(topMesh, stoneMat)] });
  top.setPosition(0, 2.5, -5);
  root.addChild(top);

  const entranceGeo = new BoxGeometry({ halfExtents: new Vec3(2, 2, 0.05) });
  const entranceMesh = Mesh.fromGeometry(app.graphicsDevice, entranceGeo);
  const entrance = new Entity('entrance');
  entrance.addComponent('render', { meshInstances: [new MeshInstance(entranceMesh, new StandardMaterial())] });
  entrance.render.meshInstances[0].material.diffuse = new Color(0.05, 0.05, 0.06);
  entrance.render.meshInstances[0].material.update();
  entrance.setPosition(0, 0.2, -6.5);
  root.addChild(entrance);

  const stoneMat2 = new StandardMaterial();
  stoneMat2.diffuse = new Color(0.45, 0.4, 0.35);
  stoneMat2.update();
  const rolledGeo = new SphereGeometry({ radius: 1.5, latitudeBands: 16, longitudeBands: 16 });
  const rolledMesh = Mesh.fromGeometry(app.graphicsDevice, rolledGeo);
  const rolled = new Entity('rolled-stone');
  rolled.addComponent('render', { meshInstances: [new MeshInstance(rolledMesh, stoneMat2)] });
  rolled.setPosition(4, -0.8, -5);
  root.addChild(rolled);
}

function createBlindingLight(app, root) {
  const light = new Entity('resurrection-light');
  light.addComponent('light', {
    type: 'omni',
    color: new Color(1, 0.98, 0.95),
    intensity: 8,
    range: 25,
  });
  light.setPosition(0, 1.5, -5);
  root.addChild(light);

  const glow = new Entity('white-glow');
  glow.addComponent('light', {
    type: 'omni',
    color: new Color(1, 1, 1),
    intensity: 4,
    range: 40,
  });
  glow.setPosition(0, 2, -5);
  root.addChild(glow);
}

function createGround(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.6, 0.55, 0.5);
  mat.update();
  const geo = new BoxGeometry({ halfExtents: new Vec3(20, 0.2, 20) });
  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('ground');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setPosition(0, -3, -8);
  root.addChild(e);
}
