/* ==========================================================================
   Учебная страница для GitHub Pages.
   Здесь три вещи: переключение темы, текущий год/время и счётчик лайков.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "pages-practice-theme";
  var LIKE_KEY = "pages-practice-likes";

  /* ---------- Тема ---------- */

  function applyTheme(theme) {
    root.dataset.theme = theme;

    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☀️" : "🌙";
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
      );
    }
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null; // режим приватного просмотра или storage отключён
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* молча игнорируем: страница должна работать и без storage */
    }
  }

  var savedTheme = readStorage(THEME_KEY);
  var systemPrefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  var toggleButton = document.getElementById("themeToggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      writeStorage(THEME_KEY, nextTheme);
    });
  }

  /* ---------- Год и время загрузки ---------- */

  var yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  var loadedElement = document.getElementById("loadedAt");
  if (loadedElement) {
    loadedElement.textContent = new Date().toLocaleString("ru-RU");
  }

  /* ---------- Счётчик лайков ---------- */

  var likeButton = document.getElementById("likeBtn");
  var likeCount = document.getElementById("likeCount");
  var likes = Number(readStorage(LIKE_KEY)) || 0;

  function renderLikes() {
    if (likeCount) {
      likeCount.textContent = String(likes);
    }
  }

  renderLikes();

  if (likeButton) {
    likeButton.addEventListener("click", function () {
      likes += 1;
      renderLikes();
      writeStorage(LIKE_KEY, String(likes));

      /* перезапуск CSS-анимации при повторных кликах */
      likeButton.classList.remove("pop");
      void likeButton.offsetWidth;
      likeButton.classList.add("pop");
    });
  }
})();
