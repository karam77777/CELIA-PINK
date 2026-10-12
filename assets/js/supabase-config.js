/**
 * CELIA PINK – Supabase Configuration
 * ⚠️  ضعي بياناتك من Supabase هنا بعد إنشاء المشروع
 *
 * طريقة الحصول على البيانات:
 *  1. supabase.com → مشروعك → Settings → API
 *  2. انسخي Project URL  وضعيه في SUPABASE_URL
 *  3. انسخي anon public key وضعيه في SUPABASE_ANON_KEY
 */

const SUPABASE_URL      = 'https://qkkkvhpklgrqfygcsdsm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2t2aHBrbGdycWZ5Z2NzZHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MzE0NTQsImV4cCI6MjEwNzQwNzQ1NH0.j2UXzIzq_lrSv6GByHzvwRsUnPElQcF-AycZjXmScPE';

/* ---- لا تعدلي أي حاجة تحت الخط ده ---- */
const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * تحقق أن الاتصال مظبوط
 * بيرجع true لو الـ URL والـ KEY ليسوا placeholder
 */
function isSupabaseReady() {
  return (
    supabaseClient !== null &&
    !SUPABASE_URL.includes('XXXXXXXX') &&
    !SUPABASE_ANON_KEY.includes('XXXX')
  );
}
