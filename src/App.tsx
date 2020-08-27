import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {CartProvider} from "./components/CartContext";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Admin from "./components/Admin";

export default class App extends React.Component {
    render() {
        return (
            <CartProvider>
                <Router>
                    <nav className="nav">
                        <ul className="menuBar">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/cart"> Go To 🛒</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/admin">
                            <Admin/>
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </CartProvider>
        );
    }
}