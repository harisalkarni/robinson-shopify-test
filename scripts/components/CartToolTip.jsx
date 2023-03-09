import React, { useEffect, useState } from "react"
import {BsCart} from "react-icons/bs"


const styles = {
  drawer: {
    backgroundColor : "#fff",
    position: "fixed",
    padding: "20px 50px",
    top: "110px",
    right: "50px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    alignItems: "center",
    flexDirection: "column",
    display: "flex"
  },
  increment: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  }
}




export const CartToolTip = () => {
  const [cart, setCart] = useState([])
  const [item, setItem] = useState([])
  const [variantID, setVariantID] = useState("")
  const [quantity, setQuantity] = useState(0)

  

  useEffect(() => {
    getCart().then(cart => setCart(cart))
  }, [])

  useEffect(() => {
    try {
      UpdateCart();
      console.log("Succeed")
    } catch (error) {
      console.log(error,"error")
    }
  }, [quantity, variantID])


  const getCart = () => {
    return fetch("/cart.js", {
      headers: {
        "Content-Type": "application/json",
        pragma: "no-cache",
        "cache-control": "no-cache"
      },
      credentials: "same-origin"
    }).then(data => data.json()).then(console.log("Data Fetched"))
  }
  
  const clearCart = async (e) => {
    e.preventDefault()
    return await fetch("/cart/clear.js", {
      headers: {
        "Content-Type": "application/json",
        pragma: "no-cache",
        "cache-control": "no-cache"
      },
      credentials: "same-origin"
    }).then(console.log("Clear cart"))
    .then(location.reload())
  }

  const UpdateCart = (e) => {

    var formdata = new FormData();
    formdata.append("id", variantID);
    formdata.append("quantity", quantity);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("/cart/change.js", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result, "Succeed updating data"))
    .catch(error => console.log('error', error));
      

    }



  function decraseCart(variant_id, qty) {

    setVariantID(variant_id);
    setQuantity(qty - 1)
    location.reload()
  }

  function increaseCart(variant_id, qty) {

    setVariantID(variant_id);
    setQuantity(qty + 1)
    location.reload()
  }


  console.log(cart, "ini cart");
  console.log(item, "ini item");


  return (
    <div>
      <div>
        <a href="/cart">
          <BsCart style={{fontSize: "20px", marginTop: "5px", color: "#000"}} />
        </a>
      </div>
      <div className="drawer" style={styles.drawer}>
        <h2>Cart Summary</h2>
       { cart ? (
         <div>
          {
          cart.items?.map((item) => (
            <p key={item.id}>
              {item.title}
              <div style={styles.increment}>
                <button onClick={() => decraseCart(item.variant_id, item.quantity)}>-</button>
                {item.quantity}
                <button onClick={() => increaseCart(item.variant_id, item.quantity)}>+</button>
              </div>
            </p>
          ))
        }
         </div>
       ) :
       <p>There is nothing in your cart</p>
       }
       <p>{cart.item_count}</p>
       <p>Rp{cart.total_price / 100}</p>
        <div style={styles.increment}>
          <button onClick={clearCart}>Clear Cart</button>
          <a href="/cart"><button>Go to cart</button></a>
        </div>
    </div>
    </div>
  )
}
