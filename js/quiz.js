/* ========================================================
   Fizz Clubhouse - Kids Riddle & Quiz Engine
   こどもなぞなぞ・ひらめきクイズの出題・採点エンジン
   ======================================================== */

export const QUIZ_DATA = [
  {
    id: 1,
    question: "パンはパンでも、フライパンでもなくて、あたまの上にのっけて街をあるくパンはなーんだ？",
    options: [
      { text: "アンパン", isCorrect: false },
      { text: "ヘルメットパン", isCorrect: false },
      { text: "ジーパン（ズボン）", isCorrect: true }
    ],
    hint: "服やファッションのことだよ！",
    explanation: "せいかい！「ジーパン」でした！あたまの上...じゃなくて足にはくズボンのパンだね！（ひっかけ問題でした♪）"
  },
  {
    id: 2,
    question: "いつもみんなの手紙や荷物を遠くまで運んでいるのに、文字がぜんぜん読めないのはだーれ？",
    options: [
      { text: "郵便ポスト", isCorrect: true },
      { text: "ハト", isCorrect: false },
      { text: "配達のお兄さん", isCorrect: false }
    ],
    hint: "街の道ばたに赤くて四角い姿で立っているよ。",
    explanation: "せいかい！「郵便ポスト」でした！毎日たくさんの手紙をあずかっているけれど、ポスト自体は文字が読めないんだね。"
  },
  {
    id: 3,
    question: "大きくなればなるほど、軽くなって空へとんでいっちゃうものはなーんだ？",
    options: [
      { text: "ふうせん", isCorrect: true },
      { text: "雲（くも）", isCorrect: false },
      { text: "飛行機", isCorrect: false }
    ],
    hint: "息をふーっと吹き込むと、どんどんふくらむよ！",
    explanation: "せいかい！「ふうせん」でした！ヘリウムガスや空気をいっぱい入れると、ふわふわ空へ飛んでいくよ！"
  },
  {
    id: 4,
    question: "お風呂に入ると小さくなって、さいごには消えちゃうものはなーんだ？",
    options: [
      { text: "あひるのおもちゃ", isCorrect: false },
      { text: "せっけん", isCorrect: true },
      { text: "タオル", isCorrect: false }
    ],
    hint: "からだを洗うときに泡がモコモコ出るよ。",
    explanation: "せいかい！「せっけん」でした！使えば使うほど小さくなって、みんなの手をキレイにしてくれるんだね。"
  },
  {
    id: 5,
    question: "【ひらめき理科クイズ】こどもボランティアFizzの実験教室！ペットボトルに重曹（じゅうそう）とお酢（す）を混ぜると、中から出てくる気体はどれ？",
    options: [
      { text: "二酸化炭素（しゅわしゅわ炭酸のあわ）", isCorrect: true },
      { text: "酸素（息をすう空気）", isCorrect: false },
      { text: "ヘリウム（声が変わる気体）", isCorrect: false }
    ],
    hint: "サイダーやコーラに入っているシュワシュワの正体だよ！",
    explanation: "大せいかい！二酸化炭素です！重曹とお酢が化学反応を起こすと、二酸化炭素の泡（Fizz!）が一気に噴き出して風船をふくらませる実験が大人気なんだよ！"
  }
];

export class QuizGame {
  constructor(containerEl, soundSystem) {
    this.container = containerEl;
    this.sound = soundSystem;
    this.currentIndex = 0;
    this.score = 0;
    this.render();
  }

  getCurrentQuestion() {
    return QUIZ_DATA[this.currentIndex];
  }

  render() {
    if (!this.container) return;
    const q = this.getCurrentQuestion();
    const letters = ['A', 'B', 'C'];

    this.container.innerHTML = `
      <div class="quiz-box">
        <div class="quiz-progress-bar">
          <span class="quiz-level-tag">🧩 Fizz ひらめきなぞなぞ</span>
          <span class="quiz-score-badge">第 ${this.currentIndex + 1} 問 / 全 ${QUIZ_DATA.length} 問 (スコア: ${this.score}点)</span>
        </div>

        <div class="quiz-question-card">
          <div class="quiz-q-num">QUESTION ${this.currentIndex + 1}</div>
          <div class="quiz-q-text">${q.question}</div>
        </div>

        <div class="quiz-options-list">
          ${q.options.map((opt, i) => `
            <button type="button" class="quiz-option-btn" data-index="${i}">
              <span class="quiz-opt-letter">${letters[i]}</span>
              <span class="quiz-opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="quizFeedback">
          <div class="feedback-headline" id="feedbackHeadline"></div>
          <div class="feedback-explanation" id="feedbackExplanation"></div>
          <button type="button" class="btn-primary" id="btnNextQuiz" style="margin-top: 12px; width: 100%; justify-content: center;">
            ${this.currentIndex < QUIZ_DATA.length - 1 ? 'つぎのもんだいへ ➔' : 'もう一度最初から挑戦する 🔄'}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const optionBtns = this.container.querySelectorAll('.quiz-option-btn');
    const q = this.getCurrentQuestion();
    const feedbackBox = this.container.querySelector('#quizFeedback');
    const headline = this.container.querySelector('#feedbackHeadline');
    const explanation = this.container.querySelector('#feedbackExplanation');
    const nextBtn = this.container.querySelector('#btnNextQuiz');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
        const selectedOption = q.options[selectedIdx];

        // Disable all buttons after answering
        optionBtns.forEach(b => b.disabled = true);

        if (selectedOption.isCorrect) {
          btn.classList.add('is-correct');
          this.score += 20;
          if (this.sound) this.sound.playFanfare();

          feedbackBox.className = 'quiz-feedback is-visible success';
          headline.className = 'feedback-headline success';
          headline.innerHTML = '🎉 だいせいかい！！ やったね！';
          explanation.textContent = q.explanation;
        } else {
          btn.classList.add('is-wrong');
          // Highlight correct option
          q.options.forEach((opt, idx) => {
            if (opt.isCorrect) {
              optionBtns[idx].classList.add('is-correct');
            }
          });
          if (this.sound) this.sound.playBuzz();

          feedbackBox.className = 'quiz-feedback is-visible error';
          headline.className = 'feedback-headline error';
          headline.innerHTML = '💡 おしい！ まちがい！';
          explanation.textContent = q.explanation;
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < QUIZ_DATA.length - 1) {
          this.currentIndex++;
        } else {
          // Restart loop
          this.currentIndex = 0;
          this.score = 0;
        }
        if (this.sound) this.sound.playClick();
        this.render();
      });
    }
  }
}
