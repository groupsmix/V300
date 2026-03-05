// ═══════════════════════════════════════
// MODULE 1: CONFIG
// ═══════════════════════════════════════
const CONFIG = {
    siteName: 'GroupsMix',
    siteUrl: 'https://groupsmix.com',
    supabaseUrl: 'https://hmlqppacanpxmrfdlkec.supabase.co',
    perPage: 12,
    adminPerPage: 20,
    maxToasts: 3,
    toastDuration: 4000,
    debounceDelay: 300,
    timeoutDuration: 15000,
    defaultSort: 'ranking_score',
    defaultTheme: 'dark',
    turnstileSiteKey: '',
    cacheDurations: {
        settings: 300000, homepage: 300000, groups: 600000, group: 600000,
        stats: 1800000, lists: 3600000, ads: 300000, articles: 900000,
        user: 120000, donations: 900000
    },
    platforms: [
        { id: 'whatsapp', name: 'WhatsApp', emoji: '💬', types: ['group', 'channel', 'community'] },
        { id: 'telegram', name: 'Telegram', emoji: '✈️', types: ['group', 'channel', 'supergroup', 'bot'] },
        { id: 'discord', name: 'Discord', emoji: '🎮', types: ['server'] },
        { id: 'facebook', name: 'Facebook', emoji: '👥', types: ['group', 'page'] },
        { id: 'reddit', name: 'Reddit', emoji: '🔴', types: ['subreddit'] },
        { id: 'twitter', name: 'Twitter/X', emoji: '🐦', types: ['community', 'list'] },
        { id: 'youtube', name: 'YouTube', emoji: '▶️', types: ['channel'] },
        { id: 'twitch', name: 'Twitch', emoji: '🎬', types: ['channel', 'community'] }
    ],
    categories: [
        { id: 'crypto', name: 'Crypto', emoji: '₿' }, { id: 'technology', name: 'Technology', emoji: '💻' },
        { id: 'gaming', name: 'Gaming', emoji: '🎮' }, { id: 'education', name: 'Education', emoji: '📚' },
        { id: 'business', name: 'Business', emoji: '💼' }, { id: 'jobs', name: 'Jobs', emoji: '💰' },
        { id: 'marketing', name: 'Marketing', emoji: '📢' }, { id: 'entertainment', name: 'Entertainment', emoji: '🎭' },
        { id: 'music', name: 'Music', emoji: '🎵' }, { id: 'sports', name: 'Sports', emoji: '⚽' },
        { id: 'health', name: 'Health', emoji: '💪' }, { id: 'food', name: 'Food', emoji: '🍳' },
        { id: 'travel', name: 'Travel', emoji: '✈️' }, { id: 'fashion', name: 'Fashion', emoji: '👗' },
        { id: 'art', name: 'Art', emoji: '🎨' }, { id: 'photography', name: 'Photography', emoji: '📷' },
        { id: 'news', name: 'News', emoji: '📰' }, { id: 'science', name: 'Science', emoji: '🔬' },
        { id: 'books', name: 'Books', emoji: '📖' }, { id: 'movies', name: 'Movies', emoji: '🎬' },
        { id: 'anime', name: 'Anime', emoji: '🎌' }, { id: 'pets', name: 'Pets', emoji: '🐾' },
        { id: 'cars', name: 'Cars', emoji: '🚗' }, { id: 'realestate', name: 'Real Estate', emoji: '🏠' },
        { id: 'religion', name: 'Religion', emoji: '🕊️' }, { id: 'parenting', name: 'Parenting', emoji: '👶' },
        { id: 'languages', name: 'Languages', emoji: '🌍' }, { id: 'programming', name: 'Programming', emoji: '👨‍💻' },
        { id: 'memes', name: 'Memes', emoji: '😂' }, { id: 'dating', name: 'Dating', emoji: '❤️' },
        { id: 'other', name: 'Other', emoji: '📌' }
    ],
    countries: [
        { code: 'GLOBAL', name: 'Global', flag: '🌍' }, { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' }, { code: 'IN', name: 'India', flag: '🇮🇳' },
        { code: 'NG', name: 'Nigeria', flag: '🇳🇬' }, { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' }, { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' }, { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' }, { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'MX', name: 'Mexico', flag: '🇲🇽' }, { code: 'JP', name: 'Japan', flag: '🇯🇵' },
        { code: 'KR', name: 'South Korea', flag: '🇰🇷' }, { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
        { code: 'AE', name: 'UAE', flag: '🇦🇪' }, { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
        { code: 'EG', name: 'Egypt', flag: '🇪🇬' }, { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
        { code: 'KE', name: 'Kenya', flag: '🇰🇪' }, { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
        { code: 'PK', name: 'Pakistan', flag: '🇵🇰' }, { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
        { code: 'ID', name: 'Indonesia', flag: '🇮🇩' }, { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
        { code: 'MY', name: 'Malaysia', flag: '🇲🇾' }, { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
        { code: 'VN', name: 'Vietnam', flag: '🇻🇳' }, { code: 'RU', name: 'Russia', flag: '🇷🇺' },
        { code: 'PL', name: 'Poland', flag: '🇵🇱' }, { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'SE', name: 'Sweden', flag: '🇸🇪' }, { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹' }, { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
        { code: 'AR', name: 'Argentina', flag: '🇦🇷' }, { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
        { code: 'CL', name: 'Chile', flag: '🇨🇱' }, { code: 'PE', name: 'Peru', flag: '🇵🇪' },
        { code: 'MA', name: 'Morocco', flag: '🇲🇦' }, { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
        { code: 'DZ', name: 'Algeria', flag: '🇩🇿' }, { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
        { code: 'IL', name: 'Israel', flag: '🇮🇱' }, { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
        { code: 'RO', name: 'Romania', flag: '🇷🇴' }, { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
        { code: 'GR', name: 'Greece', flag: '🇬🇷' }, { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
        { code: 'SG', name: 'Singapore', flag: '🇸🇬' }, { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
        { code: 'IE', name: 'Ireland', flag: '🇮🇪' }, { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
        { code: 'NO', name: 'Norway', flag: '🇳🇴' }, { code: 'FI', name: 'Finland', flag: '🇫🇮' }
    ],
    languages: [
        'English', 'Spanish', 'French', 'German', 'Portuguese', 'Arabic', 'Hindi', 'Chinese',
        'Japanese', 'Korean', 'Russian', 'Turkish', 'Italian', 'Dutch', 'Polish', 'Indonesian',
        'Thai', 'Vietnamese', 'Malay', 'Swahili'
    ],
    levels: [
        { level: 1, name: 'Seedling', emoji: '🌱', minGxp: 0 },
        { level: 2, name: 'Sprout', emoji: '🌿', minGxp: 100 },
        { level: 3, name: 'Tree', emoji: '🌳', minGxp: 300 },
        { level: 4, name: 'Star', emoji: '⭐', minGxp: 600 },
        { level: 5, name: 'Fire', emoji: '🔥', minGxp: 1000 },
        { level: 6, name: 'Diamond', emoji: '💎', minGxp: 2000 },
        { level: 7, name: 'Crown', emoji: '👑', minGxp: 5000 }
    ],
    nichePricing: {
        crypto: 25, technology: 20, gaming: 20, education: 15, business: 25, jobs: 25,
        marketing: 20, entertainment: 15, music: 15, sports: 15, health: 15, food: 10,
        travel: 15, fashion: 15, art: 10, photography: 10, news: 15, science: 10,
        books: 10, movies: 15, anime: 15, pets: 10, cars: 15, realestate: 20,
        religion: 10, parenting: 10, languages: 15, programming: 20, memes: 10, dating: 20, other: 10
    },
    features: {
        reviews: true, leaderboard: true, scamWall: true, tools: true, articles: true,
        store: false, marketplace: false, jobs: false, donate: true, ads: true
    },
    announcement: { enabled: false, text: '', link: '', type: 'info' },
    cryptoWallets: { btc: '', usdt: '', sol: '' },
    lemonSqueezy: { storeUrl: '', products: {} },
    adSlotLimits: { sidebar: 2, searchTop: 1, categoryBottom: 1, profileSimilar: 2 },
    notificationTypes: {
        welcome: { icon: '👋', title: 'Welcome!' },
        group_approved: { icon: '✅', title: 'Group Approved' },
        group_rejected: { icon: '❌', title: 'Group Rejected' },
        payment_verified: { icon: '💰', title: 'Payment Verified' },
        payment_rejected: { icon: '🚫', title: 'Payment Rejected' },
        vip_activated: { icon: '⭐', title: 'VIP Activated' },
        vip_expired: { icon: '⏰', title: 'VIP Expired' },
        level_up: { icon: '🎉', title: 'Level Up!' },
        review_received: { icon: '💬', title: 'New Review' },
        report_resolved: { icon: '🛡️', title: 'Report Resolved' },
        gxp_awarded: { icon: '✨', title: 'GXP Awarded' },
        system: { icon: 'ℹ️', title: 'System Notice' },
        info: { icon: 'ℹ️', title: 'Info' }
    },
    disposableEmails: [
        'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com', 'yopmail.com',
        'temp-mail.org', 'fakeinbox.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
        'dispostable.com', 'trashmail.com', 'mailnesia.com', 'maildrop.cc', 'discard.email',
        'mailcatch.com', 'tempail.com', 'tempr.email', '10minutemail.com', 'mohmal.com',
        'burnermail.io', 'temp-mail.io', 'tmpmail.net', 'tmpmail.org', 'boun.cr',
        'mailtemp.net', 'emailondeck.com', '33mail.com', 'getnada.com', 'inboxkitten.com',
        'throwmail.com', 'trashmail.net', 'mytemp.email', 'tempmailo.com', 'emailtemp.org',
        'crazymailing.com', 'mailsac.com', 'tempmailco.com', 'tempmailer.com', 'getairmail.com',
        'trash-mail.com', 'one-time.email', 'moakt.com', 'tmail.ws', 'tempsky.com',
        'mailexpire.com', 'emailfake.com', 'throwawaymail.com', 'spamgourmet.com', 'jetable.org'
    ],
    platformPatterns: {
        whatsapp: /^https:\/\/chat\.whatsapp\.com\//,
        telegram: /^https:\/\/(t\.me|telegram\.me)\//,
        discord: /^https:\/\/(discord\.gg|discord\.com\/invite)\//,
        facebook: /^https:\/\/(www\.)?facebook\.com\//,
        reddit: /^https:\/\/(www\.)?reddit\.com\/r\//,
        twitter: /^https:\/\/(twitter\.com|x\.com)\//,
        youtube: /^https:\/\/(www\.)?youtube\.com\//,
        twitch: /^https:\/\/(www\.)?twitch\.tv\//
    },
    defaultSettings: {}
};

// ═══════════════════════════════════════
// MODULE 2: CACHE (sessionStorage)
// ═══════════════════════════════════════
const CACHE = {
    _prefix: 'gm_cache_',
    get(key, maxAgeMs) {
        try {
            const raw = sessionStorage.getItem(this._prefix + key);
            if (!raw) return null;
            const { data, ts } = JSON.parse(raw);
            if (Date.now() - ts > maxAgeMs) { sessionStorage.removeItem(this._prefix + key); return null; }
            return data;
        } catch (err) { console.error('CACHE.get:', err.message); return null; }
    },
    set(key, data) {
        try { sessionStorage.setItem(this._prefix + key, JSON.stringify({ data, ts: Date.now() })); } catch (err) { console.error('CACHE.set:', err.message); }
    },
    remove(key) {
        try { sessionStorage.removeItem(this._prefix + key); } catch (err) { console.error('CACHE.remove:', err.message); }
    },
    clear() {
        try {
            Object.keys(sessionStorage).forEach(k => { if (k.startsWith(this._prefix)) sessionStorage.removeItem(k); });
        } catch (err) { console.error('CACHE.clear:', err.message); }
    }
};

// ═══════════════════════════════════════
// MODULE 3: Security
// ═══════════════════════════════════════
const Security = {
    _behavioral: { events: new Set(), startTime: 0, fieldFocused: false },

    init() {
        this._behavioral.startTime = Date.now();
        this.initBehavioral();
    },

    sanitize(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;')
            .trim().replace(/\s+/g, ' ');
    },

    isValidEmail(email) {
        if (typeof email !== 'string') return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
    },

    isDisposableEmail(email) {
        if (typeof email !== 'string') return false;
        const domain = email.split('@')[1]?.toLowerCase();
        return CONFIG.disposableEmails.includes(domain);
    },

    isValidUrl(url, platform) {
        if (typeof url !== 'string') return false;
        if (!url.startsWith('https://')) return false;
        const dangerous = ['javascript:', 'data:', 'file:', 'vbscript:', '%6A%61%76%61'];
        if (dangerous.some(d => url.toLowerCase().includes(d))) return false;
        if (platform && CONFIG.platformPatterns[platform]) {
            return CONFIG.platformPatterns[platform].test(url);
        }
        return true;
    },

    isValidTxHash(hash, currency) {
        if (typeof hash !== 'string' || !hash.trim()) return false;
        const h = hash.trim();
        if (currency === 'btc') return /^[a-fA-F0-9]{64}$/.test(h);
        if (currency === 'usdt') return /^[a-fA-F0-9]{64}$/.test(h);
        if (currency === 'sol') return /^[1-9A-HJ-NP-Za-km-z]{86,88}$/.test(h);
        return h.length >= 32;
    },

    checkRateLimit(action) {
        const limits = {
            submit: { window: 3600000, max: 5 }, review: { window: 3600000, max: 10 },
            report: { window: 3600000, max: 5 }, payment: { window: 3600000, max: 3 },
            contact: { window: 3600000, max: 2 }, search: { window: 3600000, max: 60 },
            login: { window: 900000, max: 5 }
        };
        const l = limits[action];
        if (!l) return true;
        const key = 'gm_rl_' + action;
        let timestamps = [];
        try { const raw = localStorage.getItem(key); timestamps = raw ? JSON.parse(raw) : []; } catch (err) { console.error('Security.checkRateLimit:', err.message); timestamps = []; }
        const now = Date.now();
        const recent = timestamps.filter(t => now - t < l.window);
        if (recent.length >= l.max) return false;
        recent.push(now);
        localStorage.setItem(key, JSON.stringify(recent));
        return true;
    },

    checkOnline() {
        return navigator.onLine;
    },

    checkBehavioral() {
        const b = this._behavioral;
        return b.events.size >= 2 && (Date.now() - b.startTime) >= 3000 && b.fieldFocused;
    },

    initBehavioral() {
        const track = (e) => { this._behavioral.events.add(e.type); };
        ['mousemove', 'touchstart', 'keypress', 'scroll'].forEach(evt => {
            document.addEventListener(evt, track, { once: true, passive: true });
        });
        document.addEventListener('focusin', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                this._behavioral.fieldFocused = true;
                this._behavioral.events.add('focusin');
            }
        }, { passive: true });
    }
};

// ═══════════════════════════════════════
// MODULE 4: Auth
// ═══════════════════════════════════════
const Auth = {
    _session: null,
    _currentUserData: null,

    _initListener() {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                if (session) {
                    Auth._session = session;
                    Auth._currentUserData = await DB.user.getProfile(session.user.id);
                    if (!Auth._currentUserData && event === 'SIGNED_IN') {
                        const newProfile = await DB.user.createProfile(session.user.id, session.user.email);
                        Auth._currentUserData = newProfile;
                    }
                    // Award daily login GXP
                    if (Auth._currentUserData) {
                        await DB.user.dailyLoginCheck(Auth._currentUserData.id);
                    }
                } else {
                    Auth._session = null;
                    Auth._currentUserData = null;
                }
                renderHeader();
                if (window.location.pathname.startsWith('/admin') && (!Auth.isAdmin() && !Auth.isModerator())) {
                    window.location.href = '/dashboard';
                }
            } else if (event === 'SIGNED_OUT') {
                Auth._session = null;
                Auth._currentUserData = null;
                CACHE.remove('user_profile');
                if (window.location.pathname === '/dashboard' || window.location.pathname.startsWith('/admin')) {
                    window.location.href = '/';
                } else {
                    renderHeader();
                }
            }
        });
    },

    async _loadUserProfile(authId) {
        try {
            const cached = CACHE.get('user_profile', CONFIG.cacheDurations.user);
            if (cached) { Auth._currentUserData = cached; renderHeader(); return; }
            const { data } = await supabase.from('users').select('*').eq('auth_id', authId).single();
            if (data) {
                Auth._currentUserData = data;
                CACHE.set('user_profile', data);
                renderHeader();
                DB.user.dailyLoginCheck(data.id);
            }
        } catch (err) { console.error('Auth._loadUserProfile:', err.message); }
    },

    _handleAuthError(error) {
        if (!error) return 'Something went wrong. Please try again.';
        const msg = error.message || '';
        if (msg.includes('Invalid login credentials')) return 'Incorrect email or password';
        if (msg.includes('User already registered')) return 'This email is already registered. Try signing in.';
        if (msg.includes('Password should be at least')) return 'Password must be at least 6 characters';
        if (msg.includes('Unable to validate email')) return 'Please enter a valid email address';
        if (msg.includes('Email not confirmed')) return 'Please verify your email address';
        if (msg.includes('For security purposes')) return 'Too many attempts. Please try again later.';
        if (msg.includes('Email rate limit')) return 'Too many requests. Please wait a few minutes.';
        if (msg.includes('User not found')) return 'Incorrect email or password';
        if (msg.includes('Signup disabled')) return 'Registration is temporarily disabled';
        if (msg.includes('Network')) return 'Connection issue. Please check your internet.';
        return 'Something went wrong. Please try again.';
    },

    async signUp(email, password, displayName) {
        try {
            if (!Security.checkRateLimit('login')) { UI.toast('Too many attempts. Please try again later.', 'error'); return null; }
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) { UI.toast(Auth._handleAuthError(error), 'error'); return null; }
            const profileData = {
                auth_id: data.user.id, display_name: Security.sanitize(displayName),
                email: email, role: 'user', gxp: 0, level: 1, created_at: new Date().toISOString()
            };
            const { data: profile, error: profileErr } = await supabase.from('users').insert(profileData).select().single();
            if (profileErr) { console.error('Auth.signUp profile:', profileErr.message); }
            try { await supabase.rpc('increment_user_count'); } catch (err) { console.error('Auth.signUp increment_user_count:', err.message); }
            try {
                await supabase.from('notifications').insert({
                    uid: profile?.id, type: 'welcome', title: 'Welcome to GroupsMix!',
                    message: 'Start exploring trusted social media groups.', link: '/search'
                });
            } catch (err) { console.error('Auth.signUp welcome notification:', err.message); }
            Auth._currentUserData = profile;
            CACHE.set('user_profile', profile);
            UI.toast('Account created! Welcome to GroupsMix 🎉', 'success');
            return data;
        } catch (err) { UI.toast('Something went wrong. Please try again.', 'error'); return null; }
    },

    async signIn(email, password) {
        try {
            if (!Security.checkRateLimit('login')) { UI.toast('Too many attempts. Please try again later.', 'error'); return null; }
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) { UI.toast(Auth._handleAuthError(error), 'error'); return null; }
            Auth._session = data.session;
            const { data: profile } = await supabase.from('users').select('*').eq('auth_id', data.user.id).single();
            if (profile) { Auth._currentUserData = profile; CACHE.set('user_profile', profile); }
            UI.toast('Welcome back, ' + (profile?.display_name || 'User') + '! 👋', 'success');
            renderHeader();
            return data;
        } catch (err) { UI.toast('Something went wrong. Please try again.', 'error'); return null; }
    },

    async signOut() {
        try {
            await supabase.auth.signOut();
            Auth._session = null;
            Auth._currentUserData = null;
            CACHE.clear();
            renderHeader();
            UI.toast('Signed out successfully', 'success');
            const authPages = ['/user/', '/admin/'];
            if (authPages.some(p => window.location.pathname.includes(p))) {
                window.location.href = '/';
            }
        } catch (err) { UI.toast('Something went wrong. Please try again.', 'error'); }
    },

    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: CONFIG.siteUrl + '/reset-password'
            });
            if (error) { UI.toast(Auth._handleAuthError(error), 'error'); return false; }
            UI.toast('Password reset link sent to your email', 'success');
            return true;
        } catch (err) { console.error('Auth.resetPassword:', err.message); UI.toast('Something went wrong. Please try again.', 'error'); return false; }
    },

    async updatePassword(newPassword) {
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) { UI.toast(Auth._handleAuthError(error), 'error'); return false; }
            UI.toast('Password updated! You can now sign in', 'success');
            return true;
        } catch (err) { console.error('Auth.updatePassword:', err.message); UI.toast('Something went wrong. Please try again.', 'error'); return false; }
    },

    isLoggedIn() { return !!Auth._session; },
    isAdmin() { return Auth._currentUserData?.role === 'admin'; },
    isModerator() { return Auth._currentUserData?.role === 'moderator' || Auth.isAdmin(); },
    getUser() { return Auth._currentUserData; },
    getUserId() { return Auth._currentUserData?.id; },
    getAuthId() { return Auth._session?.user?.id; },
    getEmail() { return Auth._session?.user?.email; },
    requireAuth() { if (!Auth.isLoggedIn()) { UI.authModal('signin'); return false; } return true; },
    requireAdmin() { if (!Auth.isAdmin()) { UI.toast('Access denied', 'error'); return false; } return true; }
};

// CONTINUE IN NEXT MESSAGE
// ═══════════════════════════════════════
// MODULE 5: DB
// ═══════════════════════════════════════
const DB = {
    groups: {
        async getApproved({ platform, category, country, sort, limit, offset } = {}) {
            try {
                const l = limit || CONFIG.perPage;
                const o = offset || 0;
                const s = sort || CONFIG.defaultSort;
                const cacheKey = 'groups_' + [platform, category, country, s, l, o].join('_');
                const cached = CACHE.get(cacheKey, CONFIG.cacheDurations.groups);
                if (cached) return cached;
                let q = supabase.from('groups').select('*', { count: 'exact' }).eq('status', 'approved');
                if (platform) q = q.eq('platform', platform);
                if (category) q = q.eq('category', category);
                if (country) q = q.eq('country', country);
                const sortCol = s === 'newest' ? 'approved_at' : s === 'views' ? 'views' : s === 'rating' ? 'avg_rating' : 'ranking_score';
                q = q.order(sortCol, { ascending: false }).range(o, o + l - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                const result = { data: data || [], count: count || 0 };
                CACHE.set(cacheKey, result);
                return result;
            } catch (err) { console.error('DB.groups.getApproved:', err.message); return { data: [], count: 0 }; }
        },
        async getOne(id) {
            try {
                if (!id) return null;
                const cached = CACHE.get('group_' + id, CONFIG.cacheDurations.group);
                if (cached) return cached;
                const { data, error } = await supabase.from('groups').select('*').eq('id', id).single();
                if (error) throw error;
                CACHE.set('group_' + id, data);
                return data;
            } catch (err) { console.error('DB.groups.getOne:', err.message); return null; }
        },
        async getFeatured() {
            try {
                const cached = CACHE.get('featured_groups', CONFIG.cacheDurations.homepage);
                if (cached) return cached;
                const now = new Date().toISOString();
                const { data, error } = await supabase.from('groups').select('*').eq('status', 'approved')
                    .in('vip_tier', ['diamond', 'global']).gt('vip_expiry', now)
                    .order('ranking_score', { ascending: false }).limit(6);
                if (error) throw error;
                CACHE.set('featured_groups', data || []);
                return data || [];
            } catch (err) { console.error('DB.groups.getFeatured:', err.message); return []; }
        },
        async getTrending() {
            try {
                const cached = CACHE.get('trending_groups', CONFIG.cacheDurations.homepage);
                if (cached) return cached;
                const { data, error } = await supabase.from('groups').select('*').eq('status', 'approved')
                    .order('ranking_score', { ascending: false }).limit(12);
                if (error) throw error;
                CACHE.set('trending_groups', data || []);
                return data || [];
            } catch (err) { console.error('DB.groups.getTrending:', err.message); return []; }
        },
        async getNew() {
            try {
                const cached = CACHE.get('new_groups', CONFIG.cacheDurations.homepage);
                if (cached) return cached;
                const { data, error } = await supabase.from('groups').select('*').eq('status', 'approved')
                    .order('approved_at', { ascending: false }).limit(12);
                if (error) throw error;
                CACHE.set('new_groups', data || []);
                return data || [];
            } catch (err) { console.error('DB.groups.getNew:', err.message); return []; }
        },
        async getByPlatform(platform, opts = {}) { return DB.groups.getApproved({ ...opts, platform }); },
        async getByCategory(category, opts = {}) { return DB.groups.getApproved({ ...opts, category }); },
        async getByCountry(country, opts = {}) { return DB.groups.getApproved({ ...opts, country }); },
        async getSimilar(group) {
            try {
                if (!group) return [];
                const { data, error } = await supabase.from('groups').select('*').eq('status', 'approved')
                    .neq('id', group.id).or('category.eq.' + group.category + ',platform.eq.' + group.platform)
                    .order('ranking_score', { ascending: false }).limit(6);
                if (error) throw error;
                return data || [];
            } catch (err) { console.error('DB.groups.getSimilar:', err.message); return []; }
        },
        async getByUser(userId) {
            try {
                if (!userId) return [];
                const { data, error } = await supabase.from('groups').select('*')
                    .eq('submitter_uid', userId).order('submitted_at', { ascending: false });
                if (error) throw error;
                return data || [];
            } catch (err) { console.error('DB.groups.getByUser:', err.message); return []; }
        },
        async search(query, opts = {}) {
            try {
                if (!query || query.trim().length < 2) return { data: [], count: 0 };
                const words = query.toLowerCase().split(/\s+/).filter(w => w.length >= 2);
                if (!words.length) return { data: [], count: 0 };
                const l = opts.limit || CONFIG.perPage;
                const o = opts.offset || 0;
                let q = supabase.from('groups').select('*', { count: 'exact' }).eq('status', 'approved')
                    .overlaps('search_terms', words);
                if (opts.platform) q = q.eq('platform', opts.platform);
                if (opts.category) q = q.eq('category', opts.category);
                if (opts.country) q = q.eq('country', opts.country);
                const sortCol = opts.sort === 'newest' ? 'approved_at' : opts.sort === 'views' ? 'views' : opts.sort === 'rating' ? 'avg_rating' : 'ranking_score';
                q = q.order(sortCol, { ascending: false }).range(o, o + l - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.groups.search:', err.message); return { data: [], count: 0 }; }
        },
        async incrementViews(id) {
            try {
                const key = 'gm_view_' + id;
                const last = localStorage.getItem(key);
                if (last && Date.now() - parseInt(last) < 3600000) return;
                await supabase.rpc('increment_views', { p_group_id: id });
                localStorage.setItem(key, Date.now().toString());
            } catch (err) { console.error('DB.groups.incrementViews:', err.message); }
        },
        async incrementClicks(id) {
            try {
                const key = 'gm_click_' + id;
                const last = localStorage.getItem(key);
                if (last && Date.now() - parseInt(last) < 1800000) return;
                await supabase.rpc('increment_clicks', { p_group_id: id });
                localStorage.setItem(key, Date.now().toString());
            } catch (err) { console.error('DB.groups.incrementClicks:', err.message); }
        },
        async incrementReports(id) {
            try { await supabase.rpc('increment_reports', { p_group_id: id }); }
            catch (err) { console.error('DB.groups.incrementReports:', err.message); }
        },
        async getHighReports({ limit } = {}) {
            try {
                const l = limit || 20;
                const { data, error } = await supabase.from('groups').select('*').eq('status', 'approved')
                    .gt('reports', 2).order('reports', { ascending: false }).limit(l);
                if (error) throw error;
                return data || [];
            } catch (err) { console.error('DB.groups.getHighReports:', err.message); return []; }
        }
    },
    pending: {
        async submit(data) {
            try {
                if (!Auth.requireAuth()) return null;
                if (!Security.checkRateLimit('submit')) { UI.toast('Too many submissions. Please wait.', 'error'); return null; }
                const { data: dup } = await supabase.rpc('check_duplicate_link', { p_link: data.link });
                if (dup) { UI.toast('This group link has already been submitted.', 'warning'); return null; }
                const searchTerms = Algorithms.generateSearchTerms(data.name, data.description, data.tags, data.category, data.platform);
                const row = {
                    name: Security.sanitize(data.name), link: data.link, platform: data.platform,
                    platform_type: data.platform_type || 'group', category: data.category,
                    country: data.country || 'GLOBAL', city: Security.sanitize(data.city || ''),
                    language: data.language || 'English', description: Security.sanitize(data.description),
                    tags: Array.isArray(data.tags) ? data.tags.map(t => Security.sanitize(t)) : [],
                    search_terms: searchTerms, submitter_uid: Auth.getUserId(),
                    submitter_email: Auth.getEmail() || '', status: 'pending'
                };
                const { data: result, error } = await supabase.from('pending').insert(row).select().single();
                if (error) throw error;
                return result;
            } catch (err) { console.error('DB.pending.submit:', err.message); UI.toast('Failed to submit. Please try again.', 'error'); return null; }
        },
        async getByUser(userId) {
            try {
                if (!userId) return [];
                const { data, error } = await supabase.from('pending').select('*')
                    .eq('submitter_uid', userId).order('submitted_at', { ascending: false });
                if (error) throw error;
                return data || [];
            } catch (err) { console.error('DB.pending.getByUser:', err.message); return []; }
        },
        async getAll({ status, limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                let q = supabase.from('pending').select('*', { count: 'exact' });
                if (status) q = q.eq('status', status);
                q = q.order('submitted_at', { ascending: false });
                if (limit) q = q.range(offset || 0, (offset || 0) + limit - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.pending.getAll:', err.message); return { data: [], count: 0 }; }
        },
        async approve(id) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.rpc('approve_group', { p_pending_id: id });
                if (error) throw error;
                CACHE.clear();
                DB.admin.log('approve_group', { pending_id: id });
                return true;
            } catch (err) { console.error('DB.pending.approve:', err.message); return false; }
        },
        async reject(id, reason) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('pending').update({ status: 'rejected', admin_note: Security.sanitize(reason || '') }).eq('id', id);
                if (error) throw error;
                DB.admin.log('reject_group', { pending_id: id, reason });
                return true;
            } catch (err) { console.error('DB.pending.reject:', err.message); return false; }
        }
    },
    reviews: {
        async getByGroup(groupId, { limit, offset } = {}) {
            try {
                if (!groupId) return { data: [], count: 0 };
                const l = limit || 10;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('reviews').select('*', { count: 'exact' })
                    .eq('group_id', groupId).order('created_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.reviews.getByGroup:', err.message); return { data: [], count: 0 }; }
        },
        async submit({ groupId, rating, text }) {
            try {
                if (!Auth.requireAuth()) return null;
                if (!Security.checkRateLimit('review')) { UI.toast('Too many reviews. Please wait.', 'error'); return null; }
                const hasReviewed = await DB.reviews.hasReviewed(Auth.getUserId(), groupId);
                if (hasReviewed) { UI.toast('You have already reviewed this group.', 'warning'); return null; }
                const row = {
                    group_id: groupId, uid: Auth.getUserId(),
                    display_name: Auth.getUser()?.display_name || 'Anonymous',
                    photo_url: Auth.getUser()?.photo_url || '',
                    rating: Math.max(1, Math.min(5, parseInt(rating) || 1)),
                    text: Security.sanitize(text || '').slice(0, 500)
                };
                const { data, error } = await supabase.from('reviews').insert(row).select().single();
                if (error) throw error;
                try { await supabase.rpc('update_review_stats', { p_group_id: groupId, p_new_rating: row.rating }); } catch (err) { console.error('DB.reviews.submit update_review_stats:', err.message); }
                try { await DB.user.addGXP(Auth.getUserId(), 20); } catch (err) { console.error('DB.reviews.submit addGXP:', err.message); }
                CACHE.remove('group_' + groupId);
                return data;
            } catch (err) { console.error('DB.reviews.submit:', err.message); UI.toast('Failed to submit review.', 'error'); return null; }
        },
        async hasReviewed(userId, groupId) {
            try {
                if (!userId || !groupId) return false;
                const { data } = await supabase.from('reviews').select('id').eq('uid', userId).eq('group_id', groupId).limit(1);
                return Array.isArray(data) && data.length > 0;
            } catch (err) { console.error('DB.reviews.hasReviewed:', err.message); return false; }
        }
    },
    reports: {
        async submit({ groupId, reason, details }) {
            try {
                if (!Auth.requireAuth()) return null;
                if (!Security.checkRateLimit('report')) { UI.toast('Too many reports. Please wait.', 'error'); return null; }
                const row = { group_id: groupId, reporter_uid: Auth.getUserId(), reason: Security.sanitize(reason || ''), details: Security.sanitize(details || '').slice(0, 1000) };
                const { data, error } = await supabase.from('reports').insert(row).select().single();
                if (error) throw error;
                try { await DB.groups.incrementReports(groupId); } catch (err) { console.error('DB.reports.submit incrementReports:', err.message); }
                return data;
            } catch (err) { console.error('DB.reports.submit:', err.message); UI.toast('Failed to submit report.', 'error'); return null; }
        },
        async getAll({ status, limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                let q = supabase.from('reports').select('*', { count: 'exact' });
                if (status) q = q.eq('status', status);
                q = q.order('created_at', { ascending: false });
                if (limit) q = q.range(offset || 0, (offset || 0) + limit - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.reports.getAll:', err.message); return { data: [], count: 0 }; }
        },
        async resolve(id, action) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('reports').update({ status: 'resolved', action: Security.sanitize(action || ''), resolved_at: new Date().toISOString(), resolved_by: Auth.getUserId() }).eq('id', id);
                if (error) throw error;
                DB.admin.log('resolve_report', { report_id: id, action });
                return true;
            } catch (err) { console.error('DB.reports.resolve:', err.message); return false; }
        }
    },
    payments: {
        async submit(data) {
            try {
                if (!Auth.requireAuth()) return null;
                if (!Security.checkRateLimit('payment')) { UI.toast('Too many payment attempts. Please wait.', 'error'); return null; }
                const row = {
                    uid: Auth.getUserId(), email: Auth.getEmail() || '', type: data.type || '',
                    service: data.service || '', group_id: data.group_id || null,
                    currency: data.currency || '', amount: parseFloat(data.amount) || 0,
                    tx_hash: Security.sanitize(data.tx_hash || ''), wallet_address: data.wallet_address || '',
                    status: 'pending'
                };
                const { data: result, error } = await supabase.from('payments').insert(row).select().single();
                if (error) throw error;
                return result;
            } catch (err) {
                console.error('DB.payments.submit:', err.message);
                try {
                    const failed = JSON.parse(localStorage.getItem('gm_failed_payments') || '[]');
                    failed.push({ ...data, timestamp: Date.now() });
                    localStorage.setItem('gm_failed_payments', JSON.stringify(failed));
                } catch (err) { console.error('DB.payments.submit failed_payments save:', err.message); }
                UI.toast('Payment recorded locally. Please contact support.', 'warning');
                return null;
            }
        },
        async getByUser(userId) {
            try {
                if (!userId) return [];
                const { data, error } = await supabase.from('payments').select('*').eq('uid', userId).order('created_at', { ascending: false });
                if (error) throw error;
                return data || [];
            } catch (err) { console.error('DB.payments.getByUser:', err.message); return []; }
        },
        async getAll({ status, limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                let q = supabase.from('payments').select('*', { count: 'exact' });
                if (status) q = q.eq('status', status);
                q = q.order('created_at', { ascending: false });
                if (limit) q = q.range(offset || 0, (offset || 0) + limit - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.payments.getAll:', err.message); return { data: [], count: 0 }; }
        },
        async verify(id) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('payments').update({ status: 'verified', verified_at: new Date().toISOString(), verified_by: Auth.getUserId() }).eq('id', id);
                if (error) throw error;
                DB.admin.log('verify_payment', { payment_id: id });
                return true;
            } catch (err) { console.error('DB.payments.verify:', err.message); return false; }
        },
        async reject(id, reason) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('payments').update({ status: 'rejected', rejection_reason: Security.sanitize(reason || '') }).eq('id', id);
                if (error) throw error;
                DB.admin.log('reject_payment', { payment_id: id, reason });
                return true;
            } catch (err) { console.error('DB.payments.reject:', err.message); return false; }
        }
    },
    notifications: {
        async getByUser(userId, { limit, offset } = {}) {
            try {
                if (!userId) return { data: [], count: 0 };
                const l = limit || 20;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('notifications').select('*', { count: 'exact' })
                    .eq('uid', userId).order('created_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.notifications.getByUser:', err.message); return { data: [], count: 0 }; }
        },
        async markRead(id) {
            try {
                const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id).eq('read', false);
                if (error) throw error;
                if (Auth.getUserId()) {
                    await supabase.from('users').update({ unread_notifications: Math.max(0, (Auth.getUser()?.unread_notifications || 1) - 1) }).eq('id', Auth.getUserId());
                }
                return true;
            } catch (err) { console.error('DB.notifications.markRead:', err.message); return false; }
        },
        async markAllRead(userId) {
            try {
                if (!userId) return false;
                const { error } = await supabase.from('notifications').update({ read: true }).eq('uid', userId).eq('read', false);
                if (error) throw error;
                await supabase.from('users').update({ unread_notifications: 0 }).eq('id', userId);
                return true;
            } catch (err) { console.error('DB.notifications.markAllRead:', err.message); return false; }
        },
        async create({ uid, type, title, message, link }) {
            try {
                if (!uid) return null;
                const { data, error } = await supabase.from('notifications').insert({
                    uid, type: type || 'info', title: title || '', message: message || '', link: link || ''
                }).select().single();
                if (error) throw error;
                await supabase.from('users').update({ unread_notifications: (Auth.getUser()?.unread_notifications || 0) + 1 }).eq('id', uid);
                return data;
            } catch (err) { console.error('DB.notifications.create:', err.message); return null; }
        },
        async getUnreadCount(userId) {
            try {
                if (!userId) return 0;
                const { count, error } = await supabase.from('notifications').select('id', { count: 'exact', head: true })
                    .eq('uid', userId).eq('read', false);
                if (error) throw error;
                return count || 0;
            } catch (err) { console.error('DB.notifications.getUnreadCount:', err.message); return 0; }
        }
    },
    user: {
        async getProfile(authId) {
            try {
                if (!authId) return null;
                const { data, error } = await supabase.from('users').select('*').eq('auth_id', authId).single();
                if (error) throw error;
                return data;
            } catch (err) { console.error('DB.user.getProfile:', err.message); return null; }
        },
        async createProfile(profileData) {
            try {
                const { data, error } = await supabase.from('users').insert(profileData).select().single();
                if (error) throw error;
                try { await supabase.rpc('increment_user_count'); } catch (err) { console.error('DB.user.createProfile increment_user_count:', err.message); }
                return data;
            } catch (err) { console.error('DB.user.createProfile:', err.message); return null; }
        },
        async updateProfile(userId, updates) {
            try {
                if (!userId) return false;
                const allowed = {};
                if (updates.display_name !== undefined) allowed.display_name = Security.sanitize(updates.display_name);
                if (updates.photo_url !== undefined) allowed.photo_url = Security.sanitize(updates.photo_url);
                const { error } = await supabase.from('users').update(allowed).eq('id', userId);
                if (error) throw error;
                CACHE.remove('user_profile');
                return true;
            } catch (err) { console.error('DB.user.updateProfile:', err.message); return false; }
        },
        async addGXP(userId, amount) {
            try {
                if (!userId || !amount) return;
                await supabase.rpc('add_gxp', { p_user_id: userId, p_amount: amount });
            } catch (err) { console.error('DB.user.addGXP:', err.message); }
        },
        async getLeaderboard({ limit, offset } = {}) {
            try {
                const cached = CACHE.get('leaderboard', CONFIG.cacheDurations.lists);
                if (cached) return cached;
                const l = limit || 50;
                const o = offset || 0;
                const { data, error } = await supabase.from('users')
                    .select('id, display_name, photo_url, gxp, level')
                    .order('gxp', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                CACHE.set('leaderboard', data || []);
                return data || [];
            } catch (err) { console.error('DB.user.getLeaderboard:', err.message); return []; }
        },
        async dailyLoginCheck(userId) {
            try {
                if (!userId) return;
                const today = new Date().toISOString().split('T')[0];
                const key = 'gm_last_daily_' + userId;
                if (localStorage.getItem(key) === today) return;
                await DB.user.addGXP(userId, 5);
                await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', userId);
                localStorage.setItem(key, today);
            } catch (err) { console.error('DB.user.dailyLoginCheck:', err.message); }
        }
    },
    contacts: {
        async submit(data) {
            try {
                if (!Security.checkRateLimit('contact')) { UI.toast('Too many messages. Please wait.', 'error'); return null; }
                const row = {
                    name: Security.sanitize(data.name || ''), email: data.email || '',
                    subject: Security.sanitize(data.subject || ''), message: Security.sanitize(data.message || ''),
                    uid: Auth.getUserId() || null
                };
                const { data: result, error } = await supabase.from('contacts').insert(row).select().single();
                if (error) throw error;
                return result;
            } catch (err) { console.error('DB.contacts.submit:', err.message); UI.toast('Failed to send message.', 'error'); return null; }
        }
    },
    donations: {
        async submit(data) {
            try {
                if (!Security.checkRateLimit('payment')) { UI.toast('Too many attempts. Please wait.', 'error'); return null; }
                const row = {
                    uid: Auth.getUserId() || null, display_name: Security.sanitize(data.display_name || 'Anonymous'),
                    message: Security.sanitize(data.message || '').slice(0, 500),
                    currency: data.currency || '', amount: parseFloat(data.amount) || 0,
                    tx_hash: Security.sanitize(data.tx_hash || ''), status: 'pending'
                };
                const { data: result, error } = await supabase.from('donations').insert(row).select().single();
                if (error) throw error;
                return result;
            } catch (err) { console.error('DB.donations.submit:', err.message); return null; }
        },
        async getVerified({ limit } = {}) {
            try {
                const cached = CACHE.get('donations_verified', CONFIG.cacheDurations.donations);
                if (cached) return cached;
                const { data, error } = await supabase.from('donations').select('*').eq('status', 'verified')
                    .order('created_at', { ascending: false }).limit(limit || 20);
                if (error) throw error;
                CACHE.set('donations_verified', data || []);
                return data || [];
            } catch (err) { console.error('DB.donations.getVerified:', err.message); return []; }
        }
    },
    articles: {
        async getPublished({ limit, offset } = {}) {
            try {
                const cached = CACHE.get('articles', CONFIG.cacheDurations.articles);
                if (cached && !offset) return cached;
                const l = limit || CONFIG.perPage;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('articles').select('*', { count: 'exact' })
                    .eq('status', 'published').order('published_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                const result = { data: data || [], count: count || 0 };
                if (!offset) CACHE.set('articles', result);
                return result;
            } catch (err) { console.error('DB.articles.getPublished:', err.message); return { data: [], count: 0 }; }
        },
        async getBySlug(slug) {
            try {
                if (!slug) return null;
                const cached = CACHE.get('article_' + slug, CONFIG.cacheDurations.articles);
                if (cached) return cached;
                const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).single();
                if (error) throw error;
                CACHE.set('article_' + slug, data);
                return data;
            } catch (err) { console.error('DB.articles.getBySlug:', err.message); return null; }
        },
        async incrementViews(id) {
            try { await supabase.rpc('increment_article_views', { p_article_id: id }); }
            catch (err) { console.error('DB.articles.incrementViews:', err.message); }
        },
        async getAll() {
            try {
                if (!Auth.requireAdmin()) return { data: [] };
                const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
                if (error) throw error;
                return { data: data || [] };
            } catch (err) { console.error('DB.articles.getAll:', err.message); return { data: [] }; }
        },
        async create(articleData) {
            try {
                if (!Auth.requireAdmin()) return null;
                articleData.published_at = new Date().toISOString();
                const { data, error } = await supabase.from('articles').insert(articleData).select().single();
                if (error) throw error;
                return data;
            } catch (err) { console.error('DB.articles.create:', err.message); return null; }
        },
        async update(id, articleData) {
            try {
                if (!Auth.requireAdmin()) return null;
                const { data, error } = await supabase.from('articles').update(articleData).eq('id', id).select().single();
                if (error) throw error;
                return data;
            } catch (err) { console.error('DB.articles.update:', err.message); return null; }
        }
    },
    ads: {
        async getActive(position) {
            try {
                const cached = CACHE.get('ads_' + position, CONFIG.cacheDurations.ads);
                if (cached) return cached;
                const { data, error } = await supabase.from('ads').select('*').eq('status', 'active')
                    .eq('position', position).gt('expires_at', new Date().toISOString())
                    .limit(CONFIG.adSlotLimits[position] || 2);
                if (error) throw error;
                CACHE.set('ads_' + position, data || []);
                return data || [];
            } catch (err) { console.error('DB.ads.getActive:', err.message); return []; }
        },
        async incrementImpressions(id) {
            try { await supabase.rpc('increment_ad_impressions', { p_ad_id: id }); } catch (err) { console.error('DB.ads.incrementImpressions:', err.message); }
        },
        async incrementClicks(id) {
            try { await supabase.rpc('increment_ad_clicks', { p_ad_id: id }); } catch (err) { console.error('DB.ads.incrementClicks:', err.message); }
        }
    },
    stats: {
        async getGlobal() {
            try {
                const cached = CACHE.get('stats_global', CONFIG.cacheDurations.stats);
                if (cached) return cached;
                const { data, error } = await supabase.from('stats').select('*').eq('key', 'global').single();
                if (error) throw error;
                CACHE.set('stats_global', data);
                return data;
            } catch (err) { console.error('DB.stats.getGlobal:', err.message); return null; }
        }
    },
    config: {
        async getSettings() {
            try {
                const cached = CACHE.get('settings', CONFIG.cacheDurations.settings);
                if (cached) return cached;
                const { data, error } = await supabase.from('config').select('value').eq('key', 'settings').single();
                if (error) throw error;
                CACHE.set('settings', data?.value || {});
                return data?.value || {};
            } catch (err) { console.error('DB.config.getSettings:', err.message); return {}; }
        },
        async updateSettings(value) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('config').update({ value }).eq('key', 'settings');
                if (error) throw error;
                CACHE.remove('settings');
                DB.admin.log('update_settings', { keys: Object.keys(value) });
                return true;
            } catch (err) { console.error('DB.config.updateSettings:', err.message); return false; }
        }
    },
    admin: {
        async log(action, details) {
            try {
                await supabase.from('admin_log').insert({
                    action, details: details || {}, admin_uid: Auth.getUserId(), admin_email: Auth.getEmail() || ''
                });
            } catch (err) { console.error('DB.admin.log:', err.message); }
        },
        async getLog({ limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                const l = limit || CONFIG.adminPerPage;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('admin_log').select('*', { count: 'exact' })
                    .order('created_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.admin.getLog:', err.message); return { data: [], count: 0 }; }
        },
        async getStats() {
            try {
                if (!Auth.requireAdmin()) return null;
                const [groups, pending, users, payments, reports] = await Promise.all([
                    supabase.from('groups').select('id', { count: 'exact', head: true }),
                    supabase.from('pending').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
                    supabase.from('users').select('id', { count: 'exact', head: true }),
                    supabase.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
                    supabase.from('reports').select('id', { count: 'exact', head: true }).eq('status', 'pending')
                ]);
                return { totalGroups: groups.count || 0, pendingGroups: pending.count || 0, totalUsers: users.count || 0, pendingPayments: payments.count || 0, pendingReports: reports.count || 0 };
            } catch (err) { console.error('DB.admin.getStats:', err.message); return null; }
        },
        async getUsers({ limit, offset, search } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                const l = limit || CONFIG.adminPerPage;
                const o = offset || 0;
                let q = supabase.from('users').select('*', { count: 'exact' });
                if (search) q = q.ilike('email', '%' + search + '%');
                q = q.order('created_at', { ascending: false }).range(o, o + l - 1);
                const { data, error, count } = await q;
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.admin.getUsers:', err.message); return { data: [], count: 0 }; }
        },
        async updateUser(userId, updates) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('users').update(updates).eq('id', userId);
                if (error) throw error;
                DB.admin.log('update_user', { user_id: userId, updates });
                return true;
            } catch (err) { console.error('DB.admin.updateUser:', err.message); return false; }
        },
        async getContacts({ limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                const l = limit || CONFIG.adminPerPage;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('contacts').select('*', { count: 'exact' })
                    .order('created_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.admin.getContacts:', err.message); return { data: [], count: 0 }; }
        },
        async updateContact(id, updates) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('contacts').update(updates).eq('id', id);
                if (error) throw error;
                return true;
            } catch (err) { console.error('DB.admin.updateContact:', err.message); return false; }
        },
        async getDonations({ limit, offset } = {}) {
            try {
                if (!Auth.requireAdmin()) return { data: [], count: 0 };
                const l = limit || CONFIG.adminPerPage;
                const o = offset || 0;
                const { data, error, count } = await supabase.from('donations').select('*', { count: 'exact' })
                    .order('created_at', { ascending: false }).range(o, o + l - 1);
                if (error) throw error;
                return { data: data || [], count: count || 0 };
            } catch (err) { console.error('DB.admin.getDonations:', err.message); return { data: [], count: 0 }; }
        },
        async updateDonation(id, updates) {
            try {
                if (!Auth.requireAdmin()) return false;
                const { error } = await supabase.from('donations').update(updates).eq('id', id);
                if (error) throw error;
                DB.admin.log('update_donation', { donation_id: id });
                return true;
            } catch (err) { console.error('DB.admin.updateDonation:', err.message); return false; }
        }
    }
};

// ═══════════════════════════════════════
// MODULE 6: Theme
// ═══════════════════════════════════════
const Theme = {
    _current: 'dark',
    init() {
        const saved = localStorage.getItem('gm_theme');
        this._current = saved === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this._current);
    },
    set(theme) {
        if (theme !== 'dark' && theme !== 'light') return;
        this._current = theme;
        document.documentElement.setAttribute('data-theme', this._current);
        localStorage.setItem('gm_theme', this._current);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = this._current === 'dark' ? '🌙' : '☀️';
    },
    toggle() {
        this._current = this._current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this._current);
        localStorage.setItem('gm_theme', this._current);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = this._current === 'dark' ? '🌙' : '☀️';
    },
    get() { return this._current; }
};

// ═══════════════════════════════════════
// MODULE 7: Saved
// ═══════════════════════════════════════
const Saved = {
    _key: 'gm_saved_groups',
    getAll() {
        try { return JSON.parse(localStorage.getItem(this._key) || '[]'); } catch (err) { console.error('Saved.getAll:', err.message); return []; }
    },
    add(group) {
        if (!group?.id) return;
        const all = this.getAll();
        if (all.some(g => g.id === group.id)) return;
        all.unshift({ id: group.id, name: group.name, platform: group.platform, category: group.category, vip_tier: group.vip_tier, vip_expiry: group.vip_expiry });
        localStorage.setItem(this._key, JSON.stringify(all.slice(0, 100)));
    },
    remove(groupId) {
        const all = this.getAll().filter(g => g.id !== groupId);
        localStorage.setItem(this._key, JSON.stringify(all));
    },
    isSaved(groupId) { return this.getAll().some(g => g.id === groupId); },
    count() { return this.getAll().length; },
    clear() { localStorage.removeItem(this._key); }
};

// ═══════════════════════════════════════
// MODULE 8: RecentlyViewed
// ═══════════════════════════════════════
const RecentlyViewed = {
    _key: 'gm_recent_groups',
    _max: 20,
    getAll() {
        try { return JSON.parse(localStorage.getItem(this._key) || '[]'); } catch (err) { console.error('RecentlyViewed.getAll:', err.message); return []; }
    },
    add(group) {
        if (!group?.id) return;
        let all = this.getAll().filter(g => g.id !== group.id);
        all.unshift({ id: group.id, name: group.name, platform: group.platform, ts: Date.now() });
        localStorage.setItem(this._key, JSON.stringify(all.slice(0, this._max)));
    },
    clear() { localStorage.removeItem(this._key); }
};

// ═══════════════════════════════════════
// MODULE 9: Algorithms
// ═══════════════════════════════════════
const Algorithms = {
    calculateTrustScore(group) {
        if (!group) return 0;
        let score = 20;
        const vipBonus = { none: 0, verified: 15, niche: 20, global: 25, diamond: 30 };
        const tier = Algorithms.getEffectiveTier(group);
        score += vipBonus[tier] || 0;
        const avgRating = parseFloat(group.avg_rating) || 0;
        const reviewCount = group.review_count || 0;
        if (reviewCount >= 3) score += Math.min(25, Math.round(avgRating * 5));
        else if (reviewCount >= 1) score += Math.min(15, Math.round(avgRating * 3));
        const views = group.views || 0;
        if (views >= 1000) score += 15;
        else if (views >= 500) score += 10;
        else if (views >= 100) score += 5;
        else if (views >= 10) score += 2;
        const reports = group.reports || 0;
        if (reports === 0) score += 10;
        else if (reports <= 2) score += 5;
        else score -= Math.min(30, reports * 5);
        return Math.max(0, Math.min(100, score));
    },
    calculateRankingScore(group) {
        if (!group) return 0;
        const trust = Algorithms.calculateTrustScore(group);
        const views = group.views || 0;
        const clicks = group.clicks || 0;
        const rating = parseFloat(group.avg_rating) || 0;
        const reviews = group.review_count || 0;
        const tier = Algorithms.getEffectiveTier(group);
        const tierMultiplier = { none: 1, verified: 1.2, niche: 1.5, global: 2.0, diamond: 3.0 };
        const base = (trust * 2) + (views * 0.01) + (clicks * 0.05) + (rating * 10) + (reviews * 3);
        return Math.round(base * (tierMultiplier[tier] || 1) * 100) / 100;
    },
    getEffectiveTier(group) {
        if (!group?.vip_tier || group.vip_tier === 'none') return 'none';
        if (!group.vip_expiry) return 'none';
        const expiry = new Date(group.vip_expiry).getTime();
        if (isNaN(expiry) || Date.now() > expiry) return 'none';
        return group.vip_tier;
    },
    generateSearchTerms(name, description, tags, category, platform) {
        const terms = new Set();
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'it', 'this', 'that', 'are', 'was', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must', 'not', 'no', 'nor', 'so', 'if', 'then', 'than', 'too', 'very', 'just', 'about', 'above', 'after', 'again', 'all', 'also', 'any', 'because', 'before', 'between', 'both', 'each', 'few', 'how', 'into', 'more', 'most', 'other', 'out', 'over', 'own', 'same', 'some', 'such', 'their', 'them', 'these', 'those', 'through', 'under', 'until', 'up', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'you', 'your']);
        (name || '').toLowerCase().split(/\s+/).forEach(w => { const c = w.replace(/[^a-z0-9]/g, ''); if (c.length >= 2) terms.add(c); });
        (description || '').toLowerCase().split(/\s+/).forEach(w => { const c = w.replace(/[^a-z0-9]/g, ''); if (c.length >= 3 && !stopWords.has(c)) terms.add(c); });
        if (Array.isArray(tags)) tags.forEach(t => t.toLowerCase().split(/\s+/).forEach(w => { if (w.length >= 2) terms.add(w); }));
        if (category) terms.add(category.toLowerCase().replace(/[^a-z0-9]/g, ''));
        if (platform) terms.add(platform.toLowerCase());
        return Array.from(terms).slice(0, 40);
    },
    getLevelInfo(gxp) {
        const g = isNaN(gxp) ? 0 : Number(gxp);
        const levels = CONFIG.levels;
        let current = levels[0];
        for (let i = levels.length - 1; i >= 0; i--) {
            if (g >= levels[i].minGxp) { current = levels[i]; break; }
        }
        const next = levels.find(l => l.minGxp > g);
        const progress = next ? (g - current.minGxp) / (next.minGxp - current.minGxp) : 1;
        return { level: current.level, name: current.name, emoji: current.emoji, minGxp: current.minGxp, nextLevelGxp: next?.minGxp || current.minGxp, progress: Math.min(1, Math.max(0, progress)) };
    }
};

// ═══════════════════════════════════════
// MODULE 10: getPrice
// ═══════════════════════════════════════
function getPrice(service, options = {}) {
    const prices = {
        vip_verified: { monthly: 5, quarterly: 12, yearly: 40 },
        vip_global: { monthly: 30, quarterly: 75, yearly: 250 },
        vip_diamond: { monthly: 50, quarterly: 130, yearly: 450 },
        boost_5: 5, boost_10: 10, boost_25: 25,
        priority_review: 10,
        ad_sponsored_weekly: 20, ad_banner_weekly: 30, ad_featured_weekly: 15, ad_profile_weekly: 10,
        audit_basic: 25, audit_pro: 50
    };
    if (service === 'vip_niche') {
        const base = CONFIG.nichePricing[options.category] || 10;
        if (options.period === 'quarterly') return Math.round(base * 2.5);
        if (options.period === 'yearly') return Math.round(base * 8);
        return base;
    }
    const p = prices[service];
    if (!p) return 0;
    if (typeof p === 'object') return p[options.period || 'monthly'] || p.monthly;
    return p;
}

// ═══════════════════════════════════════
// MODULE 11: renderHeader
// ═══════════════════════════════════════
function renderHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const isLoggedIn = Auth.isLoggedIn();
    const user = Auth.getUser();
    const unread = user?.unread_notifications || 0;
    header.innerHTML = '<nav class="site-header"><div class="site-header__inner">' +
        '<div class="flex items-center gap-2">' +
        '<button id="drawer-toggle" class="btn btn-ghost btn-icon drawer-toggle-btn" aria-label="Open menu">☰</button>' +
        '<a href="/" class="site-header__logo">🌐 GroupsMix</a>' +
        '</div>' +
        '<div class="site-header__search">' +
        '<form id="header-search-form" action="/search" method="get">' +
        '<input type="search" name="q" class="site-header__search-input" placeholder="Search groups..." aria-label="Search groups">' +
        '<button type="submit" class="site-header__search-btn" aria-label="Search">🔍</button>' +
        '</form>' +
        '</div>' +
        '<div class="site-header__actions">' +
        '<button id="theme-toggle" class="btn btn-ghost btn-icon" aria-label="Toggle theme">' + (Theme.get() === 'dark' ? '🌙' : '☀️') + '</button>' +
        (isLoggedIn ?
            '<div class="notification-badge" id="notification-wrapper" style="position:relative">' +
            '<button id="notification-btn" class="btn btn-ghost btn-icon" aria-label="Notifications">🔔' +
            (unread > 0 ? '<span class="notification-badge__count">' + (unread > 9 ? '9+' : unread) + '</span>' : '') +
            '</button>' +
            '</div>' +
            '<div id="user-menu-wrapper" style="position:relative">' +
            '<button id="user-menu-btn" class="btn btn-ghost btn-sm">' +
            '👤 ' + Security.sanitize(user?.display_name || 'User').slice(0, 15) +
            '</button>' +
            '</div>'
            :
            '<button id="auth-btn" class="btn btn-primary btn-sm">Sign In</button>'
        ) +
        '</div>' +
        '</div></nav>';
    document.getElementById('theme-toggle')?.addEventListener('click', () => Theme.toggle());
    if (isLoggedIn) {
        document.getElementById('notification-btn')?.addEventListener('click', toggleNotificationDropdown);
        document.getElementById('user-menu-btn')?.addEventListener('click', toggleUserDropdown);
    } else {
        document.getElementById('auth-btn')?.addEventListener('click', () => UI.authModal('signin'));
    }
    document.getElementById('drawer-toggle')?.addEventListener('click', openDrawer);
    renderAnnouncement();
}

function toggleNotificationDropdown() {
    const wrapper = document.getElementById('notification-wrapper');
    if (!wrapper) return;
    const existing = wrapper.querySelector('.notification-dropdown');
    if (existing) { existing.remove(); return; }
    closeAllDropdowns();
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    dropdown.innerHTML = '<div style="padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--border-primary);font-weight:var(--font-semibold);font-size:var(--text-sm)">Notifications</div>' +
        '<div id="notification-list" style="max-height:300px;overflow-y:auto"><div style="padding:var(--space-4);text-align:center;color:var(--text-tertiary);font-size:var(--text-sm)">Loading...</div></div>' +
        '<a href="/dashboard" style="display:block;text-align:center;padding:var(--space-3);border-top:1px solid var(--border-primary);font-size:var(--text-sm)">View All</a>';
    wrapper.appendChild(dropdown);
    loadNotificationDropdown();
}

async function loadNotificationDropdown() {
    const list = document.getElementById('notification-list');
    if (!list) return;
    try {
        const { data } = await DB.notifications.getByUser(Auth.getUserId(), { limit: 5 });
        if (!data?.length) { list.innerHTML = '<div style="padding:var(--space-4);text-align:center;color:var(--text-tertiary);font-size:var(--text-sm)">No notifications</div>'; return; }
        list.innerHTML = data.map(n => {
            const t = CONFIG.notificationTypes[n.type] || CONFIG.notificationTypes.info;
            return '<div class="notification-dropdown__item' + (n.read ? '' : ' notification-dropdown__item--unread') + '" data-id="' + n.id + '"' + (n.link ? ' data-link="' + Security.sanitize(n.link) + '"' : '') + '>' +
                '<span>' + t.icon + '</span><div><div style="font-weight:var(--font-semibold);font-size:var(--text-sm)">' + Security.sanitize(n.title || t.title) + '</div>' +
                '<div style="font-size:var(--text-xs);color:var(--text-tertiary)">' + Security.sanitize(n.message || '') + '</div></div></div>';
        }).join('');
        list.querySelectorAll('.notification-dropdown__item').forEach(item => {
            item.addEventListener('click', async () => {
                const id = item.dataset.id;
                if (id) await DB.notifications.markRead(id);
                if (item.dataset.link) window.location.href = item.dataset.link;
            });
        });
    } catch (err) { console.error('loadNotificationDropdown:', err.message); list.innerHTML = '<div style="padding:var(--space-4);text-align:center;color:var(--text-tertiary);font-size:var(--text-sm)">Unable to load</div>'; }
}

function toggleUserDropdown() {
    const wrapper = document.getElementById('user-menu-wrapper');
    if (!wrapper) return;
    const existing = wrapper.querySelector('.user-dropdown');
    if (existing) { existing.remove(); return; }
    closeAllDropdowns();
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    let items = '<a href="/dashboard" class="user-dropdown__item">📊 Dashboard</a>' +
        '<a href="/my-groups" class="user-dropdown__item">📋 My Groups</a>';
    if (Auth.isAdmin()) items += '<a href="/admin" class="user-dropdown__item">⚙️ Admin Panel</a>';
    items += '<div class="user-dropdown__divider"></div>' +
        '<button id="signout-btn" class="user-dropdown__item" style="width:100%;border:none;background:none;cursor:pointer;text-align:left">🚪 Sign Out</button>';
    dropdown.innerHTML = items;
    wrapper.appendChild(dropdown);
    document.getElementById('signout-btn')?.addEventListener('click', () => Auth.signOut());
}

function closeAllDropdowns() {
    document.querySelectorAll('.notification-dropdown, .user-dropdown').forEach(d => d.remove());
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#notification-wrapper') && !e.target.closest('#user-menu-wrapper')) closeAllDropdowns();
});

function openDrawer() {
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.id = 'drawer-overlay';
    const drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.id = 'main-drawer';
    const isLoggedIn = Auth.isLoggedIn();
    let links = '<div class="drawer__header"><span style="font-weight:var(--font-bold)">🌐 GroupsMix</span><button id="drawer-close" class="btn btn-ghost btn-icon" aria-label="Close menu">✕</button></div>';
    links += '<a href="/" class="drawer__item">🏠 Home</a>';
    links += '<a href="/search" class="drawer__item">🔍 Search</a>';
    links += '<div class="drawer__divider"></div>';
    links += '<a href="/browse" class="drawer__item">📂 Browse Groups</a>';
    links += '<div class="drawer__divider"></div>';
    links += '<a href="/submit" class="drawer__item">📤 Submit Group</a>';
    links += '<a href="/promote" class="drawer__item">⭐ Promote</a>';
    links += '<a href="/advertise" class="drawer__item">📢 Advertise</a>';
    if (CONFIG.features.store) links += '<a href="/store" class="drawer__item">🛒 Store</a>';
    if (CONFIG.features.marketplace) links += '<a href="/marketplace" class="drawer__item">🏪 Marketplace</a>';
    if (CONFIG.features.jobs) links += '<a href="/jobs" class="drawer__item">💼 Jobs</a>';
    links += '<div class="drawer__divider"></div>';
    if (CONFIG.features.leaderboard) links += '<a href="/leaderboard" class="drawer__item">🏆 Leaderboard</a>';
    if (CONFIG.features.scamWall) links += '<a href="/scam-wall" class="drawer__item">🛡️ Scam Wall</a>';
    links += '<a href="/stats" class="drawer__item">📊 Stats</a>';
    if (CONFIG.features.tools) links += '<a href="/tools" class="drawer__item">🧰 Tools</a>';
    if (CONFIG.features.articles) links += '<a href="/articles" class="drawer__item">📰 Articles</a>';
    links += '<div class="drawer__divider"></div>';
    links += '<a href="/about" class="drawer__item">ℹ️ About</a>';
    links += '<a href="/contact" class="drawer__item">📞 Contact</a>';
    links += '<a href="/faq" class="drawer__item">❓ FAQ</a>';
    links += '<a href="/privacy" class="drawer__item">🔒 Privacy</a>';
    links += '<a href="/terms" class="drawer__item">📜 Terms</a>';
    if (isLoggedIn) {
        links += '<div class="drawer__divider"></div>';
        links += '<a href="/dashboard" class="drawer__item">📊 Dashboard</a>';
        links += '<a href="/my-groups" class="drawer__item">📋 My Groups</a>';
        if (Auth.isAdmin()) links += '<a href="/admin" class="drawer__item">⚙️ Admin Panel</a>';
        links += '<button id="drawer-signout" class="drawer__item" style="width:100%;border:none;background:none;cursor:pointer;text-align:left">🚪 Sign Out</button>';
    }
    drawer.innerHTML = links;
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    const closeDrawer = () => { overlay.remove(); drawer.remove(); };
    overlay.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-signout')?.addEventListener('click', () => { closeDrawer(); Auth.signOut(); });
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeDrawer(); document.removeEventListener('keydown', esc); } });
}

function renderAnnouncement() {
    const bar = document.getElementById('announcement-bar');
    if (!bar) return;
    if (!CONFIG.announcement.enabled) { bar.innerHTML = ''; return; }
    if (sessionStorage.getItem('gm_announcement_dismissed')) { bar.innerHTML = ''; return; }
    const typeClass = 'announcement-bar--' + (CONFIG.announcement.type || 'info');
    bar.innerHTML = '<div class="announcement-bar ' + typeClass + '">' +
        '<span>' + Security.sanitize(CONFIG.announcement.text || '') +
        (CONFIG.announcement.link ? ' <a href="' + Security.sanitize(CONFIG.announcement.link) + '" style="color:#fff;text-decoration:underline">Learn more</a>' : '') +
        '</span>' +
        '<button class="announcement-bar__close" aria-label="Dismiss announcement">✕</button>' +
        '</div>';
    bar.querySelector('.announcement-bar__close')?.addEventListener('click', () => {
        bar.innerHTML = '';
        sessionStorage.setItem('gm_announcement_dismissed', 'true');
    });
}

// ═══════════════════════════════════════
// MODULE 12: renderFooter
// ═══════════════════════════════════════
function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = '<div class="site-footer">' +
        '<div class="site-footer__grid">' +
        '<div class="site-footer__brand"><div class="site-footer__title">🌐 GroupsMix</div><div class="site-footer__desc">Discover Trusted Social Media Groups</div></div>' +
        '<div><div class="site-footer__heading">Browse</div>' +
        '<a href="/browse" class="site-footer__link">Browse Groups</a>' +
        (CONFIG.features.leaderboard ? '<a href="/leaderboard" class="site-footer__link">Leaderboard</a>' : '') +
        (CONFIG.features.scamWall ? '<a href="/scam-wall" class="site-footer__link">Scam Wall</a>' : '') +
        '</div>' +
        '<div><div class="site-footer__heading">Tools</div>' +
        (CONFIG.features.tools ? '<a href="/tools/qr-generator" class="site-footer__link">QR Generator</a><a href="/tools/name-generator" class="site-footer__link">Name Generator</a><a href="/tools/bio-generator" class="site-footer__link">Bio Generator</a>' : '') +
        '</div>' +
        '<div><div class="site-footer__heading">Legal</div>' +
        '<a href="/about" class="site-footer__link">About</a>' +
        '<a href="/contact" class="site-footer__link">Contact</a>' +
        '<a href="/faq" class="site-footer__link">FAQ</a>' +
        '<a href="/privacy" class="site-footer__link">Privacy</a>' +
        '<a href="/terms" class="site-footer__link">Terms</a>' +
        '</div>' +
        '</div>' +
        '<div class="site-footer__bottom">© ' + new Date().getFullYear() + ' GroupsMix. All rights reserved.</div>' +
        '</div>';
}

// ═══════════════════════════════════════
// MODULE 12.5: renderMobileNav
// ═══════════════════════════════════════
function renderMobileNav() {
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.id = 'mobile-nav';
    const path = window.location.pathname;

    nav.innerHTML = '<a href="/" class="mobile-nav__item' + (path === '/' ? ' active' : '') + '"><span class="mobile-nav__icon">🏠</span><span class="mobile-nav__label">Home</span></a>' +
        '<a href="/search" class="mobile-nav__item' + (path.startsWith('/search') ? ' active' : '') + '"><span class="mobile-nav__icon">🔍</span><span class="mobile-nav__label">Search</span></a>' +
        '<a href="/submit" class="mobile-nav__item mobile-nav__item--primary"><span class="mobile-nav__icon">➕</span><span class="mobile-nav__label">Submit</span></a>' +
        '<a href="/browse" class="mobile-nav__item' + (path.startsWith('/browse') || path.startsWith('/category') || path.startsWith('/country') || path.startsWith('/platform') ? ' active' : '') + '"><span class="mobile-nav__icon">📂</span><span class="mobile-nav__label">Browse</span></a>' +
        '<button class="mobile-nav__item" id="mobile-nav-menu"><span class="mobile-nav__icon">☰</span><span class="mobile-nav__label">Menu</span></button>';
    document.body.appendChild(nav);
    document.getElementById('mobile-nav-menu')?.addEventListener('click', openDrawer);
}

// ═══════════════════════════════════════
// MODULE 13: loadSettings
// ═══════════════════════════════════════
async function loadSettings() {
    try {
        const settings = await DB.config.getSettings();
        if (!settings || !Object.keys(settings).length) return;
        if (settings.features) Object.assign(CONFIG.features, settings.features);
        if (settings.announcement) Object.assign(CONFIG.announcement, settings.announcement);
        if (settings.cryptoWallets) Object.assign(CONFIG.cryptoWallets, settings.cryptoWallets);
        if (settings.lemonSqueezy) Object.assign(CONFIG.lemonSqueezy, settings.lemonSqueezy);
        if (settings.turnstileSiteKey) CONFIG.turnstileSiteKey = settings.turnstileSiteKey;
        renderAnnouncement();
        renderFooter();
    } catch (err) { console.error('loadSettings:', err.message); }
}

// ═══════════════════════════════════════
// MODULE 14: Global Init
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Security.init();
    renderHeader();
    renderFooter();
    renderMobileNav();
    Auth._initListener();
    loadSettings();
});

window.onerror = function (msg, src, line, col, err) {
    if (err && err.message) console.warn('GlobalError:', err.message, src, line);
};
window.onunhandledrejection = function (e) {
    if (e && e.reason) console.warn('UnhandledRejection:', e.reason.message || e.reason);
};
