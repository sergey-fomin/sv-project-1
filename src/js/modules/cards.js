const cardsList = document.querySelector('.card-list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');

/**
 * Получить рандомное число в диапазоне
 * @param {number} min
 * @param {number} max
 * @returns
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Добавление на страницу карточек из массива
 * @param {Array} cards - массив с данными карточек
 * @param {number} cardsAmount - количество карточек
 */
const addCardsFromArray = (cards, cardsAmount) => {
    const cardsListFragment = document.createDocumentFragment();

    for (let i = 0; i < cardsAmount; i++) {
        const randomIdx = getRandomInt(0, cards.length - 1);
        const randomCard = cards[randomIdx];
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector('.card-item__image');
        cardElement.querySelector('.card-item__title').textContent = randomCard.title || '';
        cardElement.querySelector('source').srcset = randomCard.sourceSrcSet || '';
        cardImage.src = randomCard.imgSrc || '';
        cardImage.srcset = randomCard.imgSrcSet || '';
        cardImage.alt = randomCard.imgAlt || '';

        cardsListFragment.appendChild(cardElement);
    }

    cardsList.appendChild(cardsListFragment);
}

const addCard = (title, url) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card-item__image');

    cardElement.querySelector('.card-item__title').textContent = title;
    cardImage.src = url;
    cardImage.srcset = '';
    cardImage.alt = title;

    cardsList.appendChild(cardElement);
}

// ===== ADD CARD ===== //

// addCardBtn.addEventListener('click', () => {
//     const addCardModal = addCardModalTemplate.cloneNode(true);
//     const newCardTitle = addCardModal.querySelector('#place-title');
//     const newCardUrl = addCardModal.querySelector('#image-url');
//     document.body.appendChild(addCardModal);

//     addCardModal.addEventListener('click', (evt) => {
//         if (evt.target.matches('.modal__form-close-btn')) {
//             console.log('close'); // NOT WORKING - TARGET = IMAGE ???
//         }
//         if (evt.target.matches('.modal__form-submit-btn')) {
//             evt.preventDefault();
//             addCardFromForm(newCardTitle.value, newCardUrl.value);
//             addCardModal.remove();
//         }
//         console.log(evt.target);

//     });
// });



export { addCardsFromArray, addCard };
