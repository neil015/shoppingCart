import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './component/App';
import CheckoutPage from './component/CheckoutPage';
import ItemsFormPage from './component/ItemsFormPage';

export default (
    <Route path="/" component = {App}>
        <IndexRoute path="/" component = {ItemsFormPage}/>
        <Route path="/checkout" component={CheckoutPage}/>
    </Route>
)
