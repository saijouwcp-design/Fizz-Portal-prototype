/* ========================================================
   Fizz Clubhouse - Rooftop Official Shop System
   4F オフィシャルショップ＆チャリティグッズストア
   ======================================================== */

const SHOP_PRODUCTS = [
  {
    id: 'prod-tshirt-2026',
    name: 'Fizz公式サークルTシャツ (2026ミント)',
    price: 2500,
    tag: '人気No.1',
    tagClass: 'popular',
    description: '吸汗速乾ドライメッシュ仕様。胸元に弾けるソーダロゴ、背中にサークルスローガンをプリント。学生＆キッズ兼用。',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30 18 L 42 26 C 47 28 53 28 58 26 L 70 18 L 90 32 L 80 48 L 74 44 L 74 86 L 26 86 L 26 44 L 20 48 L 10 32 Z" fill="#06D6A0" stroke="#073B4C" stroke-width="3"/>
        <path d="M 42 26 C 47 32 53 32 58 26" stroke="#073B4C" stroke-width="2.5" fill="none"/>
        <circle cx="50" cy="56" r="12" fill="#FFFFFF" stroke="#073B4C" stroke-width="2"/>
        <text x="50" y="60" font-family="'Fredoka', sans-serif" font-weight="900" font-size="9" fill="#118AB2" text-anchor="middle">Fizz</text>
      </svg>
    `
  },
  {
    id: 'prod-towel',
    name: 'Fizzマフラータオル (炭酸バブル)',
    price: 1200,
    tag: '定番',
    tagClass: 'popular',
    description: '今治産コットン100%の極上肌触り。夏のキャンプや水遊び、汗拭きに大活躍するロングサイズタオル。',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="24" width="70" height="24" rx="4" transform="rotate(-15 50 36)" fill="#FFD166" stroke="#073B4C" stroke-width="3"/>
        <rect x="25" y="52" width="65" height="24" rx="4" transform="rotate(8 50 64)" fill="#FFD166" stroke="#073B4C" stroke-width="3"/>
        <line x1="30" y1="58" x2="80" y2="65" stroke="#EF476F" stroke-width="3" stroke-dasharray="4 3"/>
        <text x="50" y="38" font-family="'Poppins', sans-serif" font-weight="800" font-size="8" fill="#073B4C" text-anchor="middle" transform="rotate(-15 50 36)">FIZZ TOWEL</text>
      </svg>
    `
  },
  {
    id: 'prod-thermo-mug',
    name: '自然体験用 ステンレスサーモマグ',
    price: 1800,
    tag: 'アウトドア',
    tagClass: 'new',
    description: '真空二重構造で冷たさ・温かさを長時間キープ。リュックに引っ掛けられる頑丈なカラビナハンドル付き。',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="46" height="52" rx="6" fill="#E2E8F0" stroke="#073B4C" stroke-width="3.5"/>
        <path d="M 71 40 Q 86 42 86 56 Q 86 70 71 72" stroke="#EF476F" stroke-width="4" stroke-linecap="round" fill="none"/>
        <rect x="33" y="46" width="30" height="20" rx="3" fill="#118AB2"/>
        <text x="48" y="59" font-family="'Fredoka', sans-serif" font-weight="800" font-size="8" fill="#FFFFFF" text-anchor="middle">CAMP</text>
        <!-- Steam -->
        <path d="M 38 20 Q 42 14 38 8" stroke="#94A3B8" stroke-width="2" fill="none"/>
        <path d="M 52 20 Q 56 14 52 8" stroke="#94A3B8" stroke-width="2" fill="none"/>
      </svg>
    `
  },
  {
    id: 'prod-safety-whistle',
    name: 'こども防犯ホイッスル＆LEDリフレクター',
    price: 800,
    tag: 'チャリティ',
    tagClass: 'charity',
    description: '少ない息でも遠くまで響く高音救助ホイッスルと、夜道で車のライトを強く反射する安全バンドのセット。',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Whistle -->
        <path d="M 22 55 L 48 55 L 48 40 L 72 40 C 80 40 86 46 86 54 C 86 62 80 68 72 68 L 22 68 Z" fill="#EF476F" stroke="#073B4C" stroke-width="3"/>
        <circle cx="70" cy="54" r="8" fill="#FFFFFF"/>
        <rect x="34" y="44" width="8" height="6" fill="#073B4C"/>
        <!-- Ring -->
        <circle cx="16" cy="61" r="5" stroke="#073B4C" stroke-width="2.5" fill="none"/>
        <!-- Sparkle -->
        <text x="35" y="30" font-size="14">✨</text>
      </svg>
    `
  },
  {
    id: 'prod-stickers',
    name: 'Fizz公式 ダイカットステッカー5種セット',
    price: 500,
    tag: 'チャリティ',
    tagClass: 'charity',
    description: 'サークルマスコットや炭酸バブル、テントなどをあしらった耐水・耐候ラミネートステッカー。水筒やノートPCに！',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Badge 1 (Star) -->
        <circle cx="40" cy="40" r="24" fill="#FFD166" stroke="#073B4C" stroke-width="3"/>
        <text x="40" y="46" font-size="16" text-anchor="middle">⭐</text>
        <!-- Badge 2 (Heart) -->
        <circle cx="62" cy="60" r="22" fill="#EF476F" stroke="#073B4C" stroke-width="3"/>
        <text x="62" y="66" font-size="14" text-anchor="middle">🫧</text>
      </svg>
    `
  },
  {
    id: 'prod-safari-hat',
    name: 'Fizzアドベンチャー撥水サファリハット',
    price: 2400,
    tag: 'アウトドア',
    tagClass: 'new',
    description: '日よけ広つば＆あご紐付きの本格アウトドアハット。突然の小雨でも安心なテフロン撥水加工を施しています。',
    iconSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Brim -->
        <ellipse cx="50" cy="68" rx="44" ry="14" fill="#6B7280" stroke="#073B4C" stroke-width="3"/>
        <!-- Crown -->
        <path d="M 28 66 L 33 34 Q 50 26 67 34 L 72 66 Z" fill="#9CA3AF" stroke="#073B4C" stroke-width="3"/>
        <!-- Ribbon Band -->
        <path d="M 30 58 L 32 50 Q 50 44 68 50 L 70 58 Z" fill="#06D6A0" stroke="#073B4C" stroke-width="2"/>
        <!-- Chin Cord -->
        <path d="M 36 68 Q 44 86 50 86 Q 56 86 64 68" stroke="#073B4C" stroke-width="2" fill="none"/>
      </svg>
    `
  }
];

export class RooftopShop {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.storageKey = 'fizz_clubhouse_shop_cart_v1';
    this.cart = this.loadCart();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load shop cart', e);
    }
    return {};
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Failed to save shop cart', e);
    }
  }

  addToCart(productId) {
    this.cart[productId] = (this.cart[productId] || 0) + 1;
    this.saveCart();
    if (this.sound) {
      if (this.sound.playCoin) this.sound.playCoin();
      else this.sound.playClick();
    }
  }

  clearCart() {
    this.cart = {};
    this.saveCart();
  }

  getCartSummary() {
    let totalItems = 0;
    let totalPrice = 0;

    for (const [prodId, qty] of Object.entries(this.cart)) {
      const product = SHOP_PRODUCTS.find(p => p.id === prodId);
      if (product) {
        totalItems += qty;
        totalPrice += product.price * qty;
      }
    }

    return { totalItems, totalPrice };
  }

  renderModalUI(container) {
    if (!container) return;

    const summary = this.getCartSummary();
    const formatYen = (num) => '¥' + Number(num).toLocaleString('ja-JP');

    container.innerHTML = `
      <div class="shop-container">
        <!-- Hero Banner -->
        <div class="shop-hero-banner">
          <span class="shop-hero-badge">FIZZ ROOFTOP STORE</span>
          <h3 class="shop-hero-title">🛍️ Fizzオフィシャルショップ＆チャリティグッズ</h3>
          <p class="shop-hero-desc">
            ボランティア活動を彩るオリジナルグッズの公式ストアです。<br>
            グッズの収益はすべて、<strong>こども向け無料体験イベントの材料費および安全保険代</strong>として大切に活用させていただきます。
          </p>
        </div>

        <!-- Floating Cart Status Bar -->
        <div class="shop-cart-bar">
          <div class="shop-cart-info">
            <span class="cart-icon-pill">🛒</span>
            <span>現在カート:</span>
            <span class="cart-count-badge">${summary.totalItems} 点</span>
            <span>合計: <span class="cart-total-price">${formatYen(summary.totalPrice)}</span></span>
          </div>

          <div style="display: flex; gap: 8px;">
            ${summary.totalItems > 0 ? `
              <button type="button" id="btnClearCart" class="btn-secondary" style="font-size:0.8rem; padding: 6px 12px;">
                カートを空にする
              </button>
              <button type="button" id="btnCheckout" class="btn-primary" style="font-size:0.85rem; padding: 6px 16px;">
                ✨ 注文を確定する (シミュレーション)
              </button>
            ` : `
              <span style="font-size:0.82rem; color:var(--fizz-text-muted); align-self:center;">
                お好きなグッズの「カートに入れる」を押してください
              </span>
            `}
          </div>
        </div>

        <!-- Checkout Success Box (Hidden by default) -->
        <div id="checkoutSuccessBox" class="shop-order-success" style="display: none;">
          <div style="font-size: 2.8rem; margin-bottom: 6px;">🎉</div>
          <h3>ご注文ありがとうございました！</h3>
          <p style="font-size: 0.9rem; line-height: 1.7; color: var(--fizz-text-muted); max-width: 500px; margin: 0 auto 16px auto;">
            Fizzサークル活動への温かいご支援と応援に心より感謝申し上げます。<br>
            （※本ストアはポータル内シミュレーションです。実際の受渡・決済はサークル室4Fキオスクにて行います）
          </p>
          <button type="button" id="btnShopContinue" class="btn-primary" style="font-size: 0.9rem; padding: 8px 20px;">
            買い物を続ける
          </button>
        </div>

        <!-- Products Grid -->
        <div class="shop-products-grid" id="productsGrid">
          ${SHOP_PRODUCTS.map(prod => `
            <div class="product-card">
              <div class="product-thumb-wrapper">
                <span class="product-tag ${prod.tagClass}">${prod.tag}</span>
                ${prod.iconSvg}
              </div>
              <div class="product-body">
                <h4 class="product-name">${prod.name}</h4>
                <p class="product-desc">${prod.description}</p>
                <div class="product-price-row">
                  <span class="product-price">${formatYen(prod.price)}</span>
                  <button type="button" class="btn-add-cart" data-prod-id="${prod.id}">
                    カートに入れる ＋
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Charity Impact Statement -->
        <div class="shop-charity-impact">
          <strong>🌿 チャリティ還元プログラムについて</strong><br>
          Fizzは営利を目的としない学生主体のボランティア団体です。グッズ1点のご購入につき、約3名分のこどもたちの理科実験材料（スライム・空気砲）や、サマーキャンプでの安全見守り保険代に還元されます。
        </div>
      </div>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    // Add to cart buttons
    const addBtns = container.querySelectorAll('.btn-add-cart');
    addBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-prod-id');
        if (prodId) {
          this.addToCart(prodId);
          this.renderModalUI(container);
        }
      });
    });

    // Clear cart button
    const clearBtn = container.querySelector('#btnClearCart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.sound) this.sound.playClick();
        this.clearCart();
        this.renderModalUI(container);
      });
    }

    // Checkout button
    const checkoutBtn = container.querySelector('#btnCheckout');
    const successBox = container.querySelector('#checkoutSuccessBox');
    const prodGrid = container.querySelector('#productsGrid');
    const cartBar = container.querySelector('.shop-cart-bar');

    if (checkoutBtn && successBox) {
      checkoutBtn.addEventListener('click', () => {
        if (this.sound && this.sound.playFanfare) {
          this.sound.playFanfare();
        }
        this.clearCart();
        if (cartBar) cartBar.style.display = 'none';
        if (prodGrid) prodGrid.style.display = 'none';
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const continueBtn = container.querySelector('#btnShopContinue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (this.sound) this.sound.playClick();
        this.renderModalUI(container);
      });
    }
  }
}
