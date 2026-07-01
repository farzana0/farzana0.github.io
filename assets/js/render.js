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
    return '' +
      '<article class="pcard reveal">' +
        badge(p.status) +
        '<h3><a href="' + href + '">' + esc(p.title) + '</a></h3>' +
        '<p class="teaser">' + esc(p.teaser) + '</p>' +
        '<div class="pcard-links">' +
          linkPills(p.links, "pill") +
          '<a class="details" href="' + href + '">Details ' + I.arrow + '</a>' +
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
        : '<p class="todo-note">Figures available in the linked paper / code. <em>TODO: embed a teaser figure here.</em></p>';

      var poster = p.poster
        ? '<p>' + linkPills({ poster: p.poster }, "pill") + '</p>'
        : '<p class="todo-note">No poster yet. <em>TODO: add a poster PDF when available.</em></p>';

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
