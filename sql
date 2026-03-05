-- ═══════════════════════════════════════════════════════════════
-- GroupsMix v3.1 — Supabase Schema
-- Run ENTIRE script in SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Helper Functions (must be created BEFORE RLS policies) ──

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE auth_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_my_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM users
    WHERE auth_id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ─── USERS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  gxp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_spent NUMERIC(10,2) DEFAULT 0,
  first_purchase BOOLEAN DEFAULT FALSE,
  referral_code TEXT DEFAULT '',
  unread_notifications INTEGER DEFAULT 0,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── GROUPS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 3 AND 100),
  link TEXT NOT NULL,
  platform TEXT NOT NULL,
  platform_type TEXT DEFAULT 'group',
  category TEXT NOT NULL,
  country TEXT DEFAULT 'GLOBAL',
  city TEXT DEFAULT '',
  language TEXT DEFAULT 'English',
  description TEXT NOT NULL CHECK (char_length(description) >= 30),
  tags TEXT[] DEFAULT '{}',
  search_terms TEXT[] DEFAULT '{}',
  submitter_uid UUID REFERENCES users(id),
  submitter_email TEXT DEFAULT '',
  status TEXT DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'rejected', 'removed')),
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  reports INTEGER DEFAULT 0,
  trust_score INTEGER DEFAULT 0,
  ranking_score NUMERIC(10,2) DEFAULT 0,
  avg_rating NUMERIC(3,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  vip_tier TEXT DEFAULT 'none' CHECK (vip_tier IN ('none', 'verified', 'niche', 'global', 'diamond')),
  vip_expiry TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- ─── PENDING ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pending (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  platform TEXT NOT NULL,
  platform_type TEXT DEFAULT 'group',
  category TEXT NOT NULL,
  country TEXT DEFAULT 'GLOBAL',
  city TEXT DEFAULT '',
  language TEXT DEFAULT 'English',
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  search_terms TEXT[] DEFAULT '{}',
  submitter_uid UUID REFERENCES users(id),
  submitter_email TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  admin_note TEXT DEFAULT '',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── REVIEWS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  uid UUID REFERENCES users(id),
  display_name TEXT DEFAULT 'Anonymous',
  photo_url TEXT DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT DEFAULT '' CHECK (char_length(text) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── REPORTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  reporter_uid UUID REFERENCES users(id),
  reason TEXT DEFAULT '',
  details TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  action TEXT DEFAULT '',
  resolved_at TIMESTAMPTZ,
  resolved_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PAYMENTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid UUID REFERENCES users(id),
  email TEXT DEFAULT '',
  type TEXT DEFAULT '',
  service TEXT DEFAULT '',
  group_id UUID,
  currency TEXT DEFAULT '',
  amount NUMERIC(10,2) DEFAULT 0,
  tx_hash TEXT DEFAULT '',
  wallet_address TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  rejection_reason TEXT DEFAULT '',
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'info',
  title TEXT DEFAULT '',
  message TEXT DEFAULT '',
  link TEXT DEFAULT '',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONTACTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT DEFAULT '',
  uid UUID,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DONATIONS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid UUID,
  display_name TEXT DEFAULT 'Anonymous',
  message TEXT DEFAULT '',
  currency TEXT DEFAULT '',
  amount NUMERIC(10,2) DEFAULT 0,
  tx_hash TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ARTICLES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  author_uid UUID REFERENCES users(id),
  author_name TEXT DEFAULT '',
  category TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid UUID REFERENCES users(id),
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  link TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  position TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'rejected')),
  impressions INTEGER DEFAULT 0,
  ad_clicks INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADMIN LOG ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  admin_uid UUID,
  admin_email TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONFIG ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value JSONB DEFAULT '{}'
);

-- ─── STATS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  key TEXT PRIMARY KEY,
  total_groups INTEGER DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_countries INTEGER DEFAULT 0
);

-- ─── Initial Data ────────────────────────────────────────────
INSERT INTO stats (key, total_groups, total_users, total_views,
  total_clicks, total_reviews, total_countries)
VALUES ('global', 0, 0, 0, 0, 0, 0)
ON CONFLICT (key) DO NOTHING;

INSERT INTO config (key, value) VALUES ('settings', '{
  "features": {
    "reviews": true, "reports": true, "donate": true,
    "articles": false, "marketplace": false, "jobs": false,
    "store": false, "tools": true, "leaderboard": true,
    "scamWall": true, "referrals": false, "boosts": false
  },
  "announcement": {
    "enabled": false, "text": "", "link": "", "type": "info"
  },
  "crypto": {
    "wallets": { "btc": "", "usdt_trc20": "", "sol": "" }
  },
  "lemonSqueezy": { "storeUrl": "", "products": {} },
  "turnstileSiteKey": "",
  "adSlotLimits": {
    "sidebar": 2, "searchTop": 1,
    "categoryBottom": 1, "profileSimilar": 1
  }
}') ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- RLS Policies — Run AFTER tables and helper functions
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- STATS
CREATE POLICY "stats_select" ON stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "stats_admin" ON stats FOR UPDATE TO authenticated USING (is_admin());

-- CONFIG
CREATE POLICY "config_select" ON config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "config_admin" ON config FOR UPDATE TO authenticated USING (is_admin());

-- USERS
CREATE POLICY "users_select" ON users FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT TO authenticated
  WITH CHECK (auth_id = auth.uid());
CREATE POLICY "users_update" ON users FOR UPDATE TO authenticated
  USING (auth_id = auth.uid() OR is_admin());

-- GROUPS
CREATE POLICY "groups_select" ON groups FOR SELECT TO anon, authenticated
  USING (status = 'approved' OR submitter_uid = get_my_user_id() OR is_admin());
CREATE POLICY "groups_insert" ON groups FOR INSERT TO authenticated
  WITH CHECK (is_admin());
CREATE POLICY "groups_update" ON groups FOR UPDATE TO authenticated
  USING (is_admin());
CREATE POLICY "groups_delete" ON groups FOR DELETE TO authenticated
  USING (is_admin());

-- PENDING
CREATE POLICY "pending_select" ON pending FOR SELECT TO authenticated
  USING (submitter_uid = get_my_user_id() OR is_admin());
CREATE POLICY "pending_insert" ON pending FOR INSERT TO authenticated
  WITH CHECK (submitter_uid = get_my_user_id());
CREATE POLICY "pending_update" ON pending FOR UPDATE TO authenticated
  USING (is_admin());
CREATE POLICY "pending_delete" ON pending FOR DELETE TO authenticated
  USING (is_admin());

-- REVIEWS
CREATE POLICY "reviews_select" ON reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "reviews_insert" ON reviews FOR INSERT TO authenticated
  WITH CHECK (uid = get_my_user_id());
CREATE POLICY "reviews_delete" ON reviews FOR DELETE TO authenticated
  USING (is_admin());

-- REPORTS
CREATE POLICY "reports_select" ON reports FOR SELECT TO authenticated
  USING (is_admin());
CREATE POLICY "reports_insert" ON reports FOR INSERT TO authenticated
  WITH CHECK (reporter_uid = get_my_user_id());
CREATE POLICY "reports_update" ON reports FOR UPDATE TO authenticated
  USING (is_admin());

-- PAYMENTS
CREATE POLICY "payments_select" ON payments FOR SELECT TO authenticated
  USING (uid = get_my_user_id() OR is_admin());
CREATE POLICY "payments_insert" ON payments FOR INSERT TO authenticated
  WITH CHECK (uid = get_my_user_id());
CREATE POLICY "payments_update" ON payments FOR UPDATE TO authenticated
  USING (is_admin());

-- NOTIFICATIONS
CREATE POLICY "notif_select" ON notifications FOR SELECT TO authenticated
  USING (uid = get_my_user_id());
CREATE POLICY "notif_insert" ON notifications FOR INSERT TO authenticated
  WITH CHECK (uid = get_my_user_id() OR is_admin());
CREATE POLICY "notif_update" ON notifications FOR UPDATE TO authenticated
  USING (uid = get_my_user_id());

-- CONTACTS
CREATE POLICY "contacts_insert" ON contacts FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "contacts_select" ON contacts FOR SELECT TO authenticated
  USING (is_admin());
CREATE POLICY "contacts_update" ON contacts FOR UPDATE TO authenticated
  USING (is_admin());

-- DONATIONS
CREATE POLICY "donations_select" ON donations FOR SELECT TO anon, authenticated
  USING (status = 'verified' OR is_admin());
CREATE POLICY "donations_insert" ON donations FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "donations_update" ON donations FOR UPDATE TO authenticated
  USING (is_admin());

-- ARTICLES
CREATE POLICY "articles_select" ON articles FOR SELECT TO anon, authenticated
  USING (status = 'published' OR is_admin());
CREATE POLICY "articles_insert" ON articles FOR INSERT TO authenticated
  WITH CHECK (is_admin());
CREATE POLICY "articles_update" ON articles FOR UPDATE TO authenticated
  USING (is_admin());
CREATE POLICY "articles_delete" ON articles FOR DELETE TO authenticated
  USING (is_admin());

-- ADS
CREATE POLICY "ads_select" ON ads FOR SELECT TO anon, authenticated
  USING (status = 'active' OR uid = get_my_user_id() OR is_admin());
CREATE POLICY "ads_insert" ON ads FOR INSERT TO authenticated
  WITH CHECK (is_admin());
CREATE POLICY "ads_update" ON ads FOR UPDATE TO authenticated
  USING (is_admin());
CREATE POLICY "ads_delete" ON ads FOR DELETE TO authenticated
  USING (is_admin());

-- ADMIN LOG (append-only: no update, no delete)
CREATE POLICY "admin_log_select" ON admin_log FOR SELECT TO authenticated
  USING (is_admin());
CREATE POLICY "admin_log_insert" ON admin_log FOR INSERT TO authenticated
  WITH CHECK (is_admin());

-- ═══════════════════════════════════════════════════════════════
-- RPC Functions — Run AFTER tables and RLS
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION increment_views(p_group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE groups SET views = views + 1
    WHERE id = p_group_id AND status = 'approved';
  UPDATE stats SET total_views = total_views + 1
    WHERE key = 'global';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_clicks(p_group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE groups SET clicks = clicks + 1
    WHERE id = p_group_id AND status = 'approved';
  UPDATE stats SET total_clicks = total_clicks + 1
    WHERE key = 'global';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_reports(p_group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE groups SET reports = reports + 1 WHERE id = p_group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION add_gxp(p_user_id UUID, p_amount INTEGER)
RETURNS VOID AS $$
DECLARE
  new_gxp INTEGER;
  new_level INTEGER;
BEGIN
  UPDATE users SET gxp = gxp + p_amount
    WHERE id = p_user_id
    RETURNING gxp INTO new_gxp;
  new_level := CASE
    WHEN new_gxp >= 5000 THEN 7
    WHEN new_gxp >= 2000 THEN 6
    WHEN new_gxp >= 1000 THEN 5
    WHEN new_gxp >= 600  THEN 4
    WHEN new_gxp >= 300  THEN 3
    WHEN new_gxp >= 100  THEN 2
    ELSE 1
  END;
  UPDATE users SET level = new_level WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION approve_group(p_pending_id UUID)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
  r pending%ROWTYPE;
BEGIN
  IF NOT is_admin() THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  SELECT * INTO r FROM pending WHERE id = p_pending_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not found'; END IF;
  INSERT INTO groups (
    name, link, platform, platform_type, category, country, city,
    language, description, tags, search_terms, submitter_uid,
    submitter_email, status, submitted_at, approved_at
  ) VALUES (
    r.name, r.link, r.platform, r.platform_type, r.category,
    r.country, r.city, r.language, r.description, r.tags,
    r.search_terms, r.submitter_uid, r.submitter_email,
    'approved', r.submitted_at, NOW()
  ) RETURNING id INTO new_id;
  DELETE FROM pending WHERE id = p_pending_id;
  UPDATE stats SET total_groups = total_groups + 1 WHERE key = 'global';
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_review_stats(p_group_id UUID, p_new_rating INTEGER)
RETURNS VOID AS $$
DECLARE
  old_count INTEGER;
  old_avg NUMERIC;
BEGIN
  SELECT review_count, avg_rating INTO old_count, old_avg
    FROM groups WHERE id = p_group_id;
  UPDATE groups SET
    review_count = COALESCE(old_count, 0) + 1,
    avg_rating = ROUND(
      ((COALESCE(old_avg, 0) * COALESCE(old_count, 0)) + p_new_rating)
      / (COALESCE(old_count, 0) + 1), 1)
  WHERE id = p_group_id;
  UPDATE stats SET total_reviews = total_reviews + 1 WHERE key = 'global';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_article_views(p_article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles SET views = views + 1
    WHERE id = p_article_id AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_ad_impressions(p_ad_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ads SET impressions = impressions + 1
    WHERE id = p_ad_id AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_ad_clicks(p_ad_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ads SET ad_clicks = ad_clicks + 1
    WHERE id = p_ad_id AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION check_duplicate_link(p_link TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM groups WHERE link = p_link
    UNION ALL
    SELECT 1 FROM pending WHERE link = p_link AND status = 'pending'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_user_count()
RETURNS VOID AS $$
BEGIN
  UPDATE stats SET total_users = total_users + 1 WHERE key = 'global';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── Grant permissions ───────────────────────────────────────
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION get_my_user_id() TO authenticated;
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_clicks(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_reports(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION add_gxp(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION approve_group(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_review_stats(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_article_views(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_ad_impressions(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_ad_clicks(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION check_duplicate_link(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_user_count() TO authenticated;

-- ═══════════════════════════════════════════════════════════════
-- Indexes — Run AFTER tables
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_groups_status ON groups(status);
CREATE INDEX IF NOT EXISTS idx_groups_status_ranking ON groups(status, ranking_score DESC);
CREATE INDEX IF NOT EXISTS idx_groups_status_views ON groups(status, views DESC);
CREATE INDEX IF NOT EXISTS idx_groups_status_approved ON groups(status, approved_at DESC);
CREATE INDEX IF NOT EXISTS idx_groups_status_rating ON groups(status, avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_groups_status_vip ON groups(status, vip_tier);
CREATE INDEX IF NOT EXISTS idx_groups_platform ON groups(platform);
CREATE INDEX IF NOT EXISTS idx_groups_category ON groups(category);
CREATE INDEX IF NOT EXISTS idx_groups_country ON groups(country);
CREATE INDEX IF NOT EXISTS idx_groups_submitter ON groups(submitter_uid);
CREATE INDEX IF NOT EXISTS idx_groups_link ON groups(link);
CREATE INDEX IF NOT EXISTS idx_groups_search ON groups USING GIN(search_terms);

CREATE INDEX IF NOT EXISTS idx_pending_status ON pending(status);
CREATE INDEX IF NOT EXISTS idx_pending_submitted ON pending(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_pending_link ON pending(link);

CREATE INDEX IF NOT EXISTS idx_reviews_group ON reviews(group_id);
CREATE INDEX IF NOT EXISTS idx_reviews_uid ON reviews(uid);

CREATE INDEX IF NOT EXISTS idx_notifications_uid ON notifications(uid);
CREATE INDEX IF NOT EXISTS idx_notifications_uid_read ON notifications(uid, read);

CREATE INDEX IF NOT EXISTS idx_payments_uid ON payments(uid);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

CREATE INDEX IF NOT EXISTS idx_ads_status_position ON ads(status, position);

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

CREATE INDEX IF NOT EXISTS idx_admin_log_created ON admin_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_users_auth ON users(auth_id);
CREATE INDEX IF NOT EXISTS idx_users_gxp ON users(gxp DESC);
