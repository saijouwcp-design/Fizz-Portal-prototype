/* ========================================================
   Fizz Clubhouse - Documents & Resources Management System
   3F 書類管理・企画書・マニュアル・スローガンシステム
   ======================================================== */

import { supabaseClient } from './supabase.js';

export class DocumentsManager {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.documents = [];
    this.activeCategory = 'all'; // 'all', 'project', 'finance', 'manual', 'template', 'slogan'
    this.searchQuery = '';
    this.isLoading = false;
  }

  // Supabase の documents テーブルから動的に取得
  async fetchDocuments() {
    this.isLoading = true;
    try {
      const { data, error } = await supabaseClient
        .from('documents')
        .select('*')
        .order('uploaded_at', {
          ascending: false
        });

      if (error) {
        console.error('Supabase documents fetch error:', error);
        this.documents = [];
      } else {
        const categoryMap = {
          'project': '企画書',
          'minutes': '議事録',
          'finance': '決算・会計',
          'manual': '活動マニュアル',
          'template': '申請・テンプレート',
          'slogan': 'スローガン・理念'
        };

        this.documents = (data || []).map(item => {
          const cat = item.category || 'project';
          const uploadDate = item.uploaded_at ? new Date(item.uploaded_at).toLocaleDateString('ja-JP') : '';
          const isPdf = item.file_url ? item.file_url.toLowerCase().endsWith('.pdf') : false;

          return {
            id: String(item.id),
            category: cat,
            categoryLabel: categoryMap[cat] || '書類',
            title: item.title || '無題の書類',
            fileUrl: item.file_url || '',
            isPdf: isPdf,
            updatedAt: uploadDate,
            badge: item.badge || '公開中',
            badgeClass: 'success',
            summary: item.summary || `${categoryMap[cat] || '書類'}のファイルです。クリックして閲覧またはダウンロードできます。`
          };
        });
      }
    } catch (err) {
      console.error('Documents fetch unexpected error:', err);
      this.documents = [];
    } finally {
      this.isLoading = false;
    }
  }

  getFilteredDocs() {
    return this.documents.filter(doc => {
      if (this.activeCategory !== 'all' && doc.category !== this.activeCategory) {
        return false;
      }
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        const matchTitle = doc.title.toLowerCase().includes(query);
        const matchSummary = doc.summary.toLowerCase().includes(query);
        return matchTitle || matchSummary;
      }
      return true;
    });
  }

  async renderModalUI(container, initialCategory = null) {
    if (!container) return;
    if (initialCategory) {
      this.activeCategory = initialCategory;
    }

    container.innerHTML = `
      <div class="documents-manager-container">
        <!-- Toolbar & Filter Tabs -->
        <div class="doc-toolbar">
          <div class="doc-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="docSearchInput" class="doc-search-input" placeholder="企画書名、マニュアル、キーワードで検索..." value="${this.searchQuery}">
          </div>

          <div class="doc-category-tabs">
            <button type="button" class="doc-tab ${this.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
              全書類 (<span id="docCountAll">...</span>)
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'project' ? 'active' : ''}" data-cat="project">
              📑 企画書
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'minutes' ? 'active' : ''}" data-cat="minutes">
              🛋️ 議事録
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'finance' ? 'active' : ''}" data-cat="finance">
              💰 決算・会計
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'manual' ? 'active' : ''}" data-cat="manual">
              🛡️ 活動マニュアル
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'template' ? 'active' : ''}" data-cat="template">
              📄 申請・テンプレート
            </button>
            <button type="button" class="doc-tab ${this.activeCategory === 'slogan' ? 'active' : ''}" data-cat="slogan">
              🌟 スローガン・理念
            </button>
          </div>
        </div>

        <!-- Document Cards Grid -->
        <div class="documents-grid" id="documentsGrid">
          <div class="doc-loading-state">
            <span>🫧 Supabaseから書類一覧を読み込み中...</span>
          </div>
        </div>

        <!-- Single Document Reader Modal View (Injected dynamically) -->
        <div id="docReaderView" class="doc-reader-view" style="display: none;"></div>
      </div>
    `;

    this.bindEvents(container);

    // Supabaseからデータを非同期取得して再描画
    await this.fetchDocuments();
    const countEl = container.querySelector('#docCountAll');
    if (countEl) countEl.textContent = this.documents.length;
    this.renderGrid(container);
  }

  renderGrid(container) {
    const gridEl = container.querySelector('#documentsGrid');
    if (!gridEl) return;

    if (this.isLoading) {
      gridEl.innerHTML = `
        <div class="doc-loading-state">
          <span>🫧 Supabaseから書類一覧を読み込み中...</span>
        </div>
      `;
      return;
    }

    const filtered = this.getFilteredDocs();

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="doc-empty-state">
          <div style="font-size:2.5rem; margin-bottom:8px;">📁</div>
          <div style="font-size:1.1rem; font-weight:800; color:var(--fizz-navy);">該当する書類が見つかりませんでした</div>
          <p style="font-size:0.85rem; color:var(--fizz-text-muted);">検索語を変えるか、カテゴリフィルターをリセットしてください。</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(doc => `
      <div class="doc-card" data-doc-id="${doc.id}">
        <div class="doc-card-top">
          <span class="doc-cat-tag ${doc.category}">${doc.categoryLabel}</span>
          <span class="doc-badge ${doc.badgeClass || 'info'}">${doc.badge || 'DOC'}</span>
        </div>
        <h4 class="doc-title">${doc.title}</h4>
        <p class="doc-summary">${doc.summary}</p>
        <div class="doc-meta-footer">
          <span>📅 ${doc.updatedAt}</span>
        </div>
        <div class="doc-card-action">
          <button type="button" class="doc-read-btn">ファイルを開く ➔</button>
        </div>
      </div>
    `).join('');

    // Bind card click
    gridEl.querySelectorAll('.doc-card').forEach(card => {
      card.addEventListener('click', () => {
        const docId = card.getAttribute('data-doc-id');
        this.openDocReader(docId, container);
      });
    });
  }

  openDocReader(docId, container) {
    const doc = this.documents.find(d => d.id === docId);
    if (!doc) return;

    if (this.sound) this.sound.playClick();

    // file_url がある場合
    if (doc.fileUrl) {
      const isPdf = doc.isPdf;
      const readerView = container.querySelector('#docReaderView');
      const grid = container.querySelector('#documentsGrid');
      const toolbar = container.querySelector('.doc-toolbar');

      if (!readerView) {
        window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      toolbar.style.display = 'none';
      grid.style.display = 'none';
      readerView.style.display = 'block';

      readerView.innerHTML = `
        <div class="reader-header-bar">
          <button type="button" id="btnBackToDocs" class="btn-secondary" style="font-size:0.85rem;">
            ← 書類一覧へもどる
          </button>
          <div class="reader-meta-chips">
            <span class="doc-cat-tag ${doc.category}">${doc.categoryLabel}</span>
            <span style="font-size:0.8rem; color:var(--fizz-text-muted);">更新日: ${doc.updatedAt}</span>
          </div>
        </div>

        <div class="reader-paper">
          <h2 class="reader-title">${doc.title}</h2>
          <div class="reader-action-toolbar" style="margin: 14px 0; display:flex; gap:10px; flex-wrap:wrap;">
            <a href="${doc.fileUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration:none;">
              📥 別タブでファイルを開く / ダウンロード
            </a>
          </div>
          <hr class="reader-divider">
          <div class="reader-body">
            ${isPdf ? `
              <div class="pdf-embed-wrapper" style="width: 100%; height: 60vh; border: 2px solid var(--fizz-navy); border-radius: 8px; overflow: hidden;">
                <iframe src="${doc.fileUrl}" style="width: 100%; height: 100%; border: none;"></iframe>
              </div>
            ` : `
              <div class="doc-file-info-box" style="padding: 24px; text-align: center; background: var(--fizz-bg-cream); border: 2px dashed var(--fizz-navy); border-radius: 12px;">
                <div style="font-size: 3rem; margin-bottom: 8px;">📄</div>
                <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--fizz-navy); margin-bottom: 8px;">${doc.title}</h4>
                <p style="font-size: 0.9rem; color: var(--fizz-text-muted); margin-bottom: 16px;">
                  Office文書（Word/Excel等）や画像・PDFファイルです。<br>上のボタンからダウンロードまたはブラウザで直接閲覧できます。
                </p>
                <a href="${doc.fileUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; text-decoration:none;">
                  🔗 ファイルを直接開く
                </a>
              </div>
            `}
          </div>
        </div>
      `;

      container.querySelector('#btnBackToDocs').addEventListener('click', () => {
        if (this.sound) this.sound.playClick();
        readerView.style.display = 'none';
        toolbar.style.display = 'flex';
        grid.style.display = 'grid';
      });
      return;
    }

    // URLがない場合
    alert('指定されたファイルのURLが見つかりませんでした。');
  }

  bindEvents(container) {
    // Search
    const searchInput = container.querySelector('#docSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderGrid(container);
      });
    }

    // Tabs
    const tabs = container.querySelectorAll('.doc-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-cat');
        this.activeCategory = cat;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (this.sound) this.sound.playClick();
        this.renderGrid(container);
      });
    });
  }
}
