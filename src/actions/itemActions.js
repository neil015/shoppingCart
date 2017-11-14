import axios from 'axios';

export default function loadItemsSuccess (items) {
    return {
        type : 'LOAD_ITEM_SUCCESS',
        items
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
