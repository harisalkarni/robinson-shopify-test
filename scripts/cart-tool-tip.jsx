import React from "react"
import ReactDom from "react-dom"
import { CartToolTip } from "./components/CartToolTip.jsx";

const Test = () => {
	return <div id="react-cart-component">
           <CartToolTip />
    </div>
}

const root = document.getElementById('react-cart');
ReactDom.render(<Test />, root);