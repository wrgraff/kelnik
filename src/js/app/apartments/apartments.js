const ApartmentsContainer = document.querySelector('.apartments');
const ApartmentsButton = document.querySelector('.apartments-button');
getApartments('/apartments.json');

function getApartments(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // return json;

        let loadedItems = 0;
        addFromList(json, loadedItems, loadedItems += 11);
        ApartmentsButton.addEventListener('click', () => {
            if (loadedItems + 21 < json.length) {
                addFromList(json, loadedItems += 1, loadedItems += 21);
            } else {
                addFromList(json, loadedItems += 1, loadedItems += 21);
                ApartmentsButton.remove();
            };

            if ((json.length - 1 - loadedItems) < 20) {
                ApartmentsButton.textContent = 'Показать еще ' + (json.length - 1 - loadedItems);
            };
        });
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
