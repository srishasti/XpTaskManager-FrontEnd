
import {useState} from 'react'
import axios from 'axios'
import {Navigate, NavLink, useNavigate} from 'react-router-dom'

const Login = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(username);
        console.log(password);
        console.log("---");

        const credentials = {
            username: username,
            password: password,
        };

        try{
            const response = await axios.post(`${apiUrl}/login`, credentials,
                {
                    headers: { 'Content-Type':'application/json',},
                    withCredentials : true,
                }
            );
            console.log("Login successful");

            navigate(`/tasks`)

        }
        catch(error){
            alert("Invalid username or password");
            setUsername("");
            setPassword("");
        }
        

    }
    
    
    return(
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <label> Username </label>
                <input type = 'text' value={username} onChange={(e) => setUsername(e.target.value)} />
                <br></br>
                <label> Password </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <button type='submit'> Login </button>
            </form>

            <br/><br/>
            <label> Don't have an account? </label>
            <NavLink to="/register">
                <u> Sign Up </u>
            </NavLink>
        </div>
    );
};
export default Login;
