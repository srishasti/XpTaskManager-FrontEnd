import { useState } from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

const Register = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const credentials = {
            "username" : username,
            "password" : password,
        }

        try{
            await axios.post(`${apiUrl}/register`,credentials, 
                {
                    headers : {'Content-Type':'application/json'},
                    withCredentials : true,
                })
            console.log("user added!");
            navigate('/tasks');

        }
        catch(error) {
            console.log("error");
            if(error.response && error.response.status === 409) alert("Account with the username aleady exists");
            setUsername("");
            setPassword("");
        }
        


    }

    return (
        <div>
            <h1> Register </h1>

            <form onSubmit={handleSubmit}>

            <label> Username </label>
            <input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)} required></input>
            <br/>
            <label> Password </label>
            <input type= "text" value = {password} onChange={(e) => setPassword(e.target.value)} required></input>
            <br/>
            <button type="submit"> Register </button>

            </form>
            
            <br/><br/>
            <label> Have an account? <NavLink to='/login'> <u> Login </u> </NavLink></label>
        </div>
    );
};
export default Register;