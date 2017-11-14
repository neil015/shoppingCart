import { combineReducers } from 'redux';
import items  from './itemsReducer';
import selectedItems  from './selectedItemReducer';

const rootReducer =  combineReducers({
    items, selectedItems
});
export default rootReducer;
