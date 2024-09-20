import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const { login } = useContext(AppContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const { email, password } = formData
    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await login(email, password)
        if (result.success) {
            navigate('/')
        }
        // setFormData({name:'',email:'',password:''})
        // console.log(formData)
    }

    return (
        <>
            <div className="container my-5 p-4" style={{ width: "600px", border: "2px solid yellow", borderRadius: "10px" }}>
                <h1 className="text-center">User Login</h1>
                <form className="my-3" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' value={formData.email} onChange={onChangeHandle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={formData.password} onChange={onChangeHandle} />
                    </div>
                    <div className="d-grid col-6 mx-auto my-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}