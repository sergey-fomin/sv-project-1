// STYLES
import '../styles/styles.scss';
// JS FILES
import DEFAULT_CARDS from './data/default-cards';
import { addCardsFromArray, setupAddCardListener } from './modules/cards';
import { setupEditProfileBtnListener } from './modules/profile';

addCardsFromArray(DEFAULT_CARDS, 6);
setupAddCardListener();
setupEditProfileBtnListener();
