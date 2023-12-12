// hear is my code now i went to add send file properties and the the file stored in the databases  so give me the code based on my code 

// /components.chatjs
// import React, { useEffect, useRef, useState } from 'react';
// import './chat.css';
// import sendIcon from '../sendIcon.svg';
// //import ReactDOM from 'react-dom';
// import Axios from 'axios';
// import { baseUrl } from '../base';
// import wellcomechat from './chat.png'

// import io from 'socket.io-client';
// import { colors } from '@mui/material';
// const socket = io(baseUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

// function Chat(props) {
//     //const sender = props.user.sender;
//     //const receiver = props.user.receiver;
//     const username = props.username;
//     const table_name = props.table_id;
//     const [msg, setMsg] = useState('');
//     const [chats, setChats] = useState([]);
//     const [receiver, setReceiver] = useState('');
//     const base = baseUrl;
//     const messageRef = useRef();
//     const textInput = React.useRef();
//     const clearInput = () => (textInput.current.value = "");

//     //operations to perform when a different chat is loaded
//     useEffect(() => {

//         //check if a chat is selected
//         if (table_name !== 'DEFAULT') {
//             //retrieve chats
//             Axios.get(base + "/chat", {
//                 params: {
//                     table_name: table_name
//                 }
//             }).then(response => {
//                 setChats(response.data);
//             });

//             //retrieve receiver from user chat map table & set read receipts
//             Axios.get(base + "/receiver", {
//                 params: {
//                     user: props.username,
//                     table_id: table_name
//                 }
//             }).then(response => {
//                 setReceiver(response.data);
//             });

//             socket.on('message', (msgObj) => {
//                 setChats(msgObj);
//             })
//         }
//     }, [props]);


//     //scroll to bottom
//     useEffect(() => {
//         if (messageRef.current) {
//             messageRef.current.scrollIntoView(
//                 {
//                     behavior: 'smooth',
//                     block: 'end',
//                     inline: 'nearest'
//                 })
//         }

//     })



//     //send message
//     const handleSubmit = (evt) => {
//         evt.preventDefault();
//         const d = new Date();
//         const msgId = username + receiver + Date.now();
//         const msgObj = { table_name: table_name, msgId: msgId, sender: username, receiver: receiver, msg: msg, time: d };
//         const newChat = [...chats, msgObj];
//         setChats(newChat);
//         socket.emit('message', newChat);
//         //console.log(msgObj);
//         Axios.post(base + "/send", {
//             userdata: msgObj,
//         }).then(() => {
//             alert("success");
//         });
//     }


//     const chatdisplay =
//         <div className="box">
            
//             <div className="container-name text-left">
//                 {receiver}
//             </div>
//             <div class="messageDataCont">
//                 <div class="messageData">
//                     <div className='conversation-contener'> 
//                     {chats.map(data => (
//                         <p class={data.receiver === username ? "left" : "right"} ref={messageRef}  style={{backgroundColor: "White"}} >
//                             <div class="data">{data.msg}</div>
//                             <div class="time"  style={{color: "black"}} >{(new Date(data.time).getHours() % 12 || 12) + ":" + ("0" + new Date(data.time).getMinutes()).slice(-2) + " " + (new Date(data.time).getHours() > 11 ? "PM" : "AM")}&ensp;
//                             <div class="readreceipts">{(data.status === 'READ' ? "✔" : " ")}&#x2714;</div></div>
//                             <span class="clear"></span>
//                         </p>
//                     ))}
//                     </div>
//                 </div>
//             </div>
//             <div class="messageCont">
//                 <form onSubmit={handleSubmit} className="d-flex">
//                     <label>
//                         <input
//                             ref={textInput}
//                             type="text"
//                             placeholder="Type your message here"
//                             onChange={e => setMsg(e.target.value)}
//                         />
//                     </label>
//                     <div className="sendMsg">

//                         <button type="submit" onClick={clearInput} src={sendIcon}><img src={sendIcon}></img></button>
//                     </div>
//                 </form>
//             </div>
//         </div>;


//     const nulldisplay =
//         <div className="box">
//             <div className="container-name text-left">
//                 User
           
//             </div>
//             <div class="messageDataCont">
//                 <div class="messageData">
                   
//                     <div class="default">WELCOME {username}<br />Click a user name to start chat ! 
          
//                     made by lala ,sura ,beki</div>
//                 </div>
//             </div>
//         </div>;


//     return (
//         <div>
//             {table_name === 'DEFAULT' ? nulldisplay : chatdisplay}
//         </div>

//     );
// }

// export default Chat;



// /components/chatlist.js 

// import axios from 'axios';
// import React, { Component, useEffect, useRef, useState } from 'react';
// import './chatlist.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import {baseUrl} from '../base';
// import {useHistory} from 'react-router-dom';
// import { Route } from 'react-router-dom/cjs/react-router-dom.min';



// function Chatlist(props) {
//     const history = useHistory();
//     const username = props.username;
//     if(!username){
//         history.push("/login");
//     }
//     const [chats, setChats] = useState([]);
//     const [msg, setMsg] = useState('');
//     const [tables, setTables] = useState([]);
//     const base = baseUrl;
//     const onButtonClick=(id)=>{
//         props.setChatId(id);
//     }

    

//     useEffect(()=>{
//         if (tables.length>0)
//         {
//             if(tables.includes(username+msg)||tables.includes(msg+username))
//             {   
//                 props.setChatId(tables.includes(username+msg)?username+msg:msg+username);
//             }
//             else{
//                 console.log("tables: "+tables);
//                 axios.post(base + "/createchat", {
//                     touser: msg,
//                     curuser:username,
        
//                 }).then(() => {
//                     alert("success");
//                 });
//                 alert("table created... refresh page to view changes");
//             }

//         }
        
//     },[tables]);



//     const handleSubmit = (evt) => {
//         evt.preventDefault();
//         // axios.post(base + "/createchat", {
//         //     touser: msg,
//         //     curuser: username,

//         // }).then(() => {
//         //     alert("success");
//         // });
//         setTables(tables=>[...tables,msg]);
//         chats.map(x=> {setTables(tables => [...tables,x.table_id])});
//     }
//     useEffect(() => {
//         axios.get(base + "/chatlist", {
//             params: {
//                 user: username,
//             }
//         }).then(response => {
//             setChats(response.data);
//         });
//     }, []);

//     const logout = ()=>{
//         axios.get(base+"/logout").then(response =>{
//             console.log(response.data)
//             history.replace("/login");
//         })
//     };


//     const nulldisplay =
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <input type="text" placeholder="Enter user name to chat" onChange={e => setMsg(e.target.value)}/>
//                     <button type="submit">Chat</button>
//                 </form>
//             </div>;

//     const chatdisplay = 
//             <div>
//             <h3> <AccountCircleIcon />
// User : {username}</h3>
//             <button onClick={logout} className="logoutBtn">Logout <LogoutIcon /> </button>
//             <form onSubmit={handleSubmit} className="my-2">
//                 <input type="text" placeholder="Enter User Name To Start Chat" className="chatInput" onChange={e => setMsg(e.target.value)} /> 
//                 <button type="submit" className="chatBtn">Find  < PersonSearchIcon /> </button>
//             </form>
//             {chats.map(data => (
//                 <span className='chatusername' ><button className="chatUser" value={data.table_id} onClick={() => onButtonClick(data.table_id)}> {(data.user1 === username) ? data.user2 : data.user1}</button>


// <button onClick={() => handleDeleteChat(data.table_name, data.table_id)}>Delete</button>









// <br></br>
//                 </span>
//             ))}

            
//         </div>;          

// // Handle delete chat button click
// // Handle delete chat button click
// const handleDeleteChat = (tableId, tableName) => {
//     axios.post(base + "/deletechat", { table_name: tableName })
//         .then((response) => {
//             console.log(response.data);
//             // Clear user session data
//             axios.get(base + "/logout")
//                 .then((logoutResponse) => {
//                     console.log(logoutResponse.data);
//                     // Perform any necessary updates or refreshes
//                 })
//                 .catch((logoutError) => {
//                     console.error(logoutError);
//                 });
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };


// // Render chatlist entries with a delete button/icon

//     <div>
       
//         {chats.map(data => (
//             <span className='chatusername'>
//                 <button className="chatUser" onClick={() => onButtonClick(data.table_id)}>
//                     {(data.user1 === username) ? data.user2 : data.user1}
//                 </button>
//                 <br></br>
//             </span>
//         ))}
//     </div>;



//     return (
//         <div>    
//         {chatdisplay}
//         </div>
//     );

// }

// export default Chatlist;


// /backend/index.js 

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql");
// const { table } = require("console");

// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const port = 3001;
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(cookieParser());
// app.use(
//     session({
//       key: "userId",
//       secret: "chatbasesecretkey",
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         expires: 60 * 60 * 24,
//       },
//     })
//   );

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "lala",
//     database: "chat_app",
// });

// app.get("/",(req,res)=>{
//     res.send("Backend from videochat..!!");
// });

// app.post("/send",(req,res)=>{
//     const obj = req.body.userdata;
//     const d = new Date();
//     const sql = "insert into "+obj.table_name+" (msgId,sender,receiver,msg,time) values(?,?,?,?,?)";
//     const values = [obj.msgId,obj.sender,obj.receiver,obj.msg,d];
//     db.query(sql,values,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//     });
//     const sql2 = "update userchatmap set lastupdate = ? where table_id = ?";
//     const values2 = [d, obj.table_name];
//     db.query(sql2,values2,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//     });

// });

// app.get("/chat",(req,res)=>{
//     const table_name = req.query.table_name;
//     const sql = "select * from "+table_name+" order by time asc";
//     const values = [];
//     db.query(sql,values,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             //success
//             res.send(result);
//         }
//     });
// });

// app.get("/chatlist", (req,res)=>{
//     const username = req.query.user;
//     const sql = "select user1, user2, table_id from userchatmap where (user1 = (?) or user2 = (?)) order by lastupdate desc";
//     const values = [username, username];
//     db.query(sql, values, (err, result) => {
//         if (err){
//             console.log(err);
//         }
//         else{
//             res.send(result)
//         }
//     })

// });
// app.get("/receiver", (req,res)=>{
//     const username = req.query.user;
//     const table_id = req.query.table_id;
//     const sql = "select * from userchatmap where table_id='"+table_id+"'";
//     const values = [username];
//     db.query(sql, values, (err, result) => {
//         if (err){
//             console.log(err);
//         }
//         else{
//             //console.log(result[0].user1, result[0].user2, username);
//             if (username==result[0].user1){
//                 res.send(result[0].user2);
//             }
//             else{
//                 res.send(result[0].user1);
//             }
            
//         }
//     })
//        const sql2 = "update "+table_id+" set status='READ' where receiver=?";
//        const values2 = [username];
//        db.query(sql2, values2, (err2, results2) => {
//            if (err2){
//                console.log(err);
//            }
//        })

// });

// app.post("/createchat",(req,res)=>{
//     const user1 = req.body.touser;
//     const user2 = req.body.curuser;
//     console.log(user1,user2)
//     const d = new Date();
//     //const dt= d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//     const chatid = user1+user2;
//     const sql1 = "insert into userchatmap values(?,?,?,?)";
//     const values1 = [chatid,user1,user2,d];
//     db.query(sql1, values1, (err, result) => {
//         if (err){
//             console.log(err);
//         }
//     })

//     const sql2 = "create table "+chatid+" (msgID varchar(255), sender varchar(255), receiver varchar(255), msg varchar(4095), time datetime, status varchar(50) default 'SENT')";
//     const values2 = [];
//     db.query(sql2, values2, (err, result) => {
//         if (err){
//             console.log(err);
//         }
//     })
    
// });



// //realtime message sync
// io.on('connection',socket=>{
//     socket.on('message',msgObj=>{
//         io.emit('message',msgObj)
//     })
// });

// app.post("/register", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const fullname = req.body.fullname;
  
//     bcrypt.hash(password, saltRounds, (err, hash) => {
//       if (err) {
//         console.log(err);
//       }
  
//       db.query(
//         "INSERT INTO myusers (username, password, fullname) VALUES (?,?,?)",
//         [username, hash,fullname], (err, result) => {
//             if(err){
//                 console.log(err);
//                 res.send({message: "Account creation failed"});
//             }
//             else{
//                 res.send({message:"Account successfully created. Go back to login"});
//             }
//         }
//       );
//     });
// });
// // to delet a chat from the database 
// app.post("/deletechat", (req, res) => {
//     const table_name = req.body.table_name;

//     const dropTableQuery = "DROP TABLE IF EXISTS " + table_name;

//     db.query(dropTableQuery, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send({ message: "Failed to delete chat" });
//         } else {
//             res.send({ message: "Chat deleted successfully" });
//         }
//     });
// });



// app.post("/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     db.query(
//       "SELECT * FROM myusers WHERE username = ?;",
//       [username], (err, result) => {
//         if (err) {
//           res.send({ err: err });
//         }
        
//         if (result.length > 0) {
//             bcrypt.compare(password, result[0].password, (error, response) => {
//                 if (response) {
//                   req.session.user = result;
//                   //console.log(req.session.user);
//                   res.send(result);
//                 } else {
//                   res.send({ message: "Wrong username/password combination!" });
//                 }
//               });
//         } 
//         else{
//             res.send({ message: "User doesn't exist" });
//         }
//       }
//     );
// });

// app.get("/login", (req, res) => {
// if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
// } else {
//     res.send({ loggedIn: false });
// }
// });

// app.get("/logout",(req,res)=>{
//     if(req.session.user){
//         req.session.destroy();
//         res.send({message:"logged out"})
//     }
//     else{
//         res.send({message:"already logged out"})
//     }
// })

// http.listen(port,()=>{
//     console.log("Running express on port 3001");
// });



// App.js

// import Home from './components/home.js'
// import Chat, { onChatChange } from './components/chat'
// import Chatlist, { abc } from './components/chatlist';
// import Login from './components/login/login';
// import Register from './components/register/register';
// import Delete from './components/delete/Delete.js';
// import Axios from 'axios';
// import './App.css';
// import { baseUrl } from './base.js';
// import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";

// function App() {
//   const [chatId, setChatId] = useState('DEFAULT');
//   const [username, setusername] = useState(null);
//   Axios.defaults.withCredentials = true;
//   let history = useHistory();

//   useEffect(() => {
//         Axios.get(baseUrl+"/login").then((response) => {
//           if (response.data.loggedIn == true) {
//             console.log(response.data);
//             setusername(response.data.user[0].username);
//           }
//         });
//   }, []);

//   // if(!username){
//   //   return(
//   //     <Router>
//   //       <Switch>
//   //       <div className="container-fluid row m-0 p-0">
//   //         <Route exact path="/">
//   //           <Login setusername={setusername}/>
//   //         </Route>
//   //         </div>
//   //       </Switch>
//   //     </Router>
//   //   )
//   // }

//   return (
//     <Router>
//       <Switch>
//         <div className="container-fluid row m-0 p-0">
//           <Route exact path="/register">
//             <Register setusername={setusername} />
//           </Route>
//           <Route exact path="/login">
//             <Login setusername={setusername}/>
//           </Route>
         
//           <Route exact path="/">
//               <div class="chatlist col-md-4 mt-2">
//                 <Chatlist username={username} setChatId={setChatId} />
//               </div>
//               <div class="chat col-md-8 mt-2">
//                 <Chat username={username} table_id={chatId} />
//               </div>
//           </Route>
//         </div>
//       </Switch>
//     </Router>
//   );
// }

// export default App;
