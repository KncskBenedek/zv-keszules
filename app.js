/*
 * app.js — shared progressive-enhancement script for the BProf záróvizsga site.
 *
 * Loaded on every page. It re-wires the existing markup so that:
 *   - tab switching no longer relies on the global `event.target` (a real bug
 *     that set "active" on the wrong element when a tab's child was clicked),
 *   - tabs and accordions are operable by keyboard and exposed to screen readers,
 *   - the current page is marked active in the navigation.
 *
 * The script enhances markup in place: it reads the existing inline
 * onclick="showPage('id')" / onclick="toggle(this)" handlers, then removes them
 * and attaches proper listeners. Global showPage()/toggle() are also defined as
 * robust fallbacks, so nothing breaks if a handler is ever left inline.
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- Tabs -- */
  function initTabs() {
    document.querySelectorAll(".tabs").forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll(".tab"));
      if (!tabs.length) return;
      tablist.setAttribute("role", "tablist");

      tabs.forEach(function (tab) {
        var match = (tab.getAttribute("onclick") || "")
          .match(/showPage\(\s*['"]([^'"]+)['"]\s*\)/);
        var targetId = match ? match[1] : null;

        tab.removeAttribute("onclick"); // take over event handling
        tab.setAttribute("role", "tab");
        tab.setAttribute("type", "button");
        if (targetId) {
          if (!tab.id) tab.id = "tab-" + targetId;
          tab.setAttribute("aria-controls", targetId);
          tab.dataset.target = targetId;
        }

        var active = tab.classList.contains("active");
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;

        tab.addEventListener("click", function () { activateTab(tabs, tab); });
        tab.addEventListener("keydown", function (e) {
          var i = tabs.indexOf(tab), next;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === "Home") next = tabs[0];
          else if (e.key === "End") next = tabs[tabs.length - 1];
          else return;
          e.preventDefault();
          activateTab(tabs, next);
          next.focus();
        });

        var panel = targetId && document.getElementById(targetId);
        if (panel) {
          panel.setAttribute("role", "tabpanel");
          if (!panel.getAttribute("aria-labelledby")) panel.setAttribute("aria-labelledby", tab.id);
        }
      });
    });
  }

  function activateTab(tabs, active) {
    tabs.forEach(function (t) {
      var on = t === active;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    var id = active.dataset.target;
    document.querySelectorAll(".page").forEach(function (p) {
      p.classList.toggle("active", p.id === id);
    });
  }

  /* ---------------------------------------------------------- Accordions -- */
  function initAccordions() {
    document.querySelectorAll(".sec-head").forEach(function (head) {
      head.removeAttribute("onclick");

      var body = head.nextElementSibling;
      var open = !!(body && body.classList.contains("open"));

      // WAI-ARIA disclosure pattern: wrap the heading's contents in a real
      // <button>. The heading (<h2>) keeps document-outline semantics while
      // the button provides native keyboard/click operability.
      var btn = head.querySelector(".sec-head-btn");
      if (!btn) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sec-head-btn";
        while (head.firstChild) btn.appendChild(head.firstChild);
        head.appendChild(btn);
      }

      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var chev = btn.querySelector(".chevron");
      if (chev) chev.setAttribute("aria-hidden", "true");
      if (body) {
        if (!body.id) body.id = "sec-" + Math.abs(hashString(head.textContent || ""));
        if (!btn.id) btn.id = body.id + "-btn";
        btn.setAttribute("aria-controls", body.id);
        body.setAttribute("role", "region");
        body.setAttribute("aria-labelledby", btn.id);
      }

      btn.addEventListener("click", function () { toggleSection(head); });
    });
  }

  function toggleSection(head) {
    var body = head.nextElementSibling;
    if (!body) return;
    var btn = head.querySelector(".sec-head-btn");
    var chev = head.querySelector(".chevron");
    var open = body.classList.toggle("open");
    if (chev) chev.classList.toggle("open", open);
    (btn || head).setAttribute("aria-expanded", open ? "true" : "false");
  }

  /* --------------------------------------------------------- Active nav -- */
  function initActiveNav() {
    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (page === "") page = "index.html";
    document.querySelectorAll("nav a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (href && href === page) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ----------------------------------------------------------- Helpers --- */
  function hashString(s) {
    var h = 0, i;
    for (i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
    return h;
  }

  /* Robust global fallbacks (used only if an inline handler survives). They
     intentionally do NOT depend on `event`, fixing the original bug. */
  window.showPage = function (id) {
    var panel = document.getElementById(id);
    document.querySelectorAll(".page").forEach(function (p) {
      p.classList.toggle("active", p === panel);
    });
    document.querySelectorAll(".tab").forEach(function (t) {
      var oc = t.getAttribute("onclick") || "";
      var on = (t.dataset && t.dataset.target === id) ||
               oc.indexOf("'" + id + "'") > -1 || oc.indexOf('"' + id + '"') > -1;
      t.classList.toggle("active", on);
    });
  };
  window.toggle = function (head) { toggleSection(head); };

  /* ------------------------------------------------------------ Tables -- */
  /* Mark table headers for screen readers (most tables here are column headers). */
  function initTables() {
    document.querySelectorAll("table th").forEach(function (th) {
      if (!th.hasAttribute("scope")) th.setAttribute("scope", "col");
    });
  }

  /* ------------------------------------------------------------- Init ---- */
  function init() { initTabs(); initAccordions(); initTables(); initActiveNav(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
