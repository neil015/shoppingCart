export default function selectedItemReducer (state = null, action) {
    switch(action.type) {
        case 'SELECTED_ITEM_SUCCESS':
            return  [ ...action.selectedItem ];
            break;
        default:
            return state;
    }
}