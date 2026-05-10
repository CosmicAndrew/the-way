import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, BoxGeometry, PlaneGeometry, LIGHTTYPE_OMNI, LightComponent } from 'playcanvas';

export function Chapter2(app, root) {
  createGround(app, root);
  createStable(app, root);
  createStar(app, root);
  createAmbientGlow(app, root);
}

function createGround(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.25, 0.15, 0.05);
  mat.update();
  const geo = new PlaneGeometry({ halfExtents: new Vec2(40, 40), widthSegments: 20, lengthSegments: 20 });
  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('ground');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setEulerAngles(-90, 0, 0);
  e.setPosition(0, -3, -5);
  root.addChild(e);
}

function createStable(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.3, 0.18, 0.06);
  mat.update();
  const geo = new BoxGeometry({ halfExtents: new Vec3(3, 2.5, 3) });
  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('stable');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setPosition(0, -0.5, -5);
  root.addChild(e);

  const roofMat = new StandardMaterial();
  roofMat.diffuse = new Color(0.2, 0.1, 0.03);
  roofMat.update();
  const roofGeo = new BoxGeometry({ halfExtents: new Vec3(3.5, 0.3, 3.5) });
  const roofMesh = Mesh.fromGeometry(app.graphicsDevice, roofGeo);
  const roof = new Entity('roof');
  roof.addComponent('render', { meshInstances: [new MeshInstance(roofMesh, roofMat)] });
  roof.setPosition(0, 2.8, -5);
  root.addChild(roof);

  const mangerMat = new StandardMaterial();
  mangerMat.diffuse = new Color(0.4, 0.25, 0.1);
  mangerMat.update();
  const mangerGeo = new BoxGeometry({ halfExtents: new Vec3(0.6, 0.2, 0.4) });
  const mangerMesh = Mesh.fromGeometry(app.graphicsDevice, mangerGeo);
  const manger = new Entity('manger');
  manger.addComponent('render', { meshInstances: [new MeshInstance(mangerMesh, mangerMat)] });
  manger.setPosition(0, -1.8, -5);
  root.addChild(manger);
}

function createStar(app, root) {
  const starMat = new StandardMaterial();
  starMat.diffuse = new Color(1, 0.9, 0.5);
  starMat.emissive = new Color(1, 0.8, 0.3);
  starMat.update();

  const star = new Entity('star');
  star.addComponent('light', {
    type: 'omni',
    color: new Color(1, 0.85, 0.4),
    intensity: 2.5,
    range: 20,
  });
  star.setPosition(0, 3.5, -5);
  root.addChild(star);
}

function createAmbientGlow(app, root) {
  const glow = new Entity('ambient-glow');
  glow.addComponent('light', {
    type: 'omni',
    color: new Color(0.6, 0.35, 0.1),
    intensity: 0.6,
    range: 25,
  });
  glow.setPosition(0, 0.5, -5);
  root.addChild(glow);
}
