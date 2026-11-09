/* ========================================================
   Fizz Clubhouse - Modal Content Data & Manager
   各フロアのオブジェクト詳細データ・出欠管理連携
   ======================================================== */

import { QuizGame } from './quiz.js';
import { AttendanceSystem } from './attendance.js';
import { MemberRosterSystem } from './roster.js';
import { DocumentsManager } from './documents.js';
import { AccountingSystem } from './accounting.js';
import { RooftopShop } from './shop.js';
import { supabaseClient } from './supabase.js';

const COMING_SOON_CONTENT = `
  <div style="
    text-align:center;
    padding:24px;
  ">
    <div style="font-size:4rem;">
      🚧
    </div>

    <h3>準備中</h3>

    <p>
      このコンテンツは現在準備中です。<br>
      今後アップデート予定です。
    </p>
  </div>
`;

export const MODAL_DATA = {
  // 4F Rooftop & Nature
  'rooftop-shop': {
    badge: '4F Official Store',
    title: '🛍️ Fizzオフィシャルショップ＆チャリティグッズ',
    isShop: true
  },

  'tent': {
    badge: 'Coming Soon',
    title: '🚧 準備中',
    content: COMING_SOON_CONTENT
  },

  'firstaid': {
    badge: 'Coming Soon',
    title: '🚧 準備中',
    content: COMING_SOON_CONTENT
  },

  // 3F Documents & Archives (書類管理・企画書・マニュアル・スローガン)
  'doc-cabinet': {
    badge: '3F Documents & Archives',
    title: '📁 Fizz 書類管理・企画書一覧',
    isDocuments: true,
    docCategory: 'all'
  },
  'slogan-frame': {
    badge: '3F Philosophy',
    title: '🌟 サークル年間スローガン＆活動指針（Fizz 5つの心得）',
    isDocuments: true,
    docCategory: 'slogan'
  },
  'draft-desk': {
    badge: '3F Project Drafts',
    title: '✍️ Fizz企画書管理',
    isDocuments: true,
    docCategory: 'project'
  },
  'safety-binder': {
    badge: '3F Safety First',
    title: '🛡️ 安全管理・緊急時対応マニュアル（救急フロー）',
    isDocuments: true,
    docCategory: 'manual'
  },
  'treasury-safe': {
    badge: '3F Treasury & Finance',
    title: '💰 サークル会計・決算報告＆経費精算（出納台帳）',
    isAccounting: true
  },

  // 2F Schedule & Lounge (出欠管理特化フロア)
  'event-calendar': {
    badge: '2F Schedule & Attendance',
    title: '📅 活動カレンダー＆イベント出欠管理（メンバー専用）',
    isAttendance: true
  },
  'bookshelf': {
    badge: 'Coming Soon',
    title: '🚧 準備中',
    content: COMING_SOON_CONTENT
  },
  'sofa': {
    badge: '2F Meeting Notes',
    title: '🛋️ 議事録',
    isDocuments: true,
    docCategory: 'minutes'
  },

  // 1F Entrance & Lounge
  'sns-hub': {
    badge: '1F Official Social Media',
    title: '📱 Fizz 公式SNS＆コミュニティ一覧',
    content: `
      <div class="sns-hub-container">
        <div class="sns-intro-hero">
          <span class="sns-hero-badge">OFFICIAL SNS & MEDIA</span>
          <h3 class="sns-hero-title">Fizzの活動をSNSでリアルタイムにお届け！</h3>
          <p class="sns-hero-desc">
            子どもたちの弾ける笑顔やキャンプの様子、ボランティアの日常を日々発信しています。<br>
            フォロー・いいね・リポストでの応援をぜひお願いいたします✨
          </p>
        </div>

        <div class="sns-cards-grid">
          <!-- Instagram -->
          <div class="sns-card">
            <div class="sns-card-top">
              <div class="sns-icon-circle instagram">📷</div>
              <div class="sns-card-meta">
                <h4>Instagram</h4>
                <span class="sns-account-id">@fizz_kyotanabe</span>
              </div>
            </div>
            <p class="sns-card-desc">活動写真やハイライト動画、ストーリーズでイベント当日の臨場感をお届けしています！</p>
            <div class="sns-card-footer">
              <span class="sns-followers-count">フォロワー 1,840人</span>
              <a href="https://instagram.com/fizz_kyotanabe?obrf=MTZmazJwbjFrdjQzeQ==" target="_blank" rel="noopener noreferrer" class="sns-action-link">
                見に行く ↗
              </a>
            </div>
          </div>

          <!-- X / Twitter -->
          <div class="sns-card">
            <div class="sns-card-top">
              <div class="sns-icon-circle twitter">𝕏</div>
              <div class="sns-card-meta">
                <h4>X (旧Twitter)</h4>
                <span class="sns-account-id">@Fizz_Volunteer</span>
              </div>
            </div>
            <p class="sns-card-desc">準備中</p>
            <div class="sns-card-footer">
              <span class="sns-followers-count">フォロワー 2,120人</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="sns-action-link">
                チェック ↗
              </a>
            </div>
          </div>

          <!-- Official LINE -->
          <div class="sns-card">
            <div class="sns-card-top">
              <div class="sns-icon-circle line">💬</div>
              <div class="sns-card-meta">
                <h4>公式LINE</h4>
                <span class="sns-account-id">@fizz_clubhouse</span>
              </div>
            </div>
            <p class="sns-card-desc">準備中</p>
            <div class="sns-card-footer">
              <span class="sns-followers-count">友だち 890人</span>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" class="sns-action-link">
                友だち追加 ↗
              </a>
            </div>
          </div>

          <!-- YouTube -->
          <div class="sns-card">
            <div class="sns-card-top">
              <div class="sns-icon-circle youtube">▶️</div>
              <div class="sns-card-meta">
                <h4>YouTube</h4>
                <span class="sns-account-id">Fizzチャンネル</span>
              </div>
            </div>
            <p class="sns-card-desc">準備中</p>
            <div class="sns-card-footer">
              <span class="sns-followers-count">登録者 650人</span>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="sns-action-link">
                動画を見る ↗
              </a>
            </div>
          </div>

          <!-- note -->
          <div class="sns-card">
            <div class="sns-card-top">
              <div class="sns-icon-circle note">📝</div>
              <div class="sns-card-meta">
                <h4>note</h4>
                <span class="sns-account-id">Fizz公式 活動マガジン</span>
              </div>
            </div>
            <p class="sns-card-desc">準備中</p>
            <div class="sns-card-footer">
              <span class="sns-followers-count">記事 45本</span>
              <a href="https://note.com" target="_blank" rel="noopener noreferrer" class="sns-action-link">
                記事を読む ↗
              </a>
            </div>
          </div>
        </div>

        <div class="sns-campaign-box">
          <strong>📢 ハッシュタグ投稿キャンペーン実施中！</strong><br>
          「#Fizz」をつけてInstagramやXに投稿してくれた写真は、公式アカウントでピックアップ紹介させていただきます！
        </div>
      </div>
    `
  },
  'entrance-desk': {
    badge: '1F Member Login',
    title: '🔑 Fizz Member Login',
    isLogin: true
  },
  'noticeboard': {
    badge: '1F News & Events',
    title: '📌 最新のお知らせ・活動ニュース',
    isNewsBoard: true
  },

  'counter-display': {
    badge: '1F Achievements',
    title: '📊 Fizzの歩みと活動実績データ',
    content: `
      <h4 class="modal-section-title">数字でみるFizzのインパクト</h4>
      <p style="margin-bottom: 16px;">サークル設立から現在までに積み重ねてきた活動の数値実績です。</p>
      
      <div class="stats-grid" style="margin-bottom: 20px;">
        <div class="stat-item-card">
          <div class="stat-icon">🌟</div>
          <div class="stat-number-wrap"><span style="font-size: 1.6rem; font-weight: 800; color: var(--fizz-soda);">1,420</span><span class="stat-unit">名</span></div>
          <div class="stat-label">届けたこどもの笑顔</div>
        </div>
        <div class="stat-item-card">
          <div class="stat-icon">🎪</div>
          <div class="stat-number-wrap"><span style="font-size: 1.6rem; font-weight: 800; color: var(--fizz-mint-dark);">96</span><span class="stat-unit">回</span></div>
          <div class="stat-label">開催したイベント数</div>
        </div>
        <div class="stat-item-card">
          <div class="stat-icon">🎓</div>
          <div class="stat-number-wrap"><span style="font-size: 1.6rem; font-weight: 800; color: var(--fizz-coral);">24</span><span class="stat-unit">名</span></div>
          <div class="stat-label">現役所属ボランティア</div>
        </div>
      </div>
    `
  },
  'calendar': {
    badge: '1F Activity Calendar',
    title: '📅 Fizz 活動スケジュールカレンダー',
    isCalendar: true
  },

  // B1F Member Base & Roster (メンバー名簿フロア)
  'photo-gallery': {
    badge: 'B1F Photo Gallery',
    title: '📸 フォトギャラリー',
    isPhotoGallery: true
  },

  'member-roster': {
    badge: 'B1F Member Directory',
    title: '📇 Fizz メンバー名簿・プロフィール一覧',
    isRoster: true
  },
  'whiteboard': {
    badge: 'Coming Soon',
    title: '🚧 準備中',
    content: COMING_SOON_CONTENT
  },
};

export class ModalManager {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.backdrop = document.getElementById('clubhouseModal');
    this.badgeEl = document.getElementById('modalBadge');
    this.titleEl = document.getElementById('modalTitle');
    this.bodyEl = document.getElementById('modalBody');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.attendanceSystem = new AttendanceSystem(soundSystem);
    this.rosterSystem = new MemberRosterSystem(soundSystem);
    this.documentsManager = new DocumentsManager(soundSystem);
    this.accountingSystem = new AccountingSystem(soundSystem);
    this.rooftopShop = new RooftopShop(soundSystem);
    this.calendarCurrentDate = new Date();

    this.bindEvents();
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) {
          this.close();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop && this.backdrop.classList.contains('is-open')) {
        this.close();
      }
    });

    const roomItems = document.querySelectorAll('.room-item');
    roomItems.forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.getAttribute('data-item');
        if (itemId) {
          this.open(itemId);
        }
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const itemId = item.getAttribute('data-item');
          if (itemId) this.open(itemId);
        }
      });
    });

    // Quick access buttons
    const shopCards = document.querySelectorAll('.quick-card.shop, #quickShopBtn');
    shopCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const f4 = document.getElementById('4f');
        if (f4) f4.scrollIntoView({ behavior: 'smooth' });
        this.open('rooftop-shop');
      });
    });

    const docCards = document.querySelectorAll('.quick-card.docs, #quickDocsBtn');
    docCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const f3 = document.getElementById('3f');
        if (f3) f3.scrollIntoView({ behavior: 'smooth' });
        this.open('doc-cabinet');
      });
    });

    const scheduleCards = document.querySelectorAll('.quick-card.schedule, #quickScheduleBtn');
    scheduleCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const f2 = document.getElementById('2f');
        if (f2) f2.scrollIntoView({ behavior: 'smooth' });
        this.open('event-calendar');
      });
    });

    const rosterCards = document.querySelectorAll('.quick-card.roster, #quickRosterBtn');
    rosterCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const fb1 = document.getElementById('b1f');
        if (fb1) fb1.scrollIntoView({ behavior: 'smooth' });
        this.open('member-roster');
      });
    });

    const recruitCards = document.querySelectorAll('.quick-card.recruit, a[href="#recruit"]');
    recruitCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('joinpost');
      });
    });

    const contactCards = document.querySelectorAll('.quick-card.contact, a[href="#contact"]');
    contactCards.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('consultdesk');
      });
    });
  }

  open(itemId) {
    const data = MODAL_DATA[itemId];
    if (!data) return;

    if (this.sound) this.sound.playClick();

    this.badgeEl.textContent = data.badge;
    this.titleEl.textContent = data.title;

    if (data.isShop) {
      this.bodyEl.innerHTML = '<div id="shopContainer"></div>';
      const sContainer = document.getElementById('shopContainer');
      this.rooftopShop.renderModalUI(sContainer);
    } else if (data.isAccounting) {
      this.bodyEl.innerHTML = '<div id="accountingContainer"></div>';
      const aContainer = document.getElementById('accountingContainer');
      this.accountingSystem.renderModalUI(aContainer);
    } else if (data.isDocuments) {
      this.bodyEl.innerHTML = '<div id="documentsContainer"></div>';
      const dContainer = document.getElementById('documentsContainer');
      this.documentsManager.renderModalUI(dContainer, data.docCategory || 'all');
    } else if (data.isRoster) {
      this.bodyEl.innerHTML = '<div id="rosterContainer"></div>';
      const rContainer = document.getElementById('rosterContainer');
      this.rosterSystem.renderModalUI(rContainer);
    } else if (data.isCalendar) {
      this.bodyEl.innerHTML = '<div id="calendarModalContainer"></div>';
      const calContainer = document.getElementById('calendarModalContainer');
      this.renderCalendar(calContainer);
    } else if (data.isPhotoGallery) {
      this.bodyEl.innerHTML = '<div id="photoGalleryContainer"></div>';
      const galleryContainer = document.getElementById('photoGalleryContainer');
      this.renderPhotoGallery(galleryContainer);
    } else if (data.isAttendance) {
      this.bodyEl.innerHTML = '<div id="attendanceContainer"></div>';
      const attContainer = document.getElementById('attendanceContainer');
      this.attendanceSystem.renderModalUI(attContainer);

    } else if (data.isNewsBoard) {

      this.bodyEl.innerHTML =
        '<div id="newsBoardContainer"></div>';

      const newsContainer =
        document.getElementById('newsBoardContainer');

      this.renderNewsBoard(newsContainer);

    } else if (data.isLogin) {

      this.bodyEl.innerHTML =
        '<div id="loginContainer"></div>';

      const loginContainer =
        document.getElementById('loginContainer');

      this.renderLoginForm(loginContainer);

    } else if (data.isQuiz) {
      this.bodyEl.innerHTML = '<div id="quizContainer"></div>';
      const qContainer = document.getElementById('quizContainer');
      new QuizGame(qContainer, this.sound);
    } else if (data.isRecruitForm) {
      this.renderRecruitForm();
    } else if (data.isContactForm) {
      this.renderContactForm();
    } else {
      this.bodyEl.innerHTML = data.content;
    }

    this.backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  renderRecruitForm() {
    this.bodyEl.innerHTML = `
      <p style="margin-bottom: 16px; font-size: 0.92rem;">こどもたちと一緒に最高の思い出を作りませんか？<br>学年・学部不問！まずは活動の見学や説明会から気軽にご参加いただけます。</p>
      
      <form class="fizz-form" id="recruitForm">
        <div class="form-group">
          <label class="form-label">お名前 <span class="form-required-badge">必須</span></label>
          <input type="text" class="form-input" required placeholder="例: 桜井 葵">
        </div>
        <div class="form-group">
          <label class="form-label">大学名・学年 <span class="form-required-badge">必須</span></label>
          <input type="text" class="form-input" required placeholder="例: ○○大学 2年">
        </div>
        <div class="form-group">
          <label class="form-label">メールアドレス <span class="form-required-badge">必須</span></label>
          <input type="email" class="form-input" required placeholder="example@univ.ac.jp">
        </div>
        <button type="submit" class="form-submit-btn">
          ✨ ボランティア見学・応募を送信する
        </button>
      </form>

      <div class="form-success-box" id="formSuccessNotice">
        <div class="form-success-icon">🎉</div>
        <div class="form-success-title">エントリーありがとうございます！</div>
        <p class="form-success-text">Fizzの担当メンバーよりご連絡差し上げます！</p>
      </div>
    `;

    const form = document.getElementById('recruitForm');
    const notice = document.getElementById('formSuccessNotice');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.sound) this.sound.playFanfare();
      form.style.display = 'none';
      notice.classList.add('is-visible');
    });
  }

  renderContactForm() {
    this.bodyEl.innerHTML = `
      <p style="margin-bottom: 16px; font-size: 0.92rem;">児童館、自治体、PTA、子ども会、企業様からのイベント開催・出張ワークショップのご依頼はこちらから承ります。</p>
      
      <form class="fizz-form" id="contactForm">
        <div class="form-group">
          <label class="form-label">ご担当者様名 <span class="form-required-badge">必須</span></label>
          <input type="text" class="form-input" required placeholder="例: 山田 太郎">
        </div>
        <div class="form-group">
          <label class="form-label">貴団体名・施設名 <span class="form-required-badge">必須</span></label>
          <input type="text" class="form-input" required placeholder="例: ○○児童館">
        </div>
        <div class="form-group">
          <label class="form-label">ご相談内容 <span class="form-required-badge">必須</span></label>
          <textarea class="form-textarea" required placeholder="開催時期、規模、希望する企画内容をご記入ください"></textarea>
        </div>
        <button type="submit" class="form-submit-btn">
          📨 お問い合わせ・相談を送信する
        </button>
      </form>

      <div class="form-success-box" id="contactSuccessNotice">
        <div class="form-success-icon">💌</div>
        <div class="form-success-title">お問い合わせを受け付けました</div>
        <p class="form-success-text">Fizz運営事務局より折り返しご連絡いたします。</p>
      </div>
    `;

    const form = document.getElementById('contactForm');
    const notice = document.getElementById('contactSuccessNotice');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.sound) this.sound.playFanfare();
      form.style.display = 'none';
      notice.classList.add('is-visible');
    });
  }

  async renderNewsBoard(container) {

    const { data, error } = await supabaseClient
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      container.innerHTML =
        '<p>ニュースの読み込みに失敗しました。</p>';
      return;
    }

    container.innerHTML = '';

    data.forEach(item => {

      container.innerHTML += `
      <div style="
        background:#fff;
        border:2px solid var(--fizz-navy);
        border-radius:10px;
        padding:14px;
        margin-bottom:12px;
      ">
        <h4>${item.title}</h4>
        <p>${item.content}</p>
      </div>
    `;

    });

  }

  async renderLoginForm(container) {

    const currentName =
      localStorage.getItem('fizz_member_name');

    const currentId =
      localStorage.getItem('fizz_member_id');

    if (currentName) {

      container.innerHTML = `
    <div style="
      background:#fff;
      border:2px solid var(--fizz-navy);
      border-radius:12px;
      padding:18px;
      text-align:center;
    ">
      <h3>✅ ログイン済み</h3>

      <p>
        ようこそ<br>
        <strong>${currentName}</strong> さん
      </p>

      <p>
        背番号: ${currentId}
      </p>

      <button
        id="logoutBtn"
        style="
          padding:10px 18px;
          border:none;
          border-radius:8px;
          background:#EF476F;
          color:white;
          font-weight:bold;
          cursor:pointer;
        "
      >
        ログアウト
      </button>
    </div>
  `;

      document
        .getElementById('logoutBtn')
        .addEventListener('click', () => {

          localStorage.removeItem('fizz_member_id');
          localStorage.removeItem('fizz_member_name');

          alert('ログアウトしました');

          location.reload();

        });

      return;
    }

    container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;">
      <p>Fizzメンバー専用ログイン</p>

      <input
        type="text"
        id="memberIdInput"
        placeholder="members_idを入力"
        style="
          padding:12px;
          border:2px solid var(--fizz-navy);
          border-radius:8px;
        "
      >

      <button
        id="memberLoginBtn"
        style="
          padding:12px;
          background:var(--fizz-soda);
          color:white;
          border:none;
          border-radius:8px;
          font-weight:700;
          cursor:pointer;
        "
      >
        ログイン
      </button>

      <div id="loginResult"></div>
    </div>
  `;

    document
      .getElementById('memberLoginBtn')
      .addEventListener('click', async () => {

        const memberId =
          document
            .getElementById('memberIdInput')
            .value
            .trim();

        const { data, error } =
          await supabaseClient
            .from('members')
            .select('*')
            .eq('members_id', memberId)
            .single();

        const result =
          document.getElementById('loginResult');

        if (error || !data) {

          result.innerHTML =
            '<span style="color:red;">背番号が見つかりません</span>';

          return;

        }

        localStorage.setItem(
          'fizz_member_id',
          data.members_id
        );

        localStorage.setItem(
          'fizz_member_name',
          data.name
        );

        result.innerHTML =
          `<span style="color:green;">ようこそ ${data.name} さん</span>`;

        setTimeout(() => {
          location.reload();
        }, 1000);

      });

  }

  async renderCalendar(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="calendar-loading-state">
        <span>🫧 カレンダーとイベント情報を読み込み中...</span>
      </div>
    `;

    try {
      // Supabase の events テーブルから取得（event_date の昇順）
      const { data: events, error } = await supabaseClient
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Supabase events fetch error:', error);
      }

      this.currentCalendarEvents = events || [];
      this.drawCalendarUI(container);
    } catch (err) {
      console.error('Calendar load error:', err);
      container.innerHTML = `
        <div class="calendar-empty-state">
          <span>イベント情報の取得に失敗しました。再読み込みをお試しください。</span>
        </div>
      `;
    }
  }

  drawCalendarUI(container) {
    if (!container) return;

    const events = this.currentCalendarEvents || [];
    const date = this.calendarCurrentDate || new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed

    // 今日の年月日
    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // カレンダーの計算
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0: 日, 1: 月, ...
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // 日付ごとのイベント辞書 (YYYY-MM-DD -> [event, ...])
    const eventMap = {};
    events.forEach(evt => {
      if (!evt.event_date) return;
      // event_date が "2026-11-08" 形式または ISO 形式
      const dStr = evt.event_date.split('T')[0];
      if (!eventMap[dStr]) eventMap[dStr] = [];
      eventMap[dStr].push(evt);
    });

    // カレンダーグリッドのHTML作成
    let daysHtml = '';

    // 前月の日付セル
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = prevMonthLastDay - i;
      daysHtml += `
        <div class="calendar-day-cell other-month">
          <span class="day-number">${prevDate}</span>
        </div>
      `;
    }

    // 当月の日付セル
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const dateKey = `${year}-${mStr}-${dStr}`;

      const dayEvents = eventMap[dateKey] || [];
      const hasEvent = dayEvents.length > 0;
      const isToday = isThisMonth && day === todayDate;

      const dayOfWeek = new Date(year, month, day).getDay();
      let dayClass = 'calendar-day-cell';
      if (hasEvent) dayClass += ' has-event';
      if (isToday) dayClass += ' is-today';
      if (dayOfWeek === 0) dayClass += ' sunday';
      if (dayOfWeek === 6) dayClass += ' saturday';

      const eventBadges = dayEvents.map(e => `
        <span class="day-event-pill" title="${e.title}">
          ${e.title}
        </span>
      `).join('');

      daysHtml += `
        <div class="${dayClass}">
          <span class="day-number">${day}</span>
          ${eventBadges}
        </div>
      `;
    }

    // 次月の日付セル（7列揃え）
    const totalCells = firstDayIndex + lastDayOfMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      daysHtml += `
        <div class="calendar-day-cell other-month">
          <span class="day-number">${nextDay}</span>
        </div>
      `;
    }

    // イベント一覧カードの生成
    const upcomingEvents = events.filter(e => {
      if (!e.event_date) return false;
      const eDate = new Date(e.event_date.split('T')[0] + 'T00:00:00');
      const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return eDate >= startToday;
    });

    const eventsListHtml = events.length === 0 ? `
      <div class="calendar-empty-state">現在予定されているイベントはありません。</div>
    ` : `
      <div class="events-cards-grid">
        ${events.map(e => {
      const dateLabel = e.event_date ? e.event_date.split('T')[0].replace(/-/g, '/') : '';
      const timeLabel = (e.start_time && e.end_time)
        ? `${e.start_time}〜${e.end_time}`
        : (e.start_time ? `${e.start_time}〜` : '');

      return `
            <div class="event-summary-card">
              <div class="event-summary-card-header">
                <span class="event-summary-title">🎈 ${e.title}</span>
                <span class="event-summary-date-badge">🗓️ ${dateLabel}</span>
              </div>
              <div class="event-summary-meta">
                ${timeLabel ? `<span>⏰ ${timeLabel}</span>` : ''}
                ${e.location ? `<span>📍 ${e.location}</span>` : ''}
                ${e.required_staff ? `<span>👥 必要スタッフ: ${e.required_staff}名</span>` : ''}
              </div>
              ${e.description ? `<div class="event-summary-desc">${e.description}</div>` : ''}
            </div>
          `;
    }).join('')}
      </div>
    `;

    container.innerHTML = `
      <div class="fizz-calendar-container">
        <!-- Month Navigation Header -->
        <div class="fizz-calendar-header">
          <button type="button" class="calendar-nav-btn" id="calPrevMonthBtn">◀ 前月</button>
          <div class="calendar-current-title">${year}年 ${month + 1}月</div>
          <button type="button" class="calendar-nav-btn" id="calNextMonthBtn">次月 ▶</button>
        </div>

        <!-- Month Grid Board -->
        <div class="fizz-calendar-board">
          <div class="calendar-weekdays-grid">
            <span class="weekday-sun">SUN</span>
            <span class="weekday-normal">MON</span>
            <span class="weekday-normal">TUE</span>
            <span class="weekday-normal">WED</span>
            <span class="weekday-normal">THU</span>
            <span class="weekday-normal">FRI</span>
            <span class="weekday-sat">SAT</span>
          </div>
          <div class="calendar-days-grid">
            ${daysHtml}
          </div>
        </div>

        <!-- Events List Section -->
        <div class="fizz-events-list-section">
          <div class="events-list-heading">
            <span>📋 イベント一覧（活動予定）</span>
            <span class="events-list-count-badge">全 ${events.length} 件</span>
          </div>
          ${eventsListHtml}
        </div>
      </div>
    `;

    // 月送りイベントリスナー設定
    const prevBtn = container.querySelector('#calPrevMonthBtn');
    const nextBtn = container.querySelector('#calNextMonthBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.calendarCurrentDate = new Date(year, month - 1, 1);
        if (this.sound) this.sound.playClick();
        this.drawCalendarUI(container);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.calendarCurrentDate = new Date(year, month + 1, 1);
        if (this.sound) this.sound.playClick();
        this.drawCalendarUI(container);
      });
    }
  }

  async renderPhotoGallery(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="gallery-loading-state">
        <span>🫧 活動フォトを読み込み中...</span>
      </div>
    `;

    try {
      const { data: photos, error } = await supabaseClient
        .from('photos')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Supabase photos fetch error:', error);
      }

      if (!photos || photos.length === 0) {
        container.innerHTML = `
          <div class="gallery-empty-state">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">📷</div>
            <p style="font-weight: 800; color: var(--fizz-navy);">まだ写真が登録されていません</p>
            <p style="font-size: 0.85rem; color: var(--fizz-text-muted);">活動写真が追加されるとここに表示されます！</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="fizz-gallery-container">
          <div class="gallery-header-bar">
            <span>✨ Fizzの思い出アルバム</span>
            <span class="gallery-count-badge">全 ${photos.length} 枚</span>
          </div>

          <div class="gallery-grid">
            ${photos.map(p => {
        const uploadDate = p.uploaded_at ? new Date(p.uploaded_at).toLocaleDateString('ja-JP') : '';
        return `
                <div class="gallery-card" data-photo-id="${p.id}">
                  <div class="gallery-img-wrapper">
                    <img src="${p.image_url}" alt="${p.title || '活動写真'}" loading="lazy" />
                  </div>
                  <div class="gallery-card-content">
                    <div class="gallery-card-header">
                      <h4 class="gallery-card-title">${p.title || '無題の写真'}</h4>
                      ${uploadDate ? `<span class="gallery-card-date">🗓️ ${uploadDate}</span>` : ''}
                    </div>
                    ${p.description ? `<p class="gallery-card-desc">${p.description}</p>` : ''}
                  </div>
                </div>
              `;
      }).join('')}
          </div>
        </div>

        <!-- Photo Lightbox Modal Overlay -->
        <div id="galleryLightbox" class="gallery-lightbox" style="display: none;">
          <div class="lightbox-content">
            <button type="button" class="lightbox-close-btn" id="lightboxCloseBtn">✕</button>
            <img id="lightboxImg" src="" alt="拡大写真" />
            <div class="lightbox-caption">
              <h4 id="lightboxTitle"></h4>
              <p id="lightboxDesc"></p>
            </div>
          </div>
        </div>
      `;

      // Lightbox preview handlers
      const cards = container.querySelectorAll('.gallery-card');
      const lightbox = container.querySelector('#galleryLightbox');
      const lightboxImg = container.querySelector('#lightboxImg');
      const lightboxTitle = container.querySelector('#lightboxTitle');
      const lightboxDesc = container.querySelector('#lightboxDesc');
      const lightboxClose = container.querySelector('#lightboxCloseBtn');

      cards.forEach(card => {
        card.addEventListener('click', () => {
          const imgEl = card.querySelector('img');
          const titleEl = card.querySelector('.gallery-card-title');
          const descEl = card.querySelector('.gallery-card-desc');

          if (lightbox && imgEl) {
            lightboxImg.src = imgEl.src;
            lightboxTitle.textContent = titleEl ? titleEl.textContent : '';
            lightboxDesc.textContent = descEl ? descEl.textContent : '';
            lightbox.style.display = 'flex';
            if (this.sound) this.sound.playClick();
          }
        });
      });

      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target === lightboxClose) {
            lightbox.style.display = 'none';
          }
        });
      }
    } catch (err) {
      console.error('Gallery load error:', err);
      container.innerHTML = `
        <div class="gallery-empty-state">
          <p style="color: var(--fizz-coral); font-weight: 800;">写真の読み込みに失敗しました。</p>
        </div>
      `;
    }
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      if (this.sound) this.sound.playClick();
    }
  }
}
