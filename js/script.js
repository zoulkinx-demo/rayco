/* =========================================================
   RAY & CO, VISION LAB — Site Script
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Config: edit these to match your real store ---------- */
  const CONFIG = {
    // TODO: เปลี่ยนเป็นลิงก์ LINE Official Account จริงของร้านคุณ
    lineUrl: "https://line.me/R/ti/p/@rayandco"
  };
  // Apply the configured LINE url to every LINE button/link on the page
  document.querySelectorAll('a[href*="line.me/R/ti/p/@rayandco"]').forEach(a => {
    a.setAttribute('href', CONFIG.lineUrl);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded','false');
    });
  });

  /* ---------- Best Sellers spotlight carousel (auto-rotating) ---------- */
  const bsSlides = Array.from(document.querySelectorAll('.bs-slide'));
  const bsDotsWrap = document.getElementById('bsDots');
  if (bsSlides.length){
    let bsCurrent = 0;
    let bsTimer;

    bsSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `สินค้าขายดีลำดับที่ ${i+1}`);
      dot.addEventListener('click', () => bsGoTo(i));
      bsDotsWrap.appendChild(dot);
    });
    const bsDots = Array.from(bsDotsWrap.children);

    function bsGoTo(index){
      bsSlides[bsCurrent].classList.remove('active');
      bsDots[bsCurrent].classList.remove('active');
      bsCurrent = (index + bsSlides.length) % bsSlides.length;
      bsSlides[bsCurrent].classList.add('active');
      bsDots[bsCurrent].classList.add('active');
      bsResetTimer();
    }
    function bsResetTimer(){
      clearInterval(bsTimer);
      bsTimer = setInterval(() => bsGoTo(bsCurrent + 1), 4200);
    }

    document.getElementById('bsPrev').addEventListener('click', () => bsGoTo(bsCurrent - 1));
    document.getElementById('bsNext').addEventListener('click', () => bsGoTo(bsCurrent + 1));

    // Pause on hover for readability, resume on leave
    const spotlight = document.getElementById('bsSpotlight');
    spotlight.addEventListener('mouseenter', () => clearInterval(bsTimer));
    spotlight.addEventListener('mouseleave', bsResetTimer);

    bsResetTimer();
  }

  /* ---------- Hero slideshow ---------- */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('heroDots');
  let current = 0;
  let heroTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `สไลด์ที่ ${i+1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goToSlide(index){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetHeroTimer();
  }
  function nextSlide(){
    goToSlide((current + 1) % slides.length);
  }
  function resetHeroTimer(){
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 6000);
  }
  if (slides.length > 1) resetHeroTimer();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const rayLines = document.querySelectorAll('.ray-line');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('lit');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  rayLines.forEach(el => lineObserver.observe(el));

  /* ---------- Product tab filter ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  let activeCategoryFilter = 'all';

  function applyFilter(filter){
    activeCategoryFilter = filter;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    let delay = 0;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      if (match){
        card.style.display = '';
        card.classList.remove('show');
        setTimeout(() => card.classList.add('show'), 30 + delay);
        delay += 60;
      } else {
        card.classList.remove('show');
        card.style.display = 'none';
      }
    });
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });
  applyFilter('all');

  // Footer links that jump to collection with a pre-applied filter
  document.querySelectorAll('[data-filter-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      const f = a.dataset.filterLink;
      setTimeout(() => applyFilter(f), 350);
    });
  });

  /* ---------- Product search ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
  const searchStatus = document.getElementById('searchStatus');

  function openSearch(){
    searchPanel.classList.add('open');
    searchToggle.classList.add('active');
    searchToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput.focus(), 350);
  }
  function closeSearch(){
    searchPanel.classList.remove('open');
    searchToggle.classList.remove('active');
    searchToggle.setAttribute('aria-expanded', 'false');
    searchInput.value = '';
    searchStatus.textContent = '';
    searchStatus.classList.remove('no-results');
    applyFilter(activeCategoryFilter);
  }
  searchToggle.addEventListener('click', () => {
    if (searchPanel.classList.contains('open')) closeSearch();
    else openSearch();
  });
  searchClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchPanel.classList.contains('open')) closeSearch();
  });

  function runSearch(query){
    const q = query.trim().toLowerCase();
    const catSynonyms = {
      signature: 'signature ซิกเนเจอร์',
      sun: 'sunglasses แว่นกันแดด กันแดด',
      optical: 'optical แว่นสายตา สายตา'
    };
    if (!q){
      searchStatus.textContent = '';
      searchStatus.classList.remove('no-results');
      applyFilter(activeCategoryFilter);
      return;
    }
    tabBtns.forEach(b => b.classList.remove('active'));
    let count = 0;
    productCards.forEach(card => {
      const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const cat = card.querySelector('.pk')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.product-tag')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.product-body p')?.textContent.toLowerCase() || '';
      const catSyn = catSynonyms[card.dataset.cat] || '';
      const match = name.includes(q) || cat.includes(q) || tag.includes(q) || desc.includes(q) || catSyn.includes(q);
      card.style.display = match ? '' : 'none';
      card.classList.toggle('show', match);
      if (match) count++;
    });
    if (count === 0){
      searchStatus.textContent = `ไม่พบสินค้าที่ตรงกับ "${query}" ลองคำอื่น หรือแอดไลน์สอบถามได้เลย`;
      searchStatus.classList.add('no-results');
    } else {
      searchStatus.textContent = `พบ ${count} รายการ`;
      searchStatus.classList.remove('no-results');
    }
  }

  let searchDebounce;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => runSearch(e.target.value), 200);
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      document.getElementById('collection').scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });

  /* ---------- Product media gallery (multi-angle thumbnails) ---------- */
  document.querySelectorAll('.product-media[data-images]').forEach(media => {
    const images = media.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
    if (images.length < 2) return;

    let idx = 0;
    const img = media.querySelector('img');

    const prevBtn = document.createElement('button');
    prevBtn.className = 'media-nav prev';
    prevBtn.setAttribute('aria-label', 'ภาพก่อนหน้า');
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 5l-7 7 7 7"/></svg>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'media-nav next';
    nextBtn.setAttribute('aria-label', 'ภาพถัดไป');
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg>';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'media-dots';
    const dotEls = images.map((_, i) => {
      const d = document.createElement('button');
      if (i === 0) d.classList.add('active');
      d.setAttribute('aria-label', `มุมภาพที่ ${i + 1}`);
      dotsWrap.appendChild(d);
      return d;
    });

    function render(){
      img.src = images[idx];
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    function go(newIdx, e){
      if (e) e.stopPropagation();
      idx = (newIdx + images.length) % images.length;
      render();
    }

    prevBtn.addEventListener('click', (e) => go(idx - 1, e));
    nextBtn.addEventListener('click', (e) => go(idx + 1, e));
    dotEls.forEach((d, i) => d.addEventListener('click', (e) => go(i, e)));

    media.appendChild(prevBtn);
    media.appendChild(nextBtn);
    media.appendChild(dotsWrap);
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = el.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Gallery slider nav ---------- */
  const galleryTrack = document.getElementById('galleryTrack');
  const galPrev = document.getElementById('galPrev');
  const galNext = document.getElementById('galNext');
  function galleryScroll(dir){
    const item = galleryTrack.querySelector('.gallery-item');
    const gap = 20;
    const w = item ? item.offsetWidth + gap : 300;
    galleryTrack.scrollBy({ left: dir * w * 1.5, behavior: 'smooth' });
  }
  galPrev.addEventListener('click', () => galleryScroll(-1));
  galNext.addEventListener('click', () => galleryScroll(1));

})();
