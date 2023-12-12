import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import sendIcon from '../sendIcon.svg';
import chatImage from './chat.png'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import fileupload from './file.png'
import {DatePicker} from '@gsebdev/react-simple-datepicker';

//import ReactDOM from 'react-dom';
import Axios from 'axios';
import { baseUrl } from '../base';
import wellcomechat from './chat.png'
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import { colors } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
const socket = io(baseUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

function Chat(props) {

    const history = useHistory()
    //const sender = props.user.sender;
    //const receiver = props.user.receiver;
    const username = props.username;
    const table_name = props.table_id;
   
    const [msg, setMsg] = useState('');
    const [media,setMedia] = useState(null);
    const [chats, setChats] = useState([]);
    const [receiver, setReceiver] =useState('');
    const base = baseUrl;
    const messageRef = useRef();
    const textInput = React.useRef();
    const fileinput = React.useRef();
    const clearInput = () => (textInput.current.value = "",
    fileinput.current.value =null);


    // function clearInput()
    // {
    //     extInput.current.value = "",
    // fileinput.current.value =null

    // }

    //operations to perform when a different chat is loaded
    useEffect(() => {

        //check if a chat is selected
        if (table_name !== 'DEFAULT') {
            //retrieve chats
            Axios.get(base + "/chat", {
                params: {
                    table_name: table_name
                }
            }).then(response => {
                setChats(response.data);
            });

            //retrieve receiver from user chat map table & set read receipts
            Axios.get(base + "/receiver", {
                params: {
                    user: props.username,
                    table_id: table_name
                }
            }).then(response => {
                setReceiver(response.data);
            });

            socket.on('message', (msgObj) => {
                setChats(msgObj);
            })
        }
    }, [props]);





    //scroll to bottom
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }

    })



    //send message
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const d = new Date();
        const msgId = username + receiver + Date.now();
        const msgObj = { table_name: table_name, msgId: msgId, sender: username, receiver: receiver, msg: msg, img:media?.name,time: d };
     
        const newChat = [...chats, msgObj];
        const formData = new FormData();
        formData.append('image', media);
        formData.append('userdata', JSON.stringify(msgObj));

        setChats(newChat);
        socket.emit('message', newChat);
        //console.log(msgObj);
        Axios.post(base + "/send",formData, {
            userdata: msgObj,
        }).then(() => {
            alert("success");
        });
       
    }

    const logout = ()=>{
        axios.get(base+"/logout").then(response =>{
            console.log(response.data)
            history.replace("/login");
        })
    };


    



    const chatdisplay =
        <div className="box">
            
            <div className=" chat-header container-name text-left d-flex justify-content-between align-content-center">
                <div> <AccountBoxIcon/>{receiver} </div>
                
                <button onClick={logout} className="logoutBtn">
                    Logout <LogoutIcon className='logout-icon'/>{" "}
                </button>
            </div>
            <div class="messageDataCont">
                <div class="messageData">
                    <div className='conversation-contener'> 
                    {chats.map(data => (
                        <p class={data.receiver === username ? "left" : "right"} ref={messageRef}  >
                            <div class="data">{data.msg}</div>
                            <div class="time "  >{(new Date(data.time).getHours() % 12 || 12) + ":" + ("0" + new Date(data.time).getMinutes()).slice(-2) + " " + (new Date(data.time).getHours() > 11 ? "PM" : "AM")}&ensp;
                            <div class="readreceipts " style={{color: "white"}}>{(data.status === 'READ' ? "✔" : " ")}&#x2714;</div></div>
                            <span class="clear"></span>
                            <img src={'http://localhost:3003/'+data.img}   onClick={()=>window.open('http://localhost:3003/'+data.img,'_blank')}  style={{width:"100px"}}></img>

                        </p>
                    ))}
                    </div>
                </div>
            </div>
            <div class="messageCont">
                <form onSubmit={handleSubmit} className="d-flex">
                    
                    <label>
                        <input
                            ref={textInput}
                            type="text"
                            placeholder="Type your message here"
                            onChange={e => setMsg(e.target.value)}
                        />
                        <input
                            ref={fileinput}
                            type="file"
                            placeholder="Type your message here"
                           
                            onChange={e => setMedia(e.target.files[0])}
                        />
                    </label>
                    <div></div>
                    <div className="sendMsg">

                        <button className='sendbut' type="submit" onClick={clearInput} src={SendIcon}><SendIcon/></button>
                    </div>
                </form>
            </div>
        </div>;



    const nulldisplay =
        <div className="box">
            <div className=" chat-header container-name text-left d-flex justify-content-between align-content-center">
                <div className='user-name'> User</div>
                
                <button onClick={logout} className="logoutBtn">
                    Logout <LogoutIcon className='logout-icon'/>{" "}
                </button>
            </div>
            <div class="messageDataCont">
                <div class="messageData">
                   
                    <div class="default">
                        <img src={chatImage} alt='chat' className='home-chat-image'/>
                        <div className='default-bottom'>
                        <span className='home-prompt'>Welcome <span>{username}</span>,<br />Click a user name to start a chat !</span>
                        <span>Made by: <br />@TemuLala </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;


    return (
      
        <div>
            {table_name === 'DEFAULT' ? nulldisplay : chatdisplay}
        </div>

    );
}

export default Chat;


