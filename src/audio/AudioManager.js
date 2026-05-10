import { Howl } from 'howler';
import { audioTracks } from '../data/chapters.js';

export class AudioManager {
  constructor() {
    this.tracks = audioTracks.map((src) => new Howl({ src, loop: true, volume: 0, html5: true }));
    this.currentIndex = -1;
    this.muted = false;
    this.volume = 0.4;
  }

  playChapter(index) {
    if (index === this.currentIndex) return;
    const prev = this.tracks[this.currentIndex];
    const next = this.tracks[index];
    if (prev) prev.fade(prev.volume(), 0, 800);
    if (next) {
      if (!next.playing()) next.play();
      next.fade(next.volume(), this.muted ? 0 : this.volume, 800);
    }
    this.currentIndex = index;
  }

  toggleMute() {
    this.muted = !this.muted;
    const vol = this.muted ? 0 : this.volume;
    this.tracks.forEach((t) => t.fade(t.volume(), vol, 400));
    return this.muted;
  }

  get isMuted() {
    return this.muted;
  }
}
