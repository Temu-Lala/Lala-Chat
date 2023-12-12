import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { baseUrl } from '../../base';
import { useHistory,Link } from "react-router-dom";
import './register.css';
import AdsClickIcon from '@mui/icons-material/AdsClick';


export default function Register(props) {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [fullnameReg, setFullnameReg] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    let history = useHistory()
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(baseUrl+"/login").then((response) => {
          if (response.data.loggedIn == true) {
            props.setusername(response.data.user[0].username);
            history.push('/');
          }
        });
    }, []);

    const register = (e) => {
        e.preventDefault();
        Axios.post(baseUrl+"/register", {
          username: usernameReg,
          password: passwordReg,
          fullname: fullnameReg,
        }).then((response) => {
          console.log(response);
          setRegisterStatus(response.data.message);
        });
    };
   
    return (
        <div className="register_container">
            
            <h3>Register</h3>
            <form onSubmit={register} className="register_form">
                    <label for="username">Company User Name</label>
                    <input className='inp' id="username" type="text" onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}></input>
                    <label for="fullname">Company Full Name</label>
                    <input className='inp' id="fullname" type="text" onChange={(e) => {
                        setFullnameReg(e.target.value);
                    }}></input>
                    <label for="password">Password</label>
                    <input className='inp' id="password" type="password"
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }}></input>
                <div>
                    <button type="submit" className="register-btn btn mt-3" style={{backgroundColor: "black"}} >Register</button>
                </div>
                <div className="text-center">
                    <Link to="/login" className="mt-2" style={{color: "black"}}>if you have an Account cleack hear to back Login Page <AdsClickIcon/></Link>
                </div>
            </form>
            <h3>{registerStatus}</h3>
        </div>
    )
}