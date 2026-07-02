/* ==========================================================================
   render.js — turns window.SITE data into DOM. No per-item HTML is hardcoded.
   ========================================================================== */
(function () {
  "use strict";
  var SITE = window.SITE || {};

  /* --------------------------------------------------------------- icons */
  var I = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
    arxiv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v12H5.2L4 17.6V4Z"/><path d="M8 8h8M8 12h5"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    openreview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5 12 7l3 2.5"/></svg>',
    poster: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
    doi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h.01M12 8v8M16 12h.01"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Z"/><path d="M6 13v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-3l-6 3.3L6 13Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
    dblp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v18M17 3v18M7 8h10M7 16h10"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.ICONS = I;

  /* per-project SVG thumbnails — one accent colour, themed line-art glyphs */
  var SVG = function (body) {
    return '<svg viewBox="0 0 320 132" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="thumb-svg">' + body + '</svg>';
  };
  var THUMBS = {
    // tensor tree (TN-SHAP)
    tree: SVG(
      '<g fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round">' +
      '<line x1="160" y1="34" x2="116" y2="68"/><line x1="160" y1="34" x2="204" y2="68"/>' +
      '<line x1="116" y1="68" x2="94" y2="100"/><line x1="116" y1="68" x2="138" y2="100"/>' +
      '<line x1="204" y1="68" x2="182" y2="100"/><line x1="204" y1="68" x2="226" y2="100"/></g>' +
      '<g fill="var(--accent)"><circle cx="160" cy="34" r="6.5"/><circle cx="116" cy="68" r="5.5"/>' +
      '<circle cx="204" cy="68" r="5.5"/><circle cx="94" cy="100" r="5"/><circle cx="138" cy="100" r="5"/>' +
      '<circle cx="182" cy="100" r="5"/><circle cx="226" cy="100" r="5"/></g>'),
    // molecule / graph (TN-SHAP-G)
    graph: SVG(
      '<g fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round">' +
      '<polygon points="192,66 176,94 144,94 128,66 144,38 176,38"/>' +
      '<line x1="192" y1="66" x2="222" y2="66"/><line x1="128" y1="66" x2="98" y2="66"/></g>' +
      '<g fill="var(--accent)"><circle cx="192" cy="66" r="5"/><circle cx="176" cy="94" r="5"/>' +
      '<circle cx="144" cy="94" r="5"/><circle cx="128" cy="66" r="5"/><circle cx="144" cy="38" r="5"/>' +
      '<circle cx="176" cy="38" r="5"/><circle cx="222" cy="66" r="4.5"/><circle cx="98" cy="66" r="4.5"/></g>'),
    // quantum circuit (TN-SHAP-Q)
    circuit: SVG(
      '<g stroke="var(--accent)" stroke-width="2.2" fill="none" stroke-linecap="round">' +
      '<line x1="64" y1="42" x2="256" y2="42"/><line x1="64" y1="66" x2="256" y2="66"/><line x1="64" y1="90" x2="256" y2="90"/>' +
      '<rect x="92" y="30" width="24" height="24" rx="4" fill="var(--accent-soft)"/>' +
      '<line x1="168" y1="42" x2="168" y2="66"/><circle cx="168" cy="66" r="9"/>' +
      '<line x1="159" y1="66" x2="177" y2="66"/><line x1="168" y1="57" x2="168" y2="75"/>' +
      '<rect x="204" y="78" width="24" height="24" rx="4" fill="var(--accent-soft)"/></g>' +
      '<circle cx="168" cy="42" r="5" fill="var(--accent)"/>'),
    // steering vector (Multilinear Steering)
    steer: SVG(
      '<defs><marker id="ah-steer" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
      '<g stroke="var(--accent)" stroke-linecap="round">' +
      '<line x1="70" y1="98" x2="250" y2="98" stroke-width="1.5" opacity="0.35"/>' +
      '<line x1="118" y1="104" x2="150" y2="86" stroke-width="1.5" opacity="0.3"/>' +
      '<line x1="104" y1="98" x2="202" y2="46" stroke-width="2.6" marker-end="url(#ah-steer)"/></g>' +
      '<circle cx="104" cy="98" r="5.5" fill="var(--accent)"/>'),
    // eye (Evaluation Awareness)
    eye: SVG(
      '<g fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round">' +
      '<path d="M104 66 Q160 32 216 66 Q160 100 104 66 Z"/><circle cx="160" cy="66" r="15"/></g>' +
      '<circle cx="160" cy="66" r="6.5" fill="var(--accent)"/>'),
    // eval/deploy toggle (Evaluation Adaptation)
    toggle: SVG(
      '<defs><marker id="ah-tog" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
      '<rect x="78" y="46" width="62" height="40" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<rect x="180" y="46" width="62" height="40" rx="9" fill="none" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<circle cx="109" cy="66" r="6" fill="var(--accent)"/>' +
      '<circle cx="211" cy="66" r="6" fill="none" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<g stroke="var(--accent)" stroke-width="2" stroke-linecap="round">' +
      '<line x1="148" y1="58" x2="172" y2="58" marker-end="url(#ah-tog)"/>' +
      '<line x1="172" y1="74" x2="148" y2="74" marker-end="url(#ah-tog)"/></g>'),
    // chessboard + knight move (Chess Strategic Adaptation)
    chess: SVG(
      '<defs><marker id="ah-chess" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
      '<g fill="var(--accent)" opacity="0.2"><rect x="121" y="27" width="26" height="26"/><rect x="173" y="27" width="26" height="26"/>' +
      '<rect x="147" y="53" width="26" height="26"/><rect x="121" y="79" width="26" height="26"/><rect x="173" y="79" width="26" height="26"/></g>' +
      '<g fill="none" stroke="var(--accent)" stroke-width="2">' +
      '<rect x="121" y="27" width="78" height="78" rx="3"/>' +
      '<line x1="147" y1="27" x2="147" y2="105"/><line x1="173" y1="27" x2="173" y2="105"/>' +
      '<line x1="121" y1="53" x2="199" y2="53"/><line x1="121" y1="79" x2="199" y2="79"/></g>' +
      '<path d="M134 92 V50 H172" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ah-chess)"/>' +
      '<circle cx="134" cy="92" r="4.5" fill="var(--accent)"/>'),
    // evolving network + random walk (EvoNRL)
    network: SVG(
      '<defs><marker id="ah-net" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--accent)"/></marker></defs>' +
      '<g stroke="var(--accent)" stroke-width="1.5" fill="none" opacity="0.3">' +
      '<line x1="96" y1="44" x2="146" y2="74"/><line x1="146" y1="74" x2="120" y2="102"/>' +
      '<line x1="146" y1="74" x2="196" y2="50"/><line x1="196" y1="50" x2="226" y2="92"/><line x1="196" y1="50" x2="170" y2="32"/></g>' +
      '<path d="M96 44 L146 74 L196 50 L226 92" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" marker-end="url(#ah-net)"/>' +
      '<line x1="120" y1="102" x2="226" y2="92" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.55"/>' +
      '<g fill="var(--accent)"><circle cx="96" cy="44" r="4.5"/><circle cx="146" cy="74" r="4.5"/><circle cx="120" cy="102" r="4.5"/>' +
      '<circle cx="196" cy="50" r="4.5"/><circle cx="226" cy="92" r="4.5"/><circle cx="170" cy="32" r="4.5"/></g>'),
    // supply / bid stack (Bachelor's — electricity markets)
    market: SVG(
      '<g stroke="var(--accent)" stroke-width="1.5" opacity="0.3" fill="none"><line x1="80" y1="30" x2="80" y2="104"/><line x1="80" y1="104" x2="248" y2="104"/></g>' +
      '<g fill="var(--accent)" opacity="0.18"><rect x="92" y="88" width="26" height="16"/><rect x="122" y="74" width="26" height="30"/>' +
      '<rect x="152" y="60" width="26" height="44"/><rect x="182" y="48" width="26" height="56"/><rect x="212" y="40" width="26" height="64"/></g>' +
      '<path d="M92 88 H118 V74 H148 V60 H178 V48 H208 V40 H238" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>')
  };
  THUMBS._default = THUMBS.tree;
  window.THUMBS = THUMBS;

  /* link metadata: type -> {label, icon} */
  var LINK_META = {
    paper: { label: "Paper", icon: "pdf" },
    pdf: { label: "PDF", icon: "pdf" },
    arxiv: { label: "arXiv", icon: "arxiv" },
    code: { label: "Code", icon: "github" },
    openreview: { label: "OpenReview", icon: "openreview" },
    poster: { label: "Poster", icon: "poster" },
    doi: { label: "DOI", icon: "doi" }
  };
  var LINK_ORDER = ["paper", "pdf", "arxiv", "openreview", "doi", "code", "poster"];

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function linkPills(links, cls) {
    if (!links) return "";
    return LINK_ORDER.filter(function (k) { return links[k]; }).map(function (k) {
      var m = LINK_META[k];
      return '<a class="' + (cls || "pill") + '" href="' + esc(links[k]) + '" target="_blank" rel="noopener">' + I[m.icon] + m.label + '</a>';
    }).join("");
  }

  function badge(status) {
    if (!status) return "";
    return '<span class="badge badge--' + esc(status.kind) + '">' + esc(status.label) + '</span>';
  }

  /* ------------------------------------------------------- project card */
  function projectCard(p) {
    var href = "project.html?id=" + esc(p.id);
    var thumb = THUMBS[p.thumb] || THUMBS._default;
    return '' +
      '<article class="pcard reveal">' +
        '<a class="pcard-thumb" href="' + href + '" tabindex="-1" aria-hidden="true">' + thumb + '</a>' +
        '<div class="pcard-body">' +
          badge(p.status) +
          '<h3><a href="' + href + '">' + esc(p.title) + '</a></h3>' +
          '<p class="teaser">' + esc(p.teaser) + '</p>' +
          '<div class="pcard-links">' +
            linkPills(p.links, "pill") +
            '<a class="details" href="' + href + '">Details ' + I.arrow + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ------------------------------------------------------ public renderers */
  window.Render = {
    interests: function (id) {
      var el = document.getElementById(id); if (!el) return;
      el.innerHTML = (SITE.interests || []).map(function (t) { return '<li class="chip chip--accent">' + esc(t) + '</li>'; }).join("");
    },

    projects: function (id, opts) {
      opts = opts || {};
      var el = document.getElementById(id); if (!el) return;
      var list = (SITE.projects || []).slice();
      if (opts.featured) list = list.filter(function (p) { return p.featured; });
      if (opts.limit) list = list.slice(0, opts.limit);
      el.innerHTML = list.map(projectCard).join("");
      if (window.revealNow) window.revealNow(el);
    },

    projectsByCategory: function (id) {
      var el = document.getElementById(id); if (!el) return;
      var order = ["Research", "Master's", "Bachelor's"];
      var groups = {};
      (SITE.projects || []).forEach(function (p) { (groups[p.category] = groups[p.category] || []).push(p); });
      var html = "", first = true;
      order.forEach(function (cat) {
        if (!groups[cat]) return;
        html += '<div class="section-head reveal"' + (first ? '' : ' style="margin-top:3.5rem"') + '><div class="kicker">' + esc(cat) + '</div>' +
          '<h2>' + (cat === "Research" ? "Research" : cat + " project") + '</h2></div>';
        html += '<div class="card-grid">' + groups[cat].map(projectCard).join("") + '</div>';
        first = false;
      });
      el.innerHTML = html;
      if (window.revealNow) window.revealNow(el);
    },

    publications: function (id, controlsId) {
      var el = document.getElementById(id); if (!el) return;
      var pubs = (SITE.publications || []).slice();
      var years = [];
      pubs.forEach(function (p) { if (years.indexOf(p.year) < 0) years.push(p.year); });
      years.sort(function (a, b) { return b - a; });

      function pubHTML(p) {
        return '' +
          '<article class="pub reveal" data-year="' + esc(p.year) + '" data-kind="' + esc(p.status && p.status.kind) + '">' +
            '<div class="pub-year">' + esc(p.year) + '</div>' +
            '<div class="pub-main">' +
              '<h3>' + (p.projectId ? '<a href="project.html?id=' + esc(p.projectId) + '">' + esc(p.title) + '</a>' : esc(p.title)) + '</h3>' +
              '<p class="pub-authors">' + boldMe(p.authors) + '</p>' +
              '<p class="pub-venue">' + esc(p.venue) + '</p>' +
              '<div class="pub-links">' + badge(p.status) + linkPills(p.links, "pill") + '</div>' +
            '</div>' +
          '</article>';
      }
      function render(filter) {
        var shown = pubs.filter(function (p) { return filter === "all" || String(p.year) === String(filter); });
        el.innerHTML = shown.map(pubHTML).join("");
        if (window.revealNow) window.revealNow(el);
      }
      render("all");

      var ctr = controlsId && document.getElementById(controlsId);
      if (ctr) {
        ctr.innerHTML = '<button class="active" data-f="all">All</button>' +
          years.map(function (y) { return '<button data-f="' + y + '">' + y + '</button>'; }).join("");
        ctr.addEventListener("click", function (e) {
          var b = e.target.closest("button"); if (!b) return;
          ctr.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active");
          render(b.dataset.f);
        });
      }
    },

    selectedPublications: function (id, n) {
      var el = document.getElementById(id); if (!el) return;
      var pubs = (SITE.publications || []).filter(function (p) {
        return p.status && (p.status.kind === "accepted" || p.status.kind === "published");
      }).slice(0, n || 4);
      el.innerHTML = pubs.map(function (p) {
        return '<article class="pub reveal">' +
          '<div class="pub-year">' + esc(p.year) + '</div>' +
          '<div class="pub-main">' +
            '<h3>' + (p.projectId ? '<a href="project.html?id=' + esc(p.projectId) + '">' + esc(p.title) + '</a>' : esc(p.title)) + '</h3>' +
            '<p class="pub-authors">' + boldMe(p.authors) + '</p>' +
            '<p class="pub-venue">' + esc(p.venue) + '</p>' +
            '<div class="pub-links">' + badge(p.status) + linkPills(p.links, "pill") + '</div>' +
          '</div></article>';
      }).join("");
    },

    posts: function (id) {
      var el = document.getElementById(id); if (!el) return;
      var posts = SITE.posts || [];
      if (!posts.length) { el.innerHTML = '<p class="muted">No posts yet.</p>'; return; }
      el.innerHTML = posts.map(function (p) {
        var tags = (p.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join(" ");
        return '<article class="pcard reveal">' +
          '<div class="post-meta">' + esc(prettyDate(p.date)) + (p.readingTime ? ' · ' + esc(p.readingTime) : "") + '</div>' +
          '<h3><a href="' + esc(p.url) + '">' + esc(p.title) + '</a></h3>' +
          '<p class="teaser">' + esc(p.excerpt) + '</p>' +
          '<div class="pcard-links"><a class="details" href="' + esc(p.url) + '">Read ' + I.arrow + '</a></div>' +
        '</article>';
      }).join("");
      if (window.revealNow) window.revealNow(el);
    },

    news: function (id, limit) {
      var el = document.getElementById(id); if (!el) return;
      var items = (SITE.news || []); if (limit) items = items.slice(0, limit);
      el.innerHTML = items.map(function (n) {
        return '<div class="tl-item reveal"><div class="tl-date">' + esc(prettyDate(n.date)) + '</div><div class="tl-body">' + n.html + '</div></div>';
      }).join("");
    },

    projectDetail: function () {
      var id = new URLSearchParams(location.search).get("id");
      var p = (SITE.projects || []).filter(function (x) { return x.id === id; })[0];
      var host = document.getElementById("project-detail");
      if (!host) return;
      if (!p) {
        host.innerHTML = '<div class="container section"><p class="muted">Project not found. <a href="projects.html">Back to all projects</a>.</p></div>';
        return;
      }
      // SEO / meta
      document.title = p.title + " — " + p.subtitle + " · Farzaneh Heidari";
      setMeta("description", p.teaser);
      setMeta("og:title", p.title + " · Farzaneh Heidari", true);
      setMeta("og:description", p.teaser, true);

      function section(title, body) {
        if (!body) return "";
        return '<section class="reveal"><h2>' + title + '</h2>' + body + '</section>';
      }
      function list(items) {
        if (!items || !items.length) return "";
        return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul>';
      }
      var figures = (p.figures && p.figures.length)
        ? '<div class="figure-grid">' + p.figures.map(function (f) {
            return '<figure><img src="' + esc(f.src) + '" alt="' + esc(f.caption) + '" loading="lazy"><figcaption>' + esc(f.caption) + '</figcaption></figure>';
          }).join("") + '</div>'
        : "";

      var poster = p.poster
        ? '<div class="poster-embed"><iframe src="' + esc(p.poster) + '#view=Fit" title="Conference poster (PDF)" loading="lazy"></iframe></div>' +
          '<p><a class="btn btn--sm" href="' + esc(p.poster) + '" target="_blank" rel="noopener">' + I.poster + ' Open full poster (PDF)</a></p>'
        : "";

      var meta = [];
      if (p.authors) meta.push(esc(p.authors));
      if (p.venue) meta.push("<em>" + esc(p.venue) + "</em>");

      host.innerHTML =
        '<header class="detail-hero"><div class="container">' +
          '<nav class="breadcrumb"><a href="index.html">Home</a> / <a href="projects.html">Projects</a> / ' + esc(p.title) + '</nav>' +
          '<div class="detail-cat">' + esc(p.category) + '</div>' +
          '<h1>' + esc(p.title) + '</h1>' +
          '<p class="subtitle">' + esc(p.subtitle) + '</p>' +
          '<div class="detail-meta">' + badge(p.status) + (meta.length ? '<span>' + boldMe(meta.join(" · ")) + '</span>' : "") + '</div>' +
          '<div class="detail-links">' + (Object.keys(p.links || {}).length ? linkPills(p.links, "btn btn--sm") : '<span class="muted">Links pending.</span>') + '</div>' +
        '</div></header>' +
        '<div class="container section detail-body"><div class="prose">' +
          section("Overview", p.overview ? "<p>" + p.overview + "</p>" : "") +
          section("Motivation", p.motivation ? "<p>" + p.motivation + "</p>" : "") +
          section("Methods", list(p.methods)) +
          section("Results", (p.results && p.results.length) ? list(p.results) : "") +
          section("Figures", figures) +
          section("Poster", poster) +
          section("Future work", p.futureWork ? "<p>" + p.futureWork + "</p>" : "") +
          '<div class="mt-4"><a class="btn btn--ghost" href="projects.html">' + I.arrow + ' All projects</a></div>' +
        '</div></div>';

      if (window.revealNow) window.revealNow(host);
    }
  };

  /* bold the author's own name */
  function boldMe(s) {
    if (!s) return "";
    return esc(s).replace(/Farzaneh Heidari/g, "<strong>Farzaneh Heidari</strong>");
  }

  function prettyDate(d) {
    if (!d) return "";
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var parts = String(d).split("-");
    if (parts.length === 2) return m[parseInt(parts[1], 10) - 1] + " " + parts[0];
    return parts[0];
  }

  function setMeta(name, content, prop) {
    var sel = prop ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) { el = document.createElement("meta"); el.setAttribute(prop ? "property" : "name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }

  /* allow re-observing dynamically added .reveal nodes */
  window.revealNow = function (scope) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      (scope || document).querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    (scope || document).querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
  };
})();
