
// ===== DATA ===== //

const cardsData = [
    {
        title: 'Домбай',
        imgAlt: 'dombai',
        imgSrc: 'img/dombai.jpg',
        imgSrcSet: 'img/dombai@2x.jpg 2x',
        sourceSrcSet: 'img/dombai.webp 1x, img/dombai@2x.webp 2x',
    },
    {
        title: 'Карачаевск',
        imgAlt: 'karachaevsk',
        imgSrc: 'img/karachaevsk.jpg',
        imgSrcSet: 'img/karachaevsk@2x.jpg 2x',
        sourceSrcSet: 'img/karachaevsk.webp 1x, img/karachaevsk@2x.webp 2x',
    },
    {
        title: 'Гора Эльбрус',
        imgAlt: 'elbrus',
        imgSrc: 'img/elbrus.jpg',
        imgSrcSet: 'img/elbrus@2x.jpg 2x',
        sourceSrcSet: 'img/elbrus.webp 1x, img/elbrus@2x.webp 2x',
    }
];

// ===== UTILS ===== //

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== CARDS ===== //

const cardsList = document.querySelector('.card-list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');

const addCardsFromArray = (cards, cardsAmount) => {
    const cardsListFragment = document.createDocumentFragment();

    for (let i = 0; i < cardsAmount; i++) {
        const randomI = getRandomInt(0, cards.length - 1);
        const randomCard = cards[randomI];
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

// ===== EDTI PROFILE ===== //
const profile = document.querySelector('.profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileModalTemplate = document.querySelector('#edit-modal-template').content.querySelector('.modal');

editProfileBtn.addEventListener('click', () => {
    const editProfileModal = editProfileModalTemplate.cloneNode(true);
    document.body.appendChild(editProfileModal);

    console.log('editProfileModal');
});


// ===== EXECUTION ===== //

addCardsFromArray(cardsData, 6);

cardsList.addEventListener('click', (evt) => {
    if (evt.target.matches('.card-item__image')) {
        console.log('image');
    }
    if (evt.target.matches('.card-item__btn')) {
        evt.target.classList.toggle('is-active');
        console.log(evt.target);
    }
});


