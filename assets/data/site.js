/* ==========================================================================
   site.js — single source of truth for the whole website.
   Add a project or publication by editing the arrays below; every page
   (home, projects, project detail, publications, news) renders from here.
   No HTML is hardcoded per project.
   ========================================================================== */

window.SITE = {
  /* ----------------------------------------------------------------------
     Profile
     ---------------------------------------------------------------------- */
  profile: {
    name: "Farzaneh Heidari",
    role: "PhD Student",
    affiliations: [
      "Université de Montréal",
      "Mila – Quebec AI Institute"
    ],
    tagline:
      "Explainable and safe AI, through tensor networks and multilinear methods.",
    advisor: { name: "Guillaume Rabusseau", url: "https://mila.quebec/en/directory/guillaume-rabusseau" },
    location: "Montréal, Québec, Canada",
    email: "farzaneh.heidari@mila.quebec",
    links: {
      github: "https://github.com/farzana0",
      scholar: "https://scholar.google.ca/citations?user=YQcX-lwAAAAJ&hl=en",
      openreview: "https://openreview.net/profile?id=~Farzaneh_Heidari2",
      dblp: "https://dblp.org/pid/231/1013.html",
      linkedin: "https://www.linkedin.com/in/farzaneh-heidari-32919653/",
      mila: "https://mila.quebec/en/person/farzaneh-heidari/",
      cv: null
    }
  },

  /* ----------------------------------------------------------------------
     Research interests (rendered as chips on home / about)
     ---------------------------------------------------------------------- */
  interests: [
    "Explainable AI",
    "AI Safety",
    "Mechanistic Interpretability",
    "Tensor Networks",
    "Shapley Values",
    "Multilinear Methods",
    "Evaluation Awareness"
  ],

  /* ----------------------------------------------------------------------
     Short bio paragraphs (about page + home snippet)
     ---------------------------------------------------------------------- */
  bio: [
    "I am a PhD student at the Université de Montréal and Mila – Quebec AI Institute, advised by Guillaume Rabusseau. My research sits at the intersection of <strong>explainable AI</strong>, <strong>AI safety</strong>, and <strong>mechanistic interpretability</strong>.",
    "A common thread runs through my work: <strong>multilinear structure</strong>. Many objects we care about — feature attributions, cooperative-game values, learned representations, quantum circuits — can be written as multilinear maps, and <strong>tensor networks</strong> give a compact, tractable handle on them. I use this to compute Shapley values and higher-order interactions efficiently, to probe and steer language-model representations, and to audit how models behave when they know they are being evaluated.",
    "Before Mila, I completed a MSc in Computer Science at York University and a BSc in Electrical Engineering at Sharif University of Technology. I co-organize a Tensor Network reading group on tensors, quantum theory, and machine learning."
  ],

  education: [
    { degree: "PhD, Computer Science", org: "Université de Montréal · Mila", period: "2021 – present", note: "Advisor: Guillaume Rabusseau. Tensor networks, explainability, AI safety." },
    { degree: "MSc, Computer Science", org: "York University, Toronto", period: "2019", note: "Evolving network representation learning (EvoNRL); dynamic graph embeddings." },
    { degree: "BSc, Electrical Engineering", org: "Sharif University of Technology", period: "2012 – 2017", note: "Thesis: Study and Analysis of Wholesale Electricity Markets." }
  ],

  /* ----------------------------------------------------------------------
     Internships & research experience (newest first).
     Dates left blank where unconfirmed — fill period: "…" to show a date.
     ---------------------------------------------------------------------- */
  experience: [
    { role: "Research Intern", org: "LawZero", period: "", note: "Evaluation awareness." },
    { role: "Research Intern", org: "RIKEN AIP", period: "", note: "Tensor-network methods for attribution." },
    { role: "Research Intern", org: "Zapata AI", period: "", note: "Quantum computing." },
    { role: "Research Intern", org: "Samsung Research America", period: "", note: "" },
    { role: "Research Intern", org: "Helmholtz Institute Aachen", period: "", note: "" }
  ],

  service: [
    "Co-organizer, Tensor Network reading group (tensors, quantum theory & ML).",
    "Reviewer for machine-learning venues."
  ],

  /* ----------------------------------------------------------------------
     News (most recent first). Keep factual.
     ---------------------------------------------------------------------- */
  news: [
    { date: "2026-06", html: "<strong>TN-SHAP-G</strong> accepted at <strong>ICML 2026</strong> — deterministic Shapley values &amp; interactions for graph-structured data. Preprint on <a href='https://arxiv.org/abs/2606.01540'>arXiv:2606.01540</a>." },
    { date: "2026", html: "<strong>TN-SHAP</strong> (<em>Tractable Shapley Values and Interactions via Tensor Networks</em>) accepted at <strong>AISTATS 2026</strong>." },
    { date: "2025-10", html: "TN-SHAP preprint released on <a href='https://arxiv.org/abs/2510.22138'>arXiv:2510.22138</a>." },
    { date: "2023", html: "<em>Explaining Graph Neural Networks Using Interpretable Local Surrogates</em> presented at <strong>TAG-ML</strong> (ICML 2023 workshop)." }
  ],

  /* ----------------------------------------------------------------------
     Blog posts (newest first)
     ---------------------------------------------------------------------- */
  posts: [
    {
      id: "tnshap-series",
      title: "From Shapley Values to Tensor Networks: The TN-SHAP Series",
      date: "2026-07",
      readingTime: "12 min read",
      url: "blog/tnshap-series/",
      tags: ["Explainable AI", "Tensor Networks", "Shapley Values"],
      excerpt:
        "One idea — the multilinear structure of coalition games — ties together tensor-network Shapley attribution across tabular models, graphs, and quantum neural networks."
    }
  ],

  /* ----------------------------------------------------------------------
     Projects. `featured: true` surfaces on the homepage.
     status.kind ∈ accepted | published | review | progress
     ---------------------------------------------------------------------- */
  projects: [
    {
      id: "tn-shap",
      title: "TN-SHAP",
      subtitle: "Tractable Shapley Values and Interactions via Tensor Networks",
      category: "Research",
      featured: true,
      accent: "violet",
      year: 2026,
      status: { label: "Accepted · AISTATS 2026", kind: "accepted" },
      tags: ["Explainable AI", "Tensor Networks", "Shapley Values"],
      authors: "Farzaneh Heidari, Chao Li, Guillaume Rabusseau",
      venue: "AISTATS 2026",
      teaser:
        "Replace the O(2ⁿ) coalition enumeration behind Shapley values with a few evaluations on a tensor-network surrogate — 25–1000× faster than KernelSHAP-IQ.",
      overview:
        "TN-SHAP computes Shapley values and higher-order feature interactions by fitting a <em>factorized multilinear</em> surrogate to a model's local behavior. Once the predictor's local response is written as a tensor network, coalition computations become linear tensor operations, so order-1 and order-2 Shapley interactions can be read off in O(n·poly(χ) + n²) time, where χ is the network's maximal cut rank.",
      motivation:
        "Exact Shapley attribution requires summing over all 2ⁿ coalitions, which is intractable beyond a handful of features; sampling estimators like KernelSHAP trade accuracy for speed and are noisy for interactions. The key observation is that a model's local behavior is well-approximated by a low-rank multilinear map — exactly the object a tensor network represents compactly.",
      methods: [
        "Fit a feature-mapped tensor-network surrogate (binary tensor tree / MPS-style cores) to the local coalition game.",
        "Turn coalition sweeps into targeted tensor contractions to extract order-k Shapley interactions in closed form.",
        "GPU-friendly contractions give large wall-clock speedups while matching exact enumeration on the fitted surrogate."
      ],
      results: [
        "Matches exact-enumeration Shapley values and interactions on the fitted surrogate.",
        "25–1000× wall-clock speedup over KernelSHAP-IQ on UCI benchmarks (Diabetes, Concrete, Energy, California Housing).",
        "Scales to high-dimensional problems (d ≈ 30–60) where enumeration is infeasible."
      ],
      figures: [],
      poster: null,
      links: {
        arxiv: "https://arxiv.org/abs/2510.22138",
        code: "https://github.com/farzana0/TN-SHAP"
      },
      futureWork:
        "Tighter surrogate-fidelity guarantees, structured feature maps for images/text, and connecting the cut-rank χ to interaction order more precisely."
    },

    {
      id: "tn-shap-g",
      title: "TN-SHAP-G",
      subtitle: "Graph-Structured Tensor Network Surrogates for Shapley Values and Interactions",
      category: "Research",
      featured: true,
      accent: "indigo",
      year: 2026,
      status: { label: "Accepted · ICML 2026", kind: "accepted" },
      tags: ["Graph Neural Networks", "Tensor Networks", "Explainability"],
      authors: "Farzaneh Heidari, Guillaume Rabusseau",
      venue: "ICML 2026",
      teaser:
        "Deterministic Shapley values and interactions for graphs, via a tensor-network surrogate whose topology mirrors the input graph.",
      overview:
        "TN-SHAP-G learns a compact, <em>graph-aligned</em> multilinear surrogate that approximates the masked-input behavior of a graph model. Because the tensor network's structure mirrors the graph, Shapley values are computed <strong>deterministically</strong> — no Monte-Carlo sampling — as a diagonal derivative integral evaluated by polynomial interpolation, and order-2 interaction indices come from the same machinery on edges.",
      motivation:
        "Explaining GNNs means attributing predictions to nodes and their interactions, but coalition masking over a graph is combinatorial and sampling estimators are high-variance. Respecting graph topology in the surrogate makes the attribution both cheaper and structurally faithful.",
      methods: [
        "Build a masked graph game v(S) = f(G, X_S) with a fixed baseline for excluded nodes.",
        "Fit a graph-aligned tensor network: one core per node, physical dim 2 (in/out of coalition), bond dim χ per incident edge.",
        "Compute node Shapley values via the diagonal derivative integral φ_u = ∫₀¹ ∂ν̂/∂z_u(t·1) dt, evaluated exactly at Chebyshev nodes (Vandermonde interpolation).",
        "Extend to O2 (pairwise) Shapley interaction indices on graph edges."
      ],
      results: [
        "Matches exact Shapley enumeration on small graphs (O1 cosine similarity > 0.98; O2 > 0.95 on the toy benchmark).",
        "Scales to graphs where sampling-based attribution becomes impractical.",
        "Demonstrated on molecular benchmarks (e.g. mutagenicity)."
      ],
      figures: [],
      poster: null,
      links: {
        arxiv: "https://arxiv.org/abs/2606.01540",
        code: "https://github.com/farzana0/TN-SHAP-G"
      },
      futureWork:
        "Higher-order (>2) graph interactions, learned baselines, and topology-aware bond-dimension allocation for large molecules."
    },

    {
      id: "tn-shap-q",
      title: "TN-SHAP-Q",
      subtitle: "Exact Multilinear Extensions of Quantum Neural Networks for Shapley Attribution",
      category: "Research",
      featured: true,
      accent: "teal",
      year: 2026,
      status: { label: "In progress · manuscript", kind: "progress" },
      tags: ["Quantum ML", "Shapley Values", "Multilinear Methods"],
      authors: "Farzaneh Heidari, Guillaume Rabusseau",
      venue: "Manuscript (QTML abstract)",
      teaser:
        "A single-frequency QNN is exactly multilinear in the lifted features [1, cos x, sin x] — so its Shapley attribution is exact, not a surrogate, via the Owen diagonal integral.",
      overview:
        "TN-SHAP-Q is the exact quantum instance of the tensor-network attribution program. A single-R<sub>Y</sub> QNN is <em>exactly</em> multilinear in the lifted features φ(x)=[1, cos x, sin x]; masking features (or removing gates) against a baseline yields a cooperative game whose multilinear extension is the function the circuit already computes. First-order Shapley values are then the Owen diagonal integral φᵢ = ∫₀¹ ∂ᵢF(t·1) dt, which M-point Gauss–Legendre quadrature evaluates <strong>exactly once M ≥ ⌈P/2⌉</strong> — 2PM circuit evaluations versus 2ᴾ for coalition enumeration.",
      motivation:
        "Attributing a quantum model's output to input features or gates is expensive by enumeration and noisy under finite shots. Exploiting the exact finite-Fourier (multilinear) structure of angle-encoded circuits turns attribution into exact quadrature, and interaction thresholds that <em>decrease</em> with interaction order.",
      methods: [
        "Direct Owen-integral Shapley (efficient first order): exact multilinear finite difference integrated by Gauss–Legendre quadrature.",
        "Dense tensor recovery (all orders): reconstruct the lifted feature tensor from a 3ᵈ anchor grid → Harsanyi dividends → O1 + O2.",
        "Gate attribution against SVQX baselines; finite-shot robustness (∝ 1/√N); Q-LIME ranking comparison.",
        "Every experiment ships as a self-contained notebook that asserts machine-precision agreement with exact 2ᴾ enumeration."
      ],
      results: [
        "Machine-precision agreement (~1e-16) with exact enumeration across eight experiments (independent audit: 8/8 pass).",
        "Feature attribution exact at M ≥ ⌈d/2⌉; gate attribution in 182 vs 8192 evaluations.",
        "Finite-shot estimates unbiased in expectation with variance ∝ 1/shots."
      ],
      figures: [
        { src: "assets/img/tnshapq_feature.png", caption: "Feature-attribution error vs. quadrature points — exact once M ≥ ⌈d/2⌉." },
        { src: "assets/img/tnshapq_cost.png", caption: "Query cost vs. dimension: 2PM evaluations vs. 2ᴾ enumeration." },
        { src: "assets/img/tnshapq_shots.png", caption: "Shot-noise robustness of feature and gate attributions (∝ 1/√N)." }
      ],
      poster: null,
      links: {
        code: "https://github.com/farzana0/TN-SHAP-Q"
      },
      futureWork:
        "Multi-frequency encodings, deeper entangling circuits, and hardware (finite-shot) demonstrations of the gate-interaction thresholds."
    },

    {
      id: "multilinear-steering",
      title: "Multilinear Steering",
      subtitle: "Bilinear & low-rank interaction probes and steering for safety-relevant concepts",
      category: "Research",
      featured: true,
      accent: "rose",
      year: 2026,
      status: { label: "In progress", kind: "progress" },
      tags: ["Mechanistic Interpretability", "AI Safety", "Multilinear Methods"],
      authors: "Farzaneh Heidari",
      venue: "In progress",
      teaser:
        "Do bilinear / multilinear probes beat linear ones for reading — and steering — safety concepts like evaluation-awareness and honesty in LLM activations?",
      overview:
        "Linear probes are the default lens on LLM activations, but concepts of interest may live in <em>interactions</em> between directions. This project extends linear probes with low-rank quadratic (bilinear) terms — inspired by truncated polynomial classifiers — and studies both reading (probing) and writing (steering) along these multilinear structures.",
      motivation:
        "If evaluation-awareness or honesty is encoded as an interaction between subspaces rather than a single direction, a linear probe will systematically miss it and a linear steering vector will be a blunt instrument. Multilinear probes test that hypothesis directly under strict leakage controls.",
      methods: [
        "Probes: linear (b + wᵀz), bilinear CP rank-R (b + wᵀz + Σᵣ λᵣ(uᵣᵀz)²), and two-subspace asymmetric quadratics; parameter-matched MLP baseline.",
        "A factorial evaluation-awareness × honesty dataset with unseen-claim AND unseen-template test splits.",
        "Low-rank interaction steering in synthetic games and in LLM residual streams (order-2 and order-3 concepts).",
        "Headline comparison via paired bootstrap 95% CIs on test-set AUROC / log-loss over multiple seeds."
      ],
      results: [
        "Reports whether the bilinear advantage over linear probes is statistically supported, per concept.",
        "Steering studies compare interaction-aware directions against random-direction controls."
      ],
      figures: [],
      poster: null,
      links: {
        code: "https://github.com/farzana0"
      },
      futureWork:
        "Scaling probes to larger models, causal validation of interaction directions, and connecting multilinear probes to the TN-SHAP interaction machinery."
    },

    {
      id: "evaluation-awareness",
      title: "Evaluation Awareness",
      subtitle: "How do LLMs encode evaluation-awareness?",
      category: "Research",
      featured: true,
      accent: "amber",
      year: 2026,
      status: { label: "In progress", kind: "progress" },
      tags: ["AI Safety", "Interpretability", "LLM Evaluation"],
      authors: "Farzaneh Heidari",
      venue: "In progress",
      teaser:
        "Models may reason and answer differently when they believe they are being tested. We measure evaluation-awareness behaviourally, in activation space, and causally.",
      overview:
        "Evaluation-awareness (EA) matters for safety evaluation: if a model changes behaviour under a test framing, benchmark scores stop reflecting deployment behaviour. This project studies EA along three axes — behavioural shifts under contrastive evaluation/deployment framings, linear-probe decodability of the evaluation context in activation space, and the causal effect of intervening along EA directions.",
      motivation:
        "Safety cases rest on evaluations. If models are evaluation-aware, we need to know whether that awareness is merely represented, and whether it actually drives behaviour — the two can be decoupled.",
      methods: [
        "Contrastive evaluation vs. deployment framings of MASK prompts (176 tasks × 20 samples).",
        "16-pair linear probes across layers to decode evaluation context from hidden states.",
        "Projection / reflection interventions along EA directions, with random-direction controls.",
        "Correlate internal probe scores with behavioural EA judge scores."
      ],
      results: [
        "Large behavioural shift under eval framing in a strong model (EA rate ≈ 83.6% vs. ≈ 38.6–41.0%).",
        "Evaluation context is linearly decodable (best-layer AUROC ≈ 0.71 in an 8B model)…",
        "…yet probe scores correlate only weakly with behavioural EA (Spearman |ρ| ≈ 0.01) — representation–behaviour decoupling.",
        "Steering along EA directions yields small, split-dependent effects, comparable to random-direction controls."
      ],
      figures: [],
      poster: null,
      links: {
        code: "https://github.com/farzana0/Evaluation-Awareness-demo"
      },
      futureWork:
        "Stronger causal handles on EA, multilinear (interaction) probes for EA (see Multilinear Steering), and cross-model generalization of EA directions."
    },

    {
      id: "evaluation-adaptation",
      title: "Evaluation Adaptation",
      subtitle: "Steering & fine-tuning models to act as if deployed",
      category: "Research",
      featured: false,
      accent: "sky",
      year: 2026,
      status: { label: "In progress", kind: "progress" },
      tags: ["AI Safety", "Activation Steering", "Fine-tuning"],
      authors: "Farzaneh Heidari",
      venue: "In progress",
      teaser:
        "The interventional counterpart to evaluation-awareness: can we make an evaluation-aware model behave the way it would in deployment?",
      overview:
        "If a model behaves differently when it thinks it is being tested, an honest evaluation should elicit its <em>deployment</em> behaviour. Evaluation Adaptation studies interventions — Contrastive Activation Addition (CAA) steering and light fine-tuning — that push an evaluation-aware model toward acting as though it were deployed (or vice-versa), and measures the downstream behavioural effect on safety benchmarks.",
      motivation:
        "Measuring evaluation-awareness is only half the story; the safety-relevant question is whether we can control it. Reliable adaptation would let evaluators surface deployment behaviour on demand.",
      methods: [
        "Contrastive Activation Addition (CAA): contrast 'being evaluated' vs. 'not being evaluated' prefixes and steer the residual stream during generation (dynamic and cached modes).",
        "Layer / coefficient sweeps and normalization ablations to find where the intervention is effective.",
        "Light fine-tuning (LoRA/PEFT) on evaluation/deployment framings; measure TruthfulQA / GSM8K under steering.",
        "A didactic TinyLlama reproduction of eval→deploy steering for pedagogy."
      ],
      results: [
        "Steering produces measurable but modest, setting-dependent behavioural shifts — quantified against random-direction controls."
      ],
      figures: [],
      poster: null,
      links: {
        code: "https://github.com/farzana0/Evaluation-Awareness-demo"
      },
      futureWork:
        "Combining interaction-aware (multilinear) steering directions with fine-tuning, and evaluating adaptation reliability across model families."
    },

    {
      id: "chess-strategic-adaptation",
      title: "Chess Strategic Adaptation",
      subtitle: "Auditing evaluation-conditioned behaviour in tool-using chess agents",
      category: "Research",
      featured: true,
      accent: "emerald",
      year: 2026,
      status: { label: "Under review", kind: "review" },
      tags: ["AI Safety", "Agent Evaluation", "Auditing"],
      authors: "Farzaneh Heidari",
      venue: "Workshop submission (under review)",
      teaser:
        "When an evaluation's objective is disclosed, do tool-using agents change how they search, how confident they claim to be, and what they report? A paired chess testbed.",
      overview:
        "Outcome-only benchmarks cannot separate changes in <em>search</em>, <em>confidence</em>, and <em>self-reporting</em>. This paired chess testbed randomizes five disclosed-objective documents while holding positions, legal actions, tool access, temperature, and protocol fixed. Each agent commits to a move, confidence, and plan <strong>before</strong> any call to a logged, Stockfish-backed evaluator; we then score the final move and compare the agent's structured report against the hidden execution log.",
      motivation:
        "As agents are deployed with tools, we need auditable measures of how they adapt to what an evaluation rewards — without over-claiming intent. The report-vs-log delta is observable and model-agnostic; it measures evaluation-conditioned behaviour, not private awareness or deception.",
      methods: [
        "Paired positions with randomized disclosed-objective framings (hidden, performance, efficiency, audit, full-rubric).",
        "Pre-commitment to move/confidence/plan before any evaluator call; every EVALUATE_MOVE call privately logged.",
        "Metrics: report-vs-log mismatch, evaluator-call counts, tool-use rate, move quality (centipawn loss), confidence calibration.",
        "Bootstrap CIs and Holm-corrected tests; exploratory sweep across further model families and providers."
      ],
      results: [
        "Adaptation is model-dependent: one model cut evaluator use under efficiency disclosure (−0.75 calls vs. hidden; 95% CI −1.20 to −0.30; −25 pp tool use).",
        "Another held a fixed one-call policy and instead raised reported confidence under performance disclosure (+2.5; CI 1.25 to 3.75).",
        "Neither gained move quality under performance disclosure; report/log mismatch was rare (1/200).",
        "Two objectives that explicitly reward under-reporting still produced no report/log mismatch above baseline."
      ],
      figures: [],
      poster: null,
      links: {
        code: "https://github.com/farzana0/Chess-sandbox"
      },
      futureWork:
        "Broader model coverage, richer tool protocols, and pre-registered analyses distinguishing adaptation from deliberate misreporting."
    },

    {
      id: "evonrl",
      title: "EvoNRL",
      subtitle: "Evolving Network Representation Learning Based on Random Walks",
      category: "Master's",
      featured: false,
      accent: "orange",
      year: 2020,
      status: { label: "Published · Applied Network Science", kind: "published" },
      tags: ["Graph Learning", "Network Embeddings", "Dynamic Graphs"],
      authors: "Farzaneh Heidari, Manos Papagelis",
      venue: "Applied Network Science (2020) · COMPLEX NETWORKS (2018)",
      teaser:
        "Keeping node embeddings up to date as a network evolves — by incrementally maintaining the random-walk corpus instead of recomputing from scratch.",
      overview:
        "My MSc work at York University. Random-walk methods like node2vec learn node embeddings from a corpus of sampled walks, but real networks change over time. EvoNRL maintains a set of random walks under edge insertions/deletions using an indexing structure, so embeddings can be updated incrementally and stay accurate as the graph evolves — far cheaper than recomputing walks and retraining from scratch.",
      motivation:
        "Static network-embedding methods must be re-run whenever the graph changes, which is wasteful and slow for streaming/temporal networks. Incremental maintenance of the walk corpus makes representation learning practical for evolving graphs.",
      methods: [
        "Maintain a corpus of random walks in an inverted index keyed by node.",
        "On each edge update, identify and re-sample only the affected walks.",
        "Retrain / update the skip-gram embedding online to track the evolving topology."
      ],
      results: [
        "Embeddings track the evolving network with substantially less computation than full recomputation.",
        "Journal version in Applied Network Science (2020); conference version at COMPLEX NETWORKS (2018)."
      ],
      figures: [],
      poster: null,
      links: {
        code: "https://github.com/farzana0/EvoNRL",
        doi: "https://doi.org/10.1007/s41109-020-00257-3"
      },
      futureWork:
        "Extending incremental maintenance to attributed and higher-order (hypergraph) dynamic networks."
    },

    {
      id: "bachelors-project",
      title: "Study and Analysis of Wholesale Electricity Markets",
      subtitle: "BSc thesis · Electrical Engineering, Sharif University of Technology",
      category: "Bachelor's",
      featured: false,
      accent: "slate",
      year: 2017,
      status: { label: "BSc Thesis · 2017", kind: "published" },
      tags: ["Electricity Markets", "Econometrics", "Regression"],
      authors: "Farzaneh Heidari",
      venue: "Sharif University of Technology",
      teaser:
        "Predicting wholesale-electricity-market revenue under a pay-as-bid auction pricing rule, using regression models in STATA and MATLAB.",
      overview:
        "My undergraduate thesis studied how wholesale electricity markets clear and how the choice of auction <em>pricing rule</em> shapes the money that flows through them. In these markets, generators submit price–quantity bids into a periodic auction and a market operator dispatches the cheapest bids until demand is met. The pricing rule then decides what each accepted generator is paid: under a <strong>pay-as-bid</strong> rule, every accepted bid is paid exactly what it bid, rather than all accepted bids receiving a single uniform clearing price. The thesis focused on <strong>predicting the market's revenue under the pay-as-bid strategy</strong>, building regression models — estimated in <strong>STATA</strong> and <strong>MATLAB</strong> — that relate market revenue to bidding and demand conditions.",
      motivation:
        "Auction design is central to electricity markets: pay-as-bid and uniform-price rules give bidders different incentives and can produce very different revenues and prices. Being able to model and forecast revenue under a given pricing rule helps market designers and participants reason about the consequences of that choice before committing to it.",
      methods: [
        "Framed wholesale electricity procurement as a repeated auction with price–quantity bids settled under a pay-as-bid rule.",
        "Specified econometric regression models relating market revenue to auction and demand variables.",
        "Estimated and analysed the models in STATA (econometrics) and MATLAB (numerical regression)."
      ],
      results: [],
      figures: [],
      poster: null,
      links: {},
      futureWork: ""
    }
  ],

  /* ----------------------------------------------------------------------
     Publications (verified via dblp + arXiv). Newest first.
     status.kind ∈ accepted | published | review | progress
     ---------------------------------------------------------------------- */
  publications: [
    {
      title: "TN-SHAP-G: Graph-Structured Tensor Network Surrogates for Shapley Values and Interactions",
      authors: "Farzaneh Heidari, Guillaume Rabusseau",
      venue: "ICML 2026",
      year: 2026,
      status: { label: "Accepted", kind: "accepted" },
      projectId: "tn-shap-g",
      links: { arxiv: "https://arxiv.org/abs/2606.01540", code: "https://github.com/farzana0/TN-SHAP-G" }
    },
    {
      title: "Tractable Shapley Values and Interactions via Tensor Networks",
      authors: "Farzaneh Heidari, Chao Li, Guillaume Rabusseau",
      venue: "AISTATS 2026",
      year: 2026,
      status: { label: "Accepted", kind: "accepted" },
      projectId: "tn-shap",
      links: { arxiv: "https://arxiv.org/abs/2510.22138", pdf: "https://arxiv.org/pdf/2510.22138", code: "https://github.com/farzana0/TN-SHAP" }
    },
    {
      title: "Exact Multilinear Extensions of Quantum Neural Networks for Shapley Attribution of Features and Gates",
      authors: "Farzaneh Heidari, Guillaume Rabusseau",
      venue: "Manuscript (QTML abstract)",
      year: 2026,
      status: { label: "In progress", kind: "progress" },
      projectId: "tn-shap-q",
      links: { code: "https://github.com/farzana0/TN-SHAP-Q" }
    },
    {
      title: "How do LLMs encode evaluation-awareness?",
      authors: "Farzaneh Heidari",
      venue: "Manuscript",
      year: 2026,
      status: { label: "In progress", kind: "progress" },
      projectId: "evaluation-awareness",
      links: { code: "https://github.com/farzana0/Evaluation-Awareness-demo" }
    },
    {
      title: "Auditing Evaluation-Conditioned Behaviour in Tool-Using Chess Agents",
      authors: "Farzaneh Heidari",
      venue: "Workshop submission",
      year: 2026,
      status: { label: "Under review", kind: "review" },
      projectId: "chess-strategic-adaptation",
      links: { code: "https://github.com/farzana0/Chess-sandbox" }
    },
    {
      title: "Explaining Graph Neural Networks Using Interpretable Local Surrogates",
      authors: "Farzaneh Heidari, Perouz Taslakian, Guillaume Rabusseau",
      venue: "TAG-ML (ICML 2023 Workshop)",
      year: 2023,
      status: { label: "Published", kind: "published" },
      projectId: null,
      links: {}
    },
    {
      title: "Epidemic Spreading in Trajectory Networks",
      authors: "Tilemachos Pechlivanoglou, Jing Li, Jialin Sun, Farzaneh Heidari, Manos Papagelis",
      venue: "Big Data Research, Vol. 27",
      year: 2022,
      status: { label: "Published", kind: "published" },
      projectId: null,
      links: { doi: "https://doi.org/10.1016/j.bdr.2021.100275" }
    },
    {
      title: "A Mobility-based Recommendation System for Mitigating the Risk of Infection during Epidemics",
      authors: "Gian Alix, Nina Yanin, Tilemachos Pechlivanoglou, Farzaneh Heidari, Jing Li, Manos Papagelis",
      venue: "IEEE MDM 2022",
      year: 2022,
      status: { label: "Published", kind: "published" },
      projectId: null,
      links: {}
    },
    {
      title: "Microscopic Modeling of Spatiotemporal Epidemic Dynamics",
      authors: "Tilemachos Pechlivanoglou, Gian Alix, Nina Yanin, Farzaneh Heidari, Jing Li, Manos Papagelis",
      venue: "SpatialEpi (MDM 2022 Workshop)",
      year: 2022,
      status: { label: "Published", kind: "published" },
      projectId: null,
      links: {}
    },
    {
      title: "Evolving Network Representation Learning Based on Random Walks",
      authors: "Farzaneh Heidari, Manos Papagelis",
      venue: "Applied Network Science, Vol. 5",
      year: 2020,
      status: { label: "Published", kind: "published" },
      projectId: "evonrl",
      links: { code: "https://github.com/farzana0/EvoNRL", doi: "https://doi.org/10.1007/s41109-020-00257-3" }
    },
    {
      title: "Features of Timelessness: Intermediate Report on a Quest for Stylistic Features that Mark Literary Canonicity",
      authors: "Joris J. van Zundert, Farzaneh Heidari, Raymond A. Mar, Karina van Dalen-Oskam, et al.",
      venue: "Digital Humanities (DH) 2020",
      year: 2020,
      status: { label: "Published", kind: "published" },
      projectId: null,
      links: {}
    },
    {
      title: "EvoNRL: Evolving Network Representation Learning Based on Random Walks",
      authors: "Farzaneh Heidari, Manos Papagelis",
      venue: "COMPLEX NETWORKS 2018",
      year: 2018,
      status: { label: "Published", kind: "published" },
      projectId: "evonrl",
      links: {}
    }
  ]
};
