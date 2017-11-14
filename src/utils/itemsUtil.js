import { findIndex } from 'lodash';

export const getCountPerItem = (currentItemSelected, allItemsSelected) => {
    let count = 1;
    if(allItemsSelected && allItemsSelected.length >= 1 ) {
        const index = findIndex(allItemsSelected, currentItemSelected);
        if(index!= -1 && allItemsSelected[index].perItemCount === undefined) {
            allItemsSelected[index].perItemCount = 0;
        }
        return index != -1 ? count = allItemsSelected[index].perItemCount + 1 : count;
    }
    else {
        return count;
    }
};

export const getNumberOfProductSelectedByCount = (allItemsInCart) => {
    let totalNumberOfProductSelected = 0;
    allItemsInCart.map(item => {
        if(item.perItemCount) {
            totalNumberOfProductSelected  += item.perItemCount;
        }
    });
    return totalNumberOfProductSelected;
};

export const getItemPrice = (type, discount, price) => {
    if (type === 'fiction') {
        return (price - (price * discount / 100));
    }
    else {
        return price;
    }
};