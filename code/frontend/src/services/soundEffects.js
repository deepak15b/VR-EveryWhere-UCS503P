/**
 * Web Audio API & SpeechSynthesis Engine for VR Everywhere
 * 100% Client-Side generative audio and native text-to-speech
 * No external MP3 files required - works completely offline!
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientGain = null;
    this.ambientNodes = [];
    this.isAmbientPlaying = false;
    this.currentAmbientType = 'breeze';
    this.ambientVolume = 0.35;
  }

  // Lazy init AudioContext on user gesture
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Sound Effect: Footstep / Walk Forward Transition Whoosh
  playFootstep() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Low thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);

      // Subtle air whoosh
      const bufferSize = ctx.sampleRate * 0.18;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.18);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.19);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Sound Effect: Hotspot Beacon Click / Discovery Chime
  playHotspotPing() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.04);

        gain.gain.setValueAtTime(0.18, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.45);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Sound Effect: Camera Shutter for 360 Postcard
  playCameraShutter() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Ambient Soundscapes: Generative Wind / Temple Chimes / Reverb
  startAmbient(type = 'breeze') {
    this.stopAmbient();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      this.currentAmbientType = type;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(this.ambientVolume, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // 1. Gentle Air / Wind Foundation
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = type === 'temple' ? 380 : type === 'echo' ? 240 : 420;
      filter.Q.value = 3.0;

      // Modulate filter for breathing wind effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.15; // Slow 6-second wave
      lfoGain.gain.value = 160;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noise.connect(filter);
      filter.connect(masterGain);

      noise.start();
      lfo.start();

      this.ambientNodes.push(noise, lfo, masterGain);
      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('Ambient start error:', e);
    }
  }

  stopAmbient() {
    if (this.ambientGain && this.audioCtx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientNodes.forEach((node) => {
            try {
              if (node.stop) node.stop();
              node.disconnect();
            } catch (err) {}
          });
          this.ambientNodes = [];
          this.ambientGain = null;
          this.isAmbientPlaying = false;
        }, 550);
      } catch (e) {
        this.ambientNodes = [];
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }
    } else {
      this.isAmbientPlaying = false;
    }
  }

  setAmbientVolume(vol) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.setValueAtTime(this.ambientVolume, this.audioCtx.currentTime);
    }
  }
}

export const soundEngine = new SoundEngine();

// Speech Synthesis Helper
export class TourSpeechGuide {
  static cachedVoices = [];

  static isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static getBestVoice() {
    if (!this.isSupported()) return null;
    let voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      voices = this.cachedVoices || [];
    }

    // 1. Highest priority: Online Natural / Neural human docent voices
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Online (Natural)') ||
          v.name.includes('Neural') ||
          v.name.includes('Natural'))
    );
    if (naturalVoice) return naturalVoice;

    // 2. High priority: Premium studio voices (Google US English, Samantha, Jenny, Aria, Guy, Daniel)
    const studioVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Jenny') ||
          v.name.includes('Aria') ||
          v.name.includes('Guy') ||
          v.name.includes('Daniel') ||
          v.name.includes('Karen'))
    );
    if (studioVoice) return studioVoice;

    // 3. Fallback: Any modern English voice that is NOT the legacy robotic Desktop synth
    const nonDesktopVoice = voices.find(
      (v) => v.lang.startsWith('en') && !v.name.includes('Desktop')
    );
    if (nonDesktopVoice) return nonDesktopVoice;

    // 4. Default English voice
    return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
  }

  static speak(text, onStart, onEnd, onError) {
    if (!this.isSupported() || !text) return;

    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    // Relaxed, natural docent cadence (0.90 is warm, clear, and human; not rushed or robotic)
    utterance.rate = 0.90;
    utterance.pitch = 1.0;

    const voice = this.getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
  }

  static pause() {
    if (this.isSupported()) {
      window.speechSynthesis.pause();
    }
  }

  static resume() {
    if (this.isSupported()) {
      window.speechSynthesis.resume();
    }
  }

  static stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  static isSpeaking() {
    if (this.isSupported()) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }
}

// Pre-populate speech synthesis voices on startup
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  TourSpeechGuide.cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    TourSpeechGuide.cachedVoices = window.speechSynthesis.getVoices();
  };
}
