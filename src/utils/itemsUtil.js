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

export const getTotalItemCost = (allItems) => {
    let totalSumOfAllItem = 0;
    let cost;
    if(allItems) {
        allItems.map(item => {
            cost = item.price * item.perItemCount;
            totalSumOfAllItem += cost;
        });
    }
    return totalSumOfAllItem !== 0 ?  '$' + totalSumOfAllItem : '$'+ 0;
};

export const getTotalDiscount  = (allItems) =>  {
    let discount = 0;
    let cost = 0;
    if(allItems) {
        allItems.map(item => {
            if(item.discount){
                cost = item.discount * item.perItemCount;
                discount += cost;
            }
        });
    }
    return '$'+ discount;
};

export const getTypeDiscount = (allItems) => {
    let typeDiscount = 0;
    let cost = 0;
    if(allItems) {
        allItems.map(item => {
            if(item.type === 'fiction'){
                cost = item.price*15/100 * item.perItemCount;
                typeDiscount += cost;
            }
        });
    }
    return '$'+ typeDiscount;
};