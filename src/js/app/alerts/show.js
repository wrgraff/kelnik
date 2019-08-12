function showAlert(text) {
    var alertWindow = addElement('div', 'alert');

    var alertText = addElement('div', 'alert__text');
    alertText.innerHTML = text;

    var alertActions = addElement('div', 'alert__actions');

    alertWindow.append(alertText);
    alertWindow.append(alertActions);
    document.body.append(alertWindow);
    setTimeout(function() {
        alertWindow.classList.add('alert_faded');
    }, 10);
    setTimeout(function() {
        alertWindow.classList.remove('alert_faded');
    }, 5000);
    setTimeout(function() {
        alertWindow.remove();
    }, 5250);
};
