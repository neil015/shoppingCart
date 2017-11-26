import React from 'react';
import '../../styles/home.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getItemPrice} from '../utils/itemsUtil';
import {selectedItemSuccess} from '../actions/itemActions';
import {remove} from 'lodash';
import {Link, browserHistory} from 'react-router';

export const mapStateToProps = (state, props) => {
    return {
        selectedItemList: state.selectedItems
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
    }

    manipulateItemCount(itemDetails, type) {
        const modifiedItemList = this.props.selectedItemList;
        const indexOfSelectedItem = this.props.selectedItemList.indexOf(itemDetails);
        if (type === 'minus') {
            modifiedItemList[indexOfSelectedItem].perItemCount -= 1;
            if (modifiedItemList[indexOfSelectedItem].perItemCount < 0) {
                remove(modifiedItemList, item => {
                    return item.perItemCount < 0;
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

    render() {
        return (
            <div className="body">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 common-margin"> <Link to={"/"}>Order Summary</Link></div>
                    <hr className="col-lg-10 col-md-12 col-sm-12 common-margin"/>
                    <div className="col-lg-6 col-md-12 col-sm-12 common-margin">Items(4)</div>
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
                    <div className="col-lg-4">item(7)</div>
                    <div className="col-lg-2">:</div>
                    <div className="col-lg-2">$56</div>
                    <div className="inside-box-gray-border">
                        <strong className="col-lg-6">Order total</strong>
                        <div className="col-lg-3">order</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);