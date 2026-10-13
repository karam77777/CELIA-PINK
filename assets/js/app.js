/**
 * CELIA PINK - Women's Pajamas Store (متجر بيجامات نسائية)
 * Cairene Egyptian Dialect - Interactive E-Commerce Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Data Source: 19 Real Women's Pajamas Products
  // ==========================================
  const products = [
    {
      id: 1,
      title: 'بيجامة دورايمون كاروهات كحلي في أبيض مريحة',
      category: 'plaid',
      categoryName: 'كاروهات وتريند',
      price: 250,
      oldPrice: 350,
      rating: 5.0,
      reviewsCount: 48,
      badge: 'الأكتر طلباً',
      badgeType: 'hot',
      sizes: ['One Size'],
      image: 'assets/images/products/product-1.jpeg',
      desc: 'بيجامة بنطلون وتيشيرت مريح جداً بنقشة دورايمون المحبوبة وكاروهات كحلي شيك، خامة موهير ناعمة ومريحة لقعدة البيت والنوم بروقان.'
    },
    {
      id: 2,
      title: 'بونشو فرو تايجر شتوي مبطن دافي بشراريب فخمة',
      category: 'winter',
      categoryName: 'فرو ومخمل شتوي',
      price: 250,
      oldPrice: 750,
      rating: 5.0,
      reviewsCount: 39,
      badge: 'تريند الشتاء',
      badgeType: 'hot',
      sizes: ['One Size'],
      image: 'assets/images/products/product-2.jpeg',
      desc: 'بونشو أوفر سايز بغطاء رأس وشراريب موهير ناعمة، خامة فرو دافية وفخمة بطبعة التايجر الأنيقة لتدفئة مثالية في أبرد ليالي الشتا.'
    },
    {
      id: 3,
      title: 'بيجامة بيتي كاروهات زيتوني بياقة كلاسيك وأزرار',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 460,
      oldPrice: 580,
      rating: 4.9,
      reviewsCount: 42,
      badge: 'شياكة كلاسيك',
      badgeType: 'new',
      sizes: ['One Size'],
      image: 'assets/images/products/product-3.jpeg',
      desc: 'بيجامة كلاسيكية بأزرار وياقة أنيقة باللون الزيتوني الفاتح والكاروهات الهادي مع رسومات قلوب ودباديب لطيفة، مريحة وأنيقة في اللبس.'
    },
    {
      id: 4,
      title: 'بيجامة بازل أبيض في أسود بفيونكات بيبي بلو ناعمة',
      category: 'plaid',
      categoryName: 'كاروهات وتريند',
      price: 440,
      oldPrice: 550,
      rating: 4.8,
      reviewsCount: 34,
      badge: 'موديل كيوت',
      badgeType: 'sale',
      sizes: ['One Size'],
      image: 'assets/images/products/product-4.jpeg',
      desc: 'تصميم مميز بنقشة البازل باللونين الأبيض والأسود مع فيونكات صغيرة رقيقة بلون بيبي بلو على الصدر، موهير مطاطي ناعم يبرز أنوثتك.'
    },
    {
      id: 5,
      title: 'بيجامة بيبي بلو موهير بنقشة فيونكات رقيقة ودرابيه جانبي',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 250,
      oldPrice: 350,
      rating: 4.9,
      reviewsCount: 51,
      badge: 'أكثر مبيعاً',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-5.jpeg',
      desc: 'بيجامة باللون السماوي الهادي مع فيونكة سوداء منقطة وشريط زم جانبي للدلع، بنطلون مريح واسع بنقشة فيونكات ناعمة وخامة موهير طرية.'
    },
    {
      id: 6,
      title: 'بيجامة رمادي كلاسيك زراير بنقشة كريز وبيري شيك',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 470,
      oldPrice: 590,
      rating: 4.9,
      reviewsCount: 44,
      badge: 'وفر 100 ج',
      badgeType: 'sale',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-6.jpeg',
      desc: 'بيجامة كلاسيكية رمادي ميلانج بأزرار وياقة أمريكية ونقشة حبات الكريز الناعمة، تقفيل خياطة فاخر وأزرار صدفية متينة لا تتأثر بالغسيل.'
    },
    {
      id: 7,
      title: 'بيجامة موهير ميلانج رمادي بطبعة أرنوب وفيونكة لطيفة',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 420,
      oldPrice: 530,
      rating: 4.8,
      reviewsCount: 29,
      badge: 'خامة موهير 100%',
      badgeType: 'new',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-7.jpeg',
      desc: 'بيجامة رمادية مريحة بطبعة أرنوب كيوت مع فيونكة، موهير عالي الجودة ناعم وخفيف على البشرة يمنحك راحة تامة طوال اليوم.'
    },
    {
      id: 8,
      title: 'طقم سويت شيرت خوخي دافي مع بنطلون دباديب وقلوب',
      category: 'winter',
      categoryName: 'فرو ومخمل شتوي',
      price: 490,
      oldPrice: 620,
      rating: 5.0,
      reviewsCount: 56,
      badge: 'دفا وأناقة',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-8.jpeg',
      desc: 'سويت شيرت خوخي دافي مع عبارة Bonjour وبنطلون قطيفة سوفت بنقشة دباديب وقلوب، طقم يجمع بين الشياكة والدفء الكامل.'
    },
    {
      id: 9,
      title: 'بيجامة روز بينك موهير 100% بنقشة Love Panda الرقيقة',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 440,
      oldPrice: 550,
      rating: 4.9,
      reviewsCount: 62,
      badge: 'لون بناتي كيوت',
      badgeType: 'hot',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/images/products/product-9.jpeg',
      desc: 'بيجامة وردية ناعمة جداً بطبعة باندا وقلوب بيضاء، خامة موهير ممتازة مريحة وغير شفافة تعطي إحساساً رائعاً بالراحة والأنوثة.'
    },
    {
      id: 10,
      title: 'بيجامة تاي داي بيج كاجوال مع جيب كرتوني شيك',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 430,
      oldPrice: 540,
      rating: 4.7,
      reviewsCount: 27,
      badge: 'ستايل عصري',
      badgeType: 'new',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-10.jpeg',
      desc: 'ستايل تاي داي أنيق بدرجات البيج والأوف وايت مع جيب أمامي مجسم كرتوني لطيف، قصة واسعة مريحة لقضاء أوقات البيت بحرية وراحة.'
    },
    {
      id: 11,
      title: 'بيجامة بيج موهير بيور بنقشة Hello وجرو كرتوني لطيف',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 420,
      oldPrice: 520,
      rating: 4.8,
      reviewsCount: 38,
      badge: 'وفر 100 ج',
      badgeType: 'sale',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-11.jpeg',
      desc: 'بيجامة بيج كاملة بنقشة الجرو اللطيف وعبارة Hello، موهير طبيعي طويل التيلة يمتص الرطوبة وناعم على الجسم ومثالي لجميع الفصول.'
    },
    {
      id: 12,
      title: 'بيجامة كلاسيك مقلمة تمويجي أسود في أبيض بزراير',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 480,
      oldPrice: 600,
      rating: 5.0,
      reviewsCount: 45,
      badge: 'الأكثر شياكة',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-12.jpeg',
      desc: 'تصميم فندقي كلاسيكي مقلم بأمواج عصرية باللونين الأسود والأبيض، أزرار سوداء وياقة راقية تناسب جلسات الصباح والمساء بأناقة لا تقاوم.'
    },
    {
      id: 13,
      title: 'بيجامة أوف وايت كاروهات نبيتي كلاسيك راقية',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 490,
      oldPrice: 620,
      rating: 4.9,
      reviewsCount: 53,
      badge: 'موديل راقي',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-13.jpeg',
      desc: 'كاروهات كلاسيكية رفيعة بلون نبيتي ملكي على خلفية أوف وايت نقية، ياقة كلاسيك وقصة انسيابية مريحة مع تفصيل متقن للغاية.'
    },
    {
      id: 14,
      title: 'بيجامة روز بيتش ناعمة بنقشة خوخ وقلوب وأزرار صدفية',
      category: 'cotton',
      categoryName: 'موهير بيتي دلع',
      price: 450,
      oldPrice: 560,
      rating: 5.0,
      reviewsCount: 67,
      badge: 'كولكشن الوردي 🌸',
      badgeType: 'hot',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/images/products/product-14.jpeg',
      desc: 'بيجامة وردية بناتي رقيقة بطبعة حبات الخوخ وقلوب دقيقة مع أزرار أمامية صدفية، قماش فائق النعومة يطبطب على بشرتك وينعش يومك.'
    },
    {
      id: 15,
      title: 'بيجامة بيضاء منقوشة دباديب وردية كلاسيك بزراير',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 460,
      oldPrice: 580,
      rating: 4.9,
      reviewsCount: 41,
      badge: 'وفر 100 ج',
      badgeType: 'sale',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-15.jpeg',
      desc: 'بيجامة بيضاء كلاسيكية بزراير وياقة مطرزة بنقشات دباديب وردية خفيفة، خامة موهير خفيفة ومريحة وقصة مناسبة للاسترخاء التام.'
    },
    {
      id: 16,
      title: 'طقم بيجامة بيج مع ورود سوداء وبنطلون كاروهات شيك',
      category: 'plaid',
      categoryName: 'كاروهات وتريند',
      price: 470,
      oldPrice: 590,
      rating: 4.8,
      reviewsCount: 36,
      badge: 'ستايل مودرن',
      badgeType: 'new',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-16.jpeg',
      desc: 'طقم قطعتين بتصميم عصري يجمع بين تيشيرت بيج برسمة زهور سوداء وبنطلون كاروهات واسع وأنيق، يمنحك لوك أنثوي ومريح في نفس الوقت.'
    },
    {
      id: 17,
      title: 'بيجامة كلاسيك زراير كاروهات كحلي شيك وأنيقة',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 460,
      oldPrice: 580,
      rating: 4.9,
      reviewsCount: 44,
      badge: 'تريند ثابت',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-17.jpeg',
      desc: 'الموديل الكلاسيكي الكحلي بكاروهات متناسقة وأزرار كاملة مع ياقة مبطنة، خامة متينة وثابتة لا تنكمش أو تفقد رونقها مع الاستخدام المستمر.'
    },
    {
      id: 18,
      title: 'بيجامة ميلتون صفراء دافية بنقشة كتاكيت بيضاء كيوت',
      category: 'winter',
      categoryName: 'فرو ومخمل شتوي',
      price: 490,
      oldPrice: 620,
      rating: 5.0,
      reviewsCount: 52,
      badge: 'دفا ومرح 🐥',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-18.jpeg',
      desc: 'بيجامة شتوية صفراء مبهجة ومبطنة بخامة ميلتون قطيفة دافية جداً، طبعة كتاكيت بيضاء كيوت مع أزرار أمامية كبيرة وسهلة الارتداء.'
    },
    {
      id: 19,
      title: 'بيجامة بيج مقلمة كلاسيك بنقشة تيدي بير وفيونكات',
      category: 'classic',
      categoryName: 'بيجامات كلاسيك زراير',
      price: 480,
      oldPrice: 600,
      rating: 5.0,
      reviewsCount: 58,
      badge: 'الأكثر طلباً للعرايس',
      badgeType: 'hot',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'assets/images/products/product-19.jpeg',
      desc: 'بيجامة بيج مقلمة رفيع بنقشات تيدي بير وفيونكات بنية راقية، ياقة كلاسيك وأزرار أنيقة، خامة موهير ممتازة تناسب جهاز كل عروسة.'
    }
  ];
  // Uniform pricing & size enforcement on hardcoded defaults
  products.forEach(p => {
    p.price = 250;
    p.oldPrice = 350;
    p.sizes = ['One Size'];
  });

  // ==========================================
  // Load products from Supabase Cloud DB
  // Falls back to hardcoded array if Supabase not configured
  // ==========================================
  async function loadProductsFromSupabase() {
    try {
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const { data, error } = await supabaseClient
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          // Map Supabase snake_case columns → frontend camelCase
          const mapped = data.map(p => ({
            id:           p.id,
            title:        p.title,
            category:     p.category,
            categoryName: p.category_name || p.category,
            price:        p.price        || 250,
            oldPrice:     p.old_price    || 350,
            rating:       p.rating       || 4.9,
            reviewsCount: p.reviews_count || 30,
            badge:        p.badge        || '',
            badgeType:    p.badge_type   || 'hot',
            sizes:        p.sizes        || ['One Size'],
            image:        p.image        || '',
            desc:         p.desc         || '',
          }));
          // Replace hardcoded array with cloud data
          products.length = 0;
          mapped.forEach(p => products.push(p));
        }
      }
    } catch(e) {
      console.warn('Supabase load failed, using hardcoded products:', e.message);
    }
    // Always render after load attempt (with either cloud or hardcoded data)
    renderProducts();
    updateCartUI();
  }


  // ==========================================
  // 2. State & Constants
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('celia_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('celia_wishlist')) || [];
  let appliedDiscount = 0; // %
let appliedDiscountCode = ''; // current active coupon code
  const FREE_SHIPPING_THRESHOLD = 1000; // Free shipping above 1000 EGP
  const STORE_WHATSAPP_PHONE = '201505583219';

  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const cartShippingEl = document.getElementById('cartShipping');
  const cartTotalEl = document.getElementById('cartTotal');
  const freeShippingText = document.getElementById('freeShippingText');
  const freeShippingProgress = document.getElementById('freeShippingProgress');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');
  const quickViewModal = document.getElementById('quickViewModal');
  const toastContainer = document.getElementById('toastContainer');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const whatsappMenuPopup = document.getElementById('whatsappMenuPopup');
  const whatsappFloatingBtn = document.getElementById('whatsappFloatingBtn');

  // ==========================================
  // 3. Render Products with Unified Pink Filter
  // ==========================================
  function renderProducts(filter = 'all') {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? products 
      : products.filter(p => p.category === filter);

    filtered.forEach(product => {
      const isWishlisted = wishlist.includes(product.id);
      const card = document.createElement('div');
      card.className = 'product-card';
      
      const sizesHtml = `<span class="size-pill active">One Size</span>`;

      card.innerHTML = `
        <div class="product-image-container">
          <span class="product-badge badge-${product.badgeType}">${product.badge}</span>
          <div class="product-actions-hover">
            <button class="quick-action-btn wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                    data-id="${product.id}" title="إضافة لقائمة أمنياتك">
              <i class="${isWishlisted ? 'fas fa-heart' : 'far fa-heart'}"></i>
            </button>
            <button class="quick-action-btn quick-view-btn" data-id="${product.id}" title="نظرة سريعة">
              <i class="far fa-eye"></i>
            </button>
            <button class="quick-action-btn zoom-lightbox-btn" data-img="${product.image}" data-title="${product.title}" title="تكبير الصورة بحجمها الطبيعي">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>

          <!-- Pink Aesthetic Image Container with Unified Tone Filter -->
          <div class="pink-filter-container">
            <img src="${product.image}" alt="${product.title}" class="pink-filtered-img" loading="lazy">
            <div class="pink-filter-overlay"></div>
          </div>
        </div>

        <div class="product-info">
          <span class="product-category">${product.categoryName}</span>
          <h3 class="product-title">${product.title}</h3>

          <div class="product-sizes-row">
            <span class="size-label-small">المقاسات:</span>
            ${sizesHtml}
          </div>
          
          <div class="product-rating">
            <div class="rating-stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <span class="rating-count">(${product.reviewsCount} تقييم مصري)</span>
          </div>

          <div class="product-price-row">
            <div class="price-box">
              <div class="current-price">${product.price} <span>ج.م</span></div>
              ${product.oldPrice ? `<div class="old-price">${product.oldPrice} ج.م</div>` : ''}
            </div>
            <button class="add-cart-btn" data-id="${product.id}">
              <i class="fas fa-shopping-bag"></i> أضيفي للسلة
            </button>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    attachProductListeners();
  }

  // ==========================================
  // 4. Cart Operations (EGP & 1000 EGP Free Shipping)
  // ==========================================
  function updateCartUI() {
    // ---- 1. Persist cart ----
    localStorage.setItem('celia_cart', JSON.stringify(cart));

    // ---- 2. Badge count ----
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    const floatingCartBadge = document.getElementById('floatingCartBadge');
    if (floatingCartBadge) {
      floatingCartBadge.textContent = totalItems;
      floatingCartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // ---- 3. Empty cart state ----
    if (cart.length === 0) {
      if (cartItemsList) cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fas fa-shopping-bag"></i>
          <h4>سلتك فاضية لسه يا قمر! 🌸</h4>
          <p>تصفحي كولكشن البيجامات واختاري اللي يروق ليكي.</p>
        </div>
      `;
      if (cartSubtotalEl)  cartSubtotalEl.textContent  = '0 ج.م';
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
      if (cartShippingEl)  cartShippingEl.textContent   = 'شحن مجاني فوق 1000 ج';
      if (cartTotalEl)     cartTotalEl.textContent      = '0 ج.م';
      if (freeShippingProgress) freeShippingProgress.style.width = '0%';
      if (freeShippingText) freeShippingText.innerHTML =
        `<span>اطلبي بـ 1000 جنيه أو أكتر وتاخدي شحن مجاني لأي مكان في مصر!</span><span>0%</span>`;
      // reset discount when cart emptied
      appliedDiscount = 0;
      appliedDiscountCode = '';
      updateCouponButtons(0);
      return;
    }

    // ---- 4. Build item rows & calculate subtotal ----
    if (cartItemsList) cartItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if (!p) return;
      subtotal += p.price * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-img pink-filter-container" style="width:65px;height:65px;border-radius:var(--radius-md);">
          <img src="${p.image}" alt="${p.title}" class="pink-filtered-img">
          <div class="pink-filter-overlay"></div>
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${p.title}</h4>
          <div class="cart-item-price">${p.price} ج.م <span style="font-size:0.75rem;color:var(--text-muted);">(One Size)</span></div>
          <div class="cart-item-qty">
            <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" title="حذف">
          <i class="far fa-trash-alt"></i>
        </button>
      `;
      if (cartItemsList) cartItemsList.appendChild(itemEl);
    });

    // ---- 5. Shipping (calculated from subtotal) ----
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;

    // ---- 6. Update coupon button states ----
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCouponButtons(totalQuantity);

    // ---- 7. Discount ----
    const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;

    // ---- 8. Grand total ----
    const grandTotal = subtotal - discountAmount + shippingCost;

    // ---- 9. Update DOM ----
    if (cartSubtotalEl) cartSubtotalEl.textContent = `${subtotal} ج.م`;

    if (cartDiscountRow && cartDiscountEl) {
      if (appliedDiscount > 0) {
        cartDiscountRow.style.display = 'flex';
        cartDiscountEl.textContent = `-${discountAmount} ج.م (${appliedDiscount}% – كود ${appliedDiscountCode})`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }

    if (cartShippingEl) {
      cartShippingEl.textContent = shippingCost === 0
        ? 'شحن مجاني 🎁'
        : `${shippingCost} ج.م (لجميع المحافظات)`;
    }

    if (cartTotalEl) cartTotalEl.textContent = `${grandTotal} ج.م`;

    // ---- 10. Free shipping progress bar ----
    const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    if (freeShippingProgress) freeShippingProgress.style.width = `${progressPercent}%`;
    if (freeShippingText) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        freeShippingText.innerHTML = `<span>🎉 مبروك يا قمر! وصلتي للـ 1000 ج والشحن بقى مجاني تماماً</span><span>100%</span>`;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        freeShippingText.innerHTML = `<span>فاضلك ${remaining} ج.م وتاخدي شحن مجاني لأي مكان 🌸</span><span>${progressPercent}%</span>`;
      }
    }

    // ---- 11. Re-attach qty / remove listeners ----
    attachCartItemListeners();
  }


  function addToCart(productId, qty = 1, size = 'One Size') {
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ id: productId, quantity: qty, size: size });
    }
    updateCartUI();
    const prod = products.find(p => p.id === productId);
    showToast(`تم إضافة "${prod.title}" للسلة بنجاح يا سكر 💕`);
  }

  function attachCartItemListeners() {
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity++;
          updateCartUI();
        }
      };
    });

    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            cart = cart.filter(i => i.id !== id);
          }
          updateCartUI();
        }
      };
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
        showToast('تم حذف القطعة من السلة');
      };
    });
  }

  // ==========================================
  // 5. Wishlist Operations
  // ==========================================
  function updateWishlistUI() {
    localStorage.setItem('celia_wishlist', JSON.stringify(wishlist));
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const prod = products.find(p => p.id === productId);
    if (index > -1) {
      wishlist.splice(index, 1);
      showToast(`تم مسح "${prod.title}" من مفضلتك`);
    } else {
      wishlist.push(productId);
      showToast(`أضفتي "${prod.title}" لمفضلتك 💖`);
    }
    updateWishlistUI();
    renderProducts(getCurrentCategoryFilter());
  }

  function getCurrentCategoryFilter() {
    const active = document.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  // ==========================================
  // 6. Event Listeners for Products
  // ==========================================
  function attachProductListeners() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
      };
    });

    document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        toggleWishlist(id);
      };
    });

    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        openQuickView(id);
      };
    });

    // Zoom Lightbox Buttons
    document.querySelectorAll('.zoom-lightbox-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        openLightbox(btn.dataset.img, btn.dataset.title);
      };
    });

    // Clicking Product Image directly opens Lightbox
    document.querySelectorAll('.product-image-container').forEach(container => {
      container.onclick = (e) => {
        if (e.target.closest('.quick-action-btn') || e.target.closest('.product-badge')) return;
        const img = container.querySelector('img');
        const card = container.closest('.product-card');
        const title = card ? card.querySelector('.product-title')?.textContent : '';
        if (img) openLightbox(img.src, title);
      };
    });
  }

  // Category Filter Tabs
  function bindCategoryFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
      };
    });
  }
  bindCategoryFilters();

  // Category Cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.onclick = () => {
      const cat = card.dataset.category;
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
      if (targetBtn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        renderProducts(cat);
        document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
      }
    };
  });

  // ==========================================
  // 7. Cart Drawer Open / Close & Coupon
  // ==========================================
  if (cartBtn) {
    cartBtn.onclick = () => cartOverlay.classList.add('open');
  }

  const floatingCartBtn = document.getElementById('floatingCartBtn');
  if (floatingCartBtn) {
    floatingCartBtn.onclick = () => cartOverlay.classList.add('open');
  }

  if (closeCartBtn) {
    closeCartBtn.onclick = () => cartOverlay.classList.remove('open');
  }

  if (cartOverlay) {
    cartOverlay.onclick = (e) => {
      if (e.target === cartOverlay) cartOverlay.classList.remove('open');
    };
  }

  // ==========================================
  // Coupon Code Buttons Logic
  // ==========================================
  const COUPON_CONFIG = {
    'CELIA10':  { discount: 10, minQty: 3 },
    'CELIA15':  { discount: 15, minQty: 6 },
    'CELIA20':  { discount: 20, minQty: 9 },
    '3AROSA24': { discount: 24, minQty: 12 },
  };

  // Called from onclick in HTML - globally accessible
  window.applyCouponCode = function(code) {
    const cfg = COUPON_CONFIG[code];
    if (!cfg) return;
    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    if (totalQty < cfg.minQty) {
      showToast(`أضيفي منتجات أكتر عشان تستفيدي من كود ${code} 🌸 (محتاجة ${cfg.minQty} قطع)`);
      return;
    }
    appliedDiscount = cfg.discount;
    appliedDiscountCode = code;
    updateCartUI();
    showToast(`🎉 تم تفعيل كود ${code} وبيتخصم ليكي ${cfg.discount}% دلوقتي!`);
  };

  // Enable / disable buttons based on current cart quantity
  function updateCouponButtons(qty) {
    const btns = [
      { id: 'couponBtn10', code: 'CELIA10' },
      { id: 'couponBtn15', code: 'CELIA15' },
      { id: 'couponBtn20', code: 'CELIA20' },
      { id: 'couponBtn24', code: '3AROSA24' },
    ];
    btns.forEach(({ id, code }) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      const cfg = COUPON_CONFIG[code];
      const isActive = appliedDiscountCode === code;
      const isAvailable = qty >= cfg.minQty;
      btn.disabled = !isAvailable;
      btn.classList.toggle('coupon-btn--active', isActive);
      btn.classList.toggle('coupon-btn--locked', !isAvailable);
    });
  }

  // ==========================================
  // 8. Direct WhatsApp Order Checkout (Links directly to WhatsApp)
  // ==========================================
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.onclick = () => {
      if (cart.length === 0) {
        showToast('السلة فاضية.. اختاري بيجامتك الأول يا قمر!');
        return;
      }

      let message = `مساء الورد يا CELIA PINK 🌸\nعايزة أأكد أوردر البيجامات بتاعي:\n\n`;
      let subtotal = 0;

      cart.forEach((item, index) => {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
          const itemTotal = prod.price * item.quantity;
          subtotal += itemTotal;
          message += `▪️ ${index + 1}. ${prod.title}\n   الكمية: ${item.quantity} | المقاس: ${item.size || 'M'} | السعر: ${itemTotal} ج.م\n`;
        }
      });

      const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
      const total = subtotal - discountAmount + shipping;

      message += `\nالمجموع الفرعي: ${subtotal} ج.م`;
      if (appliedDiscount > 0) {
        message += `\nالخصم: -${discountAmount} ج.م (كود خصم: ${appliedDiscountCode})`;
      }
      message += `\nالشحن: ${shipping === 0 ? 'مجاني تماماً (أوردر فوق 1000 ج) 🎉' : `${shipping} ج.م`}`;
      message += `\nالإجمالي النهائي: ${total} ج.م\n\n`;
      message += `💳 طريقة دفع الديبوزت المفضلة لتأكيد جدية الحجز:\n(انستاباي / فودافون كاش / اتصالات كاش)\n\nأرجو إرسال رقم المحفظة أو عنوان InstaPay لتحويل الديبوزت وتأكيد الشحن لباب البيت 💕`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_PHONE}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    };
  }

  // ==========================================
  // 9. Floating WhatsApp Button & Menu
  // ==========================================
  if (whatsappFloatingBtn && whatsappMenuPopup) {
    whatsappFloatingBtn.onclick = (e) => {
      e.preventDefault();
      whatsappMenuPopup.classList.toggle('open');
    };

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!whatsappFloatingBtn.contains(e.target) && !whatsappMenuPopup.contains(e.target)) {
        whatsappMenuPopup.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 10. Quick View Modal
  // ==========================================
  function openQuickView(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const selectedSize = 'One Size';
    const sizesButtons = `<span class="size-pill qv-size-btn active" data-size="One Size">One Size</span>`;

    const modalBody = document.getElementById('quickViewContent');
    modalBody.innerHTML = `
      <div class="qv-modal-grid">
        <div class="pink-filter-container qv-modal-img-wrap" style="border-radius: var(--radius-lg); cursor: zoom-in;" onclick="openLightbox('${prod.image}', '${prod.title}')" title="اضغطي لتكبير الصورة بحجمها الطبيعي">
          <img src="${prod.image}" alt="${prod.title}" class="pink-filtered-img">
          <div class="pink-filter-overlay"></div>
        </div>
        <div>
          <span style="color: var(--primary-pink); font-size: 0.82rem; font-weight: 700;">${prod.categoryName}</span>
          <h2 style="font-size: 1.35rem; font-weight: 800; margin: 6px 0 10px; color: var(--text-dark);">${prod.title}</h2>
          
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px; font-size: 0.85rem; color: #FFA41C;">
            <i class="fas fa-star"></i>
            <span style="color: var(--text-dark); font-weight: 700;">${prod.rating}</span>
            <span style="color: var(--text-muted);">(${prod.reviewsCount} تقييم مصري)</span>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.7;">
            ${prod.desc}
          </p>

          <div style="margin-bottom: 15px;">
            <span style="font-size: 0.84rem; font-weight: 700; color: var(--text-dark); display: block; margin-bottom: 6px;">اختاري مقاسك:</span>
            <div style="display: flex; gap: 8px;">
              ${sizesButtons}
            </div>
          </div>

          <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 20px;">
            <span style="font-size: 1.6rem; font-weight: 900; color: var(--deep-pink);">${prod.price} ج.م</span>
            ${prod.oldPrice ? `<span style="font-size: 1rem; color: var(--gray-500); text-decoration: line-through;">${prod.oldPrice} ج.م</span>` : ''}
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="display: flex; align-items: center; border: 1px solid var(--petal-pink); border-radius: var(--radius-full); padding: 4px 10px;">
              <button id="modalQtyMinus" style="padding: 4px 8px; font-size: 1.1rem; font-weight: 700;">-</button>
              <span id="modalQtyVal" style="padding: 0 12px; font-weight: 800;">1</span>
              <button id="modalQtyPlus" style="padding: 4px 8px; font-size: 1.1rem; font-weight: 700;">+</button>
            </div>
            <button id="modalAddCart" class="btn-primary" style="flex-grow: 1; padding: 11px 20px;">
              <i class="fas fa-shopping-bag"></i> أضيفي للسلة
            </button>
          </div>
        </div>
      </div>
    `;

    quickViewModal.classList.add('open');

    // Handle size select inside modal
    document.querySelectorAll('.qv-size-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
      };
    });

    let modalQty = 1;
    const qtyValEl = document.getElementById('modalQtyVal');
    document.getElementById('modalQtyPlus').onclick = () => {
      modalQty++;
      qtyValEl.textContent = modalQty;
    };
    document.getElementById('modalQtyMinus').onclick = () => {
      if (modalQty > 1) {
        modalQty--;
        qtyValEl.textContent = modalQty;
      }
    };
    document.getElementById('modalAddCart').onclick = () => {
      addToCart(prod.id, modalQty, selectedSize);
      quickViewModal.classList.remove('open');
    };
  }

  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  if (closeQuickViewBtn) {
    closeQuickViewBtn.onclick = () => quickViewModal.classList.remove('open');
  }
  if (quickViewModal) {
    quickViewModal.onclick = (e) => {
      if (e.target === quickViewModal) quickViewModal.classList.remove('open');
    };
  }

  // ==========================================
  // 11. Flash Sale Countdown Timer
  // ==========================================
  const hoursEl = document.getElementById('timerHours');
  const minutesEl = document.getElementById('timerMinutes');
  const secondsEl = document.getElementById('timerSeconds');

  if (hoursEl && minutesEl && secondsEl) {
    let duration = 18 * 3600 + 45 * 60;
    setInterval(() => {
      if (duration <= 0) duration = 24 * 3600;
      duration--;

      const h = Math.floor(duration / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const s = Math.floor(duration % 60);

      hoursEl.textContent = h.toString().padStart(2, '0');
      minutesEl.textContent = m.toString().padStart(2, '0');
      secondsEl.textContent = s.toString().padStart(2, '0');
    }, 1000);
  }

  // ==========================================
  // 12. Toast Notification
  // ==========================================
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fas fa-heart" style="color: var(--primary-pink);"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================
  // 13. Scroll Listener
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // Mobile Drawer Menu
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const closeMobileNav = document.getElementById('closeMobileNav');

  if (mobileToggleBtn && mobileNavMenu) {
    mobileToggleBtn.onclick = () => mobileNavMenu.classList.add('open');
  }
  if (closeMobileNav && mobileNavMenu) {
    closeMobileNav.onclick = () => mobileNavMenu.classList.remove('open');
  }


  // ==========================================
  // 14. Copyright & Image Protection (منع النسخ وحفظ الصور)
  // ==========================================
  // منع النقر بالزر الأيمن للحماية مع رسالة لطيفة
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      showToast('🌸 جميع تصاميم وصور CELIA PINK محمية بحقوق النشر');
    }
  });

  // منع سحب وإفلات الصور لتحميلها
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // منع اختصارات لوحة المفاتيح للنسخ وحفظ الصفحة وفحص الكود
  document.addEventListener('keydown', (e) => {
    // منع Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u'].includes(e.key.toLowerCase())) {
      if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        showToast('🔒 المحتوى محمي من النسخ يا قمر!');
      }
    }
    // منع F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });

  // حماية الموقع من الاختراق عبر الـ Clickjacking
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch(e) {}

  // ==========================================
  // 15. Image Lightbox Modal Logic (تكبير الصور بحجمها الطبيعي)
  // ==========================================
  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  window.openLightbox = function(src, caption = '') {
    if (!imageLightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    imageLightbox.classList.add('open');
  };

  function closeLightbox() {
    if (imageLightbox) imageLightbox.classList.remove('open');
  }

  if (closeLightboxBtn) closeLightboxBtn.onclick = closeLightbox;
  if (imageLightbox) {
    imageLightbox.onclick = (e) => {
      if (e.target === imageLightbox) closeLightbox();
    };
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ==========================================
  // 16. Customer Reviews System (Exclusively from Supabase Cloud DB)
  // ==========================================
  let currentRating = 5;

  window.toggleReviewForm = function() {
    const card = document.getElementById('reviewFormCard');
    if (!card) return;
    const isHidden = card.style.display === 'none' || card.style.display === '';
    card.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      document.getElementById('revName')?.focus();
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  function initStarSelector() {
    const starBtns = document.querySelectorAll('.star-btn');
    const textEl = document.getElementById('starRatingText');
    const labels = {
      1: '1 من 5 - عادي',
      2: '2 من 5 - مقبول',
      3: '3 من 5 - حلو',
      4: '4 من 5 - ممتاز جداً',
      5: '5 من 5 - تحفة وممتاز جداً! 💕'
    };

    starBtns.forEach(star => {
      star.onclick = () => {
        currentRating = parseInt(star.dataset.rating);
        starBtns.forEach(s => {
          const r = parseInt(s.dataset.rating);
          s.classList.toggle('active', r <= currentRating);
        });
        if (textEl) textEl.textContent = labels[currentRating] || `${currentRating} من 5`;
      };
    });
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderReviews(list) {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;

    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted); background: white; border-radius: var(--radius-lg); border: 2px dashed #FCE7F3;">
          <i class="fas fa-heart" style="color: var(--primary-color); font-size: 2.2rem; margin-bottom: 12px; display: block;"></i>
          <p style="font-weight: 700; font-size: 1.05rem; color: var(--text-dark); margin-bottom: 6px;">لا توجد تعليقات حالياً</p>
          <span style="font-size: 0.88rem;">شاركينا رأيك الجميل في بيجامات CELIA PINK وكوني أول من يضع تقييماً! 🌸</span>
        </div>
      `;
      return;
    }

    const colors = [
      'linear-gradient(135deg, #FF6584, #FFA8BA)',
      'linear-gradient(135deg, #C2185B, #E91E63)',
      'linear-gradient(135deg, #9C27B0, #E91E63)',
      'linear-gradient(135deg, #E91E63, #FF80AB)',
      'linear-gradient(135deg, #FF4081, #FF80AB)'
    ];

    container.innerHTML = list.map((rev, idx) => {
      const avatarLetter = (rev.name || 'ع').trim().charAt(0);
      const bg = colors[idx % colors.length];
      const starsHtml = Array.from({ length: 5 }, (_, i) => 
        `<i class="fas fa-star" style="color: ${i < (rev.rating || 5) ? '#FFA41C' : '#E5E7EB'};"></i>`
      ).join('');

      return `
        <div class="review-card">
          <i class="fas fa-quote-right quote-icon"></i>
          <div class="review-header">
            <div class="reviewer-avatar" style="background: ${bg};">${avatarLetter}</div>
            <div>
              <h4 class="reviewer-name">${escapeHTML(rev.name)}</h4>
              <span class="reviewer-badge"><i class="fas fa-check-circle"></i> ${escapeHTML(rev.city || 'القاهرة')}</span>
            </div>
          </div>
          <div class="review-stars">
            ${starsHtml}
          </div>
          <p class="review-text">
            "${escapeHTML(rev.comment)}"
          </p>
        </div>
      `;
    }).join('');
  }

  async function loadReviewsFromSupabase() {
    let reviewsList = [];

    try {
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const { data, error } = await supabaseClient
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          reviewsList = data;
        }
      }
    } catch(e) {
      console.warn('Reviews fetch error:', e);
    }

    renderReviews(reviewsList);
    initReviewsCarouselNav();
  }

  // ==========================================
  // 17. Reviews Carousel Navigation & Smooth Scroll
  // ==========================================
  function initReviewsCarouselNav() {
    const track = document.getElementById('reviewsGrid');
    const prevBtn = document.getElementById('reviewsPrevBtn');
    const nextBtn = document.getElementById('reviewsNextBtn');
    if (!track || !prevBtn || !nextBtn) return;

    const getScrollStep = () => {
      const card = track.querySelector('.review-card');
      return card ? card.offsetWidth + 22 : 350;
    };

    prevBtn.onclick = () => {
      // In RTL Arabic layout, prev button is on the right, scrolls rightwards
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    };

    nextBtn.onclick = () => {
      // In RTL Arabic layout, next button is on the left, scrolls leftwards
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    };

    // Touch / Mouse grab scroll helper
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.onmousedown = (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.onmousemove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    };
  }

  // ==========================================
  // 18. Live Categories Sync from Supabase
  // ==========================================
  async function loadCategoriesFromSupabase() {
    try {
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const { data, error } = await supabaseClient
          .from('categories')
          .select('*')
          .order('id', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          const nav = document.getElementById('categoryFilterNav');
          if (nav) {
            const activeFilter = getCurrentCategoryFilter();
            nav.innerHTML = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">كل البيجامات</button>` +
              data.map(c => 
                `<button class="filter-btn ${activeFilter === c.slug ? 'active' : ''}" data-filter="${c.slug}">${c.name}</button>`
              ).join('');
            bindCategoryFilters();
          }
        }
      }
    } catch(e) {
      console.warn('Categories sync:', e);
    }
  }

  // ==========================================
  // 19. Supabase Presence (Live Visitors Tracking)
  // ==========================================
  function initVisitorPresence() {
    try {
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const visitorChannel = supabaseClient.channel('site_presence', {
          config: {
            presence: { key: 'vis_' + Math.random().toString(36).substring(2, 9) }
          }
        });
        visitorChannel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await visitorChannel.track({
              role: 'visitor',
              online_at: new Date().toISOString()
            });
          }
        });
      }
    } catch(e) {
      console.warn('Visitor presence:', e);
    }
  }

  // ==========================================
  // 20. Total Cumulative Visits Counter
  // ==========================================
  async function recordSiteVisit() {
    try {
      if (sessionStorage.getItem('celia_visit_counted')) return;
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const { data } = await supabaseClient
          .from('site_stats')
          .select('value')
          .eq('key', 'total_visits')
          .single();

        if (data) {
          const currentCount = parseInt(data.value, 10) || 0;
          await supabaseClient
            .from('site_stats')
            .update({ value: currentCount + 1, updated_at: new Date().toISOString() })
            .eq('key', 'total_visits');
          sessionStorage.setItem('celia_visit_counted', '1');
        }
      }
    } catch(e) {
      console.warn('Record visit:', e);
    }
  }

  window.handleReviewSubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('revName').value.trim();
    const city = document.getElementById('revCity').value.trim() || 'القاهرة';
    const comment = document.getElementById('revComment').value.trim();
    const submitBtn = document.getElementById('submitReviewBtn');

    if (!name || !comment) {
      showToast('من فضلك اكتبي اسمك ورأيك يا سكر');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري النشر...';

    const newRev = { name, city, rating: currentRating, comment };

    try {
      if (typeof isSupabaseReady === 'function' && isSupabaseReady()) {
        const { error } = await supabaseClient.from('reviews').insert([newRev]);
        if (error) throw error;
      }
      showToast('🎉 شكراً ليكي يا سكر! تم نشر رأيك الجميل 💕');
      document.getElementById('newReviewForm').reset();
      toggleReviewForm();
      await loadReviewsFromSupabase();
    } catch(err) {
      console.warn('Could not save to Supabase:', err.message);
      showToast('حدث خطأ أثناء حفظ الرأي، يرجى المحاولة مرة أخرى');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> نشر الريفيو فوراً';
    }
  };

  // Initialize
  loadProductsFromSupabase();  // async: renders products after cloud fetch
  loadCategoriesFromSupabase();
  updateWishlistUI();
  initStarSelector();
  loadReviewsFromSupabase();
  initReviewsCarouselNav();
  initVisitorPresence();
  recordSiteVisit();
});

