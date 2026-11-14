/**
 * ==============================================================================
 * BIRTHDAY WEBSITE MAIN SCRIPT (js/main.js)
 * ==============================================================================
 * Vanilla JavaScript engine powering all interactive features:
 * - Safe CONFIG fallback guard
 * - Dynamic content rendering
 * - Welcome overlay & optional password gate
 * - Floating smart navigation & scroll spy
 * - Typing effect for hero heading
 * - Polaroid carousel with touch swipe & auto-advance
 * - Now photos gallery & accessible lightbox
 * - 21 to 22 milestone counter
 * - Interactive cake with 6 blowable candles & wish reveal
 * - 3D flip cards for love reasons
 * - Interactive memory timeline
 * - Staggered love letter reveal
 * - Music player toggle
 * - Confetti particle bursts
 * - Full prefers-reduced-motion accessibility support
 * ==============================================================================
 */

// ==============================================================================
// 0. CONFIG GUARD (Mandatory safety net for robustness)
// ==============================================================================
if (typeof CONFIG === 'undefined') {
  console.warn('Birthday site: config.js did not load (missing file or syntax error). Using safe empty defaults so the page still renders.');
  window.CONFIG = {
    names: { hers: 'Shekinah', yours: 'Adrian' },
    birthday: { date: 'November 11', turning: 22, previous: 21, passwordGate: null },
    music: { src: 'audio/birthday-song.mp3', label: 'Play music 🎵' },
    thenPhotos: [],
    nowPhotos: [],
    photo21st: { src: '', alt: '', caption: '' },
    loveReasons: [],
    timeline: [],
    loveLetter: { lines: [], cakeWishMessage: '' },
  };
}

(function () {
  'use strict';

  // Shared namespace for cross-module helpers and cached state
  const BirthdayApp = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    carouselTimer: null,
    counterAnimationId: null,
    audioInstance: null,
    audioInitialized: false,
    focusedElementBeforeLightbox: null,
    playMusic: null,
  };

  // Helper shorthand for document.getElementById
  const el = (id) => document.getElementById(id);

  // Helper for image fallback to prevent broken-image icons
  const setupImageFallback = (imgElement) => {
    if (!imgElement) return;
    imgElement.addEventListener('error', function onImgError() {
      // Avoid infinite error loop if the fallback itself fails
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = 'true';
        this.src = 'images/now/WhatsApp Image 2026-10-20 at 19.50.28.jpeg';
        this.alt = 'Photo placeholder';
      }
    });
  };

  // ==============================================================================
  // 14. CONFETTI HELPER (Wrapped for safety and theme consistency)
  // ==============================================================================
  const Confetti = {
    burst: function () {
      if (BirthdayApp.reducedMotion) return;
      if (typeof window.confetti !== 'function') return;

      const colors = ['#BFE3F8', '#8CCBEF', '#F9C6D8', '#F4A6C0', '#ffffff'];

      // First wide explosion from the center
      window.confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true,
      });

      // Second celebratory burst from the edges
      setTimeout(() => {
        if (typeof window.confetti !== 'function') return;
        window.confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          colors: colors,
          disableForReducedMotion: true,
        });
        window.confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          colors: colors,
          disableForReducedMotion: true,
        });
      }, 250);
    },
  };

  // ==============================================================================
  // 1. DOM POPULATION FROM CONFIG
  // ==============================================================================
  function initDOMPopulation() {
    const hers = CONFIG.names?.hers || 'Shekinah';
    const yours = CONFIG.names?.yours || 'Adrian';
    const turning = CONFIG.birthday?.turning || 22;
    const previous = CONFIG.birthday?.previous || 21;

    // Page title and metadata
    document.title = `Happy Birthday ${hers} 💙🩷`;

    // Recipient names across landmark sections
    const recipientSpans = document.querySelectorAll('.recipient-first-name');
    recipientSpans.forEach((s) => (s.textContent = hers));

    const welcomeName = el('welcome-recipient-name');
    if (welcomeName) welcomeName.textContent = hers;

    const footerAuthor = el('footer-author');
    if (footerAuthor) footerAuthor.textContent = yours;

    // 21st photo
    const photo21stImg = el('photo-21st');
    const photo21stCap = el('photo-21st-caption');
    const photo21stSecondImg = el('photo-21st-second');
    const photo21stSecondCap = el('photo-21st-second-caption');
    if (photo21stImg && CONFIG.photo21st?.src) {
      photo21stImg.src = CONFIG.photo21st.src;
      photo21stImg.alt = CONFIG.photo21st.alt || `${hers} on her 21st birthday`;
      setupImageFallback(photo21stImg);
    }
    if (photo21stSecondImg && CONFIG.photo21st?.secondSrc) {
      photo21stSecondImg.src = CONFIG.photo21st.secondSrc;
      photo21stSecondImg.alt = CONFIG.photo21st.secondAlt || `${hers} on her 21st birthday`;
      setupImageFallback(photo21stSecondImg);
    }
    if (photo21stCap && CONFIG.photo21st?.caption) {
      photo21stCap.textContent = CONFIG.photo21st.caption;
    }
    if (photo21stSecondCap && CONFIG.photo21st?.secondCaption) {
      photo21stSecondCap.textContent = CONFIG.photo21st.secondCaption;
    }

    // Numbers 21 and 22
    const yearFrom = el('year-from');
    const yearTo = el('year-to');
    if (yearFrom) yearFrom.textContent = String(previous);
    if (yearTo) yearTo.textContent = String(turning);

    // Populate "Then" Polaroid Carousel
    const thenTrack = el('then-track');
    const thenDots = el('then-dots');
    if (thenTrack && Array.isArray(CONFIG.thenPhotos) && CONFIG.thenPhotos.length > 0) {
      thenTrack.innerHTML = '';
      if (thenDots) thenDots.innerHTML = '';

      CONFIG.thenPhotos.forEach((photo, idx) => {
        // Slide container
        const slide = document.createElement('div');
        slide.className = 'polaroid-slide';
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${idx + 1} of ${CONFIG.thenPhotos.length}`);

        const frame = document.createElement('div');
        frame.className = 'polaroid-frame';

        const wrapper = document.createElement('div');
        wrapper.className = 'photo-wrapper';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || `Childhood photo ${idx + 1}`;
        img.loading = 'lazy';
        setupImageFallback(img);

        const caption = document.createElement('p');
        caption.className = 'polaroid-caption';
        caption.textContent = photo.caption || '';

        wrapper.appendChild(img);
        frame.appendChild(wrapper);
        frame.appendChild(caption);
        slide.appendChild(frame);
        thenTrack.appendChild(slide);

        // Dot indicator
        if (thenDots) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `dot ${idx === 0 ? 'active' : ''}`;
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
          dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
          dot.dataset.index = String(idx);
          thenDots.appendChild(dot);
        }
      });
    }

    // Populate "Now" Gallery Grid
    const nowGrid = el('now-grid');
    if (nowGrid && Array.isArray(CONFIG.nowPhotos) && CONFIG.nowPhotos.length > 0) {
      nowGrid.innerHTML = '';
      CONFIG.nowPhotos.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'now-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `View photo ${idx + 1}: ${photo.alt || ''}`);
        item.dataset.index = String(idx);

        const wrap = document.createElement('div');
        wrap.className = 'now-img-wrap';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || `Photo of ${hers} ${idx + 1}`;
        img.loading = 'lazy';
        setupImageFallback(img);

        const overlay = document.createElement('div');
        overlay.className = 'now-overlay';

        const caption = document.createElement('p');
        caption.className = 'now-caption';
        caption.textContent = photo.caption || photo.alt || '';

        wrap.appendChild(img);
        overlay.appendChild(caption);
        item.appendChild(wrap);
        item.appendChild(overlay);
        nowGrid.appendChild(item);
      });
    }

    // Populate "Reasons I Love You" 3D Flip Cards
    const loveGrid = el('love-grid');
    if (loveGrid && Array.isArray(CONFIG.loveReasons) && CONFIG.loveReasons.length > 0) {
      loveGrid.innerHTML = '';
      const heartIcons = ['💖', '🌸', '✨', '💙', '💫', '🩷', '🌟', '🌷'];
      CONFIG.loveReasons.forEach((reason, idx) => {
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-label', `Reason number ${idx + 1}: Click to reveal`);

        const icon = heartIcons[idx % heartIcons.length];

        card.innerHTML = `
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <span class="card-heart-icon" aria-hidden="true">${icon}</span>
              <span class="card-number">Reason #${idx + 1}</span>
              <span class="card-hint">Tap to reveal 💫</span>
            </div>
            <div class="flip-card-back">
              <p class="reason-text"></p>
            </div>
          </div>
        `;
        // Insert reason safely via textContent
        const textEl = card.querySelector('.reason-text');
        if (textEl) textEl.textContent = reason;

        loveGrid.appendChild(card);
      });
    }

    // Populate Memory Timeline
    const timelineTrack = el('timeline-track');
    if (timelineTrack && Array.isArray(CONFIG.timeline) && CONFIG.timeline.length > 0) {
      timelineTrack.innerHTML = '';
      CONFIG.timeline.forEach((item, idx) => {
        const tItem = document.createElement('div');
        tItem.className = 'timeline-item reveal';

        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'timeline-content';

        const dateTag = document.createElement('span');
        dateTag.className = 'timeline-date';
        dateTag.textContent = item.date || `Memory #${idx + 1}`;

        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = item.title || '';

        content.appendChild(dateTag);
        content.appendChild(title);

        if (item.photo) {
          const photoWrap = document.createElement('div');
          photoWrap.className = 'timeline-photo-wrap';
          const img = document.createElement('img');
          img.src = item.photo;
          img.alt = item.title || 'Timeline memory';
          img.loading = 'lazy';
          setupImageFallback(img);
          photoWrap.appendChild(img);
          content.appendChild(photoWrap);
        }

        const desc = document.createElement('p');
        desc.className = 'timeline-desc';
        desc.textContent = item.text || '';
        content.appendChild(desc);

        tItem.appendChild(marker);
        tItem.appendChild(content);
        timelineTrack.appendChild(tItem);
      });
    }

    // Populate Love Letter
    const letter = el('letter');
    if (letter && CONFIG.loveLetter && Array.isArray(CONFIG.loveLetter.lines)) {
      letter.innerHTML = '';
      CONFIG.loveLetter.lines.forEach((line) => {
        const p = document.createElement('p');
        p.className = 'letter-line';
        if (line.trim() === '') {
          p.classList.add('spacer');
          p.setAttribute('aria-hidden', 'true');
        } else {
          p.textContent = line;
          // Apply signature style to final line if it matches the sender's name
          if (line.trim().toLowerCase() === yours.trim().toLowerCase()) {
            p.classList.add('letter-signature');
          }
        }
        letter.appendChild(p);
      });
    }

    // Populate Cake Hidden Wish Message
    const wishMessageEl = el('wish-message');
    if (wishMessageEl) {
      wishMessageEl.textContent =
        CONFIG.loveLetter?.cakeWishMessage ||
        'May every single wish you make today come true. You deserve the entire world. 🌸✨';
    }
  }

  // ==============================================================================
  // 2. WELCOME SCREEN & PASSWORD GATE
  // ==============================================================================
  function initWelcomeScreen() {
    const welcome = el('welcome');
    const openBtn = el('open-gift-btn');
    const gateContainer = el('password-gate-container');
    const gateInput = el('password-gate-input');
    const gateError = el('gate-error-msg');

    if (!welcome || !openBtn) return;

    // Lock body scrolling while overlay is visible
    document.body.classList.add('locked-scroll');

    // Check if the password gate is active (non-empty string required)
    const rawGate = CONFIG.birthday?.passwordGate;
    const isGateActive = typeof rawGate === 'string' && rawGate.trim().length > 0;

    if (isGateActive && gateContainer) {
      gateContainer.classList.remove('hidden');
    }

    function unlockAndDismiss() {
      // Play the song automatically when entering the website
      if (typeof BirthdayApp.playMusic === 'function') {
        BirthdayApp.playMusic();
      }

      // Trigger celebratory confetti
      Confetti.burst();

      // Fade out welcome overlay
      welcome.classList.add('is-hidden');
      document.body.classList.remove('locked-scroll');

      // Hand focus over to skip link or main content
      const mainContent = el('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus({ preventScroll: true });
      }
    }

    function handleOpenAttempt() {
      if (isGateActive && gateInput) {
        const val = gateInput.value.trim().toLowerCase();
        const expected = String(rawGate).trim().toLowerCase();

        if (val !== expected || val === '') {
          if (gateError) gateError.textContent = "Hmm, that's not it — try again 🌸";
          gateInput.classList.remove('gate-error');
          // Re-trigger shake animation
          void gateInput.offsetWidth;
          gateInput.classList.add('gate-error');
          gateInput.focus();
          return;
        }
      }

      unlockAndDismiss();
    }

    openBtn.addEventListener('click', handleOpenAttempt);

    if (gateInput) {
      gateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleOpenAttempt();
        }
      });
      gateInput.addEventListener('input', () => {
        if (gateError) gateError.textContent = '';
        gateInput.classList.remove('gate-error');
      });
    }
  }

  // ==============================================================================
  // 3. FLOATING NAVIGATION & SCROLL SPY
  // ==============================================================================
  function initFloatingNav() {
    const nav = el('floating-nav');
    if (!nav) return;

    const navLinks = nav.querySelectorAll('.nav-link');
    let lastScrollY = window.scrollY;

    // Show/hide nav based on scroll direction
    window.addEventListener(
      'scroll',
      () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 140 && currentScrollY > lastScrollY) {
          nav.classList.add('nav-hidden');
        } else {
          nav.classList.remove('nav-hidden');
        }
        lastScrollY = Math.max(0, currentScrollY);
      },
      { passive: true }
    );

    // Section highlight spy via IntersectionObserver
    const sectionsToWatch = [
      'hero',
      'then-gallery',
      'now-gallery',
      'year-transition',
      'cake',
      'love-reasons',
      'timeline',
      'love-letter',
      'footer',
    ];

    const observedElements = sectionsToWatch.map((id) => el(id)).filter(Boolean);

    if ('IntersectionObserver' in window && observedElements.length > 0) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              navLinks.forEach((link) => {
                const targetSection = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
                if (targetSection === activeId) {
                  link.classList.add('active');
                  link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        { threshold: 0.35 }
      );

      observedElements.forEach((sec) => navObserver.observe(sec));
    }
  }

  // ==============================================================================
  // 4. HERO TYPING ANIMATION
  // ==============================================================================
  function initHeroTyping() {
    const heroTitle = el('hero-title');
    if (!heroTitle) return;

    const hers = CONFIG.names?.hers || 'Shekinah';
    const turning = CONFIG.birthday?.turning || 22;
    const fullText = `Happy ${turning}nd Birthday, ${hers}!`;

    if (BirthdayApp.reducedMotion) {
      heroTitle.textContent = fullText;
      return;
    }

    let charIdx = 0;
    heroTitle.textContent = '';

    function typeChar() {
      if (charIdx < fullText.length) {
        heroTitle.textContent += fullText.charAt(charIdx);
        charIdx++;
        // Varied typing delay for natural handwriting feel
        const delay = Math.random() * 60 + 70;
        setTimeout(typeChar, delay);
      }
    }

    // Start typing after short initial delay
    setTimeout(typeChar, 400);
  }

  // ==============================================================================
  // 5. POLAROID CAROUSEL ("Then" Childhood Section)
  // ==============================================================================
  function initPolaroidCarousel() {
    const track = el('then-track');
    const viewport = el('then-viewport');
    const prevBtn = el('then-prev');
    const nextBtn = el('then-next');
    const dotsContainer = el('then-dots');

    if (!track || !Array.isArray(CONFIG.thenPhotos) || CONFIG.thenPhotos.length === 0) return;

    const totalSlides = CONFIG.thenPhotos.length;
    let currentIndex = 0;

    function updateCarousel() {
      if (BirthdayApp.reducedMotion) return;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
          const isActive = idx === currentIndex;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }
    }

    function goToSlide(idx) {
      currentIndex = (idx + totalSlides) % totalSlides;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.dot');
        if (targetDot && targetDot.dataset.index) {
          goToSlide(parseInt(targetDot.dataset.index, 10));
        }
      });
    }

    // Touch Swipe handling on mobile
    if (viewport) {
      let startX = 0;
      let startY = 0;
      let isSwiping = false;

      viewport.addEventListener(
        'touchstart',
        (e) => {
          const touch = e.touches[0];
          startX = touch.clientX;
          startY = touch.clientY;
          isSwiping = true;
          stopAutoAdvance();
        },
        { passive: true }
      );

      viewport.addEventListener(
        'touchmove',
        (e) => {
          if (!isSwiping) return;
          const touch = e.touches[0];
          const diffX = touch.clientX - startX;
          const diffY = touch.clientY - startY;

          // If mostly horizontal swipe, prevent page jitter
          if (Math.abs(diffX) > Math.abs(diffY)) {
            // horizontal gesture
          }
        },
        { passive: true }
      );

      viewport.addEventListener(
        'touchend',
        (e) => {
          if (!isSwiping) return;
          isSwiping = false;
          const touch = e.changedTouches[0];
          const diffX = touch.clientX - startX;

          if (Math.abs(diffX) > 40) {
            if (diffX < 0) {
              nextSlide();
            } else {
              prevSlide();
            }
          }
          startAutoAdvance();
        },
        { passive: true }
      );

      // Keyboard left/right on viewport
      viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      });
    }

    // Auto-advance every 5 seconds (paused on hover / focus)
    function startAutoAdvance() {
      if (BirthdayApp.reducedMotion) return;
      stopAutoAdvance();
      BirthdayApp.carouselTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoAdvance() {
      if (BirthdayApp.carouselTimer) {
        clearInterval(BirthdayApp.carouselTimer);
        BirthdayApp.carouselTimer = null;
      }
    }

    const container = el('then-gallery');
    if (container) {
      container.addEventListener('mouseenter', stopAutoAdvance);
      container.addEventListener('mouseleave', startAutoAdvance);
      container.addEventListener('focusin', stopAutoAdvance);
      container.addEventListener('focusout', startAutoAdvance);
    }

    if (!BirthdayApp.reducedMotion) {
      startAutoAdvance();
    }
  }

  // ==============================================================================
  // 6. LIGHTBOX ("Now" Gallery Section)
  // ==============================================================================
  function initLightbox() {
    const grid = el('now-grid');
    const lightbox = el('lightbox');
    const closeBtn = el('lightbox-close');
    const prevBtn = el('lightbox-prev');
    const nextBtn = el('lightbox-next');
    const imgEl = el('lightbox-img');
    const captionEl = el('lightbox-caption');
    const counterEl = el('lightbox-counter');
    const backdrop = el('lightbox-backdrop');

    if (!grid || !lightbox || !imgEl) return;

    const photos = Array.isArray(CONFIG.nowPhotos) ? CONFIG.nowPhotos : [];
    if (photos.length === 0) return;

    let currentIndex = 0;

    function renderLightboxPhoto(index) {
      currentIndex = (index + photos.length) % photos.length;
      const photo = photos[currentIndex];

      imgEl.src = photo.src;
      imgEl.alt = photo.alt || `Photo ${currentIndex + 1}`;
      setupImageFallback(imgEl);

      if (captionEl) captionEl.textContent = photo.caption || photo.alt || '';
      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${photos.length}`;

      // Update dialog accessibility label to current photo
      lightbox.setAttribute('aria-label', `Viewing photo ${currentIndex + 1} of ${photos.length}: ${imgEl.alt}`);

      // Handle single-photo scenario
      if (photos.length <= 1) {
        if (prevBtn) {
          prevBtn.disabled = true;
          prevBtn.setAttribute('aria-disabled', 'true');
        }
        if (nextBtn) {
          nextBtn.disabled = true;
          nextBtn.setAttribute('aria-disabled', 'true');
        }
      }
    }

    function openLightbox(index, triggerElement) {
      BirthdayApp.focusedElementBeforeLightbox = triggerElement || document.activeElement;
      renderLightboxPhoto(index);

      lightbox.classList.remove('hidden');
      // Trigger reflow for smooth animation
      void lightbox.offsetWidth;
      lightbox.classList.add('is-open');
      document.body.classList.add('locked-scroll');

      // Focus close button initially
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('locked-scroll');

      setTimeout(() => {
        lightbox.classList.add('hidden');
        if (BirthdayApp.focusedElementBeforeLightbox) {
          BirthdayApp.focusedElementBeforeLightbox.focus();
        }
      }, 300);
    }

    function showPrev() {
      renderLightboxPhoto(currentIndex - 1);
    }

    function showNext() {
      renderLightboxPhoto(currentIndex + 1);
    }

    // Open on gallery card click or Enter/Space
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.now-item');
      if (item && item.dataset.index) {
        openLightbox(parseInt(item.dataset.index, 10), item);
      }
    });

    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.now-item');
        if (item && item.dataset.index) {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.index, 10), item);
        }
      }
    });

    // Control buttons
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Keyboard navigation & Focus trap
    // Strictly cycle interactive controls: [closeBtn, prevBtn, nextBtn]
    const focusableControls = [closeBtn, prevBtn, nextBtn].filter(Boolean);

    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
        return;
      }

      // Trap focus
      if (e.key === 'Tab') {
        const first = focusableControls[0];
        const last = focusableControls[focusableControls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // Mobile touch swipe inside lightbox
    let startX = 0;
    lightbox.addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      'touchend',
      (e) => {
        const diffX = e.changedTouches[0].clientX - startX;
        if (Math.abs(diffX) > 50) {
          if (diffX < 0) {
            showNext();
          } else {
            showPrev();
          }
        }
      },
      { passive: true }
    );
  }

  // ==============================================================================
  // 7. 21 TO 22 NUMBER COUNTER ANIMATION
  // ==============================================================================
  function initYearCounter() {
    const section = el('year-transition');
    const yearTo = el('year-to');
    if (!section || !yearTo) return;

    const startVal = Number(CONFIG.birthday?.previous) || 21;
    const endVal = Number(CONFIG.birthday?.turning) || 22;

    let hasAnimated = false;

    function runCounter() {
      if (hasAnimated) return;
      hasAnimated = true;

      if (BirthdayApp.reducedMotion) {
        yearTo.textContent = String(endVal);
        return;
      }

      const duration = 1400; // ms
      const startTime = performance.now();

      function animateFrame(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(startVal + (endVal - startVal) * easedProgress);

        yearTo.textContent = String(currentVal);

        if (progress < 1) {
          BirthdayApp.counterAnimationId = requestAnimationFrame(animateFrame);
        } else {
          yearTo.textContent = String(endVal);
        }
      }

      BirthdayApp.counterAnimationId = requestAnimationFrame(animateFrame);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
    } else {
      runCounter();
    }
  }

  // ==============================================================================
  // 8. INTERACTIVE BIRTHDAY CAKE & CANDLES
  // ==============================================================================
  function initBirthdayCake() {
    const cakeSection = el('cake');
    const blowBtn = el('blow-btn');
    const wishPrompt = el('wish-prompt');
    const wishMessage = el('wish-message');

    if (!cakeSection) return;

    const candles = cakeSection.querySelectorAll('.candle');
    const totalCandles = candles.length || 6;
    let litCount = totalCandles;
    let revealed = false;

    function checkAllExtinguished() {
      if (litCount <= 0 && !revealed) {
        revealed = true;

        // Celebrate with confetti
        Confetti.burst();

        // Reveal wish prompt and message
        if (wishPrompt) wishPrompt.classList.remove('hidden');

        setTimeout(() => {
          if (wishMessage) wishMessage.classList.remove('hidden');
        }, 700);

        if (blowBtn) {
          blowBtn.disabled = true;
          blowBtn.textContent = 'All candles blown out! 🎂✨';
          blowBtn.classList.remove('pulse-btn');
        }
      }
    }

    function extinguishCandle(candleEl) {
      if (!candleEl.classList.contains('out')) {
        candleEl.classList.add('out');
        candleEl.setAttribute('aria-label', candleEl.getAttribute('aria-label').replace('click to extinguish', 'extinguished'));
        litCount--;
        checkAllExtinguished();
      }
    }

    // Attach click and keyboard handlers to each of the 6 candles
    candles.forEach((candle) => {
      candle.addEventListener('click', () => extinguishCandle(candle));
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          extinguishCandle(candle);
        }
      });
    });

    // "Blow out all candles" master button
    if (blowBtn) {
      blowBtn.addEventListener('click', () => {
        candles.forEach((candle) => extinguishCandle(candle));
      });
    }
  }

  // ==============================================================================
  // 9. "REASONS I LOVE YOU" FLIP CARDS
  // ==============================================================================
  function initFlipCards() {
    const grid = el('love-grid');
    if (!grid) return;

    function toggleCard(card) {
      const isFlipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
    }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.flip-card');
      if (card) toggleCard(card);
    });

    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.flip-card');
        if (card) {
          e.preventDefault();
          toggleCard(card);
        }
      }
    });
  }

  // ==============================================================================
  // 10. GENERAL SCROLL-REVEAL OBSERVER
  // ==============================================================================
  function initScrollReveal() {
    if (BirthdayApp.reducedMotion) {
      document.querySelectorAll('.reveal').forEach((elem) => elem.classList.add('visible'));
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || revealElements.length === 0) {
      revealElements.forEach((elem) => elem.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // ==============================================================================
  // 11. DEDICATED LOVE LETTER STAGGERED REVEAL
  // ==============================================================================
  function initLoveLetterReveal() {
    const letter = el('letter');
    if (!letter) return;

    const lines = letter.querySelectorAll('.letter-line');
    if (lines.length === 0) return;

    if (BirthdayApp.reducedMotion) {
      lines.forEach((line) => line.classList.add('visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      lines.forEach((line) => line.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger line appearance
            lines.forEach((line, idx) => {
              const delay = Math.min(idx * 160, 3600);
              setTimeout(() => {
                line.classList.add('visible');
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(letter);
  }

  // ==============================================================================
  // 12. MUSIC PLAYER TOGGLE (Autoplay & Audio Controls)
  // ==============================================================================
  function initMusicToggle() {
    const toggleBtn = el('music-toggle');
    const labelSpan = el('music-label');
    if (!toggleBtn) return;

    const musicSrc = CONFIG.music?.src || 'audio/birthday-song.mp3';
    let userManuallyPaused = false;

    function setupAudio() {
      if (BirthdayApp.audioInitialized) return BirthdayApp.audioInstance;

      const audio = new Audio(musicSrc);
      audio.loop = true;
      audio.preload = 'auto';

      audio.addEventListener('error', () => {
        console.warn('Birthday site: Audio file could not be loaded or was not provided yet.');
        toggleBtn.disabled = true;
        toggleBtn.setAttribute('aria-disabled', 'true');
        toggleBtn.title = 'No audio file added yet in audio/';
        if (labelSpan) labelSpan.textContent = 'No music file';
      });

      audio.addEventListener('play', () => {
        toggleBtn.setAttribute('aria-pressed', 'true');
        toggleBtn.setAttribute('aria-label', 'Pause background music');
        if (labelSpan) labelSpan.textContent = 'Pause music';
      });

      audio.addEventListener('pause', () => {
        toggleBtn.setAttribute('aria-pressed', 'false');
        toggleBtn.setAttribute('aria-label', 'Play background music');
        if (labelSpan) labelSpan.textContent = 'Play music';
      });

      BirthdayApp.audioInstance = audio;
      BirthdayApp.audioInitialized = true;
      return audio;
    }

    function playMusic() {
      if (userManuallyPaused) return;
      const audio = setupAudio();
      if (!audio) return;

      if (audio.paused) {
        audio.play().then(() => {
          removeAutoplayListeners();
        }).catch((err) => {
          // Autoplay blocked by browser waiting for user gesture.
          // Event listeners will trigger playback on first user interaction.
        });
      }
    }

    BirthdayApp.playMusic = playMusic;

    // Autoplay fallback: catch the very first user interaction anywhere on the page
    const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];

    function onFirstUserGesture() {
      playMusic();
    }

    function removeAutoplayListeners() {
      gestureEvents.forEach((evt) => {
        document.removeEventListener(evt, onFirstUserGesture, true);
      });
    }

    gestureEvents.forEach((evt) => {
      document.addEventListener(evt, onFirstUserGesture, { capture: true, passive: true });
    });

    // Attempt direct autoplay immediately on page load
    playMusic();

    toggleBtn.addEventListener('click', (e) => {
      // Stop propagation so document capture listener does not immediately resume
      e.stopPropagation();

      const audio = setupAudio();
      if (!audio) return;

      if (audio.paused) {
        userManuallyPaused = false;
        playMusic();
      } else {
        userManuallyPaused = true;
        audio.pause();
      }
    });
  }

  // ==============================================================================
  // 13. FOOTER REPLAY SURPRISE BUTTON
  // ==============================================================================
  function initFooterReplay() {
    const replayBtn = el('replay-btn');
    if (!replayBtn) return;

    replayBtn.addEventListener('click', () => {
      Confetti.burst();
    });
  }

  // ==============================================================================
  // 15. PREFERS-REDUCED-MOTION RUNTIME LISTENER
  // ==============================================================================
  function initReducedMotionListener() {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', (e) => {
        BirthdayApp.reducedMotion = e.matches;

        if (e.matches) {
          // Clear any active auto-advance timers
          if (BirthdayApp.carouselTimer) {
            clearInterval(BirthdayApp.carouselTimer);
            BirthdayApp.carouselTimer = null;
          }

          // Cancel in-flight requestAnimationFrame
          if (BirthdayApp.counterAnimationId) {
            cancelAnimationFrame(BirthdayApp.counterAnimationId);
            BirthdayApp.counterAnimationId = null;
          }

          // Make all reveal and letter line elements visible immediately
          document.querySelectorAll('.reveal, .letter-line').forEach((elem) => {
            elem.classList.add('visible');
          });

          // Ensure counter displays final target number
          const yearTo = el('year-to');
          if (yearTo) yearTo.textContent = String(CONFIG.birthday?.turning || 22);
        }
      });
    } catch (err) {
      // Legacy browser without addEventListener on matchMedia
    }
  }

  // ==============================================================================
  // GLOBAL INITIALIZATION & ERROR CONTAINMENT
  // ==============================================================================
  function init() {
    const modules = [
      { name: 'DOM Population', fn: initDOMPopulation },
      { name: 'Music Toggle', fn: initMusicToggle },
      { name: 'Welcome Screen', fn: initWelcomeScreen },
      { name: 'Floating Nav', fn: initFloatingNav },
      { name: 'Hero Typing', fn: initHeroTyping },
      { name: 'Polaroid Carousel', fn: initPolaroidCarousel },
      { name: 'Lightbox', fn: initLightbox },
      { name: 'Year Counter', fn: initYearCounter },
      { name: 'Birthday Cake', fn: initBirthdayCake },
      { name: 'Flip Cards', fn: initFlipCards },
      { name: 'Scroll Reveal', fn: initScrollReveal },
      { name: 'Love Letter', fn: initLoveLetterReveal },
      { name: 'Footer Replay', fn: initFooterReplay },
      { name: 'Reduced Motion Listener', fn: initReducedMotionListener },
    ];

    modules.forEach(({ name, fn }) => {
      try {
        fn();
      } catch (err) {
        // Enforce robustness requirement NFR-2: no uncaught exception escapes init()
        console.warn(`Birthday site: Module '${name}' encountered an error:`, err);
      }
    });
  }

  // Attach to DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
