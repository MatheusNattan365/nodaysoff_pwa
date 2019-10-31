import { createStore } from 'redux';

const INITIAL_STATE = {
  current_user_info: {
    first_name: '',
    last_name: '',
    address: '',
    photo_URL: ''
  },
  events_store: []
};

function setarEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SETAR_CURRENT_USER_INFO':
      return {
        ...state,
        current_user_info: action.user_info
      };
    case 'SETAR_EVENT':
      return {
        ...state,
        events_store: action.arrayEventos
      };
    default:
      return state;
  }
}

const store = createStore(setarEmail);

export default store;

