import { Entity, Vec2, Color, StandardMaterial, Vec3, MeshInstance, Mesh, PlaneGeometry, BoxGeometry, SEMANTIC_POSITION, ShaderMaterial } from 'playcanvas';
import { createDove } from '../particles/dove.js';

export function Chapter3(app, root) {
  createWaterPlane(app, root);
  createDove(app, root);
  createHeavenlyLight(app, root);
  createRiverbank(app, root);
}

function createWaterPlane(app, root) {
  const vshader = `
    in vec3 aPosition;
    uniform mat4 matrix_viewProjection;
    uniform mat4 matrix_model;
    out vec2 vUv;
    out vec3 vWorldPos;
    void main(void) {
      vec4 worldPos = matrix_model * vec4(aPosition, 1.0);
      vWorldPos = worldPos.xyz;
      vUv = aPosition.xz * 0.5 + 0.5;
      gl_Position = matrix_viewProjection * worldPos;
    }`;

  const fshader = `
    precision highp float;
    in vec2 vUv;
    in vec3 vWorldPos;
    uniform float uTime;
    void main(void) {
      float ripple = sin(vWorldPos.x * 3.0 + uTime) * cos(vWorldPos.z * 3.0 + uTime * 0.7) * 0.3;
      float ripple2 = sin(vWorldPos.x * 7.0 - uTime * 1.3) * cos(vWorldPos.z * 5.0 + uTime) * 0.15;
      float depth = 0.5 + ripple + ripple2;
      vec3 shallow = vec3(0.05, 0.25, 0.4);
      vec3 deep = vec3(0.02, 0.1, 0.2);
      vec3 color = mix(deep, shallow, depth);
      float fresnel = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 2.0);
      color += vec3(0.1, 0.2, 0.3) * fresnel;
      gl_FragColor = vec4(color, 0.75);
    }`;

  const mat = new ShaderMaterial({
    uniqueName: 'water',
    attributes: { aPosition: SEMANTIC_POSITION },
    vertexGLSL: vshader,
    fragmentGLSL: fshader,
  });
  mat.blendType = 0;
  mat.setParameter('uTime', 0);
  mat.update();

  const geo = new PlaneGeometry({ halfExtents: new Vec2(15, 15), widthSegments: 80, lengthSegments: 80 });
  const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
  const e = new Entity('water');
  e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
  e.setPosition(0, -1.5, -5);
  e.setEulerAngles(-90, 0, 0);

  e._waterMat = mat;
  root.addChild(e);

  app.on('update', (dt) => {
    mat.setParameter('uTime', (mat.getParameter('uTime') || 0) + dt);
  });
}

function createHeavenlyLight(app, root) {
  const light = new Entity('heavenly');
  light.addComponent('light', {
    type: 'directional',
    color: new Color(0.9, 0.95, 1),
    intensity: 1.8,
  });
  light.setEulerAngles(-60, 20, 0);
  root.addChild(light);

  const fill = new Entity('fill-light');
  fill.addComponent('light', {
    type: 'omni',
    color: new Color(0.15, 0.25, 0.4),
    intensity: 0.5,
    range: 30,
  });
  fill.setPosition(0, 3, -3);
  root.addChild(fill);
}

function createRiverbank(app, root) {
  const mat = new StandardMaterial();
  mat.diffuse = new Color(0.15, 0.12, 0.06);
  mat.update();

  for (let i = 0; i < 12; i++) {
    const w = 1 + Math.random() * 3;
    const h = 0.3 + Math.random() * 1;
    const d = 1 + Math.random() * 2;
    const geo = new BoxGeometry({ halfExtents: new Vec3(w, h, d) });
    const mesh = Mesh.fromGeometry(app.graphicsDevice, geo);
    const e = new Entity('rock');
    e.addComponent('render', { meshInstances: [new MeshInstance(mesh, mat)] });
    e.setPosition((Math.random() - 0.5) * 25, -2.5, -5 + (Math.random() - 0.5) * 20);
    e.setEulerAngles(Math.random() * 30, Math.random() * 360, Math.random() * 20);
    root.addChild(e);
  }
}


