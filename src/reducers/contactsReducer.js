import { GET_CONTACTS } from '../action/types'

const initialState = {
  contacts: {},
  selectedContact: null,
  foundContacts: []
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    default:
      return state
  }
}

export default contactReducer