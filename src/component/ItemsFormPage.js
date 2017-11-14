import React from 'react';
import { connect } from 'react-redux';
import '../../styles/home.scss';
import { Link } from 'react-router';

export const mapStateToProps = (state, props) => {
    return {
        state
    }
}

class ItemsFormPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="grid-l">
                    <h3 className="grid_col-9">Items</h3>
                    <Link to="checkout" className="btn_primary grid_col-2">Go to Cart</Link>
                </div>
                <div className="grid_col-12"><hr/></div>
                <div className="grid-l"><hr/></div>

            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemsFormPage);