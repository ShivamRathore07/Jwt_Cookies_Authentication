import React, { useEffect } from "react"
import "./homepage.css"
import axios from "axios"
 

const Homepage = ({setLoginUser, user}) => { 
 
 useEffect(()=>{
    axios.get("https://authenticationjwtcookies.herokuapp.com/auth/private",{
        withCredentials: true
    })
 },[user])
    const handleLogout=()=>{        
        axios.get("https://authenticationjwtcookies.herokuapp.com/auth/logout",{
            withCredentials: true
        })
        .then(res => {  
          if(res.status===200){
            setLoginUser({})
          }    
        })
    }

    return (
        <>
        <div className="homepage">
            <h1>{`Hello Homepage`}</h1>
            <div className="button" onClick={() => handleLogout()} >Logout</div>
        <div>
          <table id="customers">
                <tr>
                    <th>Fullname</th>
                    <th>Location</th>
                    <th>Mobile Number</th>
                    <th>email</th>
                </tr>
       
                <tr>
                    <td>{user.fullname}</td>
                    <td>{user.location}</td>
                    <td>{user.number}</td>
                    <td>{user.email}</td>
                </tr>  
            </table>
        </div>
        </div>
    </>)
}
 

export default Homepage