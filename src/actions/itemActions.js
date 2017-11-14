import axios from 'axios';

export function loadItemsSuccess (items) {
    return {
        type : 'LOAD_ITEM_SUCCESS',
        items
    }
}

export function selectedItemSuccess (selectedItem) {
    return {
        type : 'SELECTED_ITEM_SUCCESS',
        selectedItem
    }
}

export const loadItems = () => {
    return (dispatch) => {
        return axios.get('https://api.myjson.com/bins/qhnfp').then(items => {
            const allItems = items.data;
            dispatch(loadItemsSuccess(allItems));
        }).catch(error => {
            throw (error);
        });
    }
}
