import { useState, useContext, useEffect } from "react"
import AppContext from "../context/AppContext"


export default function TableProducts({ cart }) {

    const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext)
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
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col" className="bg-dark text-light">Product Img</th>
                        <th scope="col" className="bg-dark text-light">Title</th>
                        <th scope="col" className="bg-dark text-light">Price</th>
                        <th scope="col" className="bg-dark text-light">Qty</th>
                        <th scope="col" className="bg-dark text-light">Qty++</th>
                        <th scope="col" className="bg-dark text-light">Qty--</th>
                        <th scope="col" className="bg-dark text-light">remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.items?.map((product) =>
                        <tr key={product._id}>
                            <td className="bg-dark text-light">
                                <img src={product.imgSrc} alt="" style={{ height: "50px", width: '50px', borderRadius:'5px',border:'1px solid yellow'}} />
                            </td>
                            <td className="bg-dark text-light">{product.title}</td>
                            <td className="bg-dark text-light">{product.price}</td>
                            <td className="bg-dark text-light">{product.qty}</td>
                            <td className="bg-dark text-light">
                                <span className="material-symbols-outlined" onClick={() => {
                                    addToCart(product.productId, product.title
                                        , product.price / product.qty, 1, product.imgSrc)
                                }} style={{ cursor: 'pointer' }}>
                                    add_circle
                                </span>
                            </td>
                            <td className="bg-dark text-light">
                                <span className="material-symbols-outlined" onClick={() => { decreaseQty(product.productId, 1) }}
                                    style={{ cursor: 'pointer' }}>
                                    do_not_disturb_on
                                </span>
                            </td>
                            <td className="bg-dark text-light">
                                <span className="material-symbols-outlined" onClick={() => {
                                    if (window.confirm("Are u sure , want to remove from cart")) {
                                        removeFromCart(product.productId)
                                    }
                                }
                                } style={{ cursor: 'pointer' }}>
                                    delete
                                </span>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td className="bg-dark text-light" colSpan={2}>
                            <button className="btn btn-primary" style={{ fontWeight: 'bold' }}>Total</button>
                        </td>
                        <td className="bg-dark text-light">
                            <button className="btn btn-warning" style={{ fontWeight: 'bold' }}>{price}</button>
                        </td>
                        <td className="bg-dark text-light">
                            <button className="btn btn-info" style={{ fontWeight: 'bold' }}>{qty}</button>
                        </td>
                        <td className="bg-dark text-light" colSpan={3}>

                        </td>
                       
                    </tr>
                </tbody>
            </table>
        </>
    )
}