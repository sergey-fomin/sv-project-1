// STYLES
import "../styles/styles.scss";
// JS FILES
import DEFAULT_CARDS from "./data/default-cards";
import { addCardsFromArray, setupAddCardListener } from "./modules/cards";
import { showProfile } from "./modules/profile";
import { setupLoginLinksListener, setupLoginFormManager, setupRegistrationFormManager } from "./modules/login";
import { api } from "./modules/api";

showProfile();
setupLoginLinksListener();
setupLoginFormManager();
setupRegistrationFormManager();
addCardsFromArray(DEFAULT_CARDS, 6);
setupAddCardListener();
