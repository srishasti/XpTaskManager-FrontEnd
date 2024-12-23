import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        
        <div> 

        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/tasks"> Tasks </NavLink>
        <NavLink to="/profile"> Profile </NavLink>

        </div>
    );
};
export default NavBar;