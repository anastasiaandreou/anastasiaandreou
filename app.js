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

  // Night mode toggle (night is the default; toggle switches to light)
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var sync = function () {
      themeBtn.setAttribute(
        "aria-pressed",
        root.getAttribute("data-theme") === "light" ? "false" : "true"
      );
    };
    sync();
    themeBtn.addEventListener("click", function () {
      var toLight = root.getAttribute("data-theme") !== "light";
      if (toLight) root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("theme", toLight ? "light" : "dark"); } catch (e) {}
      sync();
    });
  }

  // About modal
  var modal = document.getElementById("about-modal");
  var aboutOpen = document.getElementById("aboutOpen");
  var aboutClose = document.getElementById("aboutClose");
  if (modal && aboutOpen) {
    var lastFocus = null;
    var openModal = function () {
      lastFocus = document.activeElement;
      modal.classList.add("open");
      document.body.classList.add("modal-open");
      if (aboutClose) aboutClose.focus();
    };
    var closeModal = function () {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    aboutOpen.addEventListener("click", openModal);
    if (aboutClose) aboutClose.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  // Phone-card carousel (Selected works)
  var pcTrack = document.querySelector(".pc-track");
  if (pcTrack) {
    var pcStep = function () {
      var c = pcTrack.querySelector(".pc-card");
      return (c ? c.getBoundingClientRect().width + 22 : 220) * 1.4;
    };
    var pcPrev = document.querySelector(".pc-prev");
    var pcNext = document.querySelector(".pc-next");
    if (pcPrev) pcPrev.addEventListener("click", function () {
      pcTrack.scrollBy({ left: -pcStep(), behavior: "smooth" });
    });
    if (pcNext) pcNext.addEventListener("click", function () {
      pcTrack.scrollBy({ left: pcStep(), behavior: "smooth" });
    });
  }

  // Work-category modals (opened from the phone cards)
  var wcModals = document.querySelectorAll(".modal[data-work-modal]");
  if (wcModals.length) {
    var wcLast = null;
    var wcCloseAll = function () {
      wcModals.forEach(function (m) { m.classList.remove("open"); });
      document.body.classList.remove("modal-open");
      if (wcLast && wcLast.focus) wcLast.focus();
    };
    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var m = document.getElementById(btn.getAttribute("data-open-modal"));
        if (!m) return;
        wcLast = btn;
        m.classList.add("open");
        document.body.classList.add("modal-open");
        var cl = m.querySelector("[data-close-modal]");
        if (cl) cl.focus();
      });
    });
    wcModals.forEach(function (m) {
      m.addEventListener("click", function (e) {
        if (e.target === m || (e.target.closest && e.target.closest("[data-close-modal]"))) wcCloseAll();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      for (var i = 0; i < wcModals.length; i++) {
        if (wcModals[i].classList.contains("open")) { wcCloseAll(); break; }
      }
    });
  }

  // Category visual galleries: big photo + stacked photos, paginated with dots
  document.querySelectorAll(".gal").forEach(function (gal) {
    var srcImgs = gal.querySelectorAll(".gal-source img");
    if (!srcImgs.length) return;
    var items = Array.prototype.map.call(srcImgs, function (img) {
      return {
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || "",
        video: img.getAttribute("data-video")
      };
    });
    var pagesEl = gal.querySelector(".gal-pages");
    var dotsEl = gal.querySelector(".gal-dots");
    if (!pagesEl || !dotsEl) return;

    var pageSize = 4;
    var pages = [];
    for (var i = 0; i < items.length; i += pageSize) pages.push(items.slice(i, i + pageSize));

    function makeCell(item, cls) {
      var a = document.createElement("a");
      a.className = cls + (item.video ? " is-video" : "");
      a.href = item.video || item.src;
      a.target = "_blank";
      a.rel = "noopener";
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.loading = "lazy";
      a.appendChild(img);
      return a;
    }

    pages.forEach(function (pageItems, pi) {
      var pageEl = document.createElement("div");
      pageEl.className = "gal-page" + (pi === 0 ? " active" : "");
      if (pageItems.length === 1) {
        pageEl.appendChild(makeCell(pageItems[0], "gal-hero gal-solo"));
      } else {
        var stack = document.createElement("div");
        stack.className = "gal-stack";
        pageItems.slice(1).forEach(function (it) {
          stack.appendChild(makeCell(it, "gal-cell"));
        });
        pageEl.appendChild(stack);
        pageEl.appendChild(makeCell(pageItems[0], "gal-hero"));
      }
      pagesEl.appendChild(pageEl);
    });

    if (pages.length > 1) {
      pages.forEach(function (_, pi) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Show set " + (pi + 1) + " of " + pages.length);
        if (pi === 0) b.className = "active";
        b.addEventListener("click", function () {
          pagesEl.querySelectorAll(".gal-page").forEach(function (p, idx) {
            p.classList.toggle("active", idx === pi);
          });
          dotsEl.querySelectorAll("button").forEach(function (d, idx) {
            d.classList.toggle("active", idx === pi);
          });
        });
        dotsEl.appendChild(b);
      });
    }
  });
})();
