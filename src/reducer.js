import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
    PAGES,
  } from './constants';
  
  export const initialState = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isPending: false,
    pets: {},
    lastAddedPetId: '',
    page: PAGES.HOME,
    chats: {},
  };
  
  function reducer(state, action) {
    switch(action.type) {
  
      case ACTIONS.LOG_IN:  
        return {
          ...state,
          error: '',
          loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
          username: action.username,
        };
  
      case ACTIONS.START_LOADING:
        return {
          ...state,
          error: '',
          isPending: true, 
        };
  
      case ACTIONS.REPLACE_PETS:
        return {
          ...state,
          error: '',
          isPending: false,
          lastAddedPetId: '',
          pets: action.pets,
        };
  
      case ACTIONS.LOG_OUT:
        return {
          ...state,
          error: '',
          isPending: false,
          pets: {},
          loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
          lastAddedPetId: '',
          username: '',
        };
  
      case ACTIONS.REPORT_ERROR:
        return {
          ...state,
          error: action.error || 'ERROR', 
        };
  
      case ACTIONS.TOGGLE_PET:
        return {
          ...state,
          pets: {  
            ...state.pets, 
            [action.pet.id]: action.pet
          },
        };
  
      case ACTIONS.DELETE_PET:
        const petsCopy = { ...state.pets };
        delete petsCopy[action.id];
        return {
          ...state,
          pets: petsCopy,
        };
  
      case ACTIONS.ADD_PET:
        return {
          ...state,
          pets: {
            ...state.pets,
            [action.pet.id]: action.pet,
          },
        };

      case ACTIONS.CHANGE_PAGE:
        return {
          ...state,
          page: action.page,
        }

      case ACTIONS.GET_CHATS:
        return {
          ...state,
          chats: action.chats,
        }
  
      default:
        throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); 
    }
  }
  
  export default reducer;