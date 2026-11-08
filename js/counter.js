/* ========================================================
   Fizz Clubhouse - Stats Counter Animation
   1F エントランス活動実績のカウントアップ演出
   ======================================================== */

export class StatsCounter {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.hasAnimated = false;
    this.initObserver();
  }

  initObserver() {
    if (!this.container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.startCountUp();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(this.container);
  }

  startCountUp() {
    const counterElements = this.container.querySelectorAll('[data-target-count]');
    const duration = 1800; // 1.8 seconds

    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target-count'), 10);
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic: 1 - (1 - progress)^3 (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(target * easeOut);

        el.textContent = currentVal.toLocaleString('ja-JP');

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target.toLocaleString('ja-JP');
        }
      };

      requestAnimationFrame(updateCount);
    });
  }
}
