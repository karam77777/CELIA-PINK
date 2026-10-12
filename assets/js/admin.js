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
// Category map
// ==========================================
const CAT_NAMES = {
  cotton:  'موهير بيتي دلع',
  classic: 'بيجامات كلاسيك زراير',
  plaid:   'كاروهات وتريند',
  winter:  'فرو ومخمل شتوي'
};

// ==========================================
// State
// ==========================================
let products   = [];
let reviews    = [];
let editingId  = null;
let deleteTarget = { type: 'product', id: null };

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
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('loginPage').style.display   = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').style.display  = 'none';
}

function showAdminPanel() {
  document.getElementById('loginPage').style.display  = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  loadProducts();
  loadReviews();
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
  if (on) {
    tb.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--gray);">
      <i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:var(--petal);"></i>
      <p style="margin-top:12px;">جاري تحميل المنتجات...</p>
    </td></tr>`;
  }
}

// ==========================================
// Stats
// ==========================================
function updateStats() {
  const statTotal = document.getElementById('statTotal');
  if (statTotal) statTotal.textContent = products.length;

  const cats = new Set(products.map(p => p.category));
  const statCats = document.getElementById('statCats');
  if (statCats) statCats.textContent = cats.size;

  const statReviews = document.getElementById('statReviews');
  if (statReviews) statReviews.textContent = reviews.length;

  const tabBadgeProducts = document.getElementById('tabBadgeProducts');
  if (tabBadgeProducts) tabBadgeProducts.textContent = products.length;

  const tabBadgeReviews = document.getElementById('tabBadgeReviews');
  if (tabBadgeReviews) tabBadgeReviews.textContent = reviews.length;
}

// ==========================================
// Tabs Switching
// ==========================================
window.switchAdminTab = function(tab) {
  const pWrap = document.getElementById('productsSectionWrapper');
  const rWrap = document.getElementById('reviewsSectionWrapper');
  const pBtn  = document.getElementById('tabBtnProducts');
  const rBtn  = document.getElementById('tabBtnReviews');

  if (tab === 'products') {
    if (pWrap) pWrap.style.display = 'block';
    if (rWrap) rWrap.style.display = 'none';
    if (pBtn) pBtn.classList.add('active');
    if (rBtn) rBtn.classList.remove('active');
  } else if (tab === 'reviews') {
    if (pWrap) pWrap.style.display = 'none';
    if (rWrap) rWrap.style.display = 'block';
    if (rBtn) rBtn.classList.add('active');
    if (pBtn) pBtn.classList.remove('active');
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
      <td><span class="badge-cat">${p.category_name || CAT_NAMES[p.category] || p.category}</span></td>
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
  document.getElementById('fCategory').value          = p.category    || 'cotton';
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
  document.getElementById('fCategory').value   = 'cotton';
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
  const category   = document.getElementById('fCategory').value;
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

  const row = {
    category,
    category_name: CAT_NAMES[category] || category,
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
  } catch(err) {
    adminToast('❌ خطأ: ' + err.message, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<i class="fas fa-save"></i> حفظ المنتج';
  }
}

// ==========================================
// Delete Operations (Products & Reviews)
// ==========================================
window.openDeleteModal = function(id) {
  deleteTarget = { type: 'product', id };
  const title = document.getElementById('deleteModalTitle');
  const text  = document.getElementById('deleteModalText');
  if (title) title.textContent = 'تأكيد حذف المنتج';
  if (text)  text.textContent  = 'هتحذفي المنتج ده من المتجر تماماً. مش هتقدري ترجعيه تاني!';
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
