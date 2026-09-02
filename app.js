/* Shared behaviour for index.html and work.html */
(function () {
  "use strict";
  var I = window.I18N || { en: {}, el: {} };

  function applyLanguage(lang) {
    var dict = I[lang] || I.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLanguage(btn.dataset.lang); });
  });

  // initial language: saved choice, else browser preference, else English
  var initial = "en";
  try {
    var saved = localStorage.getItem("lang");
    if (saved && I[saved]) initial = saved;
    else if ((navigator.language || "").toLowerCase().indexOf("el") === 0) initial = "el";
  } catch (e) {}
  applyLanguage(initial);

  // Download CV
  var cvBtn = document.getElementById("downloadCv");
  if (cvBtn) cvBtn.addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = "Anastasia_Andreou_CV2026.pdf";
    a.download = "Anastasia_Andreou_CV2026.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Mobile menu
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    var setOpen = function (open) {
      navLinks.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    navToggle.addEventListener("click", function () {
      setOpen(!navLinks.classList.contains("open"));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Scroll-spy: mark the nav link whose section is in view (single-page nav only)
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  if (spyLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    spyLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id) byId[id] = a;
    });
    var currentLink = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = byId[entry.target.id];
        if (link && link !== currentLink) {
          spyLinks.forEach(function (x) { x.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "page");
          currentLink = link;
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) obs.observe(sec);
    });
  }

  // Dark mode toggle
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var sync = function () {
      themeBtn.setAttribute(
        "aria-pressed",
        root.getAttribute("data-theme") === "dark" ? "true" : "false"
      );
    };
    sync();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
  }
})();
