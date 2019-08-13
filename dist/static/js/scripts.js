// Site utils
const addElement = function(elTag, elClass) {
    var element = document.createElement(elTag);
    element.className = elClass;

    return element;
};


// Site apps
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

const ApartmentsContainer = document.querySelector('.apartments');
const ApartmentsButton = document.querySelector('.apartments-button');
const SortButtons = document.querySelectorAll('[data-sort]');
getApartments('/apartments.json');

function getApartments(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let loadedItems = 0;
        addFromList(json, loadedItems, loadedItems += 11);

        // Sorting working with json and reload apartments with new order
        SortButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                toggleSortClasses(SortButtons, e.target);
                sortList(json, button.dataset.sort);
                ApartmentsContainer.innerHTML = '';
                addFromList(json, 0, loadedItems);
            });
        });

        ApartmentsButton.addEventListener('click', () => {
            if (loadedItems + 21 < json.length) {
                addFromList(json, loadedItems += 1, loadedItems += 21);
            } else {
                addFromList(json, loadedItems += 1, loadedItems += 21);
                ApartmentsButton.remove();
            };

            // If items less than 20 we can correct button text
            if ((json.length - 1 - loadedItems) < 20) {
                ApartmentsButton.textContent = 'Показать еще ' + (json.length - 1 - loadedItems);
            };
        });
    });
};

function sortList(list, param) {
    list.sort((a, b) => {
        if (a[param] > b[param]) {
            return 1;
        }
        if (a[param] < b[param]) {
            return -1;
        }
        return 0;
    });
};

function toggleSortClasses(buttons, activeButton) {
    buttons.forEach(button => {
        if (button === activeButton) {
            button.classList.add('sorting__button_active');
        } else {
            button.classList.remove('sorting__button_active');
        };
    });
};

function addFromList(list, startPosition, finishPosition) {
    for (var i = startPosition; i <= finishPosition; i++) {
        if (list[i]) {
            ApartmentsContainer.append(createApartment(list[i]));
        };
    };
};

function createApartment(apartment) {
    let apartmentContainer = addElement('div', 'apartments__item');
    apartmentContainer.id = apartment.id;
    if (apartment.status == 'booked') {
        apartmentContainer.classList.add('apartments__item_booked');
    } else if (apartment.status == 'sold') {
        apartmentContainer.classList.add('apartments__item_sold');
    };

    apartmentContainer.append( createHeader(apartment.tags, apartment.isFavorite) );
    apartmentContainer.append( createImg(apartment.img) );
    apartmentContainer.append( createLink(apartment.link, apartment.name) );
    apartmentContainer.append( createDetails(apartment.decoration, apartment.square, apartment.floor) );
    apartmentContainer.append( createPrice(apartment.price) );
    apartmentContainer.append( createButton(apartment.status) );

    return apartmentContainer;
};

function createHeader(tags, isFavorite) {
    let apartmentHeader = addElement('div', 'apartments__header');
    if (tags) {
        apartmentHeader.append( createTags(tags) );
    };
    apartmentHeader.append( createFavoriteButton(isFavorite) );

    return apartmentHeader;
}

function createTags(tags) {
    let tagsContainer = addElement('p', 'apartments__labels labels');
    tags.forEach(tag => {
        let tagContainer = addElement('span', 'labels__item');
        tagContainer.textContent = tag;
        tagsContainer.append(tagContainer);
    });
    return tagsContainer;
};

function createFavoriteButton(isFavorite) {
    let favoriteContainer = addElement('div', 'apartments__favorite'),
        favoriteButton = addElement('button', 'favorite-button');

    favoriteButton.setAttribute('aria-label', isFavorite ? 'Удалить из избранного' : 'Добавить в избранное');
    favoriteButton.setAttribute('aria-checked', isFavorite ? 'true' : 'false');

    favoriteContainer.append(favoriteButton);
    listenSwitch(favoriteButton);

    return favoriteContainer;
}

function createImg(src) {
    let imgContainer = addElement('div', 'apartments__img'),
        img = addElement('img');
    img.src = '/static/img/apartments/' + src;
    imgContainer.append(img);
    return imgContainer;
};

function createLink(href, text) {
    let link = addElement('a', 'apartments__link');
    link.href = href;
    link.textContent = text;
    return link;
};

function createDetails(decorationText, squareText, floorText) {
    let detailsContainer = addElement('ul', 'apartments__details'),
        decoration = addElement('li'),
        square = addElement('li'),
        floor = addElement('li');
    decoration.textContent = decorationText;
    square.innerHTML = squareText + ' м<sup>2</sup> <span class="apartments__comment">площадь</span>';
    floor.innerHTML = floorText + ' <span class="apartments__comment">этаж</span>';
    detailsContainer.append(decoration);
    detailsContainer.append(square);
    detailsContainer.append(floor);
    return detailsContainer;
};

function createPrice(value) {
    let price = addElement('p', 'apartments__price');
    price.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.';
    return price;
};

function createButton(state) {
    button = addElement('button', 'button apartments__button');
    if (state == 'booked') {
        button.textContent = 'Забронировано';
    } else if (state == 'sold') {
        button.textContent = 'Продано';
    } else {
        button.textContent = 'Свободно';
    };
    return button;
};

findfloatedInputs(document);

function findfloatedInputs(target) {
    // Find inputs
    const floatedInputs = target.querySelectorAll('.input__field');
    // Add classes
    addLabeledInputsClass(floatedInputs);
    // Listen to changes
    listenLabeledInputs(floatedInputs);
};

function addLabeledInputsClass(inputs) {
    inputs.forEach((input) => {
        input.parentElement.classList.add('input_floating');
    });
};

function listenLabeledInputs(inputs) {
    inputs.forEach((input) => {
        listenLabeledInput(input);
    });
};

function listenLabeledInput(input) {
    // Update loaded inputs classes
    changeLabeledInput(input);
    // Update classes if input changes
    input.addEventListener('change', () => {
        changeLabeledInput(input);
    });
};

function changeLabeledInput(input) {
    if (input.value == '') {
        input.classList.remove('input__field_filled');
    } else {
        input.classList.add('input__field_filled');
    };
};

// Get all forms
var validationForms = document.querySelectorAll('[data-validate]');
// console.log('Validation forms:' + validationForms);

// Validation RegExp patterns
var validationPatterns = {
    email: /.+@.+\..+/i,
};

// Adding error message
var addError = function(input, text) {
    var error = input.parentElement.querySelector('.input__error');
    error.innerHTML = text;
};

// Check requred status
var checkRequired = function(input) {
    if (input.required && (input.value == '')) {
        // console.log('Required field is false');
        addError(input, 'Необходимо заполнить это поле');
        return false;
    }
    // console.log('Required field is true');
    return true;
};
// Check matching with patterns
var checkPattern = function(input) {
    if (!input.dataset.validatePattern || (input.value == '')) { return true };

    var inputPattern = validationPatterns[input.dataset.validatePattern],
        inputValue = input.value;

    // console.log('Pattern is ' + inputPattern.test(inputValue));
    if (!inputPattern.test(inputValue)) {
        addError(input, 'Поле заполнено неверно');
    }
    return inputPattern.test(inputValue);
};

// Validate input
var validateInput = function(input, isHardCheck) {
    // console.log('input on check');
    // Check all validate parameters
    var isInputValid = checkRequired(input) && checkPattern(input),
        isNotEmpty = input.value || false;

    // Adding classes to inputs
    if (isInputValid && isNotEmpty) {
        input.classList.add('input__field_status_valid');
        input.classList.remove('input__field_status_invalid');
        // console.log('input soft checked ok');
        return true;
    } else if (!isInputValid && isHardCheck) {
        input.classList.remove('input__field_status_valid');
        input.classList.add('input__field_status_invalid');
        // console.log('input hard checked not ok');
        return false;
    } else if (!isInputValid) {
        input.classList.remove('input__field_status_valid');
        // console.log('input soft checked not ok');
        return true;
    };
    return true;
};

// Validate form
var validateForm = function(form) {
    var inputs = form.querySelectorAll('.input__field');
    // console.log(inputs);

    inputs.forEach((input) => {
        // console.log(input);
        input.parentElement.append( addElement('span', 'input__error') );
        input.addEventListener('keyup', function() {
            validateInput(input, false);
        });
        input.addEventListener('click', function() {
            validateInput(input, false);
        });
        input.addEventListener('change', function() {
            validateInput(input, true);
        });
        input.addEventListener('blur', function() {
            validateInput(input, true);
        });
    });

    // Catch submit action
    form.onsubmit = function(e) {
        var isFormValid = true;
        inputs.forEach((input) => {
            if (!validateInput(input, true)) {
                isFormValid = isFormValid && validateInput(input, true);
            }
        });
        return isFormValid;
    };
};
validationForms.forEach((form) => {
    validateForm(form);
});

var scrollTopButton = addElement('button', 'scroll-top');
document.body.append(scrollTopButton);
var pageFooter = document.querySelector('.page-footer');
var pageFooterTop = pageFooter.offsetTop;

scrollTopButton.addEventListener('click', () => {
    document.documentElement.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

window.onscroll = function() {
    scrollTopListener()
};
function scrollTopListener() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopButton.classList.add('scroll-top_showed');
    } else {
        scrollTopButton.classList.remove('scroll-top_showed');
    };

    if ((document.body.scrollTop > (pageFooter.offsetTop - window.innerHeight)) || (document.documentElement.scrollTop > (pageFooter.offsetTop - window.innerHeight))) {
        scrollTopButton.style.bottom = pageFooter.offsetHeight - 40 + 'px';
        scrollTopButton.classList.add('scroll-top_bottom');
    } else {
        scrollTopButton.removeAttribute('style');
        scrollTopButton.classList.remove('scroll-top_bottom');
    }
}

function listenSwitch(switchButton) {
    switchButton.addEventListener('click', (e) => {
        let pressed = e.target.getAttribute('aria-checked') === 'true';
        e.target.setAttribute('aria-checked', String(!pressed));
        e.target.setAttribute('aria-label', pressed ? 'Добавить в избранное' : 'Удалить из избранного');
        showAlert(pressed ? 'Квартира удалена из избранного' : 'Квартира добавлена в избранное');
    });
};

