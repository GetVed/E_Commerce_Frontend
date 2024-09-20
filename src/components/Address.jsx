import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
export default function Address() {
    const [formData, setFormData] = useState({
        fullName: '',
        country: '',
        state: '',
        city: '',
        pinCode: 0,
        phoneNumber: 0,
        address: ''
    })
    const navigate = useNavigate()
    const { shippingAddress, userAddress } = useContext(AppContext)

    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const { fullName, country, state, city, pinCode, phoneNumber, address } = formData

    const submitHandler = async (e) => {
        e.preventDefault()

        const result = await shippingAddress(fullName, country, state, city, pinCode, phoneNumber, address)

        if (result.success) {
            navigate('/Checkout')
        }

        setFormData({
            fullName: '',
            country: '',
            state: '',
            city: '',
            pinCode: 0,
            phoneNumber: 0,
            address: ''
        })
    }

    // console.log(formData)
    return (
        <>
            <div className="container my-5 p-4" style={{ border: "2px solid yellow", borderRadius: "10px" }}>
                <h1 className="text-center">Shipping Address</h1>
                <form className="my-3" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label className="form-label">FullName</label>
                            <input type="text" className="form-control bg-dark text-light" name='fullName' value={formData.fullName}
                                onChange={onChangeHandle} />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Country</label>
                            <input type="text" className="form-control bg-dark text-light" name='country' value={formData.country}
                                onChange={onChangeHandle} />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">State</label>
                            <input type="text" className="form-control bg-dark text-light" name='state' value={formData.state}
                                onChange={onChangeHandle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control bg-dark text-light" name='city' value={formData.city}
                                onChange={onChangeHandle} />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">PinCode</label>
                            <input type="number" className="form-control bg-dark text-light" name='pinCode' value={formData.pinCode}
                                onChange={onChangeHandle} />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Phone Number</label>
                            <input type="number" className="form-control bg-dark text-light" name='phoneNumber' value={formData.phoneNumber}
                                onChange={onChangeHandle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md">
                            <label className="form-label">AddressLine/Nearby</label>
                            <textarea type="text" className="form-control bg-dark text-light" name='address' value={formData.address}
                                onChange={onChangeHandle} />
                        </div>
                    </div>
                    <div className="d-grid col-6 mx-auto my-3">
                        <button type="submit" className="btn btn-primary" style={{fontWeight:'bold'}}>Submit</button>
                    </div>
                </form>
                {userAddress && (
                    <div className="d-grid col-6 mx-auto my-3">
                        <button type="submit" className="btn btn-warning" onClick={()=>navigate('/checkout')}
                         style={{fontWeight:'bold'}}>Use Old Address</button>
                    </div>
                )}
            </div>
        </>
    );
}