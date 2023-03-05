// STYLES
import "../styles/styles.scss";
// JS FILES
import DEFAULT_CARDS from "./data/default-cards";
import { loadCardsFromServer } from "./modules/cards";
import { setupEditProfileBtnListener } from "./modules/profile";
import { setupLoginFormManager } from "./modules/login";
import { setupRegistrationFormManager } from "./modules/registration";
import { api } from "./modules/api";
// import { authorization } from "./modules/authorization";
import { linkManager } from "./modules/link-manager";

linkManager.setupListeters();
api.saveToken(localStorage.getItem('token'));
loadCardsFromServer();
setupEditProfileBtnListener();
setupLoginFormManager();
setupRegistrationFormManager();
