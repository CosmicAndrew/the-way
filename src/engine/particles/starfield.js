import { Entity, Color, StandardMaterial, Vec3, MeshInstance, Mesh, SphereGeometry, Shader, SEMANTIC_POSITION } from 'playcanvas';

export function createStarfield(app, root, count = 500, radius = 50) {
  const vshader = `
    attribute vec3 aPosition;
    uniform mat4 matrix_viewProjection;
    varying vec3 vColor;
    attribute vec3 aColor;
    void main(void) {
      vColor = aColor;
      gl_Position = matrix_viewProjection * vec4(aPosition, 1.0);
      gl_PointSize = mix(1.5, 3.5, aColor.r);
    }`;

  const fshader = `
    precision highp float;
    varying vec3 vColor;
    uniform float uTime;
    void main(void) {
      float dist = length(gl_PointCoord - 0.5) * 2.0;
      float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
      alpha *= 0.5 + 0.5 * sin(vColor.g * 10.0 + uTime) * 0.3 + 0.7;
      gl_FragColor = vec4(vColor * 1.2, alpha);
    }`;

  const device = app.graphicsDevice;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.3 + Math.random() * 0.7);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    positions[i * 3 + 2] = Math.cos(phi) * r;
    const colorVariation = 0.6 + Math.random() * 0.4;
    colors[i * 3] = 0.8 * colorVariation + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.85 * colorVariation;
    colors[i * 3 + 2] = 0.9 * colorVariation + Math.random() * 0.1;
  }

  const vertexFormat = new VertexFormat(device, [
    { semantic: SEMANTIC_POSITION, components: 3, type: TYPE_FLOAT32 },
    { semantic: SEMANTIC_ATTR0, components: 3, type: TYPE_FLOAT32 },
  ]);

  const geom = new Geometry(vertexFormat);
  geom.setPositions(positions);
  geom.setAttribute(SEMANTIC_ATTR0, colors, 3);

  const shader = new Shader(device, {
    attributes: { aPosition: SEMANTIC_POSITION, aColor: SEMANTIC_ATTR0 },
    vshader,
    fshader,
  });

  const mat = new ShaderMaterial({ shader });
  mat.blendType = BLEND_ADDITIVE;
  mat.depthWrite = false;
  mat.setParameter('uTime', 0);
  mat.update();

  const mesh = Mesh.fromGeometry(device, geom);
  const mi = new MeshInstance(mesh, mat);
  mi.drawMode = DRAW_POINTS;

  const entity = new Entity('starfield');
  entity.addComponent('render', { meshInstances: [mi] });
  entity.setPosition(0, 0, -10);
  root.addChild(entity);

  app.on('update', (dt) => {
    mat.setParameter('uTime', (mat.getParameter('uTime') || 0) + dt);
    entity.rotate(0, dt * 0.02, 0);
  });
}

import {
  VertexFormat, TYPE_FLOAT32, SEMANTIC_ATTR0, Geometry,
} from 'playcanvas';
