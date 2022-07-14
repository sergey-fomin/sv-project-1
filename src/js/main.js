// STYLES
import '../styles/styles.scss';
// JS FILES
import DEFAULT_CARDS from './data/default-cards';
import { addCardsFromArray, addCard } from './modules/cards';
import { openModalWithContent } from './modules/modal';




// const cardsList = document.querySelector('.card-list');
// const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');
// const addCardModalTemplate = document.querySelector('#add-card-modal-template').content.querySelector('.modal__content');
const addCardModalTemplate = document.querySelector('#add-card-modal-template').content;
const profile = document.querySelector('.profile');
// const profileName = profile.querySelector('.profile__name');
// const profileOccupation = profile.querySelector('.profile__occupation');

const addCardBtn = profile.querySelector('.profile__add-card-btn');

// const openEditProfileModalBtn = profile.querySelector('.profile__edit-btn');
// const editProfileModalTemplate = document.querySelector('#edit-modal-template').content.querySelector('.modal');
// const editProfileModalCloseBtn = editProfileModalTemplate.querySelector('.modal__form-close-btn');
// const editProfileModalSubmitBtn = editProfileModalTemplate.querySelector('.modal__form-submit-btn');



// ===== ADD CARD ===== //

addCardBtn.addEventListener('click', () => {
    const addCardModal = addCardModalTemplate.cloneNode(true);
    const newCardTitle = addCardModal.querySelector('#place-title');
    console.log(addCardModalTemplate);
    // newCardTitle.value = 'mamka tvoya'
    // const newCardUrl = addCardModal.querySelector('#image-url');
    // document.body.appendChild(addCardModal);
    openModalWithContent(addCardModal);


    // addCardModal.addEventListener('click', (evt) => {
    //     if (evt.target.matches('.modal__form-close-btn')) {
    //         console.log('close'); // NOT WORKING - TARGET = IMAGE ???
    //     }
    //     if (evt.target.matches('.modal__form-submit-btn')) {
    //         evt.preventDefault();
    //         addCard(newCardTitle.value, newCardUrl.value);
    //         addCardModal.remove();
    //     }
    //     console.log(evt.target);

    // });
});

// ===== EDTI PROFILE ===== //

// openEditProfileModalBtn.addEventListener('click', () => {
//     const editProfileModal = editProfileModalTemplate.cloneNode(true);
//     const editProfileName = editProfileModal.querySelector('#name');
//     const editProfileOccupation = editProfileModal.querySelector('#occupation');
//     editProfileName.value = profileName.textContent;
//     editProfileOccupation.value = profileOccupation.textContent;
//     document.body.appendChild(editProfileModal);

//     editProfileModal.addEventListener('click', (evt) => {
//         if (evt.target.matches('.modal__form-close-btn')) {
//             console.log('close'); // NOT WORKING - TARGET = IMAGE ???
//         }
//         if (evt.target.matches('.modal__form-submit-btn')) {
//             evt.preventDefault();
//             profileName.textContent = editProfileName.value;
//             profileOccupation.textContent = editProfileOccupation.value;
//             editProfileModal.remove();
//         }
//         console.log(evt.target);
//     });

// });


// ===== EXECUTION ===== //

addCardsFromArray(DEFAULT_CARDS, 6);

// cardsList.addEventListener('click', (evt) => {
//     if (evt.target.matches('.card-item__image')) {
//         console.log('image');
//     }
//     if (evt.target.matches('.card-item__like-btn')) {
//         evt.target.classList.toggle('is-active');
//         console.log(evt.target);
//     }
// });
