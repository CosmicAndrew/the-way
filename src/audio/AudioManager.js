import { Howl } from 'howler';
import { audioBuses } from '../data/chapters.js';

const FADE_MS = 800;

// Three independent buses (narration / score / ambience), each holding one
// lazily-created Howl per chapter. Lazy creation avoids exhausting the HTML5
// audio pool at startup; a missing file just means that bus stays silent.
class Bus {
  constructor(name, sources, volume) {
    this.name = name;
    this.sources = sources;
    this.volume = volume;
    this.tracks = new Array(sources.length).fill(null);
    this.currentIndex = -1;
  }

  _track(index) {
    if (!this.tracks[index] && this.sources[index]) {
      this.tracks[index] = new Howl({
        src: this.sources[index],
        loop: this.name !== 'narration', // narration plays once per chapter
        volume: 0,
        html5: true,
        onloaderror: () => { this.tracks[index] = false; }, // missing asset: stay silent
      });
    }
    return this.tracks[index] || null;
  }

  play(index, muted) {
    if (index === this.currentIndex) return;
    const prev = this.tracks[this.currentIndex] || null;
    const next = this._track(index);
    if (prev) {
      prev.fade(prev.volume(), 0, FADE_MS);
      prev.once('fade', () => { if (this.currentIndex !== index) return; prev.stop(); });
    }
    if (next) {
      if (!next.playing()) next.play();
      next.fade(next.volume(), muted ? 0 : this.volume, FADE_MS);
    }
    this.currentIndex = index;
  }

  setVolume(volume, muted) {
    this.volume = volume;
    const cur = this.tracks[this.currentIndex];
    if (cur && !muted) cur.fade(cur.volume(), volume, 200);
  }

  applyMute(muted) {
    const cur = this.tracks[this.currentIndex];
    if (cur) cur.fade(cur.volume(), muted ? 0 : this.volume, 400);
  }
}

export class AudioManager {
  constructor() {
    this.muted = false;
    this.buses = {
      narration: new Bus('narration', audioBuses.narration, 0.9),
      score: new Bus('score', audioBuses.score, 0.4),
      ambience: new Bus('ambience', audioBuses.ambience, 0.3),
    };
  }

  playChapter(index) {
    Object.values(this.buses).forEach((b) => b.play(index, this.muted));
  }

  setBusVolume(name, volume) {
    this.buses[name]?.setVolume(volume, this.muted);
  }

  toggleMute() {
    this.muted = !this.muted;
    Object.values(this.buses).forEach((b) => b.applyMute(this.muted));
    return this.muted;
  }

  get isMuted() {
    return this.muted;
  }
}
