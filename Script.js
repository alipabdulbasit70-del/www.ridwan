// script.js
document.addEventListener('DOMContentLoaded', function () {
  // tampilkan tahun di footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lightbox
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');

  function openLightbox(src, caption) {
    lbImage.src = src;
    lbImage.alt = caption || 'Gambar besar';
    lbCaption.textContent = caption || '';
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    lbCaption.textContent = '';
    document.body.style.overflow = '';
  }

  galleryImgs.forEach(img => {
    img.addEventListener('click', function () {
      const full = img.dataset.full || img.src;
      const cap = img.alt || img.nextElementSibling?.textContent || '';
      openLightbox(full, cap);
    });
  });

  // close button
  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  // click outside image to close
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // esc key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  // Smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});