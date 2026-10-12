-- ====================================================
-- CELIA PINK – Supabase Database Setup
-- شغلي الكود ده في: Supabase → SQL Editor → New Query
-- ====================================================

-- 1. إنشاء جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
  id             BIGSERIAL PRIMARY KEY,
  title          TEXT          NOT NULL,
  category       TEXT          NOT NULL DEFAULT 'cotton',
  category_name  TEXT,
  price          INTEGER       NOT NULL DEFAULT 250,
  old_price      INTEGER                DEFAULT 350,
  rating         NUMERIC(3,1)           DEFAULT 4.9,
  reviews_count  INTEGER                DEFAULT 30,
  badge          TEXT,
  badge_type     TEXT                   DEFAULT 'hot',
  sizes          TEXT[]                 DEFAULT ARRAY['One Size'],
  image          TEXT,
  "desc"         TEXT,
  created_at     TIMESTAMPTZ            DEFAULT NOW()
);

-- 2. تفعيل الحماية والسماح للزوار بالقراءة
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON products;
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- 3. السماح بالكتابة والتعديل والحذف للأدمن
DROP POLICY IF EXISTS "Allow anon write" ON products;
CREATE POLICY "Allow anon write" ON products
  FOR ALL USING (true) WITH CHECK (true);

-- 4. تفريغ وإعادة تعبئة المنتجات الـ 19 الأساسية (لتجنب تكرارها)
TRUNCATE TABLE products RESTART IDENTITY;

INSERT INTO products (title, category, category_name, price, old_price, rating, reviews_count, badge, badge_type, sizes, image, "desc") VALUES
('بيجامة دورايمون كاروهات كحلي في أبيض مريحة', 'plaid', 'كاروهات وتريند', 250, 350, 5.0, 48, 'الأكتر طلباً', 'hot', ARRAY['One Size'], 'assets/images/products/product-1.jpeg', 'بيجامة بنطلون وتيشيرت مريح جداً بنقشة دورايمون المحبوبة وكاروهات كحلي شيك، خامة موهير ناعمة ومريحة لقعدة البيت.'),
('بونشو فرو تايجر شتوي مبطن دافي بشراريب فخمة', 'winter', 'فرو ومخمل شتوي', 250, 350, 4.8, 63, 'الأدفأ في الشتا', 'hot', ARRAY['One Size'], 'assets/images/products/product-2.jpeg', 'بونشو فرو تايجر فخم، بطانة ناعمة دافية جداً، شراريب أنيقة على الأطراف.'),
('بيجامة بيتي كاروهات زيتوني بياقة كلاسيك وأزرار', 'classic', 'بيجامات كلاسيك زراير', 250, 350, 4.9, 42, 'شياكة كلاسيك', 'new', ARRAY['One Size'], 'assets/images/products/product-3.jpeg', 'بيجامة كلاسيكية بأزرار وياقة أنيقة باللون الزيتوني الفاتح والكاروهات الهادي.'),
('بيجامة بازل أبيض في أسود بفيونكات بيبي بلو ناعمة', 'plaid', 'كاروهات وتريند', 250, 350, 4.7, 34, 'موديل كيوت', 'sale', ARRAY['One Size'], 'assets/images/products/product-4.jpeg', 'تصميم مميز بنقشة البازل باللونين الأبيض والأسود مع فيونكات صغيرة.'),
('بيجامة بيبي بلو قطن بنقشة فيونكات رقيقة ودرابيه جانبي', 'cotton', 'موهير بيتي دلع', 250, 350, 4.9, 51, 'أكثر مبيعاً', 'hot', ARRAY['One Size'], 'assets/images/products/product-5.jpeg', 'بيجامة باللون السماوي الهادي مع فيونكة سوداء منقطة وشريط زم جانبي للدلع.'),
('بيجامة بودي سنيكرز فرو أبيض ناعم بقبعة كيوت', 'winter', 'فرو ومخمل شتوي', 250, 350, 5.0, 39, 'الأكيوتست', 'new', ARRAY['One Size'], 'assets/images/products/product-6.jpeg', 'بيجامة بودي سنيكرز من الفرو الأبيض الناعم مع قبعة مدمجة وأذنين كيوت.'),
('بيجامة كاروهات روز بيك موهير شتوي فاخر', 'plaid', 'كاروهات وتريند', 250, 350, 4.9, 45, 'روز بيك 🌸', 'new', ARRAY['One Size'], 'assets/images/products/product-7.jpeg', 'بيجامة كاروهات بدرجات الوردي الهادي والزهري الرومانسي.'),
('بيجامة موهير مخمل شيري ريد كيوت بأزرار قلب', 'classic', 'بيجامات كلاسيك زراير', 250, 350, 5.0, 57, 'الأكثر رومانسية', 'hot', ARRAY['One Size'], 'assets/images/products/product-8.jpeg', 'بيجامة موهير مخملي فاخر باللون الأحمر الشيري الدافي مع أزرار على شكل قلوب ذهبية.'),
('بيجامة موهير كحلي برزبيري بسوستة أمامية شيك', 'cotton', 'موهير بيتي دلع', 250, 350, 4.8, 33, 'دلع نهاري', 'sale', ARRAY['One Size'], 'assets/images/products/product-9.jpeg', 'بيجامة قطعتين من موهير بيتي بلون كحلي بردي مع لمسة برزبيري رقيقة وسوستة أمامية عصرية.'),
('بيجامة فيونكات ستان ودانتيل كريمي ناعم', 'cotton', 'موهير بيتي دلع', 250, 350, 5.0, 68, 'رومانسي 💕', 'hot', ARRAY['One Size'], 'assets/images/products/product-10.jpeg', 'بيجامة ستان كريمي فاخر مع تفاصيل دانتيل ناعمة وفيونكات بيج رقيقة.'),
('بيجامة ستان وردي باللولو والدانتيل للعرايس', 'cotton', 'موهير بيتي دلع', 250, 350, 5.0, 72, 'للعرايس 👰', 'hot', ARRAY['One Size'], 'assets/images/products/product-11.jpeg', 'بيجامة ستان وردي فاتح بتطريز لولو وأطراف دانتيل بيضاء ناعمة.'),
('بيجامة بيتي لافندر مخطط بفيونكة بيبي بلو', 'plaid', 'كاروهات وتريند', 250, 350, 4.8, 29, 'ستايل يومي', 'new', ARRAY['One Size'], 'assets/images/products/product-12.jpeg', 'بيجامة بألوان اللافندر والوردي الفاتح مع خطوط رفيعة وفيونكة بيبي بلو.'),
('بيجامة فرو كيوت بيبي بيج ونقشة دباديب براون', 'winter', 'فرو ومخمل شتوي', 250, 350, 4.9, 41, 'شتوي دافي 🐻', 'new', ARRAY['One Size'], 'assets/images/products/product-13.jpeg', 'بيجامة شتوية من الفرو البيج الناعم مع طبعة دباديب براون لطيفة.'),
('بيجامة موهير رصاصي بفيونكات بيك هادي وكلاسيك', 'classic', 'بيجامات كلاسيك زراير', 250, 350, 4.7, 26, 'إلجانس مودرن', 'sale', ARRAY['One Size'], 'assets/images/products/product-14.jpeg', 'بيجامة رصاصي أنيق بلمسات وردي فاتح وفيونكات مرتبة.'),
('بيجامة موهير ليلك مع ليسيه وردي ناعم شفاف', 'cotton', 'موهير بيتي دلع', 250, 350, 5.0, 60, 'أنوثة رقيقة', 'hot', ARRAY['One Size'], 'assets/images/products/product-15.jpeg', 'بيجامة ليلك أنيقة مع تفاصيل ليسيه شفاف وردي لطيف.'),
('بيجامة بيتي موهير فيروزي صاف بكيس هدية', 'cotton', 'موهير بيتي دلع', 250, 350, 4.9, 37, 'هدية مثالية', 'new', ARRAY['One Size'], 'assets/images/products/product-16.jpeg', 'بيجامة فيروزية صافية من الموهير الناعم، تيجي مع كيس هدية أنيق.'),
('بيجامة كحلي كاروهات كلاسيك بياقة مبطنة وأزرار', 'classic', 'بيجامات كلاسيك زراير', 250, 350, 4.9, 44, 'تريند ثابت', 'hot', ARRAY['One Size'], 'assets/images/products/product-17.jpeg', 'الموديل الكلاسيكي الكحلي بكاروهات متناسقة وأزرار كاملة مع ياقة مبطنة.'),
('بيجامة ميلتون صفراء دافية بنقشة كتاكيت بيضاء كيوت', 'winter', 'فرو ومخمل شتوي', 250, 350, 5.0, 52, 'دفا ومرح 🐥', 'hot', ARRAY['One Size'], 'assets/images/products/product-18.jpeg', 'بيجامة شتوية صفراء مبهجة بخامة ميلتون قطيفة دافية جداً، طبعة كتاكيت بيضاء كيوت.'),
('بيجامة بيج مقلمة كلاسيك بنقشة تيدي بير وفيونكات', 'classic', 'بيجامات كلاسيك زراير', 250, 350, 5.0, 58, 'الأكثر طلباً للعرايس', 'hot', ARRAY['One Size'], 'assets/images/products/product-19.jpeg', 'بيجامة بيج مقلمة رفيع بنقشات تيدي بير وفيونكات بنية راقية، ياقة كلاسيك وأزرار أنيقة.');
