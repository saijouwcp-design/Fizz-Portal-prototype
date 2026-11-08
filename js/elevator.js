/* ========================================================
   Fizz Clubhouse - Elevator Controller & Sound Synthesizer
   エレベーター操作盤・Web Audio API効果音・スクロール連動
   ======================================================== */

class ElevatorSoundSystem {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;

    // Check saved audio preference
    const savedMute = localStorage.getItem('fizz_sound_muted');
    if (savedMute === 'true') {
      this.isMuted = true;
    }
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('fizz_sound_muted', this.isMuted);
    return this.isMuted;
  }

  // Play gentle button click pop
  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.09);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Play crisp coin chime (for finance/treasury actions)
  playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // High coin ping 1 (B5 ~ 988Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.22, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // High coin ping 2 (E6 ~ 1319Hz)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.07);
      gain2.gain.setValueAtTime(0.24, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.52);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Play crisp elevator arrival chime (Ding-Dong: G5 -> C5)
  playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Ding (High tone G5 ~ 784Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(783.99, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.85);

      // Dong (Low tone C5 ~ 523Hz)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, now + 0.35);
      gain2.gain.setValueAtTime(0.28, now + 0.35);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.45);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Play happy victory fanfare for quiz correct answer
  playFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const noteTime = now + (idx * 0.1);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  // Play quiz wrong sound
  playBuzz() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }
}

export class ElevatorController {
  constructor(viewportSelector, options = {}) {
    this.viewport = document.querySelector(viewportSelector) || window;
    this.floors = ['4f', '3f', '2f', '1f', 'b1f'];
    this.floorOrder = { '4f': 4, '3f': 3, '2f': 2, '1f': 1, 'b1f': 0 };
    this.currentFloor = '1f'; // default start at Entrance
    this.sound = new ElevatorSoundSystem();
    this.isScrolling = false;

    this.initDOMElements();
    this.setupIntersectionObserver();
    this.bindEvents();
    this.updateSoundButtonUI();
  }

  initDOMElements() {
    this.panel = document.querySelector('.elevator-panel');
    this.displayFloorText = document.querySelector('.display-floor-text');
    this.displayArrow = document.querySelector('.display-dir-arrow');
    this.floorButtons = document.querySelectorAll('.floor-btn');
    this.soundToggleBtn = document.querySelector('.sound-toggle-btn');
  }

  setupIntersectionObserver() {
    const floorSections = document.querySelectorAll('.clubhouse-floor');

    const observerOptions = {
      root: this.viewport === window ? null : this.viewport,
      threshold: 0.55 // when floor is >55% visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const floorId = entry.target.id;
          if (floorId && this.floors.includes(floorId)) {
            this.handleFloorChange(floorId);
          }
        }
      });
    }, observerOptions);

    floorSections.forEach(section => this.observer.observe(section));
  }

  handleFloorChange(newFloor) {
    if (this.currentFloor === newFloor) return;

    const oldIndex = this.floorOrder[this.currentFloor];
    const newIndex = this.floorOrder[newFloor];

    // Direction arrow
    if (this.displayArrow) {
      this.displayArrow.classList.remove('up', 'down');
      if (newIndex > oldIndex) {
        this.displayArrow.textContent = '▲';
        this.displayArrow.classList.add('up');
      } else if (newIndex < oldIndex) {
        this.displayArrow.textContent = '▼';
        this.displayArrow.classList.add('down');
      } else {
        this.displayArrow.textContent = '●';
      }
    }

    this.currentFloor = newFloor;
    this.updateDisplayUI();

    // Play arrival chime when destination reached
    this.sound.playChime();
  }

  updateDisplayUI() {
    // Update digital indicator
    if (this.displayFloorText) {
      this.displayFloorText.textContent = this.currentFloor.toUpperCase();
    }

    // Update active button state
    this.floorButtons.forEach(btn => {
      const targetFloor = btn.getAttribute('data-floor');
      if (targetFloor === this.currentFloor) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });
  }

  scrollToFloor(targetFloorId) {

    const targetEl =
      document.getElementById(targetFloorId);

    if (!targetEl) return;

    this.sound.playClick();

    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }

  bindEvents() {
    // Floor button click listeners
    this.floorButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetFloor = btn.getAttribute('data-floor');
        if (targetFloor) {
          this.scrollToFloor(targetFloor);
        }
      });
    });

    // Sound toggle button
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = this.sound.toggleMute();
        this.updateSoundButtonUI();
        if (!isMuted) {
          this.sound.playClick();
        }
      });
    }

    // Mobile collapse toggle
    const toggleBtn = document.querySelector('.elevator-toggle-btn');
    if (toggleBtn && this.panel) {
      toggleBtn.addEventListener('click', () => {
        this.panel.classList.toggle('collapsed');
      });
    }
  }

  updateSoundButtonUI() {
    if (!this.soundToggleBtn) return;
    if (this.sound.isMuted) {
      this.soundToggleBtn.classList.add('muted');
      this.soundToggleBtn.innerHTML = '🔇 <span class="sound-label">サウンドOFF</span>';
    } else {
      this.soundToggleBtn.classList.remove('muted');
      this.soundToggleBtn.innerHTML = '🔊 <span class="sound-label">サウンドON</span>';
    }
  }
}
