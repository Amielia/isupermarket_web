import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
// import Apps from './Apps';
import App from './App';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import EditProducts from './Components/EditProducts';
import ShowProducts from './Components/ShowProducts';
import {BrowserRouter, Route} from 'react-router-dom';
// import AddPromotion from './Components/AddPromotion';
// import EditPromotion from './Components/EditPromotion';
// import AppPromotion from './AppPromotion';
// import ShowPromotion from './Components/ShowPromotion'
import AppBeacon from './AppBeacon';
import ShowBeacon from './Components/ShowBeacon';
import AddBeacon from './Components/AddBeacon'
import EditBeacon from './Components/EditBeacon';
import AppLogin from './AppLogin';


ReactDom.render(<BrowserRouter>


<Route exact path="/" component = {AppLogin}></Route>

<Route path="/app" component = {App}></Route>
{/* <Route path="/app2" component = {AppPromotion}></Route> */}
<Route path="/app3" component = {AppBeacon}></Route>
{/* <Route path="/create" component = {Login}></Route> */}
<Route path="/create" component = {AddProduct}></Route>
{/* <Route path="/create2" component = {AddPromotion}></Route> */}
<Route path="/create3" component = {AddBeacon}></Route>

<Route path="/show/:id" component = {ShowProducts}></Route>
{/* <Route path="/show2/:id" component = {ShowPromotion}></Route> */}
<Route path="/show3/:id" component = {ShowBeacon}></Route>

<Route path="/edit/:id" component = {EditProducts}></Route>
{/* <Route path="/edit2/:id" component = {EditPromotion}></Route> */}
<Route path="/edit3/:id" component = {EditBeacon}></Route>


</BrowserRouter>, document.getElementById('root'));