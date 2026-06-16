(function () {
  'use strict';

  // Carousel
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = Array.from(track.querySelectorAll('.carousel__slide'));
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');
    var dotsContainer = carousel.querySelector('.carousel__dots');
    var current = 0;
    var autoplay = carousel.classList.contains('carousel--certs') || carousel.classList.contains('carousel--testimonials');
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
      dotsContainer.appendChild(dot);
    });

    var dots = Array.from(dotsContainer.querySelectorAll('.carousel__dot'));

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    function resetAutoplay() {
      if (!autoplay) return;
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAutoplay(); });

    if (autoplay) resetAutoplay();
  });

  // Calculator
  var providerSelect = document.getElementById('calc-provider');
  var volumeInput = document.getElementById('calc-volume');
  var volumeLabel = document.getElementById('calc-volume-label');
  var currentLabel = document.getElementById('calc-current-label');
  var currentEl = document.getElementById('calc-current');
  var currentYearEl = document.getElementById('calc-current-year');
  var bioEl = document.getElementById('calc-bio');
  var bioYearEl = document.getElementById('calc-bio-year');
  var savingsEl = document.getElementById('calc-savings');
  var savingsYearEl = document.getElementById('calc-savings-year');

  var providerNames = {
    '1.20': 'Sumsub',
    '1.50': 'Veriff',
    '1.30': 'Onfido',
    '1.00': 'Другой'
  };

  var BIO_PRICE = 0.33;
  var FREE_MONTHLY = 500;

  function formatMoney(n) {
    return '$' + Math.round(n).toLocaleString('ru-RU');
  }

  function updateCalculator() {
    if (!providerSelect) return;

    var price = parseFloat(providerSelect.value);
    var volume = parseInt(volumeInput.value, 10);
    var providerName = providerNames[providerSelect.value] || 'Провайдер';

    volumeLabel.textContent = volume.toLocaleString('ru-RU');
    currentLabel.textContent = 'Сейчас (' + providerName + ')';

    var currentMonthly = price * volume;
    var billable = Math.max(0, volume - FREE_MONTHLY);
    var bioMonthly = billable * BIO_PRICE;
    var savingsMonthly = currentMonthly - bioMonthly;

    currentEl.textContent = formatMoney(currentMonthly) + ' / мес';
    currentYearEl.textContent = formatMoney(currentMonthly * 12) + ' / год';
    bioEl.textContent = formatMoney(bioMonthly) + ' / мес';
    bioYearEl.textContent = formatMoney(bioMonthly * 12) + ' / год';
    savingsEl.textContent = formatMoney(savingsMonthly) + ' / мес';
    savingsYearEl.textContent = formatMoney(savingsMonthly * 12) + ' / год';
  }

  if (providerSelect) {
    providerSelect.addEventListener('change', updateCalculator);
    volumeInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // Cert modal
  var modal = document.getElementById('cert-modal');

  document.querySelectorAll('.cert-open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var certImg = document.getElementById('cert-modal-img');
      var certName = document.getElementById('cert-modal-name');
      certName.textContent = btn.dataset.cert;
      if (btn.dataset.certImage) {
        certImg.src = btn.dataset.certImage;
        certImg.alt = btn.dataset.cert;
        certImg.style.display = 'block';
      } else {
        certImg.src = '';
        certImg.style.display = 'none';
      }
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  if (modal) {
    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  // Register form
  var form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value;
      alert('Спасибо! На ' + email + ' отправлена ссылка для активации аккаунта.\n\n(Демо-форма — реальная отправка не настроена.)');
    });
  }
})();
