import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../../styles/home.scss';
import {selectedItemSuccess} from '../actions/itemActions';
import {Link, browserHistory} from 'react-router';
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
        this.getItemDiscount = this.getItemDiscount.bind(this);
        this.selectItemForCart = this.selectItemForCart.bind(this);
        this.goToCartPage = this.goToCartPage.bind(this);
        this.getProductDetails = this.getProductDetails.bind(this);
    }

    goToCartPage() {
        browserHistory.push('/checkout');
    }

    getItemDiscount(discount) {
        return `${discount + 15}% off`;
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

    getProductDetails() {
        const discount = "col-sm-4 discount";
        const discountNone = "discountNone";
        const strikeAmt = "price col-sm-1 strike-text";
        const oneColoum = "col-sm-1";
        return <div>{ this.props.itemsList.length && this.props.itemsList.map((item) => {
            return <div className="col-lg-3 box-new" key={item.id}>
                <div
                    className={ item.type === 'fiction' ? discount : discountNone }>{ item.type === 'fiction' ? this.getItemDiscount(item.discount) : null }</div>
                <img src={item.img_url} alt={item.name} className="image"/>
                <div className="inside-box">
                    <h5 className="itemName">{ item.name }</h5>
                    <div
                        className={ item.type === 'fiction' ? strikeAmt : '' }>{ item.type === 'fiction' ? `$${item.price}` : '' }</div>
                    <div className={ item.type === 'fiction' ? "price col-sm-2" : 'price col-sm-4' }>
                        <strong>{ '$' + getItemPrice(item.type, item.discount, item.price) }</strong></div>
                    <div className="col-sm-5">
                        <button type="submit" className="btn-primary" onClick={ () => this.selectItemForCart(item) }>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        })
        }</div>
    }

    render() {
        return (
            <div className="body">
                <h4 className="col-lg-2">All Items</h4>
                <div className="col-lg-6"></div>
                <button className="col-lg-2 btn-addCart" disabled={this.props.getCartCount > 0 ? false : true}
                        onClick={this.goToCartPage}>Go To Cart
                </button>
                <div className="col-lg-11 line"></div>
                <br/>
                {this.getProductDetails()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsFormPage);
