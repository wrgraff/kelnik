const MenuButton = document.querySelector('.menu-button'),
      Menu = document.querySelector('.menu');

MenuButton.addEventListener('click', () => {
    MenuButton.classList.toggle('menu-button_active');
    Menu.classList.toggle('menu_opened');
});
