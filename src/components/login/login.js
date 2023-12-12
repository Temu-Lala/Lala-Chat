import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { baseUrl } from '../../base';
import { useHistory,Link } from "react-router-dom";
import './login.css';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';
import AdsClickIcon from '@mui/icons-material/AdsClick';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    let history = useHistory();
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(baseUrl+"/login").then((response) => {
          if (response.data.loggedIn == true) {
            console.log(response.data);
            setLoginStatus(response.data.user[0].username);
            props.setusername(response.data.user[0].username);
            history.push('/');
          }
        });
    }, []);

    const login = (e) => {
        e.preventDefault();
        Axios.post(baseUrl+"/login", {
            username: username,
            password: password,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            }
            else{
                setLoginStatus(response.data[0].username);
                props.setusername(response.data[0].username);
                history.push('/');
            }
        });
    };

    return (
        <div className="login-container" >
            
            <h3>Login</h3>
            <form onSubmit={login} className="login-form "   >
                    <label for="username"> <PersonIcon />Company User Name</label>
                    
                    <input id="username" className='loginuname'  type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}></input>
                    <label for="password">< KeyIcon /> Password  </label>
                    <input id="password" className='loginuname' type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}></input>
                    <div>
                        
                        <button type="submit" className="login-btn btn mt-3"   >Login  <LoginIcon className='login-icon'/>   </button>
                    </div>
                    <div className="bottom-text text-center">
                    <p>If  you have no Account register <Link to="/register" className="register-link mt-2" style={{color: "teal"}}> here<AdsClickIcon/> </Link></p>
                    
                </div>
            </form>
            <p className='status-text'>{loginStatus}</p>
        </div>
    )
}