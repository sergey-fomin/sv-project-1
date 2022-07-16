// STYLES
import '../styles/styles.scss';
// JS FILES
import DEFAULT_CARDS from './data/default-cards';
import { addCardsFromArray, addCardListener } from './modules/cards';
import { editProfileBtnListener } from './modules/profile';

addCardsFromArray(DEFAULT_CARDS, 6);
addCardListener();
editProfileBtnListener();
