/* ==========================================================================
   main.js — theme toggle, navigation, and subtle scroll reveal. Nothing else.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) { b.addEventListener("click", toggleTheme); });

    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("#nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
      });
    }

    // active nav link (handles root, section pages, and nested dir pages like /blog/...)
    var full = location.pathname.replace(/\/index\.html$/, "/");
    var file = full.substring(full.lastIndexOf("/") + 1);
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace(/^\//, "");
      var match = a.dataset.match;
      var active = false;
      if (match && full.indexOf("/" + match) === 0) active = true;
      else if (href && file && href === file) active = true;
      else if ((full === "/" || full === "") && href === "index.html") active = true;
      if (active) a.classList.add("active");
    });

    window.revealNow(document);
  });

  window.revealNow = function (scope) {
    scope = scope || document;
    if (!("IntersectionObserver" in window) || reduce) {
      scope.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.06, rootMargin: "0px 0px -5% 0px" });
    scope.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
  };
})();
