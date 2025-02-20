import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";


export default function ProductDetails() {
    const {addToCart}=useContext(AppContext)
    const { id } = useParams()
    const url = 'http://localhost:3600/api'
    const [product, setProduct] = useState('')
    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/${id}`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            setProduct(api.data.product)
            //  console.log(api.data.product)
        }
        fetchProduct()
    }, [id])
    return (
        <>
            <div className="container my-5 text-center" style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <div className="left">
                    <img src={product?.imgSrc} alt="..." style={{ width: "250px", height: "250px", borderRadius: '10px', border: '2px solid yellow' }} />
                </div>
                <div className="right">
                    <h1>{product?.title}</h1>
                    <p>{product?.description}</p>
                    <h1>{product?.price}{" "}₹</h1>
                    <div className="my-5">
                        <button className="btn btn-danger mx-3" style={{ fontWeight: 'bold' }}>Buy Now</button>
                        <button className="btn btn-warning" style={{ fontWeight: 'bold' }} 
                        onClick={()=>{addToCart(product._id,product.title,product.price,1,product.imgSrc)}}>Add To Cart</button>
                    </div>
                </div>
            </div>

            <RelatedProduct category={product?.category} />

        </>
    );
}