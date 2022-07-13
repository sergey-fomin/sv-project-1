// import '../styles/style.scss';

// ===== DATA ===== //

const DEFAULT_CARDS = [
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

const cardsList = document.querySelector('.card-list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');
const addCardModalTemplate = document.querySelector('#add-card-modal-template').content.querySelector('.modal');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');

const addCardBtn = profile.querySelector('.profile__add-card-btn');

const openEditProfileModalBtn = profile.querySelector('.profile__edit-btn');
const editProfileModalTemplate = document.querySelector('#edit-modal-template').content.querySelector('.modal');
const editProfileModalCloseBtn = editProfileModalTemplate.querySelector('.modal__form-close-btn');
const editProfileModalSubmitBtn = editProfileModalTemplate.querySelector('.modal__form-submit-btn');


// ===== UTILS ===== //

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== CARDS ===== //

const addDefaultCards = (cards, cardsAmount) => {
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

const addCardFromForm = (title, url) => {
    // const cardFragment = document.createDocumentFragment();
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card-item__image');

    cardElement.querySelector('.card-item__title').textContent = title;
    cardImage.src = url;
    cardImage.srcset = '';
    cardImage.alt = title;

    cardsList.appendChild(cardElement);
}

// ===== ADD CARD ===== //

addCardBtn.addEventListener('click', () => {
    const addCardModal = addCardModalTemplate.cloneNode(true);
    const newCardTitle = addCardModal.querySelector('#place-title');
    const newCardUrl = addCardModal.querySelector('#image-url');
    document.body.appendChild(addCardModal);

    addCardModal.addEventListener('click', (evt) => {
        if (evt.target.matches('.modal__form-close-btn')) {
            console.log('close'); // NOT WORKING - TARGET = IMAGE ???
        }
        if (evt.target.matches('.modal__form-submit-btn')) {
            evt.preventDefault();
            addCardFromForm(newCardTitle.value, newCardUrl.value);
            addCardModal.remove();
        }
        console.log(evt.target);

    });
});

// ===== EDTI PROFILE ===== //

openEditProfileModalBtn.addEventListener('click', () => {
    const editProfileModal = editProfileModalTemplate.cloneNode(true);
    const editProfileName = editProfileModal.querySelector('#name');
    const editProfileOccupation = editProfileModal.querySelector('#occupation');
    editProfileName.value = profileName.textContent;
    editProfileOccupation.value = profileOccupation.textContent;
    document.body.appendChild(editProfileModal);

    editProfileModal.addEventListener('click', (evt) => {
        if (evt.target.matches('.modal__form-close-btn')) {
            console.log('close'); // NOT WORKING - TARGET = IMAGE ???
        }
        if (evt.target.matches('.modal__form-submit-btn')) {
            evt.preventDefault();
            profileName.textContent = editProfileName.value;
            profileOccupation.textContent = editProfileOccupation.value;
            editProfileModal.remove();
        }
        console.log(evt.target);
    });

});


// ===== EXECUTION ===== //

addDefaultCards(DEFAULT_CARDS, 6);

cardsList.addEventListener('click', (evt) => {
    if (evt.target.matches('.card-item__image')) {
        console.log('image');
    }
    if (evt.target.matches('.card-item__like-btn')) {
        evt.target.classList.toggle('is-active');
        console.log(evt.target);
    }
});
