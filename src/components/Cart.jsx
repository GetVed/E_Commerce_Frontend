import { useContext, useEffect, useState } from "react"
import AppContext from "../context/AppContext"
import { NavLink } from "react-router-dom"

export default function Cart() {

    const { cart, decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        let qty = 0
        let price = 0
        if (cart?.items) {
            for (let i = 0; i < cart?.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }
        }
        setQty(qty)
        setPrice(price)
    }, [cart])

    return (
        <>
            {cart.items.length == 0 ? (
                <div className="text-center my-5">
                    <NavLink to={'/'} className="btn btn-warning">Countinue Shopping....</NavLink>
                </div>

            ) : (
                <>
                    <div className="my-5 text-center">
                        <button className="btn btn-info mx-3" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>Total Qty:-{qty}</button>
                        <button className="btn btn-warning mx-3" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>Total Price:-{price}</button>
                    </div>
                    {cart?.items?.map((product) => <div key={product._id} className="container bg-dark my-5 p-3 text-center">
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <NavLink to={`/product/${product.productId}`} className="cart_img">
                                <img src={product.imgSrc} alt="" style={{ width: "100px", height: "100px", borderRadius: "10px", border: '2px solid yellow' }} />
                            </NavLink>
                            <div className="cart_desc">
                                <h3>{product.title}</h3>
                                <h4>{product.price}</h4>
                                <h4>Qty:-{product.qty}</h4>
                            </div>
                            <div className="cart_action">
                                <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}
                                    onClick={() => { decreaseQty(product.productId, 1) }}>
                                    <span class="material-symbols-outlined">
                                        remove
                                    </span>
                                </button>
                                <button className="btn btn-info mx-3" style={{ fontWeight: "bold" }}
                                    onClick={() => {
                                        addToCart(product.productId, product.title
                                            , product.price / product.qty, 1, product.imgSrc)
                                    }}
                                ><span class="material-symbols-outlined">
                                        add
                                    </span></button>
                                <button className="btn btn-danger mx-3" style={{ fontWeight: "bold" }}
                                    onClick={() => {
                                        if (window.confirm("Are u sure , want to remove from cart")) {
                                            removeFromCart(product.productId)
                                        }
                                    }
                                    }
                                >Remove</button>
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="container text-center my-5">
                        <NavLink to={'/shipping'} className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}>Check Out</NavLink>
                        <button className="btn btn-danger mx-3" style={{ fontWeight: "bold" }}
                            onClick={() => {
                                if (window.confirm("Are u sure , want to clear Cart")) {

                                    clearCart()
                                }
                            }
                            }
                        >Clear Cart</button>
                    </div>
                </>

            )}
        </>

        //2nd way
        // <>
        // {cart?.items?.length>0 && (
        //     <div className="my-5 text-center">
        //         <button className="btn btn-info mx-3" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>Total Qty:-{qty}</button>
        //         <button className="btn btn-warning mx-3" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>Total Price:-{price}</button>
        //     </div>
        //     )}
        //     {cart?.items?.map((product) => <div key={product._id} className="container bg-dark my-5 p-3 text-center">
        //         <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        //             <NavLink to={`/product/${product.productId}`} className="cart_img">
        //                 <img src={product.imgSrc} alt="" style={{ width: "100px", height: "100px", borderRadius: "10px" ,border:'2px solid yellow'}} />
        //             </NavLink>
        //             <div className="cart_desc">
        //                 <h3>{product.title}</h3>
        //                 <h4>{product.price}</h4>
        //                 <h4>Qty:-{product.qty}</h4>
        //             </div>
        //             <div className="cart_action">
        //                 <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}
        //                     onClick={() => { decreaseQty(product.productId, 1) }}>
        //                     <span class="material-symbols-outlined">
        //                         remove
        //                     </span>
        //                 </button>
        //                 <button className="btn btn-info mx-3" style={{ fontWeight: "bold" }}
        //                     onClick={() => {
        //                         addToCart(product.productId, product.title
        //                             , product.price / product.qty, 1, product.imgSrc)
        //                     }}
        //                 ><span class="material-symbols-outlined">
        //                         add
        //                     </span></button>
        //                 <button className="btn btn-danger mx-3" style={{ fontWeight: "bold" }}
        //                 onClick={()=>
        //               {
        //                 if(window.confirm("Are u sure , want to remove from cart")){
        //                     removeFromCart(product.productId)
        //                 }
        //               }
        //             }
        //                 >Remove</button>
        //             </div>
        //         </div>
        //     </div>
        //     )}

        //     {cart?.items?.length>0 && (
        //     <div className="container text-center my-5">
        //         <NavLink to={'/shipping'} className="btn btn-warning mx-3" style={{fontWeight:"bold"}}>Check Out</NavLink>
        //         <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}}
        //          onClick={()=>{
        //             if(window.confirm("Are u sure , want to clear Cart")){

        //                 clearCart()
        //             }
        //         }
        //         }
        //          >Clear Cart</button>
        //     </div>
        //     )}
        //     {cart?.items?.length===0 && (
        //         <div className="text-center my-5">
        //             <NavLink to={'/'} className="btn btn-warning">Countinue Shopping....</NavLink>
        //         </div>
        //     )}
        // </>
    )
}