// Lógica para el menú móvil del header

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const closeMobileMenu = document.getElementById('close-mobile-menu');

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenuOverlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', openMenu);
  }
  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMenu);
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMenu);
  }
});
