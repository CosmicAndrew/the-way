import { Entity, Color, Vec3 } from 'playcanvas';
import { CameraController } from './CameraController.js';
import { chapters } from '../data/chapters.js';

export class SceneManager {
  constructor(app) {
    this.app = app;
    this.activeIndex = -1;
    this.chapterRoots = [];
    this.chapterBuilders = [];

    const camera = new Entity('camera');
    camera.addComponent('camera', {
      clearColor: new Color(0.02, 0.02, 0.05),
      farClip: 200,
      fov: 55,
    });
    app.root.addChild(camera);
    this.camera = new CameraController(camera);

    this._loadChapters();
  }

  async _loadChapters() {
    const builders = await Promise.all([
      import('./chapters/Chapter1.js'),
      import('./chapters/Chapter2.js'),
      import('./chapters/Chapter3.js'),
      import('./chapters/Chapter4.js'),
      import('./chapters/Chapter5.js'),
      import('./chapters/Chapter6.js'),
      import('./chapters/Chapter7.js'),
    ]);

    this.chapterBuilders = builders.map((m, i) => m.default || m[`Chapter${i + 1}`]);

    // Dev StrictMode can destroy the app while this async load is in flight; bail if so.
    if (!this.app || !this.app.root) return;

    for (let i = 0; i < 7; i++) {
      const root = new Entity(`chapter-${i}`);
      root.enabled = false;
      this.app.root.addChild(root);
      this.chapterRoots.push(root);
    }

    this.activateChapter(0, true);
  }

  activateChapter(index, instant = false) {
    if (index === this.activeIndex) return;

    const chapterData = chapters[index];
    const prevRoot = this.activeIndex >= 0 ? this.chapterRoots[this.activeIndex] : null;
    const nextRoot = this.chapterRoots[index];
    // Chapters load asynchronously (_loadChapters); ignore activation calls until the
    // target root exists. _loadChapters re-activates the current chapter once ready.
    if (!nextRoot || !chapterData) return;

    if (instant) {
      this.camera.snapTo(chapterData.cameraPos, chapterData.cameraLookAt);
    } else {
      this.camera.moveTo(chapterData.cameraPos, chapterData.cameraLookAt);
    }

    if (prevRoot && prevRoot.enabled) {
      prevRoot.enabled = false;
    }

    if (!nextRoot.children.length && this.chapterBuilders[index]) {
      try {
        this.chapterBuilders[index](this.app, nextRoot);
      } catch (e) {
        console.error(`[SceneManager] chapter ${index} build failed:`, e);
      }
    }

    nextRoot.enabled = true;

    if (chapterData.ambientColor) {
      this.app.scene.ambientLight = chapterData.ambientColor;
    }
    // PlayCanvas 2.x: scene.fog is a read-only FogParams object; set its fields.
    const fog = this.app.scene.fog;
    if (chapterData.fog) {
      fog.type = chapterData.fog.type || 'linear';
      fog.color = chapterData.fog.color || new Color(0, 0, 0);
      fog.start = chapterData.fog.start ?? 0;
      fog.end = chapterData.fog.end ?? 50;
      fog.density = chapterData.fog.density ?? 0.01;
    } else {
      fog.type = 'none';
    }

    this.activeIndex = index;
  }

  update(dt) {
    if (this.camera) this.camera.update();
  }

  get cameraHasSettled() {
    return this.camera?.hasSettled ?? true;
  }
}
