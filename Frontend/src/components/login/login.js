import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password} = user
        if(email && password){
        axios.post("https://authenticationjwtcookies.herokuapp.com/auth/login", user,{
            withCredentials: true
        })
        .then(res => {
            alert(res.data.message)
            console.log(res)
            setLoginUser(res.data.user)
            history.push("/")
        })
        .catch(err=>{
            alert(`Error Invalid Credential`)
        })
      }else{
        alert("Invlid Input")
      }

    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login