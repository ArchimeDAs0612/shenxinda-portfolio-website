// An original, locally synthesized ambient score. No network, samples or autoplay.
const chords = [[50, 57, 61, 64], [47, 54, 57, 61], [43, 50, 54, 57], [45, 52, 57, 59]];
const frequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

export class AmbientScore {
  readonly context: AudioContext;
  private master: GainNode;
  private bus: BiquadFilterNode;
  private timer: number | undefined;
  private voices = new Set<OscillatorNode>();
  private step = 0;
  private nextTime = 0;
  private volume = 25;
  private pauseRevision = 0;

  constructor() {
    const AudioConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioConstructor) throw new Error('Audio unavailable');
    this.context = new AudioConstructor();
    const context = this.context;
    this.master = context.createGain();
    this.master.gain.value = 0;
    this.bus = context.createBiquadFilter();
    this.bus.type = 'lowpass';
    this.bus.frequency.value = 2300;
    this.bus.Q.value = .3;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 3;
    this.bus.connect(compressor);
    compressor.connect(this.master);
    this.master.connect(context.destination);

    const delay = context.createDelay(2);
    delay.delayTime.value = 60 / 76 * .75;
    const feedback = context.createGain();
    feedback.gain.value = .22;
    const wet = context.createGain();
    wet.gain.value = .18;
    this.bus.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(compressor);
  }

  private tone(note: number, time: number, duration: number, level: number, pad = false) {
    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();
    oscillator.type = pad ? 'sine' : 'triangle';
    oscillator.frequency.value = frequency(note);
    oscillator.detune.value = pad ? Math.sin(note) * 3 : 0;
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(level, time + (pad ? 1.8 : .04));
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    oscillator.connect(envelope);
    envelope.connect(this.bus);
    this.voices.add(oscillator);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
      this.voices.delete(oscillator);
    };
    oscillator.start(time);
    oscillator.stop(time + duration + .05);
  }

  private schedule = () => {
    const stepDuration = 60 / 76 / 2;
    while (this.nextTime < this.context.currentTime + .18) {
      const chord = chords[Math.floor(this.step / 32) % chords.length];
      if (this.step % 32 === 0) {
        chord.forEach((note) => this.tone(note, this.nextTime, stepDuration * 36, .11, true));
      }
      if (this.step % 4 === 0) {
        const index = [0, 2, 1, 3, 2, 1, 3, 2][Math.floor(this.step % 32 / 4)];
        this.tone(chord[index] + 12, this.nextTime, 2.5, .055);
      }
      if (this.step % 16 === 0) this.tone(chord[0] - 12, this.nextTime, 3, .08);
      this.step += 1;
      this.nextTime += stepDuration;
    }
  };

  async play() {
    this.pauseRevision += 1;
    // Called directly from a click: Safari also requires this user gesture.
    await this.context.resume();
    if (this.context.state !== 'running') throw new Error('Audio unavailable');
    if (this.timer !== undefined) return;
    this.nextTime = this.context.currentTime + .08;
    this.step = Math.floor(this.step / 32) * 32;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setValueAtTime(0, this.context.currentTime);
    this.master.gain.linearRampToValueAtTime(this.volume / 100 * .7, this.context.currentTime + 1.2);
    this.schedule();
    this.timer = window.setInterval(this.schedule, 100);
  }

  async tryAutoplay(shouldStart: () => boolean = () => true) {
    // A browser may leave resume() pending until a gesture. Never wait forever,
    // simulate a gesture or start audio later because an unrelated click occurred.
    void this.context.resume().catch(() => {});
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    if (!shouldStart() || this.context.state !== 'running' || document.hidden) return false;
    await this.play();
    return true;
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.context.state === 'running') {
      this.master.gain.setTargetAtTime(volume / 100 * .7, this.context.currentTime, .1);
    }
  }

  async pause() {
    const revision = ++this.pauseRevision;
    window.clearInterval(this.timer);
    this.timer = undefined;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(0, this.context.currentTime, .035);
    for (const voice of this.voices) voice.stop(this.context.currentTime + .15);
    await new Promise((resolve) => window.setTimeout(resolve, 180));
    if (revision === this.pauseRevision && this.context.state !== 'closed') await this.context.suspend();
  }

  dispose() {
    window.clearInterval(this.timer);
    this.timer = undefined;
    if (this.context.state !== 'closed') void this.context.close();
  }
}
