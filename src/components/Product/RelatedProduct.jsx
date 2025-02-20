import { useState, useEffect, useContext } from "react"
import AppContext from "../../context/AppContext"
import { Link } from "react-router-dom"
export default function RelatedProduct({ category }) {
    const { products,addToCart } = useContext(AppContext)
    const [realtedProduct, setRelatedProduct] = useState([])
    useEffect(() => {
        // if(category && products){
            setRelatedProduct(products.filter((data) => data?.category?.toLowerCase() === category?.toLowerCase()))
        // }
    }, [category, products])
    return (
        <>
            <div className="container text-center">
                <h1>Related Product</h1>
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="container row d-flex justify-content-center align-items-center my-5">
                        {realtedProduct?.map((product) => <div key={product._id} className="container my-3 col-md-4 ">
                            <div className="card bg-dark text-center text-light" style={{ width: "18rem" }}>
                                <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                                    <img src={product.imgSrc} className="card-img-top" alt="..."
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            borderRadius: "10px",
                                            border: "2px solid yellow"
                                        }}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <div className="my-3">
                                        <button className="btn btn-primary mx-3">{product.price}{" "}₹</button>
                                        <button className="btn btn-warning" 
                                        onClick={()=>{addToCart(product._id,product.title,product.price,1,product.imgSrc)}}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>

                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}