import { useContext } from 'react';
import {Navigate, redirect, Route, Routes} from 'react-router-dom';
import AuthContext from './AuthContext';


const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext);
    
    return(
        <Route {...rest}>{!user ? <Navigate to={'/login'}/> : children}</Route>
    )
}   

export default PrivateRoute;