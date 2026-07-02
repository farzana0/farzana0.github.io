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

  /* larger, labelled, gently-animated "how it works" diagrams (one per page) */
  var AR = '<defs><marker id="dgar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--accent)"/></marker></defs>';
  var DGV = function (body) {
    return '<svg viewBox="0 0 640 210" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="diagram-svg" font-family="Inter, sans-serif" role="img">' + AR + body + '</svg>';
  };
  var flow = function (x1, x2) { return '<line class="dg-flow" x1="' + x1 + '" y1="90" x2="' + x2 + '" y2="90" stroke="var(--accent)" stroke-width="2.2" marker-end="url(#dgar)"/>'; };
  var lbl = function (x, t) { return '<text x="' + x + '" y="164" text-anchor="middle" font-size="13.5" fill="var(--text-soft)">' + t + '</text>'; };
  var box = function (x, w, accent) { return '<rect x="' + x + '" y="42" width="' + w + '" height="96" rx="12" fill="' + (accent ? 'var(--accent-soft)' : 'var(--surface)') + '" stroke="' + (accent ? 'var(--accent)' : 'var(--border-strong)') + '"/>'; };
  // pentagon graph at (cx,88); fills = array of 5 bools (true=filled)
  var pent = function (cx, fills, edgeOpacity) {
    var p = [[cx, 62], [cx + 25, 80], [cx + 15, 109], [cx - 15, 109], [cx - 25, 80]];
    var poly = '<polygon points="' + p.map(function (q) { return q[0] + ',' + q[1]; }).join(' ') + '" fill="none" stroke="var(--accent)" stroke-width="2" opacity="' + (edgeOpacity || 1) + '"/>';
    var nodes = p.map(function (q, i) {
      return fills[i]
        ? '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="5.5" fill="var(--accent)"/>'
        : '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="5.5" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/>';
    }).join('');
    return poly + nodes;
  };

  var DIAGRAMS = {
    // TN-SHAP: mask features -> tensor network -> Shapley bars
    "d-shapley-tn": DGV(
      box(20, 160) +
      '<g><rect x="66" y="58" width="22" height="15" rx="3" fill="var(--accent)"/><rect x="66" y="80" width="22" height="15" rx="3" fill="none" stroke="var(--accent)" stroke-width="1.6"/><rect x="66" y="102" width="22" height="15" rx="3" fill="var(--accent)"/><rect x="112" y="58" width="22" height="15" rx="3" fill="var(--accent)"/><rect x="112" y="80" width="22" height="15" rx="3" fill="none" stroke="var(--accent)" stroke-width="1.6"/><rect x="112" y="102" width="22" height="15" rx="3" fill="var(--accent)"/></g>' +
      lbl(100, 'mask features (0/1)') + flow(184, 234) +
      box(238, 164, true) +
      '<g fill="none" stroke="var(--accent)" stroke-width="2"><line x1="320" y1="60" x2="296" y2="88"/><line x1="320" y1="60" x2="344" y2="88"/><line x1="296" y1="88" x2="282" y2="114"/><line x1="296" y1="88" x2="310" y2="114"/><line x1="344" y1="88" x2="330" y2="114"/><line x1="344" y1="88" x2="358" y2="114"/></g>' +
      '<g fill="var(--accent)"><circle class="dg-pulse" cx="320" cy="60" r="6"/><circle cx="296" cy="88" r="4.5"/><circle cx="344" cy="88" r="4.5"/><circle cx="282" cy="114" r="4"/><circle cx="310" cy="114" r="4"/><circle cx="330" cy="114" r="4"/><circle cx="358" cy="114" r="4"/></g>' +
      lbl(320, 'tensor network (χ)') + flow(406, 456) +
      box(460, 160) +
      '<g fill="var(--accent)"><rect x="492" y="86" width="16" height="40" rx="2"/><rect x="518" y="66" width="16" height="60" rx="2"/><rect x="544" y="98" width="16" height="28" rx="2"/><rect x="570" y="76" width="16" height="50" rx="2"/></g>' +
      '<line x1="486" y1="126" x2="600" y2="126" stroke="var(--border-strong)" stroke-width="1.5"/>' +
      lbl(540, 'Shapley φ + interactions')
    ),
    // TN-SHAP-G: masked graph -> graph-aligned TN -> node/edge attributions
    "d-shapley-graph": DGV(
      pent(100, [true, false, true, true, false]) + lbl(100, 'mask nodes') +
      flow(140, 286) +
      pent(320, [true, true, true, true, true]) +
      '<line class="dg-pulse" x1="345" y1="80" x2="335" y2="109" stroke="var(--accent)" stroke-width="3.5"/>' +
      lbl(320, 'graph-aligned tensor network') +
      flow(360, 506) +
      '<g>' + pent(540, [true, true, true, true, true]) + '</g>' +
      '<circle cx="540" cy="62" r="9" fill="var(--accent)" opacity="0.9"/><circle cx="525" cy="109" r="7.5" fill="var(--accent)" opacity="0.6"/><circle cx="565" cy="80" r="4" fill="var(--accent)" opacity="0.35"/>' +
      '<line x1="540" y1="62" x2="565" y2="80" stroke="var(--accent)" stroke-width="3.5"/>' +
      lbl(540, 'node &amp; edge Shapley')
    ),
    // TN-SHAP-Q: QNN -> Owen integral -> exact phi
    "d-shapley-q": DGV(
      box(20, 170) +
      '<g stroke="var(--accent)" stroke-width="2" fill="none"><line x1="42" y1="72" x2="168" y2="72"/><line x1="42" y1="106" x2="168" y2="106"/><rect x="58" y="62" width="20" height="20" rx="3" fill="var(--accent-soft)"/><line x1="120" y1="72" x2="120" y2="106"/><circle cx="120" cy="106" r="7"/><line x1="113" y1="106" x2="127" y2="106"/><line x1="120" y1="99" x2="120" y2="113"/></g><circle cx="120" cy="72" r="4.5" fill="var(--accent)"/>' +
      lbl(105, 'single-Rᵧ QNN') + flow(196, 246) +
      box(250, 150, true) +
      '<g stroke="var(--accent)" fill="none" stroke-width="1.5" opacity="0.4"><line x1="272" y1="120" x2="378" y2="120"/><line x1="272" y1="56" x2="272" y2="120"/></g>' +
      '<path d="M272 108 Q305 56 325 92 T378 68" fill="none" stroke="var(--accent)" stroke-width="2.4"/>' +
      '<g fill="var(--accent)"><circle class="dg-pulse" cx="290" cy="92" r="4"/><circle cx="318" cy="86" r="4"/><circle cx="350" cy="80" r="4"/></g>' +
      '<text x="325" y="150" text-anchor="middle" font-size="20" fill="var(--accent)">∫</text>' +
      lbl(325, 'Owen integral (M points)') + flow(404, 454) +
      box(460, 160) +
      '<g fill="var(--accent)"><rect x="496" y="72" width="16" height="54" rx="2"/><rect x="522" y="92" width="16" height="34" rx="2"/><rect x="548" y="62" width="16" height="64" rx="2"/><rect x="574" y="84" width="16" height="42" rx="2"/></g>' +
      '<line x1="490" y1="126" x2="600" y2="126" stroke="var(--border-strong)" stroke-width="1.5"/>' +
      lbl(540, 'exact φ (features + gates)')
    ),
    // Multilinear steering: interaction of two directions
    "d-steer": DGV(
      '<g stroke="var(--text-faint)" stroke-width="1.5" opacity="0.5"><line x1="150" y1="150" x2="150" y2="40"/><line x1="150" y1="150" x2="470" y2="150"/></g>' +
      '<text x="470" y="170" text-anchor="middle" font-size="13" fill="var(--text-soft)">direction u</text>' +
      '<text x="150" y="34" text-anchor="middle" font-size="13" fill="var(--text-soft)">direction v</text>' +
      '<path d="M150 150 Q300 150 340 60 Q360 40 470 40" fill="var(--accent-soft)" opacity="0.6" stroke="none"/>' +
      '<g fill="var(--accent)" opacity="0.55"><circle class="dg-pulse" cx="250" cy="120" r="4"/><circle cx="300" cy="98" r="4"/><circle cx="350" cy="80" r="4"/><circle cx="400" cy="66" r="4"/><circle cx="210" cy="132" r="4"/></g>' +
      '<line class="dg-flow" x1="150" y1="150" x2="410" y2="58" stroke="var(--accent)" stroke-width="2.6" marker-end="url(#dgar)"/>' +
      '<text x="320" y="196" text-anchor="middle" font-size="13.5" fill="var(--text-soft)">read &amp; steer a concept that lives in the u × v interaction</text>'
    ),
    // Evaluation awareness: probe reads "evaluation" from activations
    "d-eye": DGV(
      box(30, 150) +
      '<g fill="var(--accent)" opacity="0.25"><rect x="54" y="58" width="16" height="16" rx="2"/><rect x="90" y="58" width="16" height="16" rx="2"/><rect x="126" y="58" width="16" height="16" rx="2"/><rect x="54" y="80" width="16" height="16" rx="2"/><rect x="90" y="80" width="16" height="16" rx="2"/><rect x="126" y="80" width="16" height="16" rx="2"/><rect x="54" y="102" width="16" height="16" rx="2"/><rect x="90" y="102" width="16" height="16" rx="2"/><rect x="126" y="102" width="16" height="16" rx="2"/></g>' +
      '<line class="dg-flow" x1="150" y1="50" x2="150" y2="130" stroke="var(--accent)" stroke-width="2"/>' +
      lbl(105, 'activations') + flow(190, 300) +
      '<text x="245" y="80" text-anchor="middle" font-size="13" fill="var(--text-soft)">probe</text>' +
      '<g fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"><path d="M360 90 Q430 44 500 90 Q430 136 360 90 Z"/><circle cx="430" cy="90" r="19"/></g>' +
      '<circle class="dg-pulse" cx="430" cy="90" r="8.5" fill="var(--accent)"/>' +
      lbl(430, 'evaluation vs. deployment?')
    ),
    // Evaluation adaptation: steer eval-aware model toward deploy behaviour
    "d-toggle": DGV(
      '<rect x="70" y="56" width="120" height="68" rx="14" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<text x="130" y="95" text-anchor="middle" font-size="14" fill="var(--accent)" font-weight="600">eval-aware</text>' +
      '<rect x="450" y="56" width="120" height="68" rx="14" fill="none" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<text x="510" y="95" text-anchor="middle" font-size="14" fill="var(--text-soft)" font-weight="600">deployed</text>' +
      '<line class="dg-flow" x1="196" y1="90" x2="444" y2="90" stroke="var(--accent)" stroke-width="2.6" marker-end="url(#dgar)"/>' +
      '<rect x="250" y="76" width="140" height="28" rx="14" fill="var(--surface)" stroke="var(--border-strong)"/>' +
      '<circle class="dg-pulse" cx="370" cy="90" r="11" fill="var(--accent)"/>' +
      '<text x="320" y="176" text-anchor="middle" font-size="13.5" fill="var(--text-soft)">steer / fine-tune toward deployment behaviour</text>'
    ),
    // Chess: disclosed objective -> which channel moves
    "d-chess": DGV(
      '<g fill="var(--accent)" opacity="0.2"><rect x="60" y="46" width="22" height="22"/><rect x="104" y="46" width="22" height="22"/><rect x="82" y="68" width="22" height="22"/><rect x="60" y="90" width="22" height="22"/><rect x="104" y="90" width="22" height="22"/></g>' +
      '<g fill="none" stroke="var(--accent)" stroke-width="2"><rect x="60" y="46" width="66" height="66" rx="3"/><line x1="82" y1="46" x2="82" y2="112"/><line x1="104" y1="46" x2="104" y2="112"/><line x1="60" y1="68" x2="126" y2="68"/><line x1="60" y1="90" x2="126" y2="90"/></g>' +
      '<path d="M71 101 V57 H115" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><circle class="dg-pulse" cx="115" cy="57" r="5" fill="var(--accent)"/>' +
      lbl(93, 'disclosed objective') + flow(150, 300) +
      '<g font-size="13" fill="var(--text)"><rect x="330" y="50" width="240" height="26" rx="8" fill="var(--surface)" stroke="var(--border-strong)"/><text x="345" y="67" fill="var(--text-soft)">search depth</text>' +
      '<rect x="330" y="82" width="240" height="26" rx="8" fill="var(--surface)" stroke="var(--border-strong)"/><text x="345" y="99" fill="var(--text-soft)">reported confidence</text>' +
      '<rect x="330" y="114" width="240" height="26" rx="8" fill="var(--surface)" stroke="var(--border-strong)"/><text x="345" y="131" fill="var(--text-soft)">self-report vs. hidden log</text></g>' +
      lbl(450, 'which channel changes?')
    ),
    // EvoNRL: edge update -> refresh only affected walks
    "d-net": DGV(
      '<g stroke="var(--accent)" stroke-width="1.6" fill="none" opacity="0.3"><line x1="120" y1="60" x2="210" y2="96"/><line x1="210" y1="96" x2="160" y2="150"/><line x1="210" y1="96" x2="320" y2="66"/><line x1="320" y1="66" x2="410" y2="120"/><line x1="320" y1="66" x2="270" y2="40"/></g>' +
      '<path class="dg-flow" d="M120 60 L210 96 L320 66 L410 120" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" marker-end="url(#dgar)"/>' +
      '<line class="dg-pulse" x1="160" y1="150" x2="410" y2="120" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 5"/>' +
      '<g fill="var(--accent)"><circle cx="120" cy="60" r="5"/><circle cx="210" cy="96" r="5"/><circle cx="160" cy="150" r="5"/><circle cx="320" cy="66" r="5"/><circle cx="410" cy="120" r="5"/><circle cx="270" cy="40" r="5"/></g>' +
      '<text x="470" y="86" font-size="13.5" fill="var(--text-soft)">random walk</text><text x="470" y="120" font-size="13.5" fill="var(--text-soft)">new edge →</text><text x="470" y="138" font-size="12.5" fill="var(--text-faint)">refresh only</text>' +
      lbl(265, 'evolving network: update only affected walks')
    ),
    // Bachelor's: pay-as-bid supply stack
    "d-market": DGV(
      '<g stroke="var(--text-faint)" stroke-width="1.5" opacity="0.4" fill="none"><line x1="150" y1="40" x2="150" y2="150"/><line x1="150" y1="150" x2="500" y2="150"/></g>' +
      '<g fill="var(--accent)" opacity="0.18"><rect x="170" y="126" width="46" height="24"/><rect x="226" y="104" width="46" height="46"/><rect x="282" y="86" width="46" height="64"/><rect x="338" y="66" width="46" height="84"/><rect x="394" y="52" width="46" height="98"/></g>' +
      '<path d="M170 126 H216 V104 H272 V86 H328 V66 H384 V52 H440" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<line class="dg-flow" x1="150" y1="90" x2="470" y2="90" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="6 6"/>' +
      '<circle class="dg-pulse" cx="305" cy="86" r="6" fill="var(--accent)"/>' +
      '<text x="482" y="94" font-size="12.5" fill="var(--text-faint)">demand</text>' +
      lbl(325, 'pay-as-bid: each accepted bid paid its own price')
    )
  };

  /* TN-SHAP-G "jewel": masked graph game -> graph-aligned tensor network -> deterministic Shapley */
  DIAGRAMS["d-jewel-g"] = (function () {
    var cy = 132, r = 40;
    function pts(cx) { return [[cx, cy - r], [cx + 38, cy - 12], [cx + 24, cy + 32], [cx - 24, cy + 32], [cx - 38, cy - 12]]; }
    function edges(P) {
      var e = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4]];
      return e.map(function (x) { return 'M' + P[x[0]][0] + ' ' + P[x[0]][1] + ' L' + P[x[1]][0] + ' ' + P[x[1]][1]; }).join(' ');
    }
    function panel(x, label) {
      return '<rect x="' + x + '" y="20" width="196" height="212" rx="14" fill="var(--surface)" stroke="var(--border)"/>' +
        '<text x="' + (x + 16) + '" y="42" font-size="11.5" font-weight="700" letter-spacing="0.04em" fill="var(--accent)">' + label + '</text>';
    }
    function fl(x1, x2) { return '<line class="dg-flow" x1="' + x1 + '" y1="' + cy + '" x2="' + x2 + '" y2="' + cy + '" stroke="var(--accent)" stroke-width="2.4" marker-end="url(#dgar)"/>'; }
    var A = pts(106), B = pts(330), cxB = 330;
    var s = panel(8, 'A · MASKED GRAPH GAME') + panel(232, 'B · GRAPH-ALIGNED TN') + panel(456, 'C · SHAPLEY + INTERACTIONS');
    // (A) masked graph
    s += '<path d="' + edges(A) + '" fill="none" stroke="var(--accent)" stroke-width="2" opacity="0.5"/>';
    [1, 1, 0, 1, 0].forEach(function (on, i) {
      s += on ? '<circle cx="' + A[i][0] + '" cy="' + A[i][1] + '" r="7" fill="var(--accent)"/>'
              : '<circle cx="' + A[i][0] + '" cy="' + A[i][1] + '" r="7" fill="var(--bg)" stroke="var(--accent)" stroke-width="2" stroke-dasharray="3 2.5"/>';
    });
    s += '<text x="106" y="210" text-anchor="middle" font-size="11.5" fill="var(--text-soft)">ν(S) = f(G, features of S kept)</text>' + fl(204, 232);
    // (B) tensor cores + bonds + physical legs
    s += '<path d="' + edges(B) + '" fill="none" stroke="var(--accent)" stroke-width="2.4"/>';
    B.forEach(function (p) {
      var dx = p[0] - cxB, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      s += '<line x1="' + (p[0] + ux * 21).toFixed(1) + '" y1="' + (p[1] + uy * 21).toFixed(1) + '" x2="' + (p[0] + ux * 10).toFixed(1) + '" y2="' + (p[1] + uy * 10).toFixed(1) + '" stroke="var(--text-faint)" stroke-width="1.6" marker-end="url(#dgar)"/>';
      s += '<rect x="' + (p[0] - 8) + '" y="' + (p[1] - 8) + '" width="16" height="16" rx="3" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.9"/>';
    });
    s += '<text x="330" y="210" text-anchor="middle" font-size="11.5" fill="var(--text-soft)">one core / node · bond χ / edge</text>' + fl(428, 456);
    // (C) Shapley bars
    var base = 158, bx = [488, 514, 540, 566, 592], hs = [34, -22, 42, -15, 28];
    s += '<line x1="480" y1="' + base + '" x2="602" y2="' + base + '" stroke="var(--border-strong)" stroke-width="1.5"/>';
    bx.forEach(function (x, i) {
      var h = hs[i];
      s += h >= 0 ? '<rect x="' + x + '" y="' + (base - h) + '" width="15" height="' + h + '" rx="2" fill="var(--accent)"/>'
                  : '<rect x="' + x + '" y="' + base + '" width="15" height="' + (-h) + '" rx="2" fill="var(--accent)" opacity="0.5"/>';
    });
    s += '<text x="540" y="88" text-anchor="middle" font-size="13" fill="var(--text-soft)">φ_v  &amp;  I_uv</text>';
    s += '<text x="540" y="210" text-anchor="middle" font-size="11.5" fill="var(--text-soft)">closed-form Vandermonde</text>';
    return '<svg viewBox="0 0 660 244" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="diagram-svg" font-family="Inter, sans-serif" role="img">' + AR + s + '</svg>';
  })();

  window.DIAGRAMS = DIAGRAMS;

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

      var brief = p.nutshell
        ? '<div class="callout nutshell reveal"><span class="label">In brief</span><p>' + p.nutshell + '</p></div>'
        : "";
      var diagram = (p.diagram && DIAGRAMS[p.diagram])
        ? '<figure class="diagram-fig reveal">' + DIAGRAMS[p.diagram] + '<figcaption>How it works</figcaption></figure>'
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
          brief + diagram +
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
