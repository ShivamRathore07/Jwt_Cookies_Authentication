import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        fullname: "",
        location: "",
        number:"",
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const register = () => {
        const { fullname, number, location, email, password} = user
        if(fullname && number && location && email && password){
            axios.post("https://authenticationjwtcookies.herokuapp.com/auth/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}

            <h1>Register</h1>
            <input type="text" name="fullname" value={user.username} placeholder="Your Name" onChange={ handleChange }/>
            <input type="text" name="location" value={user.location} placeholder="Location" onChange={handleChange}/> 
            <input type="number" name="number" value={user.number} placeholder="Mobile Number" onChange={handleChange}/>
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }/>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }/>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register