import { useContext ,useEffect,useState} from "react"
import AppContext from "../context/AppContext"
import TableProducts from "./TableProducts"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Checkout() {

    const { cart, userAddress,url,user,clearCart } = useContext(AppContext)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate=useNavigate()

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

    const handlePayment=async()=>{
        try{
          const orderResponse=await axios.post(`${url}/payment/checkout`,{
            amount:price*100,
            qty:qty,
            cartItems:cart?.items,
            userShipping:userAddress,
            userId:user._id
          })
          //console.log(orderResponse)

        const {orderId,amount:orderAmount}=orderResponse.data
        //  console.log(orderAmount)
        const options = {
            key: 'rzp_test_8PD6uolakhKKen', // Replace with your Razorpay key_id
            amount: orderAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'E-Commerce',
            description: 'E-Commerce',
            order_id:orderId, // This is the order_id created in the backend
            handler:async function(response){
                const paymentData={
                    orderId:response.razorpay_order_id,
                    paymentId:response.razorpay_payment_id,
                    signature:response.razorpay_signature,
                    amount:orderAmount,
                    orderItems:cart?.items,
                    userId:user._id,
                    userShipping:userAddress
                }
                
                const api=await axios.post(`${url}/payment/verify-payment`,paymentData)
                //    console.log(api.data)
                if(api.data.success){
                    navigate('/orderConformation')
                    clearCart()
                }
            },

            prefill: {
              name: 'E-commerce',
              email: 'commerce@gmail.com',
              contact: '9001414962'
            },
            theme: {
              color: '#F37254'
            },
          };
        //  console.log(options)
          const rzp = new window.Razorpay(options);
          rzp.open()

        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="container my-3">
                <h1 className="text-center">Order Summary</h1>

                <table className="table table-bordered border-primary ">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-dark text-light text-center">Product's Detail</th>
                            <th scope="col" className="bg-dark text-light text-center">Shipping Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-dark text-light text-center">
                                <TableProducts cart={cart} />
                            </td>
                            <td className="bg-dark text-light">
                                <ul style={{ fontWeight: 'bold' }}>
                                    <li>Name:{"  "}{userAddress?.fullName}</li>
                                    <li>Phone:{"  "}{userAddress?.phoneNumber}</li>
                                    <li>Country:{"  "}{userAddress?.country}</li>
                                    <li>State:{"  "}{userAddress?.state}</li>
                                    <li>City:{"  "}{userAddress?.city}</li>
                                    <li>PinCode:{"  "}{userAddress?.pinCode}</li>
                                    <li>Near By:{"  "}{userAddress?.address}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="container text-center my-5">
                <button className="btn btn-secondary btn-lg" style={{fontWeight:'bold'}} onClick={handlePayment}>Proceed to Pay</button>
            </div>
        </>
    )
}