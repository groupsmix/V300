/* ============================================= */
/* GROUPSMIX - SMART FILTER ENGINE               */
/* Boutique-Style Filter for Store & MarketPlus  */
/* ============================================= */

var SmartFilter = (function() {
  'use strict';

  var GXP_LEVELS = [
    { key: 'newcomer',    emoji: '\ud83c\udf31', name: 'Newcomer',    min: 0,    max: 99 },
    { key: 'contributor', emoji: '\u2b50',       name: 'Contributor', min: 100,  max: 499 },
    { key: 'regular',     emoji: '\ud83d\udd25', name: 'Regular',     min: 500,  max: 1499 },
    { key: 'trusted',     emoji: '\ud83d\udee1\ufe0f', name: 'Trusted',     min: 1500, max: 4999 },
    { key: 'elite',       emoji: '\ud83d\udc8e', name: 'Elite',       min: 5000, max: 14999 },
    { key: 'veteran',     emoji: '\ud83c\udf1f', name: 'Veteran',     min: 15000,max: 49999 },
    { key: 'legend',      emoji: '\ud83d\udc51', name: 'Legend',      min: 50000,max: 999999 }
  ];

  var state = {
    open: false,
    filters: {
      status: [],
      priceMin: 0,
      priceMax: 100,
      gxpLevels: [],
      sort: 'relevance'
    },
    onApply: null,
    containerId: null
  };

  function getActiveCount() {
    var c = 0;
    if (state.filters.status.length > 0) c += state.filters.status.length;
    if (state.filters.gxpLevels.length > 0) c += state.filters.gxpLevels.length;
    if (state.filters.priceMin > 0 || state.filters.priceMax < 100) c++;
    if (state.filters.sort !== 'relevance') c++;
    return c;
  }

  function renderFilterHTML() {
    var statusChips = [
      { key: 'vip',      icon: '\ud83d\udc51', label: 'VIP' },
      { key: 'verified', icon: '\u2705',       label: 'Verified' },
      { key: 'toprated', icon: '\u2b50',       label: 'Top Rated' },
      { key: 'promoted', icon: '\ud83d\ude80', label: 'Promoted' }
    ];

    var sortOptions = [
      { key: 'relevance', label: 'Relevance' },
      { key: 'newest',    label: 'Newest First' },
      { key: 'popular',   label: 'Most Popular' },
      { key: 'price-low', label: 'Price: Low to High' },
      { key: 'price-high',label: 'Price: High to Low' },
      { key: 'gxp-high',  label: 'Highest GXP' }
    ];

    var html = '';

    /* Overlay */
    html += '<div class="sf-overlay" id="sf-overlay"></div>';

    /* Toggle Button */
    html += '<button class="sf-toggle" id="sf-toggle" aria-label="Open filters">';
    html += '<span>\u2699\ufe0f</span>';
    html += '<span class="sf-toggle__badge" id="sf-badge">0</span>';
    html += '</button>';

    /* Sidebar / Bottom Sheet */
    html += '<div class="sf-sidebar" id="sf-sidebar">';

    /* Header */
    html += '<div class="sf-sidebar__header">';
    html += '<div class="sf-sidebar__title">\u2728 Smart Filter</div>';
    html += '<button class="sf-sidebar__close" id="sf-close" aria-label="Close filters">\u2715</button>';
    html += '</div>';

    /* Body */
    html += '<div class="sf-sidebar__body">';

    /* Status Section */
    html += '<div class="sf-section">';
    html += '<div class="sf-section__label">\ud83c\udff7\ufe0f Status</div>';
    html += '<div class="sf-chips" id="sf-status-chips">';
    for (var i = 0; i < statusChips.length; i++) {
      var sc = statusChips[i];
      var isActive = state.filters.status.indexOf(sc.key) !== -1;
      html += '<div class="sf-chip' + (isActive ? ' sf-chip--active' : '') + '" data-filter="status" data-value="' + sc.key + '">';
      html += sc.icon + ' ' + Security.sanitize(sc.label);
      html += '</div>';
    }
    html += '</div></div>';

    /* Price Range Section */
    html += '<div class="sf-section">';
    html += '<div class="sf-section__label">\ud83d\udcb0 Price Range</div>';
    html += '<div class="sf-range">';
    html += '<div class="sf-range__track"><div class="sf-range__fill" id="sf-price-fill" style="width:' + state.filters.priceMax + '%"></div></div>';
    html += '<input type="range" id="sf-price-range" min="0" max="100" value="' + state.filters.priceMax + '">';
    html += '</div>';
    html += '<div class="sf-range__labels"><span>Free</span><span>$100+</span></div>';
    html += '<div class="sf-range__value" id="sf-price-value">Up to $' + state.filters.priceMax + '</div>';
    html += '</div>';

    /* GXP Level Section */
    html += '<div class="sf-section">';
    html += '<div class="sf-section__label">\ud83c\udf1f GXP Level</div>';
    html += '<div class="sf-levels" id="sf-gxp-levels">';
    for (var j = 0; j < GXP_LEVELS.length; j++) {
      var lvl = GXP_LEVELS[j];
      var lvlActive = state.filters.gxpLevels.indexOf(lvl.key) !== -1;
      html += '<div class="sf-level' + (lvlActive ? ' sf-level--active' : '') + '" data-filter="gxp" data-value="' + lvl.key + '">';
      html += '<span class="sf-level__emoji">' + lvl.emoji + '</span>';
      html += '<span class="sf-level__name">' + Security.sanitize(lvl.name) + '</span>';
      html += '<span class="sf-level__range">' + lvl.min.toLocaleString() + '-' + lvl.max.toLocaleString() + '</span>';
      html += '</div>';
    }
    html += '</div></div>';

    /* Sort Section */
    html += '<div class="sf-section">';
    html += '<div class="sf-section__label">\ud83d\udd00 Sort By</div>';
    html += '<div class="sf-sort" id="sf-sort-options">';
    for (var k = 0; k < sortOptions.length; k++) {
      var so = sortOptions[k];
      var soActive = state.filters.sort === so.key;
      html += '<div class="sf-sort__option' + (soActive ? ' sf-sort__option--active' : '') + '" data-sort="' + so.key + '">';
      html += '<div class="sf-sort__radio"></div>';
      html += '<span>' + Security.sanitize(so.label) + '</span>';
      html += '</div>';
    }
    html += '</div></div>';

    html += '</div>'; /* end body */

    /* Footer */
    html += '<div class="sf-sidebar__footer">';
    html += '<button class="btn btn--secondary" id="sf-reset">Reset All</button>';
    html += '<button class="btn btn--primary" id="sf-apply">Apply Filters</button>';
    html += '</div>';

    html += '</div>'; /* end sidebar */

    return html;
  }

  function renderActivePills(container) {
    if (!container) return;
    var html = '';
    var filters = state.filters;

    for (var i = 0; i < filters.status.length; i++) {
      var s = filters.status[i];
      html += '<span class="sf-pill">' + Security.sanitize(s.charAt(0).toUpperCase() + s.slice(1));
      html += ' <button class="sf-pill__remove" data-remove="status" data-value="' + s + '">\u2715</button></span>';
    }
    for (var j = 0; j < filters.gxpLevels.length; j++) {
      var g = filters.gxpLevels[j];
      var lvl = GXP_LEVELS.filter(function(l) { return l.key === g; })[0];
      if (lvl) {
        html += '<span class="sf-pill">' + lvl.emoji + ' ' + Security.sanitize(lvl.name);
        html += ' <button class="sf-pill__remove" data-remove="gxp" data-value="' + g + '">\u2715</button></span>';
      }
    }
    if (filters.priceMax < 100) {
      html += '<span class="sf-pill">Up to $' + filters.priceMax;
      html += ' <button class="sf-pill__remove" data-remove="price">\u2715</button></span>';
    }
    if (filters.sort !== 'relevance') {
      html += '<span class="sf-pill">Sort: ' + Security.sanitize(filters.sort);
      html += ' <button class="sf-pill__remove" data-remove="sort">\u2715</button></span>';
    }

    container.innerHTML = html;

    /* Bind pill remove buttons */
    var removeBtns = container.querySelectorAll('.sf-pill__remove');
    for (var r = 0; r < removeBtns.length; r++) {
      removeBtns[r].addEventListener('click', function(e) {
        var type = this.getAttribute('data-remove');
        var val = this.getAttribute('data-value');
        if (type === 'status') {
          state.filters.status = state.filters.status.filter(function(s) { return s !== val; });
        } else if (type === 'gxp') {
          state.filters.gxpLevels = state.filters.gxpLevels.filter(function(g) { return g !== val; });
        } else if (type === 'price') {
          state.filters.priceMax = 100;
        } else if (type === 'sort') {
          state.filters.sort = 'relevance';
        }
        updateBadge();
        renderActivePills(container);
        if (state.onApply) state.onApply(state.filters);
      });
    }
  }

  function updateBadge() {
    var badge = document.getElementById('sf-badge');
    if (!badge) return;
    var count = getActiveCount();
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('sf-toggle__badge--visible');
    } else {
      badge.classList.remove('sf-toggle__badge--visible');
    }
  }

  function open() {
    state.open = true;
    var sidebar = document.getElementById('sf-sidebar');
    var overlay = document.getElementById('sf-overlay');
    if (sidebar) sidebar.classList.add('sf-sidebar--open');
    if (overlay) overlay.classList.add('sf-overlay--open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    state.open = false;
    var sidebar = document.getElementById('sf-sidebar');
    var overlay = document.getElementById('sf-overlay');
    if (sidebar) sidebar.classList.remove('sf-sidebar--open');
    if (overlay) overlay.classList.remove('sf-overlay--open');
    document.body.style.overflow = '';
  }

  function bindEvents() {
    var toggle = document.getElementById('sf-toggle');
    var closeBtn = document.getElementById('sf-close');
    var overlay = document.getElementById('sf-overlay');
    var resetBtn = document.getElementById('sf-reset');
    var applyBtn = document.getElementById('sf-apply');
    var priceRange = document.getElementById('sf-price-range');

    if (toggle) toggle.addEventListener('click', function() {
      if (state.open) { close(); } else { open(); }
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    /* Status chips */
    var statusChips = document.querySelectorAll('[data-filter="status"]');
    for (var i = 0; i < statusChips.length; i++) {
      statusChips[i].addEventListener('click', function() {
        var val = this.getAttribute('data-value');
        var idx = state.filters.status.indexOf(val);
        if (idx === -1) {
          state.filters.status.push(val);
          this.classList.add('sf-chip--active');
        } else {
          state.filters.status.splice(idx, 1);
          this.classList.remove('sf-chip--active');
        }
        updateBadge();
      });
    }

    /* GXP levels */
    var gxpLevels = document.querySelectorAll('[data-filter="gxp"]');
    for (var j = 0; j < gxpLevels.length; j++) {
      gxpLevels[j].addEventListener('click', function() {
        var val = this.getAttribute('data-value');
        var idx = state.filters.gxpLevels.indexOf(val);
        if (idx === -1) {
          state.filters.gxpLevels.push(val);
          this.classList.add('sf-level--active');
        } else {
          state.filters.gxpLevels.splice(idx, 1);
          this.classList.remove('sf-level--active');
        }
        updateBadge();
      });
    }

    /* Price range */
    if (priceRange) {
      priceRange.addEventListener('input', function() {
        var val = parseInt(this.value, 10);
        state.filters.priceMax = val;
        var fill = document.getElementById('sf-price-fill');
        var valueEl = document.getElementById('sf-price-value');
        if (fill) fill.style.width = val + '%';
        if (valueEl) valueEl.textContent = val >= 100 ? 'Any Price' : 'Up to $' + val;
        updateBadge();
      });
    }

    /* Sort options */
    var sortOptions = document.querySelectorAll('[data-sort]');
    for (var k = 0; k < sortOptions.length; k++) {
      sortOptions[k].addEventListener('click', function() {
        var val = this.getAttribute('data-sort');
        state.filters.sort = val;
        for (var s = 0; s < sortOptions.length; s++) {
          sortOptions[s].classList.remove('sf-sort__option--active');
        }
        this.classList.add('sf-sort__option--active');
        updateBadge();
      });
    }

    /* Reset */
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        state.filters = { status: [], priceMin: 0, priceMax: 100, gxpLevels: [], sort: 'relevance' };
        close();
        /* Re-render to reset UI */
        if (state.containerId) {
          SmartFilter.init(state.containerId, state.onApply);
        }
        if (state.onApply) state.onApply(state.filters);
      });
    }

    /* Apply */
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        close();
        var pillsContainer = document.getElementById('sf-active-pills');
        if (pillsContainer) renderActivePills(pillsContainer);
        if (state.onApply) state.onApply(state.filters);
      });
    }

    /* Keyboard: Escape to close */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && state.open) close();
    });
  }

  function init(containerId, onApplyCallback) {
    state.containerId = containerId;
    state.onApply = onApplyCallback || null;

    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = renderFilterHTML() + '<div class="sf-active-filters" id="sf-active-pills"></div>';
    bindEvents();
    updateBadge();

    /* Render existing pills if filters are active */
    var pillsContainer = document.getElementById('sf-active-pills');
    if (pillsContainer && getActiveCount() > 0) {
      renderActivePills(pillsContainer);
    }
  }

  function getFilters() {
    return JSON.parse(JSON.stringify(state.filters));
  }

  function matchesFilters(item) {
    var f = state.filters;

    /* Status filters */
    if (f.status.length > 0) {
      var matchStatus = false;
      for (var i = 0; i < f.status.length; i++) {
        if (f.status[i] === 'vip' && item.vip_tier && item.vip_tier !== 'none') matchStatus = true;
        if (f.status[i] === 'verified' && item.is_verified) matchStatus = true;
        if (f.status[i] === 'toprated' && item.ranking_score >= 80) matchStatus = true;
        if (f.status[i] === 'promoted' && item.is_promoted) matchStatus = true;
      }
      if (!matchStatus) return false;
    }

    /* Price filter */
    if (f.priceMax < 100 && typeof item.price === 'number') {
      if (item.price > f.priceMax) return false;
    }

    /* GXP level filter */
    if (f.gxpLevels.length > 0 && typeof item.gxp !== 'undefined') {
      var matchGxp = false;
      for (var j = 0; j < f.gxpLevels.length; j++) {
        var lvl = GXP_LEVELS.filter(function(l) { return l.key === f.gxpLevels[j]; })[0];
        if (lvl && item.gxp >= lvl.min && item.gxp <= lvl.max) {
          matchGxp = true;
          break;
        }
      }
      if (!matchGxp) return false;
    }

    return true;
  }

  function sortItems(items) {
    var s = state.filters.sort;
    var sorted = items.slice();

    if (s === 'newest') {
      sorted.sort(function(a, b) { return new Date(b.created_at || 0) - new Date(a.created_at || 0); });
    } else if (s === 'popular') {
      sorted.sort(function(a, b) { return (b.click_count || 0) - (a.click_count || 0); });
    } else if (s === 'price-low') {
      sorted.sort(function(a, b) { return (a.price || 0) - (b.price || 0); });
    } else if (s === 'price-high') {
      sorted.sort(function(a, b) { return (b.price || 0) - (a.price || 0); });
    } else if (s === 'gxp-high') {
      sorted.sort(function(a, b) { return (b.gxp || 0) - (a.gxp || 0); });
    }

    return sorted;
  }

  return {
    init: init,
    getFilters: getFilters,
    matchesFilters: matchesFilters,
    sortItems: sortItems,
    open: open,
    close: close
  };
})();
