/**
 * CELIA PINK – Admin Panel (Supabase Edition)
 * Full CRUD via Supabase REST API
 */

// ==========================================
// ADMIN CREDENTIALS – غيري الباسورد هنا
// ==========================================
const ADMIN_CREDENTIALS = {
  username: 'celiapink',
  password:  'celia2026@'
};
const AUTH_KEY = 'celia_admin_auth';

// ==========================================
// Category State & Defaults
// ==========================================
const DEFAULT_CATEGORIES = [
  { id: 1, slug: 'cotton',  name: 'موهير بيتي دلع',      icon: 'fas fa-feather-alt' },
  { id: 2, slug: 'classic', name: 'بيجامات كلاسيك زراير', icon: 'fas fa-crown' },
  { id: 3, slug: 'plaid',   name: 'كاروهات وتريند',      icon: 'fas fa-star' },
  { id: 4, slug: 'winter',  name: 'فرو ومخمل شتوي',      icon: 'fas fa-snowflake' }
];

// Quick lookup fallback
function getCategoryName(slug) {
  const found = categories.find(c => c.slug === slug);
  return found ? found.name : slug;
}

// ==========================================
// State
// ==========================================
let products     = [];
let categories   = [...DEFAULT_CATEGORIES];
let reviews      = [];
let editingId    = null;
let editingCatId = null;
let deleteTarget = { type: 'product', id: null };
let adminPresenceChannel = null;

// ==========================================
// DB helpers (Supabase)
// ==========================================
async function dbFetchProducts() {
  if (!isSupabaseReady()) {
    adminToast('⚠️ Supabase غير مهيأ – شوفي supabase-config.js', 'error');
    return [];
  }
  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  if (error) { adminToast('خطأ في تحميل المنتجات: ' + error.message, 'error'); return []; }
  return data || [];
}

async function dbInsertProduct(row) {
  const { data, error } = await supabaseClient
    .from('products')
    .insert([row])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function dbUpdateProduct(id, row) {
  const { error } = await supabaseClient
    .from('products')
    .update(row)
    .eq('id', id);
  if (error) throw error;
}

async function dbDeleteProduct(id) {
  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Categories DB Helpers
async function dbFetchCategories() {
  if (!isSupabaseReady()) return DEFAULT_CATEGORIES;
  try {
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    if (error) {
      console.warn('Categories fetch error:', error.message);
      return DEFAULT_CATEGORIES;
    }
    return (data && data.length > 0) ? data : DEFAULT_CATEGORIES;
  } catch(e) {
    return DEFAULT_CATEGORIES;
  }
}

async function dbInsertCategory(row) {
  const { data, error } = await supabaseClient
    .from('categories')
    .insert([row])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function dbUpdateCategory(id, row) {
  const { error } = await supabaseClient
    .from('categories')
    .update(row)
    .eq('id', id);
  if (error) throw error;
}

async function dbDeleteCategory(id) {
  const { error } = await supabaseClient
    .from('categories')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Reviews DB Helpers
async function dbFetchReviews() {
  if (!isSupabaseReady()) return [];
  try {
    const { data, error } = await supabaseClient
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Reviews fetch error:', error.message);
      return [];
    }
    return data || [];
  } catch(e) {
    return [];
  }
}

async function dbDeleteReview(id) {
  const { error } = await supabaseClient
    .from('reviews')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Site Stats & Presence Helpers
async function loadSiteStats() {
  try {
    if (!isSupabaseReady()) return;
    const { data, error } = await supabaseClient
      .from('site_stats')
      .select('value')
      .eq('key', 'total_visits')
      .single();
    if (!error && data && document.getElementById('statTotalVisits')) {
      document.getElementById('statTotalVisits').textContent = Number(data.value).toLocaleString('ar-EG');
    }
  } catch(e) {
    console.warn('Could not load site stats:', e);
  }
}

function initPresenceMonitoring() {
  if (!isSupabaseReady()) return;
  if (adminPresenceChannel) {
    try { supabaseClient.removeChannel(adminPresenceChannel); } catch(e){}
  }

  try {
    adminPresenceChannel = supabaseClient.channel('site_presence');
    adminPresenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = adminPresenceChannel.presenceState();
        const count = Object.keys(state).length;
        const el = document.getElementById('statLiveCount');
        if (el) el.textContent = Math.max(1, count);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await adminPresenceChannel.track({
            role: 'admin',
            online_at: new Date().toISOString()
          });
        }
      });
  } catch(e) {
    console.warn('Presence init:', e);
  }
}

// ==========================================
// Auth
// ==========================================
function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem(AUTH_KEY, '1');
    showAdminPanel();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function doLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  if (adminPresenceChannel) {
    try { supabaseClient.removeChannel(adminPresenceChannel); } catch(e){}
  }
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('loginPage').style.display   = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').style.display  = 'none';
}

function showAdminPanel() {
  document.getElementById('loginPage').style.display  = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  loadCategories();
  loadProducts();
  loadReviews();
  loadSiteStats();
  initPresenceMonitoring();
}

document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

// ==========================================
// Load Products
// ==========================================
async function loadProducts() {
  showTableLoading(true);
  products = await dbFetchProducts();
  showTableLoading(false);
  updateStats();
  renderTable();
}

function showTableLoading(on) {
  const tb = document.getElementById('productsTableBody');
  if (tb && on) {
    tb.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--gray);">
      <i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:var(--petal);"></i>
      <p style="margin-top:12px;">جاري تحميل المنتجات...</p>
    </td></tr>`;
  }
}

// ==========================================
// Categories Management
// ==========================================
async function loadCategories() {
  categories = await dbFetchCategories();
  populateCategorySelects();
  updateStats();
  renderCategoriesTable();
}

function populateCategorySelects() {
  const fCategory = document.getElementById('fCategory');
  const filterCat = document.getElementById('filterCat');

  if (fCategory) {
    const currentVal = fCategory.value;
    fCategory.innerHTML = categories.map(c => 
      `<option value="${c.slug}">${c.name}</option>`
    ).join('');
    if (currentVal && categories.some(c => c.slug === currentVal)) {
      fCategory.value = currentVal;
    }
  }

  if (filterCat) {
    const currentFilter = filterCat.value || 'all';
    filterCat.innerHTML = `<option value="all">كل الأقسام</option>` +
      categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
    if (currentFilter && (currentFilter === 'all' || categories.some(c => c.slug === currentFilter))) {
      filterCat.value = currentFilter;
    }
  }
}

window.renderCategoriesTable = function() {
  const tbody = document.getElementById('categoriesTableBody');
  if (!tbody) return;

  if (categories.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fas fa-layer-group"></i><p>لا توجد أقسام مسجلة 🌸</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = categories.map((c, i) => {
    const prodCount = products.filter(p => p.category === c.slug).length;
    return `
      <tr>
        <td style="color:var(--gray);font-size:0.82rem;">${i + 1}</td>
        <td style="font-weight:700;">${c.name}</td>
        <td><span class="badge-cat" style="font-family:monospace;">${c.slug}</span></td>
        <td><strong>${prodCount}</strong> منتج</td>
        <td style="white-space:nowrap;">
          <button class="btn-edit" onclick="openEditCategoryModal(${c.id})">
            <i class="fas fa-pen"></i> تعديل
          </button>
          <button class="btn-delete" onclick="openDeleteCategoryModal(${c.id})">
            <i class="fas fa-trash-alt"></i> حذف
          </button>
        </td>
      </tr>
    `;
  }).join('');
};

window.openAddCategoryModal = function() {
  editingCatId = null;
  document.getElementById('categoryModalTitle').textContent = 'إضافة قسم جديد 🌸';
  document.getElementById('fCatName').value = '';
  document.getElementById('fCatSlug').value = '';
  document.getElementById('categoryModal').classList.add('open');
};

window.openEditCategoryModal = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;
  editingCatId = id;
  document.getElementById('categoryModalTitle').textContent = 'تعديل القسم';
  document.getElementById('fCatName').value = cat.name;
  document.getElementById('fCatSlug').value = cat.slug;
  document.getElementById('categoryModal').classList.add('open');
};

window.closeCategoryModal = function() {
  document.getElementById('categoryModal').classList.remove('open');
  editingCatId = null;
};

window.autoGenerateCatSlug = function() {
  if (editingCatId) return;
  const name = document.getElementById('fCatName').value.trim();
  const slugInput = document.getElementById('fCatSlug');
  if (!slugInput) return;
  const latin = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (latin) {
    slugInput.value = latin;
  } else if (!slugInput.value) {
    // If arabic only and no slug typed yet, suggest 'cat-' + timestamp
    slugInput.placeholder = 'مثال: category-' + Math.floor(Math.random() * 100);
  }
};

window.saveCategory = async function() {
  const name = document.getElementById('fCatName').value.trim();
  let slug = document.getElementById('fCatSlug').value.trim().toLowerCase();

  if (!name) {
    adminToast('❌ اكتبي اسم القسم الأول!', 'error');
    document.getElementById('fCatName').focus();
    return;
  }

  if (!slug) {
    slug = 'cat-' + Date.now().toString(36);
  }

  slug = slug.replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');

  const saveBtn = document.querySelector('#categoryModal .btn-save');
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

  try {
    if (editingCatId !== null) {
      await dbUpdateCategory(editingCatId, { name, slug });
      adminToast('✅ تم تعديل القسم بنجاح!', 'success');
    } else {
      await dbInsertCategory({ name, slug });
      adminToast('🎉 تم إضافة القسم الجديد بنجاح!', 'success');
    }
    closeCategoryModal();
    await loadCategories();
    renderTable();
  } catch(err) {
    adminToast('❌ خطأ في حفظ القسم: ' + err.message, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<i class="fas fa-save"></i> حفظ القسم';
  }
};

// ==========================================
// Stats
// ==========================================
function updateStats() {
  const statTotal = document.getElementById('statTotal');
  if (statTotal) statTotal.textContent = products.length;

  const statCats = document.getElementById('statCats');
  if (statCats) statCats.textContent = categories.length;

  const statReviews = document.getElementById('statReviews');
  if (statReviews) statReviews.textContent = reviews.length;

  const tabBadgeProducts = document.getElementById('tabBadgeProducts');
  if (tabBadgeProducts) tabBadgeProducts.textContent = products.length;

  const tabBadgeCategories = document.getElementById('tabBadgeCategories');
  if (tabBadgeCategories) tabBadgeCategories.textContent = categories.length;

  const tabBadgeReviews = document.getElementById('tabBadgeReviews');
  if (tabBadgeReviews) tabBadgeReviews.textContent = reviews.length;
}

// ==========================================
// Tabs Switching
// ==========================================
window.switchAdminTab = function(tab) {
  const pWrap = document.getElementById('productsSectionWrapper');
  const cWrap = document.getElementById('categoriesSectionWrapper');
  const rWrap = document.getElementById('reviewsSectionWrapper');
  const pBtn  = document.getElementById('tabBtnProducts');
  const cBtn  = document.getElementById('tabBtnCategories');
  const rBtn  = document.getElementById('tabBtnReviews');

  if (pWrap) pWrap.style.display = (tab === 'products') ? 'block' : 'none';
  if (cWrap) cWrap.style.display = (tab === 'categories') ? 'block' : 'none';
  if (rWrap) rWrap.style.display = (tab === 'reviews') ? 'block' : 'none';

  if (pBtn) pBtn.classList.toggle('active', tab === 'products');
  if (cBtn) cBtn.classList.toggle('active', tab === 'categories');
  if (rBtn) rBtn.classList.toggle('active', tab === 'reviews');

  if (tab === 'categories') {
    loadCategories();
  } else if (tab === 'reviews') {
    loadReviews();
  }
};

// ==========================================
// Load & Render Reviews
// ==========================================
async function loadReviews() {
  const tbody = document.getElementById('reviewsTableBody');
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--gray);">
      <i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:var(--petal);"></i>
      <p style="margin-top:8px;">جاري تحميل التعليقات...</p>
    </td></tr>`;
  }
  reviews = await dbFetchReviews();
  updateStats();
  renderReviewsTable();
}

window.renderReviewsTable = function() {
  const searchInput = document.getElementById('searchReviewsInput');
  const search = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = reviews.filter(r => {
    return (r.name || '').toLowerCase().includes(search) ||
           (r.comment || '').toLowerCase().includes(search) ||
           (r.city || '').toLowerCase().includes(search);
  });

  const tbody = document.getElementById('reviewsTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <i class="fas fa-comments"></i>
        <p>لا توجد تعليقات مطابقة 🌸</p>
      </div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r, i) => {
    const stars = '⭐'.repeat(r.rating || 5);
    const dateStr = r.created_at ? new Date(r.created_at).toLocaleDateString('ar-EG') : 'الآن';

    return `
      <tr>
        <td style="color:var(--gray);font-size:0.82rem;">${i + 1}</td>
        <td style="font-weight:700;">${r.name || 'عميل'}</td>
        <td><span class="badge-cat">${r.city || 'القاهرة'}</span></td>
        <td>${stars}</td>
        <td style="max-width:320px; line-height:1.5;">${r.comment || ''}</td>
        <td style="color:var(--gray); font-size:0.82rem;">${dateStr}</td>
        <td style="white-space:nowrap;">
          <button class="btn-delete" onclick="openDeleteReviewModal(${r.id})">
            <i class="fas fa-trash-alt"></i> حذف التعليق
          </button>
        </td>
      </tr>
    `;
  }).join('');
};

// ==========================================
// Render Table
// ==========================================
function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const cat    = document.getElementById('filterCat').value;

  const filtered = products.filter(p => {
    const matchSearch = (p.title || '').toLowerCase().includes(search) ||
                        (p.desc  || '').toLowerCase().includes(search);
    const matchCat    = cat === 'all' || p.category === cat;
    return matchSearch && matchCat;
  });

  const tbody = document.getElementById('productsTableBody');

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>مفيش منتجات هنا دلوقتي 🌸</p>
      </div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((p, i) => `
    <tr>
      <td style="color:var(--gray);font-size:0.82rem;">${i + 1}</td>
      <td>
        ${p.image
          ? `<img class="prod-img-thumb" src="${p.image}" alt="${p.title}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
             <div class="prod-img-placeholder" style="display:none;"><i class="fas fa-image"></i></div>`
          : `<div class="prod-img-placeholder"><i class="fas fa-image"></i></div>`}
      </td>
      <td style="font-weight:700;max-width:220px;">${p.title}</td>
      <td><span class="badge-cat">${p.category_name || getCategoryName(p.category) || p.category}</span></td>
      <td style="font-weight:800;color:var(--deep-pink);">${p.price} ج.م</td>
      <td>⭐ ${p.rating}</td>
      <td style="white-space:nowrap;">
        <button class="btn-edit" onclick="openEditModal(${p.id})">
          <i class="fas fa-pen"></i> تعديل
        </button>
        <button class="btn-delete" onclick="openDeleteModal(${p.id})">
          <i class="fas fa-trash-alt"></i> حذف
        </button>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// Add / Edit Modal
// ==========================================
function openAddModal() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'إضافة منتج جديد 🌸';
  clearForm();
  document.getElementById('productModal').classList.add('open');
}

function openEditModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('modalTitle').textContent   = 'تعديل المنتج';
  document.getElementById('fTitle').value             = p.title       || '';
  document.getElementById('fCategory').value          = p.category    || (categories[0]?.slug || 'cotton');
  document.getElementById('fPrice').value             = p.price       || 250;
  document.getElementById('fOldPrice').value          = p.old_price   || 350;
  document.getElementById('fDesc').value              = p.desc        || '';
  document.getElementById('fImage').value             = p.image       || '';
  document.getElementById('fBadge').value             = p.badge       || '';
  document.getElementById('fBadgeType').value         = p.badge_type  || 'hot';
  document.getElementById('fRating').value            = p.rating      || 4.9;
  document.getElementById('fReviews').value           = p.reviews_count || 30;
  previewImage();
  document.getElementById('productModal').classList.add('open');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  clearForm();
  editingId = null;
}

function clearForm() {
  ['fTitle','fDesc','fImage','fBadge'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fCategory').value   = categories[0]?.slug || 'cotton';
  document.getElementById('fPrice').value      = 250;
  document.getElementById('fOldPrice').value   = 350;
  document.getElementById('fBadgeType').value  = 'hot';
  document.getElementById('fRating').value     = 4.9;
  document.getElementById('fReviews').value    = 30;
  document.getElementById('imgPreview').style.display = 'none';
  document.getElementById('imgPreview').src = '';
  const fileInput = document.getElementById('fImageFile');
  if (fileInput) fileInput.value = '';
  const nameDisp = document.getElementById('fileNameDisplay');
  if (nameDisp) nameDisp.textContent = '';
}

function handleImageFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  const nameDisp = document.getElementById('fileNameDisplay');
  if (nameDisp) nameDisp.textContent = file.name;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('fImage').value = e.target.result;
    previewImage();
  };
  reader.readAsDataURL(file);
}

function previewImage() {
  const url     = document.getElementById('fImage').value.trim();
  const preview = document.getElementById('imgPreview');
  if (url) { preview.src = url; preview.style.display = 'block'; }
  else      { preview.style.display = 'none'; preview.src = ''; }
}

async function saveProduct() {
  const title      = document.getElementById('fTitle').value.trim();
  const category   = document.getElementById('fCategory').value || (categories[0]?.slug || 'cotton');
  const price      = parseInt(document.getElementById('fPrice').value)    || 250;
  const old_price  = parseInt(document.getElementById('fOldPrice').value) || 350;
  const desc       = document.getElementById('fDesc').value.trim();
  const image      = document.getElementById('fImage').value.trim();
  const badge      = document.getElementById('fBadge').value.trim();
  const badge_type = document.getElementById('fBadgeType').value;
  const rating     = parseFloat(document.getElementById('fRating').value) || 4.9;
  const reviews_count = parseInt(document.getElementById('fReviews').value) || 30;

  if (!title) {
    adminToast('❌ اكتبي اسم المنتج الأول!', 'error');
    document.getElementById('fTitle').focus();
    return;
  }

  const category_name = getCategoryName(category);

  const row = {
    category,
    category_name,
    title, price, old_price, desc, image, badge, badge_type,
    rating, reviews_count,
    sizes: ['One Size']
  };

  const saveBtn = document.querySelector('#productModal .btn-save');
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

  try {
    if (editingId !== null) {
      await dbUpdateProduct(editingId, row);
      adminToast('✅ تم تعديل المنتج بنجاح!', 'success');
    } else {
      await dbInsertProduct(row);
      adminToast('✅ تم إضافة المنتج للمتجر!', 'success');
    }
    closeModal();
    await loadProducts();
    updateStats();
    renderCategoriesTable();
  } catch(err) {
    adminToast('❌ خطأ: ' + err.message, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<i class="fas fa-save"></i> حفظ المنتج';
  }
}

// ==========================================
// Delete Operations (Products, Categories & Reviews)
// ==========================================
window.openDeleteModal = function(id) {
  deleteTarget = { type: 'product', id };
  const title = document.getElementById('deleteModalTitle');
  const text  = document.getElementById('deleteModalText');
  if (title) title.textContent = 'تأكيد حذف المنتج';
  if (text)  text.textContent  = 'هتحذفي المنتج ده من المتجر تماماً. مش هتقدري ترجعيه تاني!';
  document.getElementById('deleteModal').classList.add('open');
};

window.openDeleteCategoryModal = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;
  const count = products.filter(p => p.category === cat.slug).length;
  deleteTarget = { type: 'category', id, slug: cat.slug };
  const title = document.getElementById('deleteModalTitle');
  const text  = document.getElementById('deleteModalText');
  if (title) title.textContent = `تأكيد حذف قسم "${cat.name}"`;
  if (text) {
    text.textContent = count > 0
      ? `تحذير: هذا القسم مرتبط بـ ${count} منتج في المتجر! هل أنتِ متأكدة تماماً من حذفه؟`
      : `هل أنتِ متأكدة من حذف هذا القسم؟ لن يظهر مجدداً في قوائم وفلاتر المتجر.`;
  }
  document.getElementById('deleteModal').classList.add('open');
};

window.openDeleteReviewModal = function(id) {
  deleteTarget = { type: 'review', id };
  const title = document.getElementById('deleteModalTitle');
  const text  = document.getElementById('deleteModalText');
  if (title) title.textContent = 'تأكيد حذف التعليق';
  if (text)  text.textContent  = 'هل أنتِ متأكدة من حذف هذا التعليق؟ سيتم مسحه فوراً ولن يظهر في المتجر.';
  document.getElementById('deleteModal').classList.add('open');
};

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('open');
  deleteTarget = { type: 'product', id: null };
}

async function confirmDelete() {
  if (!deleteTarget.id) return;
  const btn = document.querySelector('.btn-delete-confirm');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  try {
    if (deleteTarget.type === 'product') {
      await dbDeleteProduct(deleteTarget.id);
      closeDeleteModal();
      adminToast('🗑️ تم حذف المنتج بنجاح', 'success');
      await loadProducts();
      renderCategoriesTable();
    } else if (deleteTarget.type === 'category') {
      await dbDeleteCategory(deleteTarget.id);
      closeDeleteModal();
      adminToast('🗑️ تم حذف القسم بنجاح', 'success');
      await loadCategories();
      renderTable();
    } else if (deleteTarget.type === 'review') {
      await dbDeleteReview(deleteTarget.id);
      closeDeleteModal();
      adminToast('🗑️ تم حذف التعليق بنجاح من المتجر', 'success');
      await loadReviews();
    }
  } catch(err) {
    adminToast('❌ خطأ في الحذف: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-trash-alt"></i> حذف نهائي';
  }
}

// Close modals on overlay click
document.getElementById('productModal').addEventListener('click', function(e) { if (e.target===this) closeModal(); });
document.getElementById('categoryModal')?.addEventListener('click', function(e) { if (e.target===this) closeCategoryModal(); });
document.getElementById('deleteModal').addEventListener('click',  function(e) { if (e.target===this) closeDeleteModal(); });

// ==========================================
// Toast
// ==========================================
let toastTimer;
function adminToast(msg, type = '') {
  const el = document.getElementById('adminToast');
  el.textContent = msg;
  el.className = 'admin-toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}

// ==========================================
// Init
// ==========================================
(function init() {
  if (!isSupabaseReady()) {
    adminToast('⚠️ افتحي supabase-config.js وضعي بياناتك', 'error');
  }
  if (sessionStorage.getItem(AUTH_KEY) === '1') showAdminPanel();
})();
