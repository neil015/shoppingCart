import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../../styles/home.scss';
import {selectedItemSuccess} from '../actions/itemActions';
import {Link} from 'react-router';
import {getCountPerItem} from '../utils/itemsUtil';
import {lastIndexOf, findIndex} from 'lodash';
import {getNumberOfProductSelectedByCount, getItemPrice} from '../utils/itemsUtil';

export const mapStateToProps = (state, props) => {
    let getCartCount = 0;
    const selectedItems = state.selectedItems;
    if (selectedItems != null && selectedItems.length >= 1) {
        getCartCount = getNumberOfProductSelectedByCount(selectedItems);
    }
    return {
        itemsList: state.items, selectedItems, getCartCount
    }
};

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectedItemSuccess
    }, dispatch);
};

class ItemsFormPage extends React.Component {

    constructor(props) {
        super(props);
        //this.getItemPrice = this.getItemPrice.bind(this);
        this.getItemDiscount = this.getItemDiscount.bind(this);
        this.selectItemForCart = this.selectItemForCart.bind(this);
    }

    getItemDiscount(discount) {
        return `${discount + 15}%`;
    }

    selectItemForCart(itemSelected) {
        const perItemCount = getCountPerItem(itemSelected, this.props.selectedItems);
        itemSelected.perItemCount = perItemCount;
        const check = this.props.selectedItems != null && this.props.selectedItems.length >= 1;
        let selectedItemList;
        check ? selectedItemList = this.props.selectedItems : selectedItemList = [];
        if (check) {
            const selectIndex = this.props.selectedItems.findIndex(item => {
                return (item.id === itemSelected.id);
            });
            if (selectIndex != -1) {
                selectedItemList[selectIndex].perItemCount = perItemCount;
            }
            else {
                selectedItemList.push(itemSelected);
            }
        }
        else {
            selectedItemList.push(itemSelected);
        }
        this.props.selectedItemSuccess(selectedItemList);
    }

    render() {
        const box = {
            "width": "235px",
            "border": "1px solid gray",
            "padding-top": "20px",
            "margin-right": "20px",
            "height": "250px",
            "padding": "1.5rem",
            "border-top": "1px solid #dcdcdc"
        };
        const strikeText = {"text-decoration": "line-through"};
        return (
            <div>
                <div>
                    <h3 className="">Items</h3>
                    <Link to="checkout" className="btn_primary grid_col-2">Go to Cart &nbsp;
                        { this.props.getCartCount === 0 ? null : (this.props.getCartCount) }</Link>
                </div>
                <hr/>
                {this.props.itemsList.length  && this.props.itemsList.map((item) => {
                    return <div style={box} key={item.id}>
                        <div>{ item.type === 'fiction' ? this.getItemDiscount(item.discount) : null }</div>
                        <div >{ item.name }</div>
                        <div style={strikeText}>{ item.type === 'fiction' ? `$${item.price}` : null }</div>
                        <div>{ '$' + getItemPrice(item.type, item.discount, item.price) }</div>
                        <button type="submit" onClick={ () => this.selectItemForCart(item) }>Add to Cart</button>
                    </div>
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsFormPage);
