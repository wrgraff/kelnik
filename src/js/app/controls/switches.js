findSwitches('.favorite-button');

function findSwitches(selector) {
    const switches = document.querySelectorAll(selector);
    switches.forEach((switchButton) => {
        listenSwitch(switchButton);
    });
};

function listenSwitch(switchButton) {
    switchButton.addEventListener('click', (e) => {
        let pressed = e.target.getAttribute('aria-checked') === 'true';
        e.target.setAttribute('aria-checked', String(!pressed));
        e.target.setAttribute('aria-label', pressed ? 'Добавить в избранное' : 'Удалить из избранного');
        showAlert(pressed ? 'Квартира удалена из избранного' : 'Квартира добавлена в избранное');
    });
};
