document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', hidePreloader);
    // Fallback: hide preloader after max 3.5s anyway
    setTimeout(hidePreloader, 3500);
  }

  function hidePreloader() {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        preloader.classList.add('loaded');
      }, 600);
    }
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('a:not(.lang-opt)').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleMenu();
      });
    });
  }

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number, .about-badge .number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => counterObserver.observe(el));

  // ===== DYNAMIC BORDER GLOW =====
  const glowCards = document.querySelectorAll('.service-card, .why-card, .contact-card, .contact-form, .about-feature');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // ===== LANGUAGE SELECTOR =====
  const langBtn = document.getElementById('langBtn');
  const langSelector = document.querySelector('.lang-selector');
  const langOpts = document.querySelectorAll('.lang-opt');

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelector.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      langSelector.classList.remove('open');
    });
  }

  // Translation Dictionaries
  const translations = {
    tr: {
      navHome: "Ana Sayfa",
      navAbout: "Hakkımızda",
      navServices: "Hizmetler",
      navProjects: "Projeler",
      navWhyUs: "Neden Biz",
      navContact: "İletişim",
      badgeLoc: "Türkiye Geneli",
      heroTitle: 'Yapılarınıza <span class="highlight">Değer Katan</span> Çözümler',
      heroDesc: "Dış cephe kaplama, cam işleme ve kaynak alanında uzman ekibimizle projelerinize profesyonel dokunuş katıyoruz.",
      btnCall: "Hemen Arayın",
      btnProj: "Projelerimiz",
      statExp: "Yıllık Deneyim",
      statDone: "Tamamlanan Proje",
      statSat: "Müşteri Memnuniyeti",
      aboutTitle: 'Güvenilir <span class="accent">Yapı Ortağınız</span>',
      aboutDesc1: "Aslan Yapı, alüminyum cephe sistemleri, kompozit cephe kaplama, cam cephe, silikon cephe, alüminyum doğrama, otomatik kapı ve dış cephe çözümleri alanında profesyonel hizmet sunmaktadır. Konut, villa, fabrika, iş merkezi ve ticari projelerde kaliteli malzeme, uzman işçilik ve zamanında teslimat anlayışıyla çalışıyoruz.",
      aboutDesc2: "Modern mimariye uygun, estetik, dayanıklı ve uzun ömürlü alüminyum sistemleriyle projelerinize değer katıyor, keşiften montaja kadar güvenilir çözümler üretiyoruz.",
      f1: "Uzman Kadro", f2: "Hızlı Teslimat", f3: "Garanti", f4: "Kaliteli Malzeme",
      servTitle: 'Profesyonel <span class="accent">Çözümler</span>',
      servDesc: "Her türlü yapı projeniz için kapsamlı hizmetler sunuyoruz.",
      projTitle: 'Tamamlanan <span class="accent">İşlerimiz</span>',
      projDesc: "Gerçekleştirdiğimiz projelerden bazıları.",
      whyTitle: 'Bizi <span class="accent">Tercih Edin</span>',
      whyDesc: "Müşterilerimizin bizi tercih etme sebepleri.",
      contactTitle: 'Bize <span class="accent">Ulaşın</span>',
      contactDesc: "Projeleriniz için bizimle iletişime geçin.",
      formName: "Adınız Soyadınız",
      formPhone: "Telefon",
      formSubject: "Konu",
      formMsg: "Mesajınız",
      formSubmit: "WhatsApp ile Gönder",
      modalTitle: "Mesajınız Alındı!",
      modalDesc: "Talebiniz başarıyla kaydedildi. Detayları görüşmek üzere WhatsApp hattımıza yönlendiriliyorsunuz...",
      showMore: "Daha Fazla Göster",
      showLess: "Daha Az Göster",
      heroPromoBadge: "⚡ Hızlı & Profesyonel Fiyat Teklifi!",
      heroSubtext: "* Türkiye genelinde profesyonel hizmet sunulmaktadır."
    },
    en: {
      navHome: "Home",
      navAbout: "About Us",
      navServices: "Services",
      navProjects: "Projects",
      navWhyUs: "Why Us",
      navContact: "Contact",
      badgeLoc: "Turkey Wide",
      heroTitle: 'Solutions Adding <span class="highlight">Value</span> To Structures',
      heroDesc: "We bring professional touch to your projects with our expert team in facade cladding, glass processing, and welding.",
      btnCall: "Call Now",
      btnProj: "Our Projects",
      statExp: "Years Experience",
      statDone: "Completed Projects",
      statSat: "Client Satisfaction",
      aboutTitle: 'Your Reliable <span class="accent">Construction Partner</span>',
      aboutDesc1: "Aslan Yapi provides professional services in aluminum facade systems, composite cladding, glass facades, silicone facades, aluminum joinery, automatic doors, and exterior solutions. We work with high-quality materials, expert craftsmanship, and timely delivery in residential, villa, factory, business center, and commercial projects.",
      aboutDesc2: "We add value to your projects with aesthetic, durable, and long-lasting aluminum systems suitable for modern architecture, offering reliable solutions from site survey to installation.",
      f1: "Expert Team", f2: "Fast Delivery", f3: "Warranty", f4: "Quality Materials",
      servTitle: 'Professional <span class="accent">Solutions</span>',
      servDesc: "We offer comprehensive services for all kinds of construction projects.",
      projTitle: 'Completed <span class="accent">Works</span>',
      projDesc: "Some of the premium projects we have accomplished.",
      whyTitle: 'Why <span class="accent">Choose Us</span>',
      whyDesc: "Key reasons why our clients prefer working with us.",
      contactTitle: 'Get In <span class="accent">Touch</span>',
      contactDesc: "Contact us today to discuss your next construction project.",
      formName: "Full Name",
      formPhone: "Phone",
      formSubject: "Subject",
      formMsg: "Your Message",
      formSubmit: "Submit via WhatsApp",
      modalTitle: "Message Received!",
      modalDesc: "Your request was successfully saved. You are being redirected to our WhatsApp line for further details...",
      showMore: "Show More",
      showLess: "Show Less",
      heroPromoBadge: "⚡ Fast & Professional Quote!",
      heroSubtext: "* Professional facade services across Turkey."
    }
  };

  langOpts.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      langOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const lang = opt.dataset.lang;
      
      // Update Lang Button text
      langBtn.innerHTML = `${lang.toUpperCase()} ${lang === 'tr' ? '🇹🇷' : '🇬🇧'} <span class="chevron">▼</span>`;

      // Apply translations to elements
      document.querySelector('.nav-links a[href="#anasayfa"]').textContent = translations[lang].navHome;
      document.querySelector('.nav-links a[href="#hakkimizda"]').textContent = translations[lang].navAbout;
      document.querySelector('.nav-links a[href="#hizmetler"]').textContent = translations[lang].navServices;
      document.querySelector('.nav-links a[href="#projeler"]').textContent = translations[lang].navProjects;
      document.querySelector('.nav-links a[href="#neden-biz"]').textContent = translations[lang].navWhyUs;
      document.querySelector('.nav-links a[href="#iletisim"]').textContent = translations[lang].navContact;

      document.querySelector('.hero-badge').textContent = translations[lang].badgeLoc;
      document.getElementById('heroPromoBadge').textContent = translations[lang].heroPromoBadge;
      document.getElementById('heroSubtext').textContent = translations[lang].heroSubtext;
      document.querySelector('.hero h1').innerHTML = translations[lang].heroTitle;
      document.querySelector('.hero p').textContent = translations[lang].heroDesc;
      document.querySelector('.hero-buttons .btn-primary').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${translations[lang].btnCall}
      `;
      document.querySelector('.hero-buttons .btn-outline').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        ${translations[lang].btnProj}
      `;

      const stats = document.querySelectorAll('.hero-stats .stat');
      stats[0].querySelector('.stat-label').textContent = translations[lang].statExp;
      stats[1].querySelector('.stat-label').textContent = translations[lang].statDone;
      stats[2].querySelector('.stat-label').textContent = translations[lang].statSat;

      document.querySelector('#hakkimizda .section-title').innerHTML = translations[lang].aboutTitle;
      const aboutParagraphs = document.querySelectorAll('#hakkimizda .about-text p');
      aboutParagraphs[0].textContent = translations[lang].aboutDesc1;
      aboutParagraphs[1].textContent = translations[lang].aboutDesc2;

      const aboutFeats = document.querySelectorAll('#hakkimizda .about-feature span');
      aboutFeats[0].textContent = translations[lang].f1;
      aboutFeats[1].textContent = translations[lang].f2;
      aboutFeats[2].textContent = translations[lang].f3;
      aboutFeats[3].textContent = translations[lang].f4;

      document.querySelector('#hizmetler .section-title').innerHTML = translations[lang].servTitle;
      document.querySelector('#hizmetler .section-desc').textContent = translations[lang].servDesc;

      document.querySelector('#projeler .section-title').innerHTML = translations[lang].projTitle;
      document.querySelector('#projeler .section-desc').textContent = translations[lang].projDesc;

      document.querySelector('#neden-biz .section-title').innerHTML = translations[lang].whyTitle;
      document.querySelector('#neden-biz .section-desc').textContent = translations[lang].whyDesc;

      document.querySelector('#iletisim .section-title').innerHTML = translations[lang].contactTitle;
      document.querySelector('#iletisim .section-desc').textContent = translations[lang].contactDesc;

      const labels = document.querySelectorAll('#contactForm label');
      labels[0].textContent = translations[lang].formName;
      labels[1].textContent = translations[lang].formPhone;
      labels[2].textContent = translations[lang].formSubject;
      labels[3].textContent = translations[lang].formMsg;
      document.querySelector('#contactForm .btn-submit').textContent = translations[lang].formSubmit;

      document.getElementById('modalTitle').textContent = translations[lang].modalTitle;
      document.getElementById('modalDesc').textContent = translations[lang].modalDesc;

      const showMoreBtn = document.getElementById('showMoreBtn');
      if (showMoreBtn) {
        const isExpanded = showMoreBtn.dataset.expanded === "true";
        showMoreBtn.textContent = isExpanded ? translations[lang].showLess : translations[lang].showMore;
      }

      // Filter button translations
      const filterTranslations = {
        tr: {
          all: "Tümü",
          'kis-bahcesi': "Kış Bahçesi",
          pergola: "Bioklimatik Pergola",
          giyotin: "Giyotin Cam",
          cephe: "Dış Cephe",
          cam: "Cam İşleme",
          kaynak: "Kaynak"
        },
        en: {
          all: "All",
          'kis-bahcesi': "Winter Garden",
          pergola: "Bioclimatic Pergola",
          giyotin: "Guillotine Glass",
          cephe: "Facade Cladding",
          cam: "Glass Processing",
          kaynak: "Welding"
        }
      };
      document.querySelectorAll('.filter-btn').forEach(btn => {
        const filterKey = btn.dataset.filter;
        if (filterTranslations[lang] && filterTranslations[lang][filterKey]) {
          btn.textContent = filterTranslations[lang][filterKey];
        }
      });
    });
  });

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== PROJECT FILTERS & SHOW MORE =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const showMoreContainer = document.querySelector('.show-more-container');
  const itemsToShowInitially = 6;
  let currentLanguage = 'tr'; // Default

  // Determine current active language based on langBtn status
  function getActiveLang() {
    const activeOpt = document.querySelector('.lang-opt.active');
    return activeOpt ? activeOpt.dataset.lang : 'tr';
  }

  function updateProjectsVisibility(filter, isExpanded) {
    let visibleCount = 0;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        if (filter === 'all' && !isExpanded) {
          if (visibleCount < itemsToShowInitially) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
          visibleCount++;
        } else {
          // Show all matches for specific filters or if expanded
          card.style.display = '';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        }
      } else {
        card.style.display = 'none';
      }
    });

    // Handle button container visibility
    if (filter === 'all') {
      if (showMoreContainer) showMoreContainer.style.display = '';
      if (showMoreBtn) {
        showMoreBtn.dataset.expanded = isExpanded ? "true" : "false";
        const lang = getActiveLang();
        showMoreBtn.textContent = isExpanded ? translations[lang].showLess : translations[lang].showMore;
      }
    } else {
      if (showMoreContainer) showMoreContainer.style.display = 'none';
    }
  }

  // Init
  updateProjectsVisibility('all', false);

  // Filter Buttons click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      updateProjectsVisibility(filter, false);
    });
  });

  // Show More Button click handler
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const isExpanded = showMoreBtn.dataset.expanded === "true";
      const activeFilterBtn = document.querySelector('.filter-btn.active');
      const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
      
      updateProjectsVisibility(activeFilter, !isExpanded);

      // If collapsing, scroll smoothly back to the top of the projects section
      if (isExpanded) {
        const projSection = document.getElementById('projeler');
        if (projSection) {
          projSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ===== PROJECT DETAILS MODAL =====
  const projectModal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = projectModal.querySelector('.modal-close');
  const modalBackdrop = projectModal.querySelector('.modal-backdrop');
  const modalPrev = projectModal.querySelector('.modal-nav.modal-prev');
  const modalNext = projectModal.querySelector('.modal-nav.modal-next');
  
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const specLocation = document.getElementById('specLocation');
  const specMaterial = document.getElementById('specMaterial');
  const specDuration = document.getElementById('specDuration');
  const modalCta = document.getElementById('modalCta');
  
  let currentIndex = 0;

  // Rich metadata for all 21 project cards
  const projectDetailsData = {
    tr: [
      {
        desc: "Villa ve konut projeleri için özel tasarlanan, dikey ısıcamlı ve motorlu gölgelendirmeli ısı yalıtımlı kış bahçesi sistemi.",
        loc: "Çekmeköy / İstanbul", mat: "Isı Yalıtımlı Alüminyum & Şişecam Isıcam", dur: "14 Gün"
      },
      {
        desc: "Otomatik açılır-kapanır alüminyum lamel yapısı, entegre gizli su tahliye kanalları ve LED aydınlatmalı lüks bioklimatik pergola montajı.",
        loc: "Göktürk / İstanbul", mat: "Ekstrüzyon Alüminyum & Somfy Motor", dur: "10 Gün"
      },
      {
        desc: "Teras ve restoran alanları için uzaktan kumandalı, dikey hareket eden 3 panelli ısıcamlı motorlu giyotin cam sistemi.",
        loc: "Moda / İstanbul", mat: "8mm Temperli Cam & Triger Kayışlı Motor", dur: "7 Gün"
      },
      {
        desc: "İstanbul'da lüks bir konut projesi için tasarlanan modern dış cephe. Kompozit kaplama ve ısı yalıtım sistemleri kullanılmıştır.",
        loc: "İstanbul", mat: "ASAŞ Alüminyum & Kompozit", dur: "15 Gün"
      },
      {
        desc: "Ataşehir Finans Merkezi yakınlarındaki ticari ofis binası için yapısal silikonlu cam cephe ve yalıtımlı cam montajı.",
        loc: "Ataşehir / İstanbul", mat: "Şişecam Temperli & Schüco Profil", dur: "25 Gün"
      },
      {
        desc: "Pendik sanayi bölgesinde yer alan fabrika binası için dayanıklı çelik konstrüksiyon konstrüksiyon imalatı ve kaynak işleri.",
        loc: "Pendik / İstanbul", mat: "Çelik Profil & Paslanmaz Kaynak", dur: "20 Gün"
      },
      {
        desc: "Lüks villa projesinde modern mimariye uygun geniş açıklıklı alüminyum sürme doğrama ve yalıtımlı cam uygulaması.",
        loc: "Beykoz / İstanbul", mat: "Reynaers Alüminyum & Lamine Cam", dur: "12 Gün"
      },
      {
        desc: "Kartal sahilinde inşa edilen çok katlı residans projesinde rüzgar yüküne dayanıklı kasetli giydirme cephe.",
        loc: "Kartal / İstanbul", mat: "Saray Alüminyum & Isıcam Sinerji", dur: "30 Gün"
      },
      {
        desc: "Kadıköy'deki ticari mağaza için paslanmaz çelik konstrüksiyon taşıyıcılı spider cam cephe ve kanopi sistemi.",
        loc: "Kadıköy / İstanbul", mat: "Paslanmaz Çelik & 12mm Temperli Cam", dur: "10 Gün"
      },
      {
        desc: "Ümraniye iş merkezinde iç mekanlar için şık ve akustik yalıtımlı temperli cam bölme duvar tasarımı.",
        loc: "Ümraniye / İstanbul", mat: "Temperli Akustik Cam & Siyah Profil", dur: "8 Gün"
      },
      {
        desc: "Maltepe konut projesinde estetik ve güvenliği bir araya getiren paslanmaz çelik korkuluk ve lamine cam montajı.",
        loc: "Maltepe / İstanbul", mat: "Paslanmaz Profil & Lamine Cam", dur: "7 Gün"
      },
      {
        desc: "Tuzla'daki lojistik depo projesi için yüksek mukavemetli çelik konstrüksiyon çatı ve cephe aşıkları kaynak montajı.",
        loc: "Tuzla / İstanbul", mat: "St37 Çelik & Ağır Sanayi Kaynağı", dur: "18 Gün"
      },
      {
        desc: "Şişli'de yer alan iş merkezi için modern kompozit panel kaplama ve dekoratif alüminyum lameller.",
        loc: "Şişli / İstanbul", mat: "ASAŞ Alüminyum & Alüminyum Profil", dur: "22 Gün"
      },
      {
        desc: "Kartal'da özel bir konut projesi için ses ve ısı yalıtımı yüksek konfor camlı alüminyum cephe giydirme.",
        loc: "Kartal / İstanbul", mat: "Şişecam Konfor & Yalıtımlı Profil", dur: "14 Gün"
      },
      {
        desc: "Sarıyer'de modern villa projesinde corten çelik görünümlü kompozit dış cephe kaplama işçiliği.",
        loc: "Sarıyer / İstanbul", mat: "Özel Dokulu Kompozit Panel", dur: "16 Gün"
      },
      {
        desc: "Ataşehir rezidans projesinde endüstriyel tasarıma sahip antrasit gri kompozit kaplama ve cephe giydirme.",
        loc: "Ataşehir / İstanbul", mat: "Alüminyum Kompozit & Lineer Profil", dur: "19 Gün"
      },
      {
        desc: "Üsküdar'da panoramik boğaz manzaralı villa için minimal profilli ısı yalıtımlı cam balkon sistemi.",
        loc: "Üsküdar / İstanbul", mat: "Albert Genau Profil & Temperli Cam", dur: "9 Gün"
      },
      {
        desc: "Pendik'te yer alan bir villa projesinde paslanmaz corten görünümlü kompozit cephe ve gizli aydınlatma entegrasyonu.",
        loc: "Pendik / İstanbul", mat: "Kompozit & Akrilik Dış Cephe Boyası", dur: "13 Gün"
      },
      {
        desc: "İstanbul'daki üretim tesisimiz için ağır yük taşıyıcı çelik konstrüksiyon platform imalatı.",
        loc: "İstanbul", mat: "Ağır Sanayi Çeliği & Gazaltı Kaynağı", dur: "11 Gün"
      },
      {
        desc: "Tuzla'da yeni inşa edilen müstakil villa için modern antrasit kompozit dış cephe kaplaması.",
        loc: "Tuzla / İstanbul", mat: "Premium Alüminyum Kompozit", dur: "15 Gün"
      },
      {
        desc: "Kadıköy'de kentsel dönüşüm kapsamında yenilenen bina için dekoratif ahşap desenli kompozit kaplama.",
        loc: "Kadıköy / İstanbul", mat: "Ahşap Desenli Kompozit Panel", dur: "17 Gün"
      }
    ],
    en: [
      {
        desc: "Thermally insulated winter garden system designed with vertical double-glazing and motorized shading for villa and residential projects.",
        loc: "Cekmekoy / Istanbul", mat: "Thermally Insulated Aluminum & Sisecam Insulated Glass", dur: "14 Days"
      },
      {
        desc: "Luxury bioclimatic pergola installation with automated adjustable aluminum louvers, integrated hidden drainage channels, and dimmable LED lighting.",
        loc: "Gokturk / Istanbul", mat: "Extruded Aluminum & Somfy Motor", dur: "10 Days"
      },
      {
        desc: "Remote-controlled 3-panel motorized vertical sliding guillotine glass system with double glazing for terrace and restaurant spaces.",
        loc: "Moda / Istanbul", mat: "8mm Tempered Glass & Timing Belt Motor", dur: "7 Days"
      },
      {
        desc: "Modern facade designed for a luxury residential project in Istanbul. Composite cladding and thermal insulation systems were used.",
        loc: "Istanbul", mat: "ASAS Aluminum & Composite", dur: "15 Days"
      },
      {
        desc: "Structural silicon glass facade and insulated glass installation for a commercial office building near Atasehir Finance Center.",
        loc: "Atasehir / Istanbul", mat: "Sisecam Tempered & Schuco Profile", dur: "25 Days"
      },
      {
        desc: "Durable steel structure fabrication and welding works for a factory building located in Pendik industrial zone.",
        loc: "Pendik / Istanbul", mat: "Steel Profile & Stainless Welding", dur: "20 Days"
      },
      {
        desc: "Large-span aluminum sliding joinery and insulated glass application suitable for modern architecture in a luxury villa project.",
        loc: "Beykoz / Istanbul", mat: "Reynaers Aluminum & Laminated Glass", dur: "12 Days"
      },
      {
        desc: "Wind-load resistant unitized curtain walling in a multi-story residence project constructed on Kartal coast.",
        loc: "Kartal / Istanbul", mat: "Saray Aluminum & Isicam Synergy", dur: "30 Days"
      },
      {
        desc: "Spider glass facade and canopy system with stainless steel structural support for a commercial store in Kadikoy.",
        loc: "Kadikoy / Istanbul", mat: "Stainless Steel & 12mm Tempered Glass", dur: "10 Days"
      },
      {
        desc: "Sleek and acoustically insulated tempered glass partition wall design for indoor workspaces in Umraniye business center.",
        loc: "Umraniye / Istanbul", mat: "Tempered Acoustic Glass & Black Profile", dur: "8 Days"
      },
      {
        desc: "Stainless steel handrails and laminated glass installation combining aesthetics and safety in Maltepe residential project.",
        loc: "Maltepe / Istanbul", mat: "Stainless Profile & Laminated Glass", dur: "7 Days"
      },
      {
        desc: "Welded assembly of high-strength steel structure roof and facade purlins for logistics warehouse project in Tuzla.",
        loc: "Tuzla / Istanbul", mat: "St37 Steel & Heavy Industrial Welding", dur: "18 Days"
      },
      {
        desc: "Modern composite panel cladding and decorative aluminum louvers for a business center located in Sisli.",
        loc: "Sisli / Istanbul", mat: "ASAS Aluminum & Aluminum Profile", dur: "22 Days"
      },
      {
        desc: "Acoustic and thermal insulation high-performance glass aluminum curtain wall for a private residence project in Kartal.",
        loc: "Kartal / Istanbul", mat: "Sisecam Comfort & Insulated Profile", dur: "14 Days"
      },
      {
        desc: "Corten steel look composite exterior cladding craftsmanship in a modern villa project in Sariyer.",
        loc: "Sariyer / Istanbul", mat: "Custom Textured Composite Panel", dur: "16 Days"
      },
      {
        desc: "Anthracite gray composite cladding and facade design with industrial style in Atasehir residence project.",
        loc: "Atasehir / Istanbul", mat: "Aluminum Composite & Linear Profile", dur: "19 Days"
      },
      {
        desc: "Thermally insulated minimal profile glass balcony system for a villa with panoramic Bosphorus views in Uskudar.",
        loc: "Uskudar / Istanbul", mat: "Albert Genau Profile & Tempered Glass", dur: "9 Days"
      },
      {
        desc: "Stainless corten-looking composite facade and hidden lighting integration in a villa project in Pendik.",
        loc: "Pendik / Istanbul", mat: "Composite & Acrylic Facade Paint", dur: "13 Days"
      },
      {
        desc: "Heavy load-bearing steel structure platform fabrication for our production facility in Istanbul.",
        loc: "Istanbul", mat: "Heavy Industry Steel & MIG/MAG Welding", dur: "11 Days"
      },
      {
        desc: "Modern anthracite composite exterior cladding for a newly constructed detached villa in Tuzla.",
        loc: "Tuzla / Istanbul", mat: "Premium Aluminum Composite", dur: "15 Days"
      },
      {
        desc: "Decorative wooden patterned composite cladding for a building renewed under urban transformation in Kadikoy.",
        loc: "Kadikoy / Istanbul", mat: "Wood Patterned Composite Panel", dur: "17 Days"
      }
    ]
  };

  const projectImages = Array.from(projectCards).map(card => card.querySelector('img').src);
  const projectTitles = Array.from(projectCards).map(card => card.querySelector('h4').textContent);
  const projectCategories = Array.from(projectCards).map(card => card.querySelector('span').textContent);

  projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openModalAtIndex(index);
    });
  });

  function openModalAtIndex(index) {
    currentIndex = index;
    const lang = getActiveLang();
    const data = projectDetailsData[lang][currentIndex] || projectDetailsData['tr'][currentIndex];
    
    modalImg.src = projectImages[currentIndex];
    modalTitle.textContent = projectTitles[currentIndex];
    modalCategory.textContent = projectCategories[currentIndex];
    modalDescription.textContent = data.desc;
    
    specLocation.textContent = data.loc;
    specMaterial.textContent = data.mat;
    specDuration.textContent = data.dur;

    // Direct WhatsApp Cta link
    const whatsappMsg = encodeURIComponent(
      lang === 'tr' 
        ? `Merhaba, web sitenizdeki "${projectTitles[currentIndex]}" projeniz hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.`
        : `Hello, I would like to get information and a quote about your project "${projectTitles[currentIndex]}" listed on your website.`
    );
    modalCta.href = `https://wa.me/905344261298?text=${whatsappMsg}`;
    
    // Label translations for CTA & Specs
    const ctaText = lang === 'tr' ? 'Bu Proje İçin Fiyat Al' : 'Get a Quote for this Project';
    modalCta.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      ${ctaText}
    `;

    // Dynamic spec titles translation
    const specLabels = projectModal.querySelectorAll('.spec-label');
    if (lang === 'tr') {
      specLabels[0].textContent = '📍 Konum:';
      specLabels[1].textContent = '🧱 Malzeme:';
      specLabels[2].textContent = '⏱️ Süre:';
    } else {
      specLabels[0].textContent = '📍 Location:';
      specLabels[1].textContent = '🧱 Material:';
      specLabels[2].textContent = '⏱️ Duration:';
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    openModalAtIndex(currentIndex);
  });
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % projectImages.length;
    openModalAtIndex(currentIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (!projectModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
  });

  // ===== HERO PARTICLES =====
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 100 + 30;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${6 + Math.random() * 6}s;
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ===== CONTACT FORM & SUCCESS MODAL =====
  const form = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (form && successModal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const phone = form.querySelector('#phone').value;
      const message = form.querySelector('#message').value;
      const whatsappMsg = encodeURIComponent(
        `Merhaba, ben ${name}. ${message} (Tel: ${phone})`
      );

      // Trigger Success Modal
      successModal.classList.add('active');

      // Auto redirect to WhatsApp after 2.5 seconds
      setTimeout(() => {
        window.open(`https://wa.me/905344261298?text=${whatsappMsg}`, '_blank');
        successModal.classList.remove('active');
        form.reset();
      }, 2500);
    });

    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // ===== BACK TO TOP =====
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== FADE IN KEYFRAME =====
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`;
  document.head.appendChild(style);
});
