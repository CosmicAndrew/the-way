import {
  Entity, MeshInstance, Mesh, ShaderMaterial,
  BLEND_ADDITIVE, PRIMITIVE_POINTS,
  SEMANTIC_POSITION, SEMANTIC_COLOR,
} from 'playcanvas';

// PlayCanvas 2.x point-cloud starfield. Builds a Mesh directly (setPositions/setColors32),
// renders it as additive GL points via a tiny custom shader. Wrapped so a GPU/shader
// failure degrades to "no stars" instead of breaking the whole chapter.
export function createStarfield(app, root, count = 500, radius = 50) {
  try {
    const device = app.graphicsDevice;
    const positions = [];
    const colors = []; // Uint8 RGBA per vertex (setColors32)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.3 + Math.random() * 0.7);
      positions.push(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.sin(phi) * Math.sin(theta) * r,
        Math.cos(phi) * r,
      );
      const v = 0.6 + Math.random() * 0.4;
      colors.push(
        Math.round(Math.min(1, 0.8 * v + Math.random() * 0.2) * 255),
        Math.round(0.85 * v * 255),
        Math.round(Math.min(1, 0.9 * v + Math.random() * 0.1) * 255),
        255,
      );
    }

    const mesh = new Mesh(device);
    mesh.setPositions(positions);
    mesh.setColors32(colors);
    mesh.update(PRIMITIVE_POINTS);

    const vshader = `
      in vec3 aPosition;
      in vec4 aColor;
      uniform mat4 matrix_viewProjection;
      out vec3 vColor;
      void main(void) {
        vColor = aColor.rgb;
        gl_Position = matrix_viewProjection * vec4(aPosition, 1.0);
        gl_PointSize = mix(1.5, 3.5, aColor.r);
      }`;

    const fshader = `
      precision highp float;
      in vec3 vColor;
      void main(void) {
        float dist = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
        gl_FragColor = vec4(vColor * 1.2, alpha);
      }`;

    const mat = new ShaderMaterial({
      uniqueName: 'starfield',
      attributes: { aPosition: SEMANTIC_POSITION, aColor: SEMANTIC_COLOR },
      vertexGLSL: vshader,
      fragmentGLSL: fshader,
    });
    mat.blendType = BLEND_ADDITIVE;
    mat.depthWrite = false;
    mat.setParameter('uTime', 0);
    mat.update();

    const mi = new MeshInstance(mesh, mat);
    const entity = new Entity('starfield', app);
    entity.addComponent('render', { meshInstances: [mi] });
    entity.setPosition(0, 0, -10);
    root.addChild(entity);

    let t = 0;
    app.on('update', (dt) => {
      t += dt;
      mat.setParameter('uTime', t);
      entity.rotate(0, dt * 0.02, 0);
    });
  } catch (e) {
    console.error('[starfield] skipped:', e);
  }
}
