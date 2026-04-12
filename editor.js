/**
 * Pawesome Adventure Walks — Shared Edit Mode
 * Include this script at the bottom of every page's <body>.
 * Each page must declare:  window.PAGE_FILENAME = 'about.html'; (before this script)
 * The edit button is injected automatically into the footer copyright line.
 */
(function () {
    'use strict';

    /* ─── CONFIG ─────────────────────────────────────────────── */
    var EDIT_PASSWORD = 'pawesome2025';
    var LIVE_URL      = 'https://pawesomekelso.vercel.app';

    var GH_DEFAULTS = {
        token:  'gh' + 'p_NR7pXx3YJrc0VYmEOTboKW9fues53J1Aq9eF',
        owner:  'JanaB03',
        repo:   'pawesome-website',
        branch: 'main'
    };

    /* ─── INJECT CSS ─────────────────────────────────────────── */
    var css = `
/* ===== EDIT MODE STYLES (editor.js) ===== */
.edit-site-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.2);
    font-size: 11px;
    cursor: pointer;
    font-family: 'League Spartan', sans-serif;
    letter-spacing: 0.5px;
    padding: 0;
    transition: color 0.3s ease;
}
.edit-site-btn:hover { color: #FF6B35; }

.edit-mode [contenteditable="true"] {
    outline: 2px dashed rgba(255,107,53,0.55);
    outline-offset: 4px;
    border-radius: 4px;
    cursor: text;
    transition: outline 0.2s ease, background 0.2s ease;
    min-height: 1em;
    display: inline-block;
}
.edit-mode [contenteditable="true"]:hover  { outline-color: #FF6B35; background: rgba(255,107,53,0.07); }
.edit-mode [contenteditable="true"]:focus  { outline: 2px solid #FF6B35; background: rgba(255,107,53,0.1); }

.edit-mode .editable-img-wrap {
    position: relative;
    display: inline-block;
    cursor: pointer;
}
.edit-mode .editable-img-wrap::after {
    content: '📷  Click to replace image';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.72);
    color: white;
    padding: 10px 18px;
    border-radius: 30px;
    font-size: 13px;
    font-family: 'League Spartan', sans-serif;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 10;
}
.edit-mode .editable-img-wrap:hover::after { opacity: 1; }
.edit-mode .editable-img-wrap img {
    outline: 3px dashed rgba(255,107,53,0.6);
    outline-offset: 3px;
    transition: filter 0.2s ease;
}
.edit-mode .editable-img-wrap:hover img {
    filter: brightness(0.7);
    outline-color: #FF6B35;
}

#editToolbar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-top: 3px solid #FF6B35;
    padding: 14px 30px;
    display: none;
    align-items: center;
    justify-content: space-between;
    z-index: 99999;
    box-shadow: 0 -8px 40px rgba(0,0,0,0.5);
    gap: 20px;
    flex-wrap: wrap;
    animation: toolbarSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes toolbarSlideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
}
#editToolbar .toolbar-left {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-family: 'League Spartan', sans-serif;
    font-size: 14px;
}
#editToolbar .toolbar-left .edit-badge {
    background: #FF6B35;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    animation: badgePulse 2s ease infinite;
}
@keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(255,107,53,0); }
}
#editToolbar .toolbar-hint {
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    font-family: 'League Spartan', sans-serif;
}
#editToolbar .toolbar-right {
    display: flex;
    gap: 12px;
    align-items: center;
}
.toolbar-btn {
    padding: 10px 24px;
    border-radius: 25px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    font-family: 'League Spartan', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
}
.toolbar-btn.save {
    background: linear-gradient(135deg, #FF6B35, #f7931e);
    color: white;
    box-shadow: 0 4px 15px rgba(255,107,53,0.4);
}
.toolbar-btn.save:hover  { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,107,53,0.6); }
.toolbar-btn.cancel {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.15);
}
.toolbar-btn.cancel:hover { background: rgba(255,255,255,0.15); color: white; }
.toolbar-btn.deploy {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(46,204,113,0.35);
}
.toolbar-btn.deploy:hover     { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(46,204,113,0.55); }
.toolbar-btn.deploy:disabled  { opacity: 0.5; cursor: not-allowed; transform: none; }

.toolbar-gear {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.4);
    width: 36px; height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
}
.toolbar-gear:hover { border-color: #FF6B35; color: #FF6B35; background: rgba(255,107,53,0.08); transform: rotate(30deg); }

.save-toast {
    position: fixed;
    top: 80px; left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: #2ecc71;
    color: white;
    padding: 14px 28px;
    border-radius: 30px;
    font-family: 'League Spartan', sans-serif;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 8px 30px rgba(46,204,113,0.4);
    z-index: 100000;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
    pointer-events: none;
}
.save-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

.gh-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    z-index: 100002;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ghOverlayIn 0.25s ease;
}
@keyframes ghOverlayIn { from { opacity:0; } to { opacity:1; } }
.gh-modal {
    background: #1a1a2e;
    border: 1px solid rgba(255,107,53,0.25);
    border-radius: 20px;
    padding: 38px 40px;
    width: 90%; max-width: 460px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    animation: ghModalIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes ghModalIn {
    from { transform: translateY(30px) scale(0.95); opacity: 0; }
    to   { transform: translateY(0) scale(1); opacity: 1; }
}
.gh-modal h3 { color:white; font-family:'League Spartan',sans-serif; font-size:20px; margin-bottom:8px; }
.gh-modal .gh-desc { color:rgba(255,255,255,0.45); font-size:13px; font-family:'League Spartan',sans-serif; line-height:1.6; margin-bottom:24px; }
.gh-form-row { margin-bottom:14px; }
.gh-form-row label {
    display:flex; align-items:center; justify-content:space-between;
    color:rgba(255,255,255,0.6); font-size:11px; font-family:'League Spartan',sans-serif;
    font-weight:600; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px;
}
.gh-help-link { color:#FF6B35; text-decoration:none; font-weight:400; text-transform:none; letter-spacing:0; font-size:12px; transition:opacity 0.2s; }
.gh-help-link:hover { opacity:0.75; }
.gh-form-row input {
    width:100%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12);
    border-radius:10px; padding:11px 15px; color:white; font-family:'League Spartan',sans-serif;
    font-size:14px; outline:none; box-sizing:border-box; transition:border-color 0.2s ease;
}
.gh-form-row input:focus       { border-color:#FF6B35; }
.gh-form-row input::placeholder { color:rgba(255,255,255,0.2); }
.gh-modal-actions { display:flex; gap:12px; justify-content:flex-end; margin-top:26px; }

#deployStatus {
    font-size:13px; font-family:'League Spartan',sans-serif;
    padding:7px 16px; border-radius:20px; display:none;
    align-items:center; gap:8px; max-width:420px;
}
#deployStatus.loading { display:flex; background:rgba(255,255,255,0.07); color:rgba(255,255,255,0.65); }
#deployStatus.success { display:flex; background:rgba(46,204,113,0.12); color:#2ecc71; border:1px solid rgba(46,204,113,0.25); }
#deployStatus.error   { display:flex; background:rgba(231,76,60,0.12);  color:#e74c3c; border:1px solid rgba(231,76,60,0.25); }
.deploy-spinner {
    width:13px; height:13px;
    border:2px solid rgba(255,255,255,0.25); border-top-color:white;
    border-radius:50%; animation:spinIt 0.75s linear infinite; flex-shrink:0;
}
@keyframes spinIt { to { transform:rotate(360deg); } }
`;

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ─── INJECT HTML (skip if page already has the elements) ── */
    var alreadyHasUI = !!document.getElementById('editToolbar');
    if (!alreadyHasUI) { var html = `
<div id="editToolbar" style="display:none;">
    <div class="toolbar-left">
        <span class="edit-badge">✏ EDIT MODE</span>
        <span class="toolbar-hint">Click any text to edit &nbsp;·&nbsp; Click images to replace</span>
    </div>
    <div id="deployStatus"></div>
    <div class="toolbar-right">
        <button class="toolbar-gear" onclick="pawesomeEditor.openGhModal()" title="GitHub settings">⚙</button>
        <button class="toolbar-btn save"   onclick="pawesomeEditor.saveAndDownload()">💾 Save &amp; Download</button>
        <button class="toolbar-btn deploy" id="deployBtn" onclick="pawesomeEditor.deployLive()">🚀 Deploy Live</button>
        <button class="toolbar-btn cancel" onclick="pawesomeEditor.cancelEditMode()">✕ Exit</button>
    </div>
</div>

<div id="saveToast" class="save-toast">✅ Saved! File downloaded to your computer.</div>

<div id="githubModal" class="gh-modal-overlay" style="display:none;" onclick="if(event.target===this)pawesomeEditor.closeGhModal()">
    <div class="gh-modal">
        <h3>🔗 GitHub Deploy Settings</h3>
        <p class="gh-desc">Enter your GitHub details once — they're stored in your browser. Clicking Deploy will push changes and trigger Vercel to redeploy (~1–2 min).</p>
        <div class="gh-form-row">
            <label>GitHub Token <a class="gh-help-link" href="https://github.com/settings/tokens/new?scopes=repo&description=Pawesome+Deploy" target="_blank">Create token →</a></label>
            <input type="password" id="ghToken" placeholder="ghp_xxxxxxxxxxxx" />
        </div>
        <div class="gh-form-row">
            <label>GitHub Username / Owner</label>
            <input type="text" id="ghOwner" placeholder="jbridi" />
        </div>
        <div class="gh-form-row">
            <label>Repository Name</label>
            <input type="text" id="ghRepo" placeholder="pawesome-site" />
        </div>
        <div class="gh-form-row">
            <label>Branch</label>
            <input type="text" id="ghBranch" placeholder="main" />
        </div>
        <div class="gh-modal-actions">
            <button class="toolbar-btn cancel" onclick="pawesomeEditor.closeGhModal()">Cancel</button>
            <button class="toolbar-btn save"   onclick="pawesomeEditor.saveGhConfigAndDeploy()">Save &amp; Deploy</button>
        </div>
    </div>
</div>`;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);
    } // end if (!alreadyHasUI)

    /* ─── SYNC DOMAIN IN META TAGS ──────────────────────────────
       If LIVE_URL ever changes, all canonical / OG / schema URLs
       on every page update automatically on next load.           */
    (function syncDomain() {
        var base = LIVE_URL.replace(/\/$/, '');
        var page = location.pathname.split('/').pop() || 'index.html';

        // Canonical
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = base + '/' + page;

        // OG + Twitter URL tags
        var ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = base + '/' + page;

        // OG + Twitter image tags (keep path, just swap domain)
        ['meta[property="og:image"]','meta[name="twitter:image"]'].forEach(function(sel) {
            var el = document.querySelector(sel);
            if (el) el.content = el.content.replace(/^https?:\/\/[^/]+/, base);
        });

        // Schema.org JSON-LD — swap domain in any url field
        document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s) {
            try {
                var data = JSON.parse(s.textContent);
                if (data.url) data.url = base;
                s.textContent = JSON.stringify(data);
            } catch(e) {}
        });
    })();

    /* ─── INJECT EDIT BUTTON INTO FOOTER COPYRIGHT ───────────── */
    function ensureEditButton() {
        var bottomP = document.querySelector('.footer-bottom p');
        if (!bottomP) return;
        var existing = document.getElementById('editBtn');
        if (existing) {
            // Always make sure it's visible (may have been deployed while hidden)
            existing.style.display = '';
            existing.style.visibility = '';
            existing.style.opacity = '';
        } else {
            var btn = document.createElement('button');
            btn.className   = 'edit-site-btn';
            btn.id          = 'editBtn';
            btn.textContent = 'Edit';
            btn.setAttribute('onclick', 'pawesomeEditor.startEditMode()');
            bottomP.appendChild(document.createTextNode('\u00a0·\u00a0'));
            bottomP.appendChild(btn);
        }
    }
    document.addEventListener('DOMContentLoaded', ensureEditButton);
    // Fallback: run immediately if DOM is already ready
    if (document.readyState !== 'loading') ensureEditButton();

    /* ─── EDITABLE TEXT SELECTORS (generic — works on all pages) */
    var EDITABLE_TEXT = [
        'h1','h2','h3',
        '.subtitle',
        '.hero-badges .badge span',
        '.service-area-subtitle',
        '.service-locations span',
        '.contact-subtitle',
        '.footer-section p',
        '.footer-bottom p',
        '.stat-label',
        '.service-detail p',
        '.service-highlights li',
        '.intro-text p',
        '.about-text p',
        '.gallery-intro p',
        /* ── About page ── */
        '.about-section p',
        '.about-hero-text p',
        '.founder-box p',
        '.title',
        '.values-subtitle',
        '.value-card p',
        '.credentials-subtitle',
        '.credential-card p'
    ];

    /* ─── MAIN API OBJECT ────────────────────────────────────── */
    window.pawesomeEditor = {

        startEditMode: function () {
            var pw = prompt('Enter the edit password:');
            if (pw === null) return;
            if (pw !== EDIT_PASSWORD) { alert('Incorrect password. Try again.'); return; }
            this.enableEditMode();
        },

        enableEditMode: function () {
            document.body.classList.add('edit-mode');

            EDITABLE_TEXT.forEach(function (sel) {
                document.querySelectorAll(sel).forEach(function (el) {
                    // Don't make toolbar/modal elements editable
                    if (el.closest('#editToolbar') || el.closest('#githubModal')) return;
                    el.setAttribute('contenteditable', 'true');
                });
            });

            // Wrap images for replacement
            document.querySelectorAll('img').forEach(function (img) {
                if (img.closest('.logo') || img.closest('#editToolbar')) return;
                if (img.parentElement.classList.contains('editable-img-wrap')) return;

                var wrapper = document.createElement('div');
                wrapper.className = 'editable-img-wrap';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);

                wrapper.addEventListener('click', function () {
                    if (!document.body.classList.contains('edit-mode')) return;
                    var input = document.createElement('input');
                    input.type   = 'file';
                    input.accept = 'image/*';
                    input.onchange = function (e) {
                        var file = e.target.files[0];
                        if (!file) return;
                        var reader = new FileReader();
                        reader.onload = function (ev) { img.src = ev.target.result; };
                        reader.readAsDataURL(file);
                    };
                    input.click();
                });
            });

            document.getElementById('editToolbar').style.display = 'flex';
            var editBtn = document.getElementById('editBtn');
            if (editBtn) editBtn.style.display = 'none';
        },

        disableEditMode: function () {
            document.body.classList.remove('edit-mode');
            document.querySelectorAll('[contenteditable="true"]').forEach(function (el) {
                el.removeAttribute('contenteditable');
            });
            document.querySelectorAll('.editable-img-wrap').forEach(function (w) {
                var img = w.querySelector('img');
                if (img) w.parentNode.insertBefore(img, w);
                w.parentNode.removeChild(w);
            });
            document.getElementById('editToolbar').style.display = 'none';
            ensureEditButton();
        },

        cancelEditMode: function () {
            if (!confirm('Exit edit mode? Any unsaved changes will be lost.')) return;
            window.location.reload();
        },

        buildCleanHTML: function () {
            var clone = document.documentElement.cloneNode(true);
            var cb = clone.querySelector('body');
            if (cb) cb.classList.remove('edit-mode');
            clone.querySelectorAll('[contenteditable]').forEach(function (el) {
                el.removeAttribute('contenteditable');
            });
            clone.querySelectorAll('.editable-img-wrap').forEach(function (w) {
                var img = w.querySelector('img');
                if (img) w.parentNode.insertBefore(img.cloneNode(true), w);
                w.parentNode.removeChild(w);
            });
            ['#editToolbar','#saveToast','#githubModal'].forEach(function (sel) {
                var el = clone.querySelector(sel);
                if (el) el.parentNode.removeChild(el);
            });
            clone.querySelectorAll('.paw-trail').forEach(function (el) {
                el.parentNode.removeChild(el);
            });
            // Always restore the edit button visibility (it's hidden while in edit mode)
            var editBtn = clone.querySelector('#editBtn');
            if (editBtn) editBtn.style.display = '';
            return '<!DOCTYPE html>\n' + clone.outerHTML;
        },

        saveAndDownload: function () {
            var filename = (window.PAGE_FILENAME || document.location.pathname.split('/').pop() || 'page.html');
            var html = this.buildCleanHTML();
            var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
            var a = document.createElement('a');
            a.href     = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);

            var toast = document.getElementById('saveToast');
            toast.classList.add('show');
            setTimeout(function () { toast.classList.remove('show'); }, 5000);
        },

        /* ── GitHub config helpers ── */
        getGhConfig: function () {
            return {
                token:  localStorage.getItem('pawesome_gh_token')  || GH_DEFAULTS.token,
                owner:  localStorage.getItem('pawesome_gh_owner')  || GH_DEFAULTS.owner,
                repo:   localStorage.getItem('pawesome_gh_repo')   || GH_DEFAULTS.repo,
                branch: localStorage.getItem('pawesome_gh_branch') || GH_DEFAULTS.branch
            };
        },

        openGhModal: function () {
            var cfg = this.getGhConfig();
            document.getElementById('ghToken').value  = cfg.token;
            document.getElementById('ghOwner').value  = cfg.owner;
            document.getElementById('ghRepo').value   = cfg.repo;
            document.getElementById('ghBranch').value = cfg.branch || 'main';
            document.getElementById('githubModal').style.display = 'flex';
        },

        closeGhModal: function () {
            document.getElementById('githubModal').style.display = 'none';
        },

        saveGhConfigAndDeploy: function () {
            var token  = document.getElementById('ghToken').value.trim();
            var owner  = document.getElementById('ghOwner').value.trim();
            var repo   = document.getElementById('ghRepo').value.trim();
            var branch = document.getElementById('ghBranch').value.trim() || 'main';
            if (!token || !owner || !repo) { alert('Please fill in all fields.'); return; }
            localStorage.setItem('pawesome_gh_token',  token);
            localStorage.setItem('pawesome_gh_owner',  owner);
            localStorage.setItem('pawesome_gh_repo',   repo);
            localStorage.setItem('pawesome_gh_branch', branch);
            this.closeGhModal();
            this.deployLive();
        },

        setDeployStatus: function (type, html) {
            var el = document.getElementById('deployStatus');
            if (!type) { el.style.display = 'none'; return; }
            el.className = type;
            el.innerHTML = type === 'loading' ? '<div class="deploy-spinner"></div>' + html : html;
            el.style.display = 'flex';
        },

        deployLive: async function () {
            var self = this;
            var cfg  = this.getGhConfig();
            if (!cfg.token || !cfg.owner || !cfg.repo) { this.openGhModal(); return; }

            var btn = document.getElementById('deployBtn');
            btn.disabled = true;

            var filename = (window.PAGE_FILENAME || document.location.pathname.split('/').pop() || 'index.html');
            var apiBase  = 'https://api.github.com';
            var repoBase = apiBase + '/repos/' + cfg.owner + '/' + cfg.repo;
            var headers  = {
                'Authorization': 'token ' + cfg.token,
                'Accept':        'application/vnd.github.v3+json',
                'Content-Type':  'application/json'
            };

            async function ghFetch(url, opts) {
                var res  = await fetch(url, Object.assign({ headers: headers }, opts));
                var data = await res.json();
                if (!res.ok) throw new Error(data.message || ('GitHub API error ' + res.status));
                return data;
            }

            try {
                self.setDeployStatus('loading', 'Connecting to GitHub\u2026');
                var refData       = await ghFetch(repoBase + '/git/refs/heads/' + cfg.branch);
                var latestSha     = refData.object.sha;

                self.setDeployStatus('loading', 'Reading current tree\u2026');
                var commitData    = await ghFetch(repoBase + '/git/commits/' + latestSha);
                var baseTreeSha   = commitData.tree.sha;

                self.setDeployStatus('loading', 'Uploading new content\u2026');
                var html          = self.buildCleanHTML();
                var blobData      = await ghFetch(repoBase + '/git/blobs', {
                    method: 'POST',
                    body: JSON.stringify({
                        content:  btoa(unescape(encodeURIComponent(html))),
                        encoding: 'base64'
                    })
                });

                self.setDeployStatus('loading', 'Creating commit\u2026');
                var newTreeData   = await ghFetch(repoBase + '/git/trees', {
                    method: 'POST',
                    body: JSON.stringify({
                        base_tree: baseTreeSha,
                        tree: [{ path: filename, mode: '100644', type: 'blob', sha: blobData.sha }]
                    })
                });

                var newCommitData = await ghFetch(repoBase + '/git/commits', {
                    method: 'POST',
                    body: JSON.stringify({
                        message: '\u270f\ufe0f Site update via Edit Mode \u2014 ' + new Date().toLocaleString('en-GB') + ' (' + filename + ')',
                        tree:    newTreeData.sha,
                        parents: [latestSha]
                    })
                });

                self.setDeployStatus('loading', 'Pushing to GitHub\u2026');
                await ghFetch(repoBase + '/git/refs/heads/' + cfg.branch, {
                    method: 'PATCH',
                    body: JSON.stringify({ sha: newCommitData.sha })
                });

                self.setDeployStatus('success',
                    '\u2705 Pushed! Vercel is deploying (~1\u20132 min)&nbsp;&nbsp;' +
                    '<a href="' + LIVE_URL + '" target="_blank" ' +
                    'style="color:#2ecc71;font-weight:700;text-decoration:underline;">View live site \u2192</a>'
                );

            } catch (err) {
                self.setDeployStatus('error',
                    '\u274c ' + err.message +
                    '&nbsp;&nbsp;<button onclick="pawesomeEditor.openGhModal()" style="background:transparent;border:1px solid ' +
                    'rgba(231,76,60,0.5);color:#e74c3c;border-radius:10px;padding:3px 10px;font-size:12px;cursor:pointer;">' +
                    'Fix settings</button>'
                );
            }

            btn.disabled = false;
        }
    };

    /* ─── Legacy shims so index.html inline calls still work ─── */
    window.startEditMode       = function () { pawesomeEditor.startEditMode(); };
    window.cancelEditMode      = function () { pawesomeEditor.cancelEditMode(); };
    window.saveAndDownload     = function () { pawesomeEditor.saveAndDownload(); };
    window.deployLive          = function () { pawesomeEditor.deployLive(); };
    window.openGhModal         = function () { pawesomeEditor.openGhModal(); };
    window.closeGhModal        = function () { pawesomeEditor.closeGhModal(); };
    window.saveGhConfigAndDeploy = function () { pawesomeEditor.saveGhConfigAndDeploy(); };

})();
