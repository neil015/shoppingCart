import React from 'react';
import '../../styles/home.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getItemPrice } from '../utils/itemsUtil';
import {selectedItemSuccess} from '../actions/itemActions';
import { remove } from 'lodash';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

export const mapStateToProps = (state, props) => {
    return {
        selectedItemList : state.selectedItems
    }
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectedItemSuccess
    }, dispatch)
}

class CheckoutPage extends React.Component {

    constructor(props) {
        super(props);
        this.manipulateItemCount = this.manipulateItemCount.bind(this);
    }

    manipulateItemCount(itemDetails, type) {
        const modifiedItemList = this.props.selectedItemList;
        const indexOfSelectedItem = this.props.selectedItemList.indexOf(itemDetails);
        if(type === 'minus') {
            modifiedItemList[indexOfSelectedItem].perItemCount -= 1;
            if(modifiedItemList[indexOfSelectedItem].perItemCount < 0) {
                remove(modifiedItemList, item => {
                    return item.perItemCount < 0;
                });
            }
        }
        else if(type === 'plus') {
            modifiedItemList[indexOfSelectedItem].perItemCount += 1;
        }
        else {
            remove(modifiedItemList, item => {
                return item === itemDetails;
            });
        }
        this.props.selectedItemSuccess(modifiedItemList);
        if(modifiedItemList.length === 0) {
            browserHistory.push('/')
        }
    }

    render() {
        return (
            <div>
                <h2> <Link to={"/"}>Order Summary </Link></h2>
                <table border = "1" width = "500" min-height = "150">
                    <tr>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {this.props.selectedItemList.map(item => {
                        return <tr className="margin-left">
                            <td>{ item.name } <button type="submit" onClick={() => this.manipulateItemCount(item, "remove")}>Delete Item</button></td>

                            <td><button type="submit" onClick={() => this.manipulateItemCount(item, "minus")}>-</button>
                                { item.perItemCount }
                            <button type="submit" onClick={() => this.manipulateItemCount(item, "plus")}> + </button></td>

                            <td>{ '$'+item.perItemCount * getItemPrice(item.type, item.discount, item.price) }</td>
                        </tr>
                    })}
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);