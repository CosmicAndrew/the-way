import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, BoxGeometry, PlaneGeometry } from 'playcanvas';

export function Chapter5(app, root) {
  createTable(app, root);
  createCandles(app, root);
  createWalls(app, root);
}

function createTable(app, root) {
  const woodMat = new StandardMaterial();
  woodMat.diffuse = new Color(0.3, 0.18, 0.08);
  woodMat.update();

  const tableTopGeo = new BoxGeometry({ halfExtents: new Vec3(4, 0.15, 1.5) });
  const tableTopMesh = Mesh.fromGeometry(app.graphicsDevice, tableTopGeo);
  const table = new Entity('table');
  table.addComponent('render', { meshInstances: [new MeshInstance(tableTopMesh, woodMat)] });
  table.setPosition(0, -0.5, -3);
  root.addChild(table);

  for (let i = 0; i < 4; i++) {
    const legGeo = new BoxGeometry({ halfExtents: new Vec3(0.15, 1, 0.15) });
    const legMesh = Mesh.fromGeometry(app.graphicsDevice, legGeo);
    const leg = new Entity('leg');
    leg.addComponent('render', { meshInstances: [new MeshInstance(legMesh, woodMat)] });
    const lx = (i % 2 === 0 ? -1 : 1) * 3.5;
    const lz = i < 2 ? -0.5 : 1.5;
    leg.setPosition(lx, -1.5, -3 + lz);
    root.addChild(leg);
  }
}

function createCandles(app, root) {
  for (let i = 0; i < 7; i++) {
    const candleMat = new StandardMaterial();
    candleMat.diffuse = new Color(0.9, 0.85, 0.7);
    candleMat.update();
    const candleGeo = new BoxGeometry({ halfExtents: new Vec3(0.08, 0.4, 0.08) });
    const candleMesh = Mesh.fromGeometry(app.graphicsDevice, candleGeo);
    const candle = new Entity('candle');
    candle.addComponent('render', { meshInstances: [new MeshInstance(candleMesh, candleMat)] });
    candle.setPosition((i - 3) * 0.9, -0.05, -3);
    root.addChild(candle);

    const light = new Entity('candle-light');
    light.addComponent('light', {
      type: 'omni',
      color: new Color(1, 0.7, 0.2),
      intensity: 0.6 + Math.random() * 0.2,
      range: 3,
    });
    light.setPosition((i - 3) * 0.9, 0.4, -3);
    root.addChild(light);
  }
}

function createWalls(app, root) {
  const wallMat = new StandardMaterial();
  wallMat.diffuse = new Color(0.15, 0.1, 0.05);
  wallMat.update();

  const wallGeo = new BoxGeometry({ halfExtents: new Vec3(8, 3, 0.3) });
  const wallMesh = Mesh.fromGeometry(app.graphicsDevice, wallGeo);

  const backWall = new Entity('back-wall');
  backWall.addComponent('render', { meshInstances: [new MeshInstance(wallMesh, wallMat)] });
  backWall.setPosition(0, 0, -6);
  root.addChild(backWall);

  const sideGeo = new BoxGeometry({ halfExtents: new Vec3(0.3, 3, 5) });
  const sideMesh = Mesh.fromGeometry(app.graphicsDevice, sideGeo);
  for (const x of [-8, 8]) {
    const side = new Entity('side-wall');
    side.addComponent('render', { meshInstances: [new MeshInstance(sideMesh, wallMat)] });
    side.setPosition(x, 0, -2);
    root.addChild(side);
  }
}
