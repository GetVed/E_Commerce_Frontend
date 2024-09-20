import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import ShowProduct from "./components/Product/ShowProduct";
import ProductDetails from './components/Product/ProductDetails';
import SearchProduct from './components/Product/SearchProduct';
import Register from './components/User/Register';
import Login from './components/User/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/User/Profile';
import Cart from './components/Cart';
import Address from './components/Address';
import Checkout from './components/Checkout';
import OrderConformation from './components/OrderConformation';
import AllOrders from './components/AllOrders';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<ShowProduct />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/product/search/:term' element={<SearchProduct />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Address/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/orderConformation' element={<OrderConformation/>}/>
          {/* <Route path='/orders' element={<AllOrders/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
