import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from 'axios'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppState(props) {
    // const url = 'http://localhost:3600/api'
    const url='https://e-commerce-was9.onrender.com/api'

    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [user, setUser] = useState('')
    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)
    const [userAddress,setUserAddress]=useState('')
    const [userOrder,setUserOrder]=useState([])

    // console.log(filteredData)
    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {

                headers: {
                    "content-Type": "Application/json"
                },
                withCredentials: true
            })
            setProducts(api.data.products)
           
            userProfile()
            // console.log(api.data.products)
            userCart()
        }
        fetchProduct()
        getAddress()
        user_Order()

    }, [token, reload])
    
    useEffect(() => {
        let lsToken = localStorage.getItem('token')
        // console.log(lsToken)
        if (lsToken) {
            setToken(lsToken)
            setIsAuthenticated(true)
        }
    }, [])

    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`, { name, email, password }, {

            headers: {
                "content-Type": "Application/json"
            },
            withCredentials: true
        })
        // console.log(api)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data
        // alert(api.data.message)
    }

    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`, { email, password }, {

            headers: {
                "content-Type": "Application/json"
            },
            withCredentials: true
        })
        // console.log(api)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        // console.log(api.data.token)
        setToken(api.data.token)
        setIsAuthenticated(true)
        localStorage.setItem('token', api.data.token)
        return api.data
    }


    const logout = () => {

        // console.log(api)
        toast.success("Logout Successfully...!", {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        // console.log(api.data)
        setToken('')
        setIsAuthenticated(false)
        localStorage.removeItem('token')
    }


    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        })
        setUser(api.data.user)
        // console.log(api.data)
    }

    const addToCart = async (productId, title, price, qty, imgSrc) => {
        const api = await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc }, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        // console.log(api.data)
    }


    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        setCart(api.data.cart)
        setReload(!reload)
    }


    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(`${url}/cart/--qty`, { productId, qty }, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setReload(!reload)
    }

    const removeFromCart = async (productId) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setReload(!reload)
    }

    const clearCart = async () => {
        const api = await axios.delete(`${url}/cart/clear`, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setReload(!reload)
    }


    const shippingAddress = async (fullName,country,state,city,pinCode,phoneNumber,address) => {
        const api = await axios.post(`${url}/address/add`,{fullName,country,state,city,pinCode,phoneNumber,address}, {

            headers: {
                "content-Type": "Application/json",
                'Auth': token
            },
            withCredentials: true
        })
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1498,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
      return api.data
    }


    const getAddress= async ()=>{
        const api = await axios.get(`${url}/address/get`, {

            headers: {
                "content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true
        })
      setUserAddress(api.data.userAddress)
    }


    const user_Order= async ()=>{
        const api = await axios.get(`${url}/payment/userOrder`, {

            headers: {
                "content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true
        })
     setUserOrder(api.data)
    }


    return (
        <>
            <AppContext.Provider value={{
                products, register, login, url, token, setIsAuthenticated, isAuthenticated,
                filteredData, setFilteredData, logout, userProfile, user, addToCart, userCart, cart,
                decreaseQty,removeFromCart,clearCart,shippingAddress,userAddress,userOrder
            }}>
                {props.children}
            </AppContext.Provider>
        </>
    );
}