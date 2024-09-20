import { useState,useEffect, useContext } from "react"
import AppContext from "../context/AppContext"

export default function AllOrders(){
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const {userOrder}=useContext(AppContext)

    // console.log(userOrder?.orderItems)

    useEffect(() => {
        let qty = 0
        let price = 0
        if (userOrder?.orderItems) {
            for (let i = 0; i < userOrder?.orderItems?.length; i++) {
                qty += userOrder?.orderItems[i].qty
                price += userOrder?.orderItems[i].price
            }
        }
       
        setQty(qty)
        setPrice(price)
    }, [userOrder?.orderItems])
   
    return(
        <>
        <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col" className="bg-dark text-light">Product Img</th>
                        <th scope="col" className="bg-dark text-light">Title</th>
                        <th scope="col" className="bg-dark text-light">Price</th>
                        <th scope="col" className="bg-dark text-light">Qty</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {userOrder.orderItems?.map((product) =>
                        <tr key={product._id}>
                            <td className="bg-dark text-light">
                                <img src={product.imgSrc} alt="" style={{ height: "50px", width: '50px', borderRadius:'5px',border:'1px solid yellow'}} />
                            </td>
                            <td className="bg-dark text-light">{product.title}</td>
                            <td className="bg-dark text-light">{product.price}</td>
                            <td className="bg-dark text-light">{product.qty}</td>
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
                     
                       
                    </tr>
                </tbody>
            </table>
        </>
    )
}