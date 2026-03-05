// ═══════════════════════════════════════
// GROUPSMIX — components.js
// UI Module — All rendering functions
// ═══════════════════════════════════════
const UI = {

    // ─── Group Card ──────────────────────────
    groupCard(group) {
        if (!group) return '';
        const tier = Algorithms.getEffectiveTier(group);
        const platform = CONFIG.platforms.find(p => p.id === group.platform);
        const trustScore = Algorithms.calculateTrustScore(group);
        const isSaved = Saved.isSaved(group.id);
        const tags = Array.isArray(group.tags) ? group.tags.slice(0, 3) : [];

        return '<div class="group-card" data-id="' + group.id + '">' +
            '<div class="group-card__header">' +
            '<span class="group-card__platform">' + (platform?.emoji || '📱') + ' ' + Security.sanitize(platform?.name || group.platform || '') + '</span>' +
            (tier !== 'none' ? UI.trustBadge(tier) : '') +
            '</div>' +
            '<div class="group-card__body">' +
            '<div class="group-card__name">' + Security.sanitize(group.name || 'Unnamed') + '</div>' +
            '<div class="group-card__description">' + Security.sanitize(group.description || '') + '</div>' +
            (tags.length ? '<div class="group-card__tags">' + tags.map(t => '<span class="group-card__tag">' + Security.sanitize(t) + '</span>').join('') + '</div>' : '') +
            '<div class="group-card__stats">' +
            '<span class="group-card__stat">👁 ' + UI.formatNumber(group.views || 0) + '</span>' +
            '<span class="group-card__stat">⭐ ' + (parseFloat(group.avg_rating) || 0).toFixed(1) + '</span>' +
            '<span class="group-card__stat">🛡️ ' + trustScore + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="group-card__footer">' +
            '<a href="/group?id=' + group.id + '" class="btn btn-primary btn-sm group-card__btn-visit">View Group</a>' +
            '<button class="btn btn-ghost btn-icon btn-sm group-card__btn-save" data-group-id="' + group.id + '" aria-label="' + (isSaved ? 'Unsave' : 'Save') + ' group">' + (isSaved ? '❤️' : '🤍') + '</button>' +
            '</div>' +
            '</div>';
    },

    groupGrid(groups, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!Array.isArray(groups) || !groups.length) {
            UI.emptyState(containerId, '📭', 'No Groups Found', 'Try adjusting your filters or search terms.', 'Browse All', '/search');
            return;
        }
        container.innerHTML = '<div class="grid grid-4">' + groups.map(g => UI.groupCard(g)).join('') + '</div>';
        container.style.animation = 'fadeIn 0.3s ease';
        container.querySelectorAll('.group-card__btn-save').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const gid = btn.dataset.groupId;
                const group = groups.find(g => g.id === gid);
                if (Saved.isSaved(gid)) { Saved.remove(gid); btn.textContent = '🤍'; UI.toast('Group removed from saved', 'info'); }
                else { Saved.add(group); btn.textContent = '❤️'; UI.toast('Group saved!', 'success'); }
            });
        });
    },

    groupCardSkeleton() {
        return '<div class="skeleton skeleton-card"></div>';
    },

    groupGridSkeleton(count, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<div class="grid grid-4">' + Array(count || 12).fill('').map(() => UI.groupCardSkeleton()).join('') + '</div>';
    },

    // ─── Common Components ──────────────────
    emptyState(containerId, icon, title, description, ctaText, ctaHref) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<div class="empty-state">' +
            '<div class="empty-state__icon">' + (icon || '📭') + '</div>' +
            '<div class="empty-state__title">' + Security.sanitize(title || 'Nothing Here') + '</div>' +
            '<div class="empty-state__text">' + Security.sanitize(description || '') + '</div>' +
            (ctaText ? '<a href="' + (ctaHref || '#') + '" class="btn btn-primary">' + Security.sanitize(ctaText) + '</a>' : '') +
            '</div>';
    },

    errorState(containerId, retryFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<div class="error-state">' +
            '<div class="error-state__icon">😞</div>' +
            '<div class="error-state__title">Something went wrong</div>' +
            '<div class="error-state__text">We couldn\'t load this content. Please try again.</div>' +
            '<button class="btn btn-primary" id="retry-btn-' + containerId + '">🔄 Try Again</button>' +
            '</div>';
        if (retryFn) {
            document.getElementById('retry-btn-' + containerId)?.addEventListener('click', retryFn);
        }
    },

    timeoutState(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<div class="error-state">' +
            '<div class="error-state__icon">⏱️</div>' +
            '<div class="error-state__title">Taking too long</div>' +
            '<div class="error-state__text">Please refresh the page.</div>' +
            '<button class="btn btn-primary" id="timeout-refresh-btn-' + containerId + '">🔄 Refresh</button>' +
            '</div>';
        document.getElementById('timeout-refresh-btn-' + containerId)?.addEventListener('click', () => location.reload());
    },

    // ─── Toast ──────────────────────────────
    toast(message, type, duration) {
        type = type || 'info';
        duration = duration || CONFIG.toastDuration;
        const container = document.getElementById('toast-container');
        if (!container) return;
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.innerHTML = '<span class="toast__icon">' + (icons[type] || 'ℹ️') + '</span>' +
            '<div class="toast__content"><div class="toast__message">' + Security.sanitize(message) + '</div></div>' +
            '<button class="toast__close" aria-label="Dismiss">✕</button>';

        const dismiss = () => {
            toast.classList.add('toast--exit');
            setTimeout(() => toast.remove(), 200);
        };
        toast.querySelector('.toast__close').addEventListener('click', dismiss);
        container.appendChild(toast);

        const toasts = container.querySelectorAll('.toast');
        if (toasts.length > CONFIG.maxToasts) toasts[0].remove();

        setTimeout(dismiss, duration);
    },

    // ─── Modal ──────────────────────────────
    modal(options) {
        UI.closeModal();
        const sizeClass = options.size === 'small' ? ' modal--small' : options.size === 'large' ? ' modal--large' : '';
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'modal-overlay';
        overlay.innerHTML = '<div class="modal' + sizeClass + '" role="dialog" aria-modal="true">' +
            '<div class="modal__header">' +
            '<h3 class="modal__title">' + Security.sanitize(options.title || '') + '</h3>' +
            '<button class="modal__close" aria-label="Close modal">✕</button>' +
            '</div>' +
            '<div class="modal__body">' + (options.content || '') + '</div>' +
            (options.footer ? '<div class="modal__footer">' + options.footer + '</div>' : '') +
            '</div>';

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const previousFocus = document.activeElement;
        const close = () => {
            overlay.remove();
            document.body.style.overflow = '';
            if (previousFocus) previousFocus.focus();
            if (options.onClose) options.onClose();
        };

        overlay.querySelector('.modal__close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
        });

        const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) {
            focusable[0].focus();
            overlay.addEventListener('keydown', (e) => {
                if (e.key !== 'Tab') return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            });
        }
    },

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) { overlay.remove(); document.body.style.overflow = ''; }
    },

    confirmModal(title, message, onConfirm) {
        UI.modal({
            title: title || 'Confirm',
            content: '<p style="color:var(--text-secondary)">' + Security.sanitize(message || 'Are you sure?') + '</p>',
            footer: '<button class="btn btn-secondary" id="confirm-cancel">Cancel</button>' +
                '<button class="btn btn-danger" id="confirm-yes">Yes</button>',
            size: 'small'
        });
        document.getElementById('confirm-cancel')?.addEventListener('click', UI.closeModal);
        document.getElementById('confirm-yes')?.addEventListener('click', () => { UI.closeModal(); if (onConfirm) onConfirm(); });
    },

    // ─── Auth Modal ─────────────────────────
    authModal(defaultTab) {
        const tab = defaultTab || 'signin';
        UI.modal({
            title: '🔐 ' + (tab === 'signup' ? 'Create Account' : 'Sign In to GroupsMix'),
            content: UI._authModalContent(tab),
            size: 'small'
        });
        UI._initAuthModal(tab);
    },

    _authModalContent(tab) {
        return '<div class="auth-tabs">' +
            '<button class="auth-tab' + (tab === 'signin' ? ' auth-tab--active' : '') + '" data-tab="signin">Sign In</button>' +
            '<button class="auth-tab' + (tab === 'signup' ? ' auth-tab--active' : '') + '" data-tab="signup">Sign Up</button>' +
            '</div>' +
            '<div id="auth-error" class="auth-form__error hidden"></div>' +
            '<form id="auth-form">' +
            '<div id="auth-name-group" class="form-group' + (tab === 'signin' ? ' hidden' : '') + '">' +
            '<label class="form-label" for="auth-name">Display Name</label>' +
            '<input type="text" id="auth-name" class="form-input" placeholder="Your name" minlength="2" maxlength="50">' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="form-label" for="auth-email">Email</label>' +
            '<input type="email" id="auth-email" class="form-input" placeholder="you@example.com" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="form-label" for="auth-password">Password</label>' +
            '<div class="password-wrapper">' +
            '<input type="password" id="auth-password" class="form-input" placeholder="Min 6 characters" minlength="6" required>' +
            '<button type="button" class="password-toggle" aria-label="Toggle password visibility">👁</button>' +
            '</div>' +
            '</div>' +
            '<div id="auth-confirm-group" class="form-group' + (tab === 'signin' ? ' hidden' : '') + '">' +
            '<label class="form-label" for="auth-confirm">Confirm Password</label>' +
            '<div class="password-wrapper">' +
            '<input type="password" id="auth-confirm" class="form-input" placeholder="Confirm password">' +
            '<button type="button" class="password-toggle" aria-label="Toggle password visibility">👁</button>' +
            '</div>' +
            '</div>' +
            (tab === 'signin' ? '<div style="text-align:right;margin-bottom:var(--space-4)"><a href="#" id="forgot-password-link" style="font-size:var(--text-sm)">Forgot Password?</a></div>' : '') +
            '<button type="submit" class="btn btn-primary btn-full" id="auth-submit">' + (tab === 'signup' ? '🚀 Create Account' : '🔐 Sign In') + '</button>' +
            '</form>' +
            '<div class="auth-footer">' +
            (tab === 'signin' ? 'Don\'t have an account? <a id="switch-to-signup">Sign Up</a>' : 'Already have an account? <a id="switch-to-signin">Sign In</a>') +
            '</div>';
    },

    _initAuthModal(tab) {
        let currentTab = tab;
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.addEventListener('click', () => {
                currentTab = t.dataset.tab;
                const body = document.querySelector('.modal__body');
                if (body) { body.innerHTML = UI._authModalContent(currentTab); UI._initAuthModal(currentTab); }
            });
        });
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                if (input) { input.type = input.type === 'password' ? 'text' : 'password'; btn.textContent = input.type === 'password' ? '👁' : '🙈'; }
            });
        });
        document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
            e.preventDefault();
            const body = document.querySelector('.modal__body');
            if (body) { body.innerHTML = UI._authModalContent('signup'); UI._initAuthModal('signup'); }
        });
        document.getElementById('switch-to-signin')?.addEventListener('click', (e) => {
            e.preventDefault();
            const body = document.querySelector('.modal__body');
            if (body) { body.innerHTML = UI._authModalContent('signin'); UI._initAuthModal('signin'); }
        });
        document.getElementById('forgot-password-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            const body = document.querySelector('.modal__body');
            if (body) {
                body.innerHTML = '<div style="text-align:center;margin-bottom:var(--space-6)"><p style="color:var(--text-secondary)">Enter your email to receive a reset link</p></div>' +
                    '<form id="reset-form"><div class="form-group"><label class="form-label" for="reset-email">Email</label>' +
                    '<input type="email" id="reset-email" class="form-input" placeholder="you@example.com" required></div>' +
                    '<button type="submit" class="btn btn-primary btn-full">Send Reset Link</button></form>' +
                    '<div class="auth-footer" style="margin-top:var(--space-4)"><a id="back-to-signin" href="#">← Back to Sign In</a></div>';
                document.getElementById('back-to-signin')?.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    body.innerHTML = UI._authModalContent('signin');
                    UI._initAuthModal('signin');
                });
                document.getElementById('reset-form')?.addEventListener('submit', async (ev) => {
                    ev.preventDefault();
                    const email = document.getElementById('reset-email')?.value?.trim();
                    if (!email || !Security.isValidEmail(email)) { UI.toast('Please enter a valid email', 'error'); return; }
                    const btn = ev.target.querySelector('button[type="submit"]');
                    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> Sending...'; }
                    await Auth.resetPassword(email);
                    UI.closeModal();
                });
            }
        });
        document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errEl = document.getElementById('auth-error');
            if (errEl) errEl.classList.add('hidden');
            const email = document.getElementById('auth-email')?.value?.trim();
            const password = document.getElementById('auth-password')?.value;
            if (!email || !Security.isValidEmail(email)) { showAuthError('Please enter a valid email address'); return; }
            if (!password || password.length < 6) { showAuthError('Password must be at least 6 characters'); return; }
            const btn = document.getElementById('auth-submit');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> ' + (currentTab === 'signup' ? 'Creating...' : 'Signing in...'); }
            if (currentTab === 'signup') {
                const name = document.getElementById('auth-name')?.value?.trim();
                const confirm = document.getElementById('auth-confirm')?.value;
                if (!name || name.length < 2) { showAuthError('Display name must be at least 2 characters'); resetBtn(); return; }
                if (password !== confirm) { showAuthError('Passwords do not match'); resetBtn(); return; }
                if (Security.isDisposableEmail(email)) { showAuthError('Disposable email addresses are not allowed'); resetBtn(); return; }
                const result = await Auth.signUp(email, password, name);
                if (result) UI.closeModal();
                else resetBtn();
            } else {
                const result = await Auth.signIn(email, password);
                if (result) UI.closeModal();
                else resetBtn();
            }
            function resetBtn() { if (btn) { btn.disabled = false; btn.innerHTML = currentTab === 'signup' ? '🚀 Create Account' : '🔐 Sign In'; } }
            function showAuthError(msg) { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } }
        });
    },

    // ─── Pagination ─────────────────────────
    pagination(current, total, callback) {
        if (total <= 1) return '';
        let pages = [];
        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > 3) pages.push('...');
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
            if (current < total - 2) pages.push('...');
            pages.push(total);
        }
        return '<nav class="pagination" aria-label="Pagination">' +
            '<button class="pagination__btn"' + (current === 1 ? ' disabled' : '') + ' data-page="' + (current - 1) + '" aria-label="Previous page">←</button>' +
            pages.map(p => {
                if (p === '...') return '<span class="pagination__ellipsis">…</span>';
                return '<button class="pagination__btn' + (p === current ? ' pagination__btn--active' : '') + '" data-page="' + p + '"' +
                    (p === current ? ' aria-current="page"' : '') + ' aria-label="Page ' + p + '">' + p + '</button>';
            }).join('') +
            '<button class="pagination__btn"' + (current === total ? ' disabled' : '') + ' data-page="' + (current + 1) + '" aria-label="Next page">→</button>' +
            '</nav>';
    },

    initPagination(containerId, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('.pagination__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if (!isNaN(page) && !btn.disabled) callback(page);
            });
        });
    },

    // ─── Trust & Rating ─────────────────────
    trustBadge(tier) {
        const badges = {
            verified: '<span class="vip-badge vip-badge--verified">✅ Verified</span>',
            niche: '<span class="vip-badge vip-badge--niche">🔵 Niche</span>',
            global: '<span class="vip-badge vip-badge--global">🟡 Global</span>',
            diamond: '<span class="vip-badge vip-badge--diamond">💎 Diamond</span>'
        };
        return badges[tier] || '';
    },

    trustScore(score) {
        const s = isNaN(score) ? 0 : Math.max(0, Math.min(100, Number(score)));
        let color = 'var(--error)';
        if (s > 80) color = 'var(--success)';
        else if (s > 60) color = 'var(--info)';
        else if (s > 30) color = 'var(--warning)';
        return '<div class="trust-score">' +
            '<div class="trust-score__bar"><div class="trust-score__fill" style="width:' + s + '%;background:' + color + '"></div></div>' +
            '<span class="trust-score__value" style="color:' + color + '">' + s + '</span>' +
            '</div>';
    },

    starRating(rating, interactive, onChange) {
        const r = parseFloat(rating) || 0;
        const cls = interactive ? ' star-rating--interactive' : '';
        let html = '<div class="star-rating' + cls + '">';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= Math.round(r);
            html += '<span class="star-rating__star star-rating__star--' + (filled ? 'filled' : 'empty') + '" data-value="' + i + '">' + (filled ? '⭐' : '☆') + '</span>';
        }
        html += '</div>';
        return html;
    },

    initStarRating(container, onChange) {
        if (!container) return;
        container.querySelectorAll('.star-rating__star').forEach(star => {
            star.addEventListener('click', () => {
                const val = parseInt(star.dataset.value);
                container.querySelectorAll('.star-rating__star').forEach((s, i) => {
                    s.className = 'star-rating__star star-rating__star--' + (i < val ? 'filled' : 'empty');
                    s.textContent = i < val ? '⭐' : '☆';
                });
                if (onChange) onChange(val);
            });
        });
    },

    reviewCard(review) {
        if (!review) return '';
        const initial = (review.display_name || 'A').charAt(0).toUpperCase();
        return '<div class="review-card">' +
            '<div class="review-card__header">' +
            '<div class="review-card__avatar">' + initial + '</div>' +
            '<div><div class="review-card__name">' + Security.sanitize(review.display_name || 'Anonymous') + '</div>' +
            '<div class="review-card__date">' + UI.formatDate(review.created_at) + '</div></div>' +
            '<div style="margin-left:auto">' + UI.starRating(review.rating) + '</div>' +
            '</div>' +
            (review.text ? '<div class="review-card__text">' + Security.sanitize(review.text) + '</div>' : '') +
            '</div>';
    },

    // ─── Article Card ───────────────────────
    articleCard(article) {
        if (!article) return '';
        return '<a href="/article?slug=' + encodeURIComponent(article.slug || '') + '" class="card card--clickable article-card">' +
            (article.cover_image ? '<img class="article-card__image" src="' + Security.sanitize(article.cover_image) + '" alt="" loading="lazy">' : '<div class="article-card__image skeleton"></div>') +
            '<div class="article-card__body">' +
            '<div class="article-card__title">' + Security.sanitize(article.title || '') + '</div>' +
            '<div class="article-card__excerpt">' + Security.sanitize(article.excerpt || '') + '</div>' +
            '<div class="article-card__meta"><span>' + Security.sanitize(article.author_name || '') + '</span><span>👁 ' + UI.formatNumber(article.views || 0) + '</span></div>' +
            '</div>' +
            '</a>';
    },

    articleCardSkeleton() {
        return '<div class="card article-card"><div class="skeleton" style="height:180px"></div><div style="padding:var(--space-4)"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text" style="width:90%"></div><div class="skeleton skeleton-text" style="width:70%"></div></div></div>';
    },

    // ─── Ad Card ────────────────────────────
    adCard(ad) {
        if (!ad) return '';
        return '<a href="' + Security.sanitize(ad.link || '#') + '" target="_blank" rel="noopener noreferrer" class="ad-card" data-ad-id="' + ad.id + '">' +
            '<span class="ad-card__label">Ad</span>' +
            (ad.image_url ? '<img class="ad-card__image" src="' + Security.sanitize(ad.image_url) + '" alt="" loading="lazy">' : '') +
            '<div class="ad-card__body">' +
            '<div class="ad-card__title">' + Security.sanitize(ad.title || '') + '</div>' +
            '<div class="ad-card__desc">' + Security.sanitize(ad.description || '') + '</div>' +
            '</div>' +
            '</a>';
    },

    // ─── Formatting ─────────────────────────
    formatDate(isoString) {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return '';
            const now = Date.now();
            const diff = now - date.getTime();
            if (diff < 60000) return 'Just now';
            if (diff < 3600000) return Math.floor(diff / 60000) + ' minutes ago';
            if (diff < 86400000) return Math.floor(diff / 3600000) + ' hours ago';
            if (diff < 604800000) return Math.floor(diff / 86400000) + ' days ago';
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch { return ''; }
    },

    formatNumber(n) {
        const num = isNaN(n) ? 0 : Number(n);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    formatCurrency(amount) {
        const a = parseFloat(amount) || 0;
        return '$' + a.toFixed(2);
    },

    // ─── Utilities ──────────────────────────
    countUp(element, target, duration) {
        if (!element) return;
        const t = isNaN(target) ? 0 : Number(target);
        const d = duration || 1500;
        let start = 0;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / d, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = UI.formatNumber(Math.floor(eased * t));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    },

    debounce(fn, delay) {
        let timer;
        return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay || CONFIG.debounceDelay); };
    },

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            UI.toast('Copied to clipboard!', 'success');
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            UI.toast('Copied to clipboard!', 'success');
        }
    },

    async shareGroup(group) {
        if (!group) return;
        const url = CONFIG.siteUrl + '/group?id=' + group.id;
        const text = 'Check out ' + (group.name || 'this group') + ' on GroupsMix!';
        if (navigator.share) {
            try { await navigator.share({ title: group.name, text, url }); }
            catch { UI.copyToClipboard(url); }
        } else {
            UI.copyToClipboard(url);
        }
    },

    // ─── Search Filters ────────────────────
    searchFilters(options, onFilter) {
        const platforms = '<option value="">All Platforms</option>' + CONFIG.platforms.map(p => '<option value="' + p.id + '"' + (options.platform === p.id ? ' selected' : '') + '>' + p.emoji + ' ' + p.name + '</option>').join('');
        const categories = '<option value="">All Categories</option>' + CONFIG.categories.map(c => '<option value="' + c.id + '"' + (options.category === c.id ? ' selected' : '') + '>' + c.emoji + ' ' + c.name + '</option>').join('');
        const countries = '<option value="">All Countries</option>' + CONFIG.countries.map(c => '<option value="' + c.code + '"' + (options.country === c.code ? ' selected' : '') + '>' + c.flag + ' ' + c.name + '</option>').join('');
        const sorts = ['<option value="ranking"' + (options.sort === 'ranking' ? ' selected' : '') + '>Ranking</option>',
        '<option value="newest"' + (options.sort === 'newest' ? ' selected' : '') + '>Newest</option>',
        '<option value="views"' + (options.sort === 'views' ? ' selected' : '') + '>Most Viewed</option>',
        '<option value="rating"' + (options.sort === 'rating' ? ' selected' : '') + '>Top Rated</option>'].join('');

        return '<div class="filter-bar">' +
            '<div class="form-group"><label class="form-label">Platform</label><select class="form-select" id="filter-platform">' + platforms + '</select></div>' +
            '<div class="form-group"><label class="form-label">Category</label><select class="form-select" id="filter-category">' + categories + '</select></div>' +
            '<div class="form-group"><label class="form-label">Country</label><select class="form-select" id="filter-country">' + countries + '</select></div>' +
            '<div class="form-group"><label class="form-label">Sort</label><select class="form-select" id="filter-sort">' + sorts + '</select></div>' +
            '</div>';
    },

    initFilters(onFilter) {
        ['filter-platform', 'filter-category', 'filter-country', 'filter-sort'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                if (onFilter) onFilter({
                    platform: document.getElementById('filter-platform')?.value || '',
                    category: document.getElementById('filter-category')?.value || '',
                    country: document.getElementById('filter-country')?.value || '',
                    sort: document.getElementById('filter-sort')?.value || 'ranking'
                });
            });
        });
    }
};
