/* ========================================================
   Fizz Clubhouse - Accounting & Financial Reports System
   3F 会計・決算報告・出納台帳・経費立替精算システム
   ======================================================== */

const DEFAULT_FINANCE_DATA = {
  // 2026 Fiscal Year (Current / In Progress)
  '2026': {
    fiscalYear: '2026',
    title: '2026年度 予算・活動出納（進行中）',
    status: 'in_progress', // 'in_progress' or 'settled'
    budgetTotal: 520000,
    incomeCategories: [
      { name: '前年度繰越金', amount: 125000, color: '#118AB2' },
      { name: 'サークル会費', amount: 96000, color: '#06D6A0' },
      { name: '大学学生活動助成金', amount: 120000, color: '#FFD166' },
      { name: '市民活動推進補助金', amount: 44000, color: '#8338EC' }
    ],
    expenseCategories: [
      { name: 'ボランティア行事保険料', amount: 48000, color: '#EF476F' },
      { name: '自然体験・キャンプ施設費', amount: 62000, color: '#FF5400' },
      { name: '工作・理科実験材料費', amount: 46900, color: '#06D6A0' },
      { name: '救急備品・安全キット補充', amount: 22000, color: '#118AB2' },
      { name: '広報・チラシ印刷・通信費', amount: 16300, color: '#8338EC' },
      { name: '予備費・その他雑費', amount: 19600, color: '#94A3B8' }
    ],
    transactions: [
      {
        id: 'tx-26-006',
        date: '2026/10/22',
        type: 'expense',
        category: '工作・理科実験材料費',
        description: 'ハロウィン工作用 ミニカボチャバケツ＆LEDライト30セット',
        amount: 8400,
        claimant: '加藤優花 (企画係)',
        status: 'verified', // 'verified' or 'pending'
        receiptNote: '領収書受領済（ダイソー・東急ハンズ）'
      },
      {
        id: 'tx-26-005',
        date: '2026/10/15',
        type: 'income',
        category: '市民活動推進補助金',
        description: '令和8年度 子ども育成支援助成金の第2期交付',
        amount: 44000,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: '交付決定通知書・振込明細確認済'
      },
      {
        id: 'tx-26-004',
        date: '2026/10/05',
        type: 'expense',
        category: '救急備品・安全キット補充',
        description: '秋活動用 携帯酸素缶・冷却パック・滅菌ガーゼ・AED予備パッド',
        amount: 14200,
        claimant: '佐藤健太 (安全責任者)',
        status: 'verified',
        receiptNote: 'マツモトキヨシ領収書受領済'
      },
      {
        id: 'tx-26-003',
        date: '2026/09/20',
        type: 'expense',
        category: 'ボランティア行事保険料',
        description: '後期加入メンバー32名分 ボランティア活動保険（プランB）一括更新',
        amount: 48000,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: '社会福祉協議会 保険加入証受領済'
      },
      {
        id: 'tx-26-002',
        date: '2026/09/01',
        type: 'income',
        category: 'サークル会費',
        description: '2026年度 後期会費（32名 × 3,000円）',
        amount: 96000,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: 'サークル専用口座入金台帳記帳済'
      },
      {
        id: 'tx-26-001',
        date: '2026/04/01',
        type: 'income',
        category: '前年度繰越金',
        description: '2025年度 決算剰余金からの繰越受入',
        amount: 125000,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: '総会承認決算書記載済'
      }
    ]
  },

  // 2025 Fiscal Year (Settled & Audited)
  '2025': {
    fiscalYear: '2025',
    title: '2025年度 年間決算報告書（確定・総会承認済）',
    status: 'settled',
    budgetTotal: 480000,
    auditText: '「本決算報告書および関係帳簿類を精査した結果、すべての収支が適正に処理されていることを認めます。」（会計監査役：中村大樹 / 2026年3月定期総会にて満場一致で可決承認）',
    incomeCategories: [
      { name: '前年度繰越金', amount: 82000, color: '#118AB2' },
      { name: 'サークル会費', amount: 90000, color: '#06D6A0' },
      { name: '大学学生活動助成金', amount: 150000, color: '#FFD166' },
      { name: 'イベント参加費', amount: 164000, color: '#EF476F' }
    ],
    expenseCategories: [
      { name: 'ボランティア保険料', amount: 45000, color: '#EF476F' },
      { name: 'サマーキャンプ施設・バス代', amount: 158000, color: '#FF5400' },
      { name: '実験・工作材料費', amount: 64000, color: '#06D6A0' },
      { name: '救急安全備品費', amount: 18000, color: '#118AB2' },
      { name: '広報印刷・チラシ配付', amount: 26000, color: '#8338EC' },
      { name: '総会・定例ミーティング費', amount: 50000, color: '#94A3B8' }
    ],
    transactions: [
      {
        id: 'tx-25-010',
        date: '2026/03/15',
        type: 'expense',
        category: '総会・定例ミーティング費',
        description: '年度末総会資料印刷・公民館会議室使用料',
        amount: 8500,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: '領収書照合済'
      },
      {
        id: 'tx-25-009',
        date: '2026/01/20',
        type: 'expense',
        category: '実験・工作材料費',
        description: '冬休み科学実験フェスタ試薬・スライム原料',
        amount: 18200,
        claimant: '加藤優花 (企画)',
        status: 'verified',
        receiptNote: '領収書照合済'
      },
      {
        id: 'tx-25-008',
        date: '2025/11/10',
        type: 'income',
        category: 'イベント参加費',
        description: '秋の星空観測ナイト参加費（こども35名分）',
        amount: 52500,
        claimant: '伊藤美咲 (会計)',
        status: 'verified',
        receiptNote: '受領領収書控照合済'
      },
      {
        id: 'tx-25-007',
        date: '2025/08/18',
        type: 'expense',
        category: 'サマーキャンプ施設・バス代',
        description: '大自然サマーキャンプ 送迎マイクロバスチャーター費',
        amount: 110000,
        claimant: '山田拓海 (野外係)',
        status: 'verified',
        receiptNote: 'バス会社請求書および銀行振込受取書'
      }
    ]
  },

  // 2024 Fiscal Year (Archive)
  '2024': {
    fiscalYear: '2024',
    title: '2024年度 年間決算報告書（アーカイブ）',
    status: 'settled',
    budgetTotal: 420000,
    auditText: '2025年3月定期総会にて承認済（監査役：加藤健）',
    incomeCategories: [
      { name: '前年度繰越金', amount: 50000, color: '#118AB2' },
      { name: 'サークル会費', amount: 84000, color: '#06D6A0' },
      { name: '大学学生活動助成金', amount: 140000, color: '#FFD166' },
      { name: 'イベント参加費', amount: 136000, color: '#EF476F' }
    ],
    expenseCategories: [
      { name: 'ボランティア保険料', amount: 42000, color: '#EF476F' },
      { name: 'サマーキャンプ施設費', amount: 142000, color: '#FF5400' },
      { name: '実験・工作材料費', amount: 58000, color: '#06D6A0' },
      { name: '広報・備品費', amount: 86000, color: '#8338EC' }
    ],
    transactions: [
      {
        id: 'tx-24-001',
        date: '2025/03/10',
        type: 'expense',
        category: '広報・備品費',
        description: '年度末備品整理・収納ケース購入',
        amount: 6200,
        claimant: '会計',
        status: 'verified',
        receiptNote: '領収書保管済'
      }
    ]
  }
};

export class AccountingSystem {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.storageKey = 'fizz_clubhouse_accounting_v1';
    this.activeYear = '2026';
    this.filterType = 'all'; // 'all', 'income', 'expense', 'pending'
    this.financeData = this.loadData();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load accounting data', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_FINANCE_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.financeData));
    } catch (e) {
      console.warn('Failed to save accounting data', e);
    }
  }

  // Calculate totals for active year
  getYearSummary(yearKey) {
    const data = this.financeData[yearKey];
    if (!data) return { totalIncome: 0, totalExpense: 0, balance: 0, rate: 0 };

    const totalIncome = data.incomeCategories.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = data.expenseCategories.reduce((acc, cur) => acc + cur.amount, 0);
    const balance = totalIncome - totalExpense;
    const rate = data.budgetTotal > 0 ? Math.min(100, Math.round((totalExpense / data.budgetTotal) * 100)) : 0;

    return { totalIncome, totalExpense, balance, rate, budgetTotal: data.budgetTotal };
  }

  // Add new expense claim or income transaction
  addTransaction(yearKey, transaction) {
    const yearData = this.financeData[yearKey];
    if (!yearData) return;

    yearData.transactions.unshift(transaction);

    // Update expense or income category amount
    if (transaction.type === 'expense') {
      const cat = yearData.expenseCategories.find(c => c.name === transaction.category);
      if (cat) {
        cat.amount += transaction.amount;
      } else {
        yearData.expenseCategories.push({
          name: transaction.category,
          amount: transaction.amount,
          color: '#94A3B8'
        });
      }
    } else {
      const cat = yearData.incomeCategories.find(c => c.name === transaction.category);
      if (cat) {
        cat.amount += transaction.amount;
      } else {
        yearData.incomeCategories.push({
          name: transaction.category,
          amount: transaction.amount,
          color: '#06D6A0'
        });
      }
    }

    this.saveData();

    if (this.sound) {
      if (this.sound.playCoin) this.sound.playCoin();
      else if (this.sound.playFanfare) this.sound.playFanfare();
    }
  }

  renderModalUI(container) {
    if (!container) return;

    const data = this.financeData[this.activeYear];
    const summary = this.getYearSummary(this.activeYear);

    // Format numbers
    const formatYen = (num) => '¥' + Number(num).toLocaleString('ja-JP');

    container.innerHTML = `
      <div class="accounting-container">
        <!-- Top Toolbar & Year Switcher -->
        <div class="acc-top-bar">
          <div class="acc-title-group">
            <span class="acc-icon-badge">💰</span>
            <div class="acc-title-text">
              <h3>${data.title}</h3>
              <p>こども特化ボランティアサークルFizz 会計・決算管理台帳</p>
            </div>
          </div>

          <div class="acc-year-tabs">
            <button type="button" class="acc-year-btn ${this.activeYear === '2026' ? 'active' : ''}" data-year="2026">
              2026年度 (予算・執行)
            </button>
            <button type="button" class="acc-year-btn ${this.activeYear === '2025' ? 'active' : ''}" data-year="2025">
              2025年度 (確定決算)
            </button>
            <button type="button" class="acc-year-btn ${this.activeYear === '2024' ? 'active' : ''}" data-year="2024">
              2024年度 (過去)
            </button>
          </div>
        </div>

        <!-- Audit Approval Banner for settled years -->
        ${data.status === 'settled' && data.auditText ? `
          <div class="acc-audit-banner">
            <span class="acc-audit-badge">監査済・承認完了</span>
            <div>${data.auditText}</div>
          </div>
        ` : ''}

        <!-- KPI Summary Cards -->
        <div class="acc-kpi-grid">
          <div class="acc-kpi-card income">
            <div class="acc-kpi-label">総収入実績 (入金累計)</div>
            <div class="acc-kpi-value">${formatYen(summary.totalIncome)}</div>
            <div class="acc-kpi-sub">繰越・助成金・会費含む</div>
          </div>

          <div class="acc-kpi-card expense">
            <div class="acc-kpi-label">総支出実績 (執行累計)</div>
            <div class="acc-kpi-value" style="color: #DC2626;">${formatYen(summary.totalExpense)}</div>
            <div class="acc-kpi-sub">予算枠: ${formatYen(summary.budgetTotal)}</div>
          </div>

          <div class="acc-kpi-card balance">
            <div class="acc-kpi-label">${data.status === 'settled' ? '次年度繰越金' : '現在手元残高'}</div>
            <div class="acc-kpi-value" style="color: #0369A1;">${formatYen(summary.balance)}</div>
            <div class="acc-kpi-sub">${summary.balance >= 0 ? '健全黒字運営中' : '注意：要予算調整'}</div>
          </div>

          <div class="acc-kpi-card rate">
            <div class="acc-kpi-label">予算執行率</div>
            <div class="acc-kpi-value" style="color: #D97706;">${summary.rate}%</div>
            <div class="acc-kpi-sub">${this.activeYear === '2026' ? '後期活動進行中' : '執行完了'}</div>
          </div>
        </div>

        <!-- Budget Progress Meter -->
        <div class="acc-budget-meter">
          <div class="acc-meter-header">
            <span>📊 予算執行プログレス (${formatYen(summary.totalExpense)} / ${formatYen(summary.budgetTotal)})</span>
            <span>${summary.rate}% 消化</span>
          </div>
          <div class="acc-meter-track">
            <div class="acc-meter-fill" style="width: ${summary.rate}%;"></div>
          </div>
        </div>

        <!-- Breakdown Section (Income vs Expense) -->
        <div class="acc-breakdown-section">
          <!-- Income Breakdown -->
          <div class="acc-breakdown-card">
            <div class="acc-breakdown-title">
              <span>📥 収入内訳 (全${data.incomeCategories.length}科目)</span>
              <span>${formatYen(summary.totalIncome)}</span>
            </div>
            <div class="acc-breakdown-list">
              ${data.incomeCategories.map(cat => {
                const pct = summary.totalIncome > 0 ? Math.round((cat.amount / summary.totalIncome) * 100) : 0;
                return `
                  <div class="acc-breakdown-row">
                    <span class="acc-item-tag">
                      <span class="acc-color-dot" style="background: ${cat.color};"></span>
                      ${cat.name}
                    </span>
                    <div class="acc-bar-wrapper">
                      <div class="acc-bar-mini" style="width: ${pct}%; background: ${cat.color};"></div>
                    </div>
                    <span class="acc-item-amount">${formatYen(cat.amount)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Expense Breakdown -->
          <div class="acc-breakdown-card">
            <div class="acc-breakdown-title">
              <span>📤 支出内訳 (全${data.expenseCategories.length}科目)</span>
              <span>${formatYen(summary.totalExpense)}</span>
            </div>
            <div class="acc-breakdown-list">
              ${data.expenseCategories.map(cat => {
                const pct = summary.totalExpense > 0 ? Math.round((cat.amount / summary.totalExpense) * 100) : 0;
                return `
                  <div class="acc-breakdown-row">
                    <span class="acc-item-tag">
                      <span class="acc-color-dot" style="background: ${cat.color};"></span>
                      ${cat.name}
                    </span>
                    <div class="acc-bar-wrapper">
                      <div class="acc-bar-mini" style="width: ${pct}%; background: ${cat.color};"></div>
                    </div>
                    <span class="acc-item-amount">${formatYen(cat.amount)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Action Bar: Filters & Claim Form Button -->
        <div class="acc-action-bar">
          <div class="acc-filter-pills">
            <button type="button" class="acc-pill-btn ${this.filterType === 'all' ? 'active' : ''}" data-filter="all">
              全明細 (${data.transactions.length})
            </button>
            <button type="button" class="acc-pill-btn ${this.filterType === 'expense' ? 'active' : ''}" data-filter="expense">
              支出のみ
            </button>
            <button type="button" class="acc-pill-btn ${this.filterType === 'income' ? 'active' : ''}" data-filter="income">
              収入のみ
            </button>
            <button type="button" class="acc-pill-btn ${this.filterType === 'pending' ? 'active' : ''}" data-filter="pending">
              ⏳ 精算中のみ
            </button>
          </div>

          <div style="display: flex; gap: 8px;">
            <button type="button" id="btnToggleClaimForm" class="btn-primary" style="font-size:0.85rem; padding: 6px 14px;">
              ➕ 領収書・経費の立替精算申請
            </button>
            <button type="button" id="btnPrintLedger" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px;" title="印刷プレビュー">
              🖨️ 印刷
            </button>
          </div>
        </div>

        <!-- Expense Claim / Income Entry Form (Collapsible) -->
        <div id="claimFormPanel" class="acc-form-panel" style="display: none;">
          <h4 class="form-section-title">✍️ 経費精算申請 / 新規収支の登録</h4>
          <p style="font-size:0.82rem; color:var(--fizz-text-muted); margin-bottom:12px;">
            活動で購入した工作材料や備品の領収書（レシート）を精算申請します。申請後、会計（伊藤）が原本を確認し口座精算を行います。
          </p>

          <form id="newClaimForm" class="fizz-form">
            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">収支タイプ <span class="form-required-badge">必須</span></label>
                <select id="claimType" class="form-select">
                  <option value="expense" selected>📤 支出（立替経費の精算）</option>
                  <option value="income">📥 収入（会費納入・協賛金受取）</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">科目・用途 <span class="form-required-badge">必須</span></label>
                <select id="claimCategory" class="form-select">
                  <option value="工作・理科実験材料費" selected>工作・理科実験材料費</option>
                  <option value="自然体験・キャンプ施設費">自然体験・キャンプ施設費</option>
                  <option value="救急備品・安全キット補充">救急備品・安全キット補充</option>
                  <option value="広報・チラシ印刷・通信費">広報・チラシ印刷・通信費</option>
                  <option value="ボランティア行事保険料">ボランティア行事保険料</option>
                  <option value="サークル会費">サークル会費</option>
                  <option value="市民活動推進補助金">助成金・補助金</option>
                  <option value="予備費・その他雑費">その他雑費</option>
                </select>
              </div>
            </div>

            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">金額 (円) <span class="form-required-badge">必須</span></label>
                <input type="number" id="claimAmount" class="form-input" required min="10" placeholder="例: 3500">
              </div>

              <div class="form-group">
                <label class="form-label">申請者氏名 (係・役職) <span class="form-required-badge">必須</span></label>
                <input type="text" id="claimantName" class="form-input" required placeholder="例: 加藤優花 (企画係)">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">内容・品目名 <span class="form-required-badge">必須</span></label>
              <input type="text" id="claimDescription" class="form-input" required placeholder="例: 11月定例実験教室の重曹・クエン酸・風船20袋">
            </div>

            <div class="form-group">
              <label class="form-label">領収書・購入店メモ</label>
              <input type="text" id="claimReceiptNote" class="form-input" placeholder="例: セリア〇〇店レシート原本あり、伊藤へ提出済">
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
              <button type="button" id="btnCancelClaim" class="btn-secondary">キャンセル</button>
              <button type="submit" class="btn-primary">✨ 精算申請を提出する</button>
            </div>
          </form>
        </div>

        <!-- Ledger Table (Filtered) -->
        <div class="acc-ledger-card">
          <div class="acc-table-wrapper">
            <table class="acc-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>区分</th>
                  <th>科目</th>
                  <th>内容・摘要</th>
                  <th>金額</th>
                  <th>申請・担当者</th>
                  <th>領収書確認</th>
                </tr>
              </thead>
              <tbody>
                ${this.renderTableRows(data.transactions)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Message from Treasury -->
        <div class="acc-notice-box">
          <strong>📋 Fizz会計（伊藤美咲）よりメンバーの皆さんへお願い</strong><br>
          ・イベント企画で必要な物品を購入する際は、企画書に記載の予算枠内で購入をお願いします。<br>
          ・レシートは感熱紙の文字が消えないよう、サークル室3Fの「精算用バインダー」に台紙に貼って挟んでください。<br>
          ・5,000円を超える大きな備品の購入は、必ず事前に代表会または企画会議で承認を得てください。
        </div>
      </div>
    `;

    this.bindEvents(container);
  }

  renderTableRows(transactions) {
    const filtered = transactions.filter(t => {
      if (this.filterType === 'expense') return t.type === 'expense';
      if (this.filterType === 'income') return t.type === 'income';
      if (this.filterType === 'pending') return t.status === 'pending';
      return true;
    });

    if (filtered.length === 0) {
      return `
        <tr>
          <td colspan="7" style="text-align: center; padding: 30px; color: var(--fizz-text-muted);">
            該当する出納明細はありません。
          </td>
        </tr>
      `;
    }

    const formatYen = (num) => '¥' + Number(num).toLocaleString('ja-JP');

    return filtered.map(t => {
      const isIncome = t.type === 'income';
      return `
        <tr>
          <td style="white-space: nowrap; font-weight: 700;">${t.date}</td>
          <td>
            <span class="acc-type-badge ${isIncome ? 'income' : 'expense'}">
              ${isIncome ? '収入' : '支出'}
            </span>
          </td>
          <td style="white-space: nowrap; font-weight: 700; color: var(--fizz-navy);">${t.category}</td>
          <td style="min-width: 200px;">
            <div>${t.description}</div>
            ${t.receiptNote ? `<div style="font-size:0.75rem; color:var(--fizz-text-muted); margin-top:2px;">📎 ${t.receiptNote}</div>` : ''}
          </td>
          <td class="acc-amount-cell ${isIncome ? 'income' : 'expense'}">
            ${isIncome ? '+' : '-'}${formatYen(t.amount)}
          </td>
          <td style="white-space: nowrap;">${t.claimant}</td>
          <td>
            <span class="acc-status-tag ${t.status === 'verified' ? 'verified' : 'pending'}">
              ${t.status === 'verified' ? '✅ 確認済' : '⏳ 精算中'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  bindEvents(container) {
    // Year switcher tabs
    const yearBtns = container.querySelectorAll('.acc-year-btn');
    yearBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const yr = btn.getAttribute('data-year');
        if (yr && yr !== this.activeYear) {
          this.activeYear = yr;
          if (this.sound) {
            if (this.sound.playCoin) this.sound.playCoin();
            else this.sound.playClick();
          }
          this.renderModalUI(container);
        }
      });
    });

    // Filter pills
    const filterBtns = container.querySelectorAll('.acc-pill-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        if (f) {
          this.filterType = f;
          if (this.sound) this.sound.playClick();
          this.renderModalUI(container);
        }
      });
    });

    // Toggle Claim Form
    const toggleBtn = container.querySelector('#btnToggleClaimForm');
    const panel = container.querySelector('#claimFormPanel');
    const cancelBtn = container.querySelector('#btnCancelClaim');
    const form = container.querySelector('#newClaimForm');

    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = panel.style.display === 'none';
        panel.style.display = isHidden ? 'block' : 'none';
        if (this.sound) this.sound.playClick();
        if (isHidden) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (cancelBtn && panel) {
      cancelBtn.addEventListener('click', () => {
        panel.style.display = 'none';
        if (this.sound) this.sound.playClick();
      });
    }

    // Print Ledger
    const printBtn = container.querySelector('#btnPrintLedger');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        if (this.sound) this.sound.playClick();
        window.print();
      });
    }

    // Submit new claim
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = container.querySelector('#claimType').value;
        const category = container.querySelector('#claimCategory').value;
        const amount = parseInt(container.querySelector('#claimAmount').value, 10);
        const claimant = container.querySelector('#claimantName').value.trim();
        const description = container.querySelector('#claimDescription').value.trim();
        const receiptNote = container.querySelector('#claimReceiptNote').value.trim();

        if (isNaN(amount) || amount <= 0) return;

        const newTx = {
          id: 'tx-' + Date.now(),
          date: new Date().toLocaleDateString('ja-JP'),
          type,
          category,
          description,
          amount,
          claimant,
          status: type === 'income' ? 'verified' : 'pending',
          receiptNote: receiptNote || (type === 'income' ? '入金確認済' : 'レシート提出待ち')
        };

        this.addTransaction(this.activeYear, newTx);
        panel.style.display = 'none';
        form.reset();
        this.renderModalUI(container);
      });
    }
  }
}
