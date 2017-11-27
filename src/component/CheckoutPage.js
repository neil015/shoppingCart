import React from 'react';
import '../../styles/home.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getItemPrice, getTotalItemCost, getTypeDiscount, getTotalDiscount, getNumberOfProductSelectedByCount} from '../utils/itemsUtil';
import {selectedItemSuccess} from '../actions/itemActions';
import {remove} from 'lodash';
import {Link, browserHistory} from 'react-router';

export const mapStateToProps = (state, props) => {
    let numberOfItemInCart = 0;
    if(state.selectedItems) {
        numberOfItemInCart = getNumberOfProductSelectedByCount(state.selectedItems);
    }
    const totalItemsCost = getTotalItemCost(state.selectedItems);
    const totalDiscount  = getTotalDiscount(state.selectedItems);
    const typeDiscount  = getTypeDiscount(state.selectedItems);
    return {
        numberOfItemInCart,
        selectedItemList: state.selectedItems,
        totalItemsCost, totalDiscount, typeDiscount
    }
};

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectedItemSuccess
    }, dispatch)
};

class CheckoutPage extends React.Component {

    constructor(props) {
        super(props);
        this.manipulateItemCount = this.manipulateItemCount.bind(this);
        this.getFinalPremium = this.getFinalPremium.bind(this);
    }

    manipulateItemCount(itemDetails, type) {
        const modifiedItemList = this.props.selectedItemList;
        const indexOfSelectedItem = this.props.selectedItemList.indexOf(itemDetails);
        if (type === 'minus') {
            modifiedItemList[indexOfSelectedItem].perItemCount -= 1;
            if (modifiedItemList[indexOfSelectedItem].perItemCount <= 1) {
                remove(modifiedItemList, item => {
                    return item.perItemCount == 0;
                });
            }
        }
        else if (type === 'plus') {
            modifiedItemList[indexOfSelectedItem].perItemCount += 1;
        }
        else {
            remove(modifiedItemList, item => {
                return item === itemDetails;
            });
        }
        this.props.selectedItemSuccess(modifiedItemList);
        if (modifiedItemList.length === 0) {
            browserHistory.push('/')
        }
    }

    getFinalPremium(totalPrice, discount, typeDiscount) {
        return '$'+ (Number(totalPrice.split('$')[1]) - Number(discount.split('$')[1]) - Number(typeDiscount.split('$')[1]));
    }

    render() {
        const {
            totalItemsCost,totalDiscount,typeDiscount,numberOfItemInCart
        } = this.props;
        return (
            <div className="body">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 common-margin"> <Link to={"/"}>Order Summary</Link></div>
                    <hr className="col-lg-10 col-md-12 col-sm-12 common-margin"/>
                    <div className="col-lg-6 col-md-12 col-sm-12 common-margin">Items({numberOfItemInCart})</div>
                    <div className="col-lg-2 col-md-12 col-sm-12 common-margin">Qty</div>
                    <div className="col-lg-1 col-md-12 col-sm-12 common-margin price-Position">Price</div>
                    <hr className="col-lg-10 col-md-12 col-sm-12 common-margin"/>
                    {this.props.selectedItemList.map(item => {
                        return <div className="col-lg-12">
                            <div className="col-lg-5 col-md-12 col-sm-12 item-box-cart common-margin">
                                <img src={item.img_url} alt="image 1"
                                     className="image-cart col-lg-1"/>
                                <div className="col-lg-5">{ item.name }</div>
                                <button className="col-lg-1 button-border-less position" type="submit"
                                        onClick={() => this.manipulateItemCount(item, "remove")}>X
                                </button>
                            </div>
                            <button className="col-lg-1 col-md-12 col-sm-12 common-margin button-border-less" type="submit"
                                    onClick={() => this.manipulateItemCount(item, "minus")}>-
                            </button>
                            <div className="col-lg-1 col-md-12 col-sm-12 count-box common-margin"> { item.perItemCount }</div>
                            <button className="col-lg-1 col-md-12 col-sm-12 common-margin button-border-less" type="submit"
                                    onClick={() => this.manipulateItemCount(item, "plus")}>+
                            </button>
                            <div className="col-lg-1 col-md-12 col-sm-12 common-margin">{ '$' + item.perItemCount * getItemPrice(item.type, item.discount, item.price) }</div>
                        </div>
                    })}
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 box-new-cart">
                    <strong className="col-lg-12">Total</strong>
                    <br/><br/>
                    <div className="col-lg-4">item({numberOfItemInCart})</div>
                    <div className="col-lg-1">:</div>
                    <div className="col-lg-2">{ totalItemsCost }</div>
                    <div className="col-lg-4"> Discount </div>
                    <div className="col-lg-1"> : </div>
                    <div className="col-lg-2">- {totalDiscount}</div>
                    <div className="col-lg-4"> Type discount </div>
                    <div className="col-lg-1"> : </div>
                    <div className="col-lg-3">- {typeDiscount}</div>
                    <div className="inside-box-gray-border">
                        <strong className="col-lg-6">Order total</strong>
                        <div className="col-lg-3">{this.getFinalPremium( totalItemsCost, totalDiscount, typeDiscount )}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);