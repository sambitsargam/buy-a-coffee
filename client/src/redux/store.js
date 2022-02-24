import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import studentReducer from "./studentData/studentDataReducer";
import instituteReducer from "./instituteData/instituteDataReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  studentData: studentReducer,
  instituteData: instituteReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
