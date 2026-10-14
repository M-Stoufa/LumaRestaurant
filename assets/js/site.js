/* LÜMA — shared interactions: header, mobile nav, reveal, lightbox, menu browser, gallery. */
(function () {
  'use strict';
  document.body.classList.remove('no-js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Header state */
  var header = $('#header');
  function scrollHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  scrollHeader();
  window.addEventListener('scroll', scrollHeader, { passive: true });

  /* Hero video: always on, never stops. No play button. */
  var heroVideo = $('.hero-media video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;
    heroVideo.controls = false;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('loop', '');
    heroVideo.setAttribute('autoplay', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('disablepictureinpicture', '');
    heroVideo.playsInline = true;
    try { heroVideo.disablePictureInPicture = true; } catch (e) {}
    var tryPlay = function () {
      if (!heroVideo.paused && !heroVideo.ended) return;
      try {
        var p = heroVideo.play();
        if (p && p.catch) { p.catch(function () {}); }
      } catch (e) {}
    };
    heroVideo.addEventListener('canplay', tryPlay);
    heroVideo.addEventListener('loadeddata', tryPlay);
    heroVideo.addEventListener('ended', tryPlay);
    heroVideo.addEventListener('pause', function () {
      /* Resume immediately — video must never stay paused. */
      tryPlay();
    });
    heroVideo.addEventListener('error', function () {
      heroVideo.style.display = 'none';
    }, true);
    tryPlay();
    window.setInterval(tryPlay, 1000);
    ['pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(function (ev) {
      window.addEventListener(ev, tryPlay, { passive: true });
    });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
    });
  }

  /* Mobile navigation */
  var toggle = $('#menuToggle'), nav = $('#navlinks');
  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    toggle.textContent = open ? '\u00D7' : '\u2630';
    document.body.classList.toggle('lock', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 720) setMenu(false); });
  }

  /* Reveal on scroll */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Lightbox */
  var lightbox = $('#lightbox'), lbImage = $('#lbImage'), lbCaption = $('#lbCaption');
  var currentSet = [], currentIndex = 0, lastFocus = null;
  function updateLightbox() {
    var item = currentSet[currentIndex];
    if (!item) return;
    lbImage.src = item.src;
    lbImage.alt = item.alt || '';
    lbCaption.textContent = (item.title || item.alt || 'Photo') + ' · ' + (currentIndex + 1) + ' / ' + currentSet.length;
    var multi = currentSet.length > 1;
    $('#lbPrev').style.display = multi ? '' : 'none';
    $('#lbNext').style.display = multi ? '' : 'none';
  }
  function openLightbox(set, index, trigger) {
    if (!lightbox) return;
    currentSet = set; currentIndex = index; lastFocus = trigger || null;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.classList.add('lock');
    $('#lbClose').focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.classList.remove('lock');
    lbImage.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function move(delta) {
    if (!currentSet.length) return;
    currentIndex = (currentIndex + delta + currentSet.length) % currentSet.length;
    updateLightbox();
  }
  if (lightbox) {
    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', function () { move(-1); });
    $('#lbNext').addEventListener('click', function () { move(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
  }

  /* Gallery grids (data-gallery attr selects a photo set) */
  var PHOTOS = {
    preview: [
      { src: 'assets/photos/food-table.jpg', alt: 'Table garnie de plats LÜMA', title: 'Table garnie' },
      { src: 'assets/photos/pizza-original.jpg', alt: 'Pizza photographiée chez LÜMA', title: 'Pizza' },
      { src: 'assets/photos/seafood-original.jpg', alt: 'Plat de fruits de mer photographié chez LÜMA', title: 'Fruits de mer' },
      { src: 'assets/photos/dessert-closeup.jpg', alt: 'Dessert photographié chez LÜMA', title: 'Dessert' },
      { src: 'assets/photos/dessert-drink.jpg', alt: 'Dessert et boisson photographiés chez LÜMA', title: 'Dessert et boisson' }
    ],
    full: [
      { src: 'assets/photos/pizza-original.jpg', alt: 'Pizza photographiée chez LÜMA', title: 'Pizza' },
      { src: 'assets/photos/pasta-original.jpg', alt: 'Plat de pâtes photographié chez LÜMA', title: 'Pâtes' },
      { src: 'assets/photos/seafood-original.jpg', alt: 'Plat de fruits de mer photographié chez LÜMA', title: 'Fruits de mer' },
      { src: 'assets/photos/plated-dish-original.jpg', alt: 'Assiette dressée photographiée chez LÜMA', title: 'Assiette dressée' },
      { src: 'assets/photos/dessert-cheesecake-logo.jpg', alt: 'Cheesecake aux fruits rouges devant l’enseigne lumineuse LÜMA', title: 'Cheesecake · enseigne LÜMA' },
      { src: 'assets/photos/restaurant-logo-photo.jpg', alt: 'Plat de pâtes devant l’enseigne lumineuse LÜMA Kitchen and More', title: 'Enseigne LÜMA' },
      { src: 'assets/photos/food-table.jpg', alt: 'Table garnie de plats chez LÜMA', title: 'Table garnie' },
      { src: 'assets/photos/dessert-plate.jpg', alt: 'Dessert servi chez LÜMA', title: 'Dessert servi' },
      { src: 'assets/photos/dessert-closeup.jpg', alt: 'Gros plan sur un dessert LÜMA', title: 'Dessert' },
      { src: 'assets/photos/dessert-drink.jpg', alt: 'Dessert et boisson photographiés chez LÜMA', title: 'Dessert et boisson' },
      { src: 'assets/photos/drink.jpg', alt: 'Boisson servie chez LÜMA', title: 'Boisson' },
      { src: 'assets/photos/dessert-oreo-cake.jpg', alt: 'Cheesecake aux Oreo photographié chez LÜMA', title: 'Cheesecake Oreo' },
      { src: 'assets/photos/menu-dish-01.jpg', alt: 'Plat photographié chez LÜMA', title: 'Plat' },
      { src: 'assets/photos/menu-dish-02.jpg', alt: 'Riz aux crevettes photographié chez LÜMA', title: 'Riz aux crevettes' },
      { src: 'assets/photos/menu-dish-03.jpg', alt: 'Plat photographié chez LÜMA', title: 'Plat' },
      { src: 'assets/photos/menu-dish-04.jpg', alt: 'Pâtes à la sauce tomate photographiées chez LÜMA', title: 'Pâtes' },
      { src: 'assets/photos/menu-dish-05.jpg', alt: 'Gâteau aux fraises photographié chez LÜMA', title: 'Gâteau aux fraises' },
      { src: 'assets/photos/menu-dish-06.jpg', alt: 'Plat photographié chez LÜMA', title: 'Plat' },
      { src: 'assets/photos/menu-dish-07.jpg', alt: 'Cheesecake au caramel photographié chez LÜMA', title: 'Cheesecake caramel' },
      { src: 'assets/photos/sharing-food-original.jpg', alt: 'Assortiment de plats à partager chez LÜMA', title: 'À partager' }
    ]
  };
  $$('[data-gallery]').forEach(function (grid) {
    var set = PHOTOS[grid.getAttribute('data-gallery')] || PHOTOS.preview;
    set.forEach(function (p, i) {
      var b = document.createElement('button');
      b.className = 'gallery-item';
      b.type = 'button';
      b.setAttribute('aria-label', 'Agrandir : ' + p.title);
      var img = document.createElement('img');
      img.src = p.src; img.alt = p.alt; img.loading = 'lazy';
      b.appendChild(img);
      b.addEventListener('click', function () { openLightbox(set, i, b); });
      grid.appendChild(b);
    });
  });

  /* Menu browser (menu page + home preview) */
  var filterHost = $('#menuFilters'), resultsHost = $('#menuResults'),
      searchInput = $('#menuSearch'), countHost = $('#menuCount');
  function priceLabel(price) {
    if (price === null || price === undefined) return '';
    return '<span class="menu-price">' + String(price).replace('.', ',') + ' DT</span>';
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  if (filterHost && resultsHost && typeof LUMA_MENU !== 'undefined') {
    var activeCategory = 'Toutes';
    var limit = filterHost.getAttribute('data-limit') === 'preview';
    function currentQuery() { return searchInput ? searchInput.value.trim().toLowerCase() : ''; }
    function renderMenu() {
      var q = currentQuery();
      filterHost.innerHTML = '';
      var cats = ['Toutes'].concat(LUMA_MENU.map(function (c) { return c.category; }));
      cats.forEach(function (cat) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'menu-filter'; b.textContent = cat;
        b.setAttribute('aria-pressed', String(cat === activeCategory));
        b.addEventListener('click', function () { activeCategory = cat; renderMenu(); });
        filterHost.appendChild(b);
      });
      var groups = activeCategory === 'Toutes' ? LUMA_MENU : LUMA_MENU.filter(function (c) { return c.category === activeCategory; });
      if (q) {
        groups = groups.map(function (g) {
          return {
            category: g.category, note: g.note,
            items: g.items.filter(function (it) {
              return (g.category + ' ' + it[0] + ' ' + (it[2] || '')).toLowerCase().indexOf(q) !== -1;
            })
          };
        }).filter(function (g) { return g.items.length; });
      }
      resultsHost.innerHTML = '';
      var shown = limit ? groups.slice(0, 4) : groups;
      var total = 0;
      shown.forEach(function (group) {
        var article = document.createElement('article');
        article.className = 'menu-category';
        var h = document.createElement('h3'); h.textContent = group.category;
        article.appendChild(h);
        if (group.note) {
          var n = document.createElement('p'); n.className = 'category-note'; n.textContent = group.note;
          article.appendChild(n);
        }
        var list = document.createElement('div'); list.className = 'menu-items';
        group.items.forEach(function (it) {
          total += 1;
          var row = document.createElement('div'); row.className = 'menu-item';
          var info = document.createElement('div');
          var title = document.createElement('strong'); title.textContent = it[0];
          info.appendChild(title);
          if (it[2]) { var sm = document.createElement('small'); sm.textContent = it[2]; info.appendChild(sm); }
          row.appendChild(info);
          if (it[1] !== null && it[1] !== undefined) {
            var sp = document.createElement('span'); sp.className = 'menu-price';
            sp.textContent = String(it[1]).replace('.', ',') + ' DT';
            row.appendChild(sp);
          }
          list.appendChild(row);
        });
        article.appendChild(list);
        resultsHost.appendChild(article);
      });
      if (!shown.length) {
        var p = document.createElement('p'); p.className = 'menu-empty';
        p.textContent = 'Aucun plat ne correspond à cette recherche. Essayez un autre mot.';
        resultsHost.appendChild(p);
      }
      if (countHost) {
        var all = 0;
        LUMA_MENU.forEach(function (g) { all += g.items.length; });
        countHost.textContent = total + ' plat' + (total > 1 ? 's' : '') + ' affiché' + (total > 1 ? 's' : '') + ' · ' + all + ' au total';
      }
      void esc;
    }
    if (searchInput) searchInput.addEventListener('input', renderMenu);
    renderMenu();
  }
})();
