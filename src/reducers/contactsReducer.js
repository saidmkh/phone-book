import { GET_CONTACTS } from '../action/types'

const initialState = {
  contactList: [],
  selectedContact: null,
  foundContacts: []
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      console.log(action)
      return {
        ...state,
        ...{
          contactList: action.payload
        }
      }
    default:
      return state
  }
}

export default contactReducer