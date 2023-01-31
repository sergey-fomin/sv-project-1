// STYLES
import "../styles/styles.scss";
// JS FILES
import DEFAULT_CARDS from "./data/default-cards";
import { loadCardsFromServer } from "./modules/cards";
import { setupEditProfileBtnListener } from "./modules/profile";
import { setupLoginLinksListener, setupLoginFormManager } from "./modules/login";
import { setupRegistrationLinksListener, setupRegistrationFormManager } from "./modules/registration";
import { api } from "./modules/api";

loadCardsFromServer();
setupEditProfileBtnListener();
// setupLoginLinksListener();
setupLoginFormManager();
setupRegistrationLinksListener();
setupRegistrationFormManager();
