import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';


const baseURL = 'http://62.148.235.159:8000'


const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        console.log("first refresh")
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/login/refresh`, {
            refresh: authTokens.refresh
          }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    axiosInstance.interceptors.response.use(async function (resp)
    {
        console.log("second refresh")
        const response = await axios.post(`${baseURL}/login/refresh`, {
            refresh: authTokens.refresh
          }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          });
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        return resp
    }, function(error){

    })
    
    return axiosInstance
}

export default useAxios;