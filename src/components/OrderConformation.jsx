import AppContext from "../context/AppContext"
import {useNavigate} from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ShowOrderProducts from "./ShowOrderProducts"
export default function OrderConformation() {
    const { userOrder } = useContext(AppContext)
    const [latestOrder, setLatestOrder] = useState({})
    useEffect(() => {
        if (userOrder) {
            setLatestOrder(userOrder[0])
        }
    }, [userOrder])
    const navigate=useNavigate()
    return (
        <>
            <div className="container my-5">
                <h1 className="text-center">Your order has been confirm,</h1>
                <h3 className="text-center">It will delivered soon...</h3>
            </div>

            <div className="container">


                <table className="table table-bordered border-primary ">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-dark text-light text-center">OrderItems</th>
                            <th scope="col" className="bg-dark text-light text-center">OrderDetails & Shipping Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-dark text-light text-center">
                                 <ShowOrderProducts items={latestOrder?.orderItems}/>
                            </td>
                            <td className="bg-dark text-light">
                                <ul style={{ fontWeight: 'bold' }}>
                                    <li>OrderId:{"  "}{latestOrder?.orderId}</li>
                                    <li>PaymentId:{"  "}{latestOrder?.paymentId}</li>
                                    <li>Payment Status :{"  "}{latestOrder?.payStatus}</li>
                                    <li>Order Date:{"  "}{latestOrder?.orderDate}</li>
                                    <li>Name:{"  "}{latestOrder?.userShipping?.fullName}</li>
                                    <li>Phone:{"  "}{latestOrder?.userShipping?.phoneNumber}</li>
                                    <li>Country:{"  "}{latestOrder?.userShipping?.country}</li>
                                    <li>State:{"  "}{latestOrder?.userShipping?.state}</li>
                                    <li>City:{"  "}{latestOrder?.userShipping?.city}</li>
                                    <li>PinCode:{"  "}{latestOrder?.userShipping?.pinCode}</li>
                                    <li>Near By:{"  "}{latestOrder?.userShipping?.address}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <div className="container text-center my-5">
                <button className="btn btn-secondary btn-lg" style={{fontWeight:'bold'}} onClick={()=>(navigate('/orders'))}>All Orders</button>
            </div> */}

        </>
    )
}