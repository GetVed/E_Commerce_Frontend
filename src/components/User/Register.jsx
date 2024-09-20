import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const {register}=useContext(AppContext)
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate=useNavigate()
    const onChangeHandle=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
    const {name,email,password}=formData
    const submitHandler=async (e)=>{
        e.preventDefault()
       const result= await register(name,email,password)
         if(result.success){
            navigate('/login')
         }
        //setFormData({name:'',email:'',password:''})
        // console.log(formData)
    }
   
    return (
        <>
            <div className="container my-5 p-4" style={{width:"600px",border:"2px solid yellow",borderRadius:"10px"}}>
                <h1 className="text-center">User Register</h1>
                <form className="my-3" onSubmit={submitHandler}>
                <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={formData.name} onChange={onChangeHandle}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' value={formData.email} onChange={onChangeHandle}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={formData.password} onChange={onChangeHandle}/>
                    </div>
                    <div className="d-grid col-6 mx-auto my-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}