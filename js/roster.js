/* ========================================================
   Fizz Clubhouse - Member Roster & Directory System
   B1F メンバー名簿・プロフィール検索・登録エンジン
   ======================================================== */

import { supabaseClient } from './supabase.js';

// Initial Members Dataset (仮データ：桜井葵のみ残存)
const DEFAULT_MEMBERS = [
  {
    id: 'mem-1',
    name: '桜井 葵',
    kana: 'さくらい あおい',
    nickname: 'あおちゃん',
    role: '仮データ',
    roleTag: 'exec', // exec, leader, staff, rookie
    university: '東都大学 文学部',
    grade: '3年',
    avatar: '👩‍🏫',
    avatarBg: '#E6FBF5',
    skills: ['自然体験キャンプ', '絵本読み聞かせ', '救急救命'],
    message: '仮データとして残してあります',
    contact: 'LINE: aoi_sakurai / 部室在室: 火・木放課後'
  }
];

export class MemberRosterSystem {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.storageKey = 'fizz_clubhouse_roster_v2';
    this.members = this.loadMembers();
    this.activeFilter = 'all'; // 'all', 'exec', 'leader', 'staff', 'rookie'
    this.searchQuery = '';
    this.fetchSupabaseMembers();
  }

  async fetchSupabaseMembers() {
    try {
      const { data, error } = await supabaseClient
        .from('members')
        .select('*');

      if (error) {
        console.error('Supabase fetch error in MemberRosterSystem:', error);
        return;
      }

      if (data && data.length > 0) {
        const mappedMembers = data.map(item => {
          let roleTag = 'staff';
          const roleLower = (item.role || '').toLowerCase();
          if (roleLower.includes('代表') || roleLower.includes('副代表')) {
            roleTag = 'exec';
          } else if (roleLower.includes('リーダー') || roleLower.includes('係長')) {
            roleTag = 'leader';
          } else if (item.join_year && item.join_year >= 2025) {
            roleTag = 'rookie';
          }

          const memberId = item.members_id || item.member_id || item.id;

          return {
            id: `supabase-${item.id}`,
            memberId: memberId,
            name: item.name,
            nickname: '',
            role: item.role || 'メンバー',
            roleTag: roleTag,
            university: item.university || 'Fizz サークル',
            grade: item.grade || (item.join_year ? `${item.join_year}年加入` : ''),
            avatar: item.avatar || (item.name?.includes('花子') ? '👩‍🎓' : '🧑‍🎓'),
            avatarBg: '#E6FBF5',
            skills: item.skills ? (Array.isArray(item.skills) ? item.skills : item.skills.split(/[,、]/)) : ['ボランティア活動'],
            message: item.profile || '',
            contact: item.contact || (item.created_at ? `登録: ${new Date(item.created_at).toLocaleDateString('ja-JP')}` : '')
          };
        });

        // Supabaseのメンバーを名簿の先頭にマージ（重複回避）
        const supabaseIds = new Set(mappedMembers.map(m => m.id));
        const remainingMembers = this.members.filter(m => !supabaseIds.has(m.id));
        this.members = [...mappedMembers, ...remainingMembers];

        // 画面が開いている場合は再描画
        const container = document.getElementById('rosterContainer');
        if (container) {
          this.renderModalUI(container);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch members from Supabase:', err);
    }
  }

  loadMembers() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load roster from localStorage', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
  }

  saveMembers() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.members));
    } catch (e) {
      console.warn('Failed to save roster', e);
    }
  }

  addMember(memberData) {
    this.members.unshift(memberData);
    this.saveMembers();
    if (this.sound) this.sound.playFanfare();
  }

  getFilteredMembers() {
    return this.members.filter(m => {
      // Role filter
      if (this.activeFilter !== 'all' && m.roleTag !== this.activeFilter) {
        return false;
      }
      // Search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        const matchName = m.name.toLowerCase().includes(query) || (m.kana && m.kana.includes(query));
        const matchUniv = m.university.toLowerCase().includes(query);
        const matchRole = m.role.toLowerCase().includes(query);
        const matchSkills = m.skills.some(s => s.toLowerCase().includes(query));
        return matchName || matchUniv || matchRole || matchSkills;
      }
      return true;
    });
  }

  renderModalUI(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="roster-container">
        <!-- Roster Header Toolbar: Search & Filters -->
        <div class="roster-toolbar">
          <div class="roster-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="rosterSearchInput" class="roster-search-input" placeholder="名前・役職・得意分野（キャンプ、実験など）で検索..." value="${this.searchQuery}">
          </div>

          <div class="roster-filter-tabs">
            <button type="button" class="roster-tab ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              全員 (${this.members.length})
            </button>
            <button type="button" class="roster-tab ${this.activeFilter === 'exec' ? 'active' : ''}" data-filter="exec">
              代表・副代表
            </button>
            <button type="button" class="roster-tab ${this.activeFilter === 'leader' ? 'active' : ''}" data-filter="leader">
              係リーダー
            </button>
            <button type="button" class="roster-tab ${this.activeFilter === 'staff' ? 'active' : ''}" data-filter="staff">
              スタッフ
            </button>
            <button type="button" class="roster-tab ${this.activeFilter === 'rookie' ? 'active' : ''}" data-filter="rookie">
              新入生
            </button>
          </div>

          <div class="roster-action-bar">
            <button type="button" id="btnOpenAddMember" class="btn-primary" style="font-size: 0.85rem; padding: 6px 14px;">
              ➕ 自分のプロフィールを名簿に登録する
            </button>
          </div>
        </div>

        <!-- Add Member Form Panel (Hidden by default) -->
        <div id="addMemberPanel" class="add-member-panel" style="display: none;">
          <h4 class="form-section-title">📝 メンバー名簿への新規登録・更新</h4>
          <form id="newMemberForm" class="fizz-form">
            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">氏名 <span class="form-required-badge">必須</span></label>
                <input type="text" id="newMemName" class="form-input" required placeholder="例: 桜井 葵">
              </div>
              <div class="form-group">
                <label class="form-label">ニックネーム（呼び名）</label>
                <input type="text" id="newMemNickname" class="form-input" placeholder="例: あおちゃん">
              </div>
            </div>

            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">大学・学部 <span class="form-required-badge">必須</span></label>
                <input type="text" id="newMemUniv" class="form-input" required placeholder="例: ○○大学 文学部">
              </div>
              <div class="form-group">
                <label class="form-label">学年 <span class="form-required-badge">必須</span></label>
                <select id="newMemGrade" class="form-select">
                  <option value="1年">1年（新歓メンバー）</option>
                  <option value="2年" selected>2年</option>
                  <option value="3年">3年</option>
                  <option value="4年">4年</option>
                  <option value="院生・OBOG">院生・OBOG</option>
                </select>
              </div>
            </div>

            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">役職・担当</label>
                <input type="text" id="newMemRole" class="form-input" placeholder="例: 理科実験担当 / 広報スタッフ">
              </div>
              <div class="form-group">
                <label class="form-label">アバター絵文字</label>
                <select id="newMemAvatar" class="form-select">
                  <option value="👩‍🎓">👩‍🎓 女子学生</option>
                  <option value="👨‍🎓">👨‍🎓 男子学生</option>
                  <option value="👩‍🏫">👩‍🏫 先生風</option>
                  <option value="👨‍🔬">👨‍🔬 科学者風</option>
                  <option value="👩‍🎨">👩‍🎨 アーティスト風</option>
                  <option value="🧗‍♂️">🧗‍♂️ アウトドア風</option>
                  <option value="🧸">🧸 マスコット風</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">得意なあそび・活動（カンマ区切り）</label>
              <input type="text" id="newMemSkills" class="form-input" placeholder="例: スライム実験, 絵本読み聞かせ, キャンプ火起こし">
            </div>

            <div class="form-group">
              <label class="form-label">ひと言メッセージ</label>
              <textarea id="newMemMessage" class="form-textarea" placeholder="こどもたちへの意気込みやサークルメンバーへの自己紹介をどうぞ！"></textarea>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button type="button" id="btnCancelAddMember" class="btn-secondary">キャンセル</button>
              <button type="submit" class="btn-primary">✨ 名簿に登録する</button>
            </div>
          </form>
        </div>

        <!-- Members Grid List -->
        <div class="roster-grid" id="rosterGrid">
          <!-- Populated by renderGrid -->
        </div>
      </div>
    `;

    this.bindEvents(container);
    this.renderGrid(container);
  }

  renderGrid(container) {
    const gridEl = container.querySelector('#rosterGrid');
    if (!gridEl) return;

    const filtered = this.getFilteredMembers();

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="roster-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--fizz-navy);">該当するメンバーが見つかりませんでした</div>
          <p style="font-size: 0.85rem; color: var(--fizz-text-muted);">キーワードを変えて検索するか、フィルター条件をリセットしてみてください。</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(m => `
      <div class="member-card">
        ${m.memberId ? `<span class="member-id-badge">ID: ${m.memberId}</span>` : ''}
        <div class="member-card-header">
          <div class="member-avatar-box" style="background: ${m.avatarBg || '#FFF8E7'};">
            ${m.avatar || '🧑‍🎓'}
          </div>
          <div class="member-title-info">
            <span class="member-role-badge ${m.roleTag || 'staff'}">${m.role}</span>
            <h4 class="member-name">
              ${m.name}
              ${m.nickname ? `<span class="member-nickname">(${m.nickname})</span>` : ''}
            </h4>
            <div class="member-univ-grade">
              <span>🏫 ${m.university}</span>
              <span class="member-grade-pill">${m.grade}</span>
            </div>
          </div>
        </div>

        <div class="member-skills-list">
          ${(m.skills || []).map(s => `<span class="member-skill-tag">🏷️ ${s}</span>`).join('')}
        </div>

        <div class="member-message-box">
          <p class="member-message-text">💬「${m.message}」</p>
        </div>

        ${m.contact ? `
          <div class="member-contact-footer">
            <span>📮 ${m.contact}</span>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  bindEvents(container) {
    // Search input
    const searchInput = container.querySelector('#rosterSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderGrid(container);
      });
    }

    // Filter tabs
    const tabs = container.querySelectorAll('.roster-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        this.activeFilter = filter;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (this.sound) this.sound.playClick();
        this.renderGrid(container);
      });
    });

    // Add Member form toggle
    const addBtn = container.querySelector('#btnOpenAddMember');
    const panel = container.querySelector('#addMemberPanel');
    const cancelBtn = container.querySelector('#btnCancelAddMember');
    const form = container.querySelector('#newMemberForm');

    if (addBtn && panel) {
      addBtn.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        if (this.sound) this.sound.playClick();
      });
    }

    if (cancelBtn && panel) {
      cancelBtn.addEventListener('click', () => {
        panel.style.display = 'none';
        if (this.sound) this.sound.playClick();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = container.querySelector('#newMemName').value.trim();
        const nickname = container.querySelector('#newMemNickname').value.trim();
        const university = container.querySelector('#newMemUniv').value.trim();
        const grade = container.querySelector('#newMemGrade').value;
        const role = container.querySelector('#newMemRole').value.trim() || 'ボランティアスタッフ';
        const avatar = container.querySelector('#newMemAvatar').value;
        const skillsRaw = container.querySelector('#newMemSkills').value.trim();
        const message = container.querySelector('#newMemMessage').value.trim() || 'こどもたちと一緒に楽しく活動します！';

        const skills = skillsRaw ? skillsRaw.split(/[,、]/).map(s => s.trim()).filter(Boolean) : ['こどもとあそぶこと'];

        const newMem = {
          id: 'mem-' + Date.now(),
          name,
          nickname,
          university,
          grade,
          role,
          roleTag: grade.includes('1年') ? 'rookie' : 'staff',
          avatar,
          avatarBg: '#E6FBF5',
          skills,
          message,
          contact: `登録日: ${new Date().toLocaleDateString('ja-JP')}`
        };

        this.addMember(newMem);
        panel.style.display = 'none';
        form.reset();
        this.renderGrid(container);
      });
    }
  }
}
