import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";


export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('')
    const { setFilteredData, products, logout, isAuthenticated,cart } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/product/search/${searchTerm}`)
        setSearchTerm('')
    }
    const filterByCategory = (category) => {
        const p=products?.filter((data) =>data?.category?.toLowerCase() === category?.toLowerCase())
        // console.log(p)
        setFilteredData(p)
    }
  
    const filterByPrice = (price) => {
        const pri=products?.filter((data) => data?.price >= price)
        setFilteredData(pri)
    }

    // console.log(searchTerm)
    return (
        <>
            <div className="nav sticky-top" >
                <div className="nav-bar">
                    <NavLink to={'/'} className="left" style={{ textDecoration: 'none', color: 'white' }}>
                        <h1>E-Commerce</h1>
                    </NavLink>
                    <form className="search-bar" onSubmit={handleSubmit}>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <input type='text' placeholder="Search Products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                    <div className="right">
                        {isAuthenticated ? (
                            <>
                                <NavLink to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
                                    <span className="material-symbols-outlined">
                                        shopping_cart
                                    </span>
                                    {cart?.items?.length>0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cart?.items?.length}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                    )}
                                </NavLink>
                                <NavLink to={'/profile'} className="btn btn-info mx-3">Profile</NavLink>
                                <NavLink to={'/'} className="btn btn-danger mx-3" onClick={() => { logout() }}>Logout</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to={'/login'} className="btn btn-secondary mx-3">Login</NavLink>
                                <NavLink to={'/register'} className="btn btn-info mx-3">Register</NavLink>
                            </>
                        )
                        }
                    </div>
                </div>
                {location.pathname === '/' && (
                    <div className="sub-bar">
                        <div className="items" onClick={() => setFilteredData(products)}>No Filter</div>
                        <div className="items" onClick={() => filterByCategory("laptops")}>Laptops</div>
                        <div className="items" onClick={() => filterByCategory("mobiles")}>Mobiles</div>
                        <div className="items" onClick={() => filterByCategory("tablets")}>Tablets</div>
                        <div className="items" onClick={() => filterByCategory("cameras")}>Camera's</div>
                        <div className="items" onClick={() => filterByCategory("earphones")}>Earphones</div>
                        <div className="items" onClick={() => filterByPrice(15999)}>15999</div>
                        <div className="items" onClick={() => filterByPrice(25999)}>25999</div>
                        <div className="items" onClick={() => filterByPrice(49999)}>49999</div>
                        <div className="items" onClick={() => filterByPrice(69999)}>69999</div>
                        <div className="items" onClick={() => filterByPrice(89999)}>89999</div>
                    </div>
                )}
                <Outlet />
            </div>
        </>
    );
}