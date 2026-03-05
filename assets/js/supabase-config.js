/* eslint-disable no-secrets/no-secrets */
/* Supabase publishable (anon) key - intentionally public, protected by RLS */
const SUPABASE_URL = 'https://hmlqppacanpxmrfdlkec.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Z5g0nS3Bv2WH8Z9gAk-1Jw_TJdurs9y';
if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById('main-content');
        if (el) {
            el.textContent = '';
            var wrapper = document.createElement('div');
            wrapper.style.cssText = 'text-align:center;padding:4rem 1rem';
            var h1 = document.createElement('h1');
            h1.textContent = 'Service Unavailable';
            var p = document.createElement('p');
            p.style.cssText = 'margin-top:1rem;color:#999';
            p.textContent = 'Unable to load required resources. Please refresh the page or try again later.';
            var btn = document.createElement('button');
            btn.style.cssText = 'margin-top:1rem;padding:0.5rem 1.5rem;cursor:pointer';
            btn.textContent = 'Retry';
            btn.addEventListener('click', function() { location.reload(); });
            wrapper.appendChild(h1);
            wrapper.appendChild(p);
            wrapper.appendChild(btn);
            el.appendChild(wrapper);
        }
    });
}
