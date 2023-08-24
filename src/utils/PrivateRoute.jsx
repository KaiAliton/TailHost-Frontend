import { useContext } from 'react';
import {Navigate, redirect, Route, Routes} from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext);
    
    return user ? <>{children}</> : <Navigate to={"/login"}/>
}   

export default PrivateRoute;