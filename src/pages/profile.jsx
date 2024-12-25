import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'

const Profile = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState({});

    useEffect (
        () => {

            axios.get(`${apiUrl}/profile`, {withCredentials : true})
            .then ((response) => {
                setUser(response.data);
            })
            .catch((error)=>{ console.log("error") })
    
        }
    ,[])

    return (
        <div>

            
            <h1> {user.username} </h1>
            <br />
            <h3> Level : {user.level} </h3>
            <label> XP </label> <br/>
            <progress value = {user.xp} max = "200"> </progress> <span>{user.xp}/200</span>
            <br/><br/>
            <label> Health </label><br/>
            <progress value = {user.health} max = "100"> {user.health} </progress> <span>{user.health}/100</span>
 

        </div>
    );

}

export default Profile;