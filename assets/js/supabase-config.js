/* eslint-disable no-secrets/no-secrets */
/* Supabase publishable (anon) key - intentionally public, protected by RLS */
const SUPABASE_URL = 'https://hmlqppacanpxmrfdlkec.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Z5g0nS3Bv2WH8Z9gAk-1Jw_TJdurs9y';
if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById('main-content');
        if (el) el.innerHTML = '<div style="text-align:center;padding:4rem 1rem"><h1>Service Unavailable</h1><p style="margin-top:1rem;color:#999">Unable to load required resources. Please refresh the page or try again later.</p><button onclick="location.reload()" style="margin-top:1rem;padding:0.5rem 1.5rem;cursor:pointer">Retry</button></div>';
    });
}
