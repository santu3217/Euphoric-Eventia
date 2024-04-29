import { createStore, combineReducers, Action } from 'redux';

// Define the state type for totalAmount
interface TotalAmountState {
  totalAmount: number;
}

// Define the initial state for totalAmount
const initialTotalAmountState: TotalAmountState = {
  totalAmount: 0,
};

// Action types
const SET_EVENT_DATA = 'SET_EVENT_DATA';
const SET_TOTAL_AMOUNT = 'SET_TOTAL_AMOUNT';

// Define action interfaces
interface SetEventDataAction extends Action {
  type: typeof SET_EVENT_DATA;
  payload: any; // Define a more specific type for your event data
}

interface SetTotalAmountAction extends Action {
  type: typeof SET_TOTAL_AMOUNT;
  payload: number;
}

// Action creators
const setEventData = (data: any): SetEventDataAction => ({ type: SET_EVENT_DATA, payload: data }); // Specify the type of data
const setTotalAmount = (amount: number): SetTotalAmountAction => ({ type: SET_TOTAL_AMOUNT, payload: amount });

// Reducers
const eventReducer = (state: any = null, action: SetEventDataAction) => { // Specify the type for state
  switch (action.type) {
    case SET_EVENT_DATA:
      return { ...state, eventData: action.payload };
    default:
      return state;
  }
};

// Reducer for totalAmount
const totalAmountReducer = (state: TotalAmountState = initialTotalAmountState, action: SetTotalAmountAction) => {
  switch (action.type) {
    case SET_TOTAL_AMOUNT:
      return { ...state, totalAmount: action.payload };
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  eventData: eventReducer,
  totalAmount: totalAmountReducer,
});

const store = createStore(rootReducer);

export { setEventData, setTotalAmount, store };
