import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import './chatlist.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {baseUrl} from '../base';
import {useHistory} from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Chatlist(props) {
    const history = useHistory();
    const username = props.username;
    if(!username){
        history.push("/login");
    }
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState('');
    const [tables, setTables] = useState([]);
    const base = baseUrl;
    const onButtonClick=(id)=>{
        props.setChatId(id);
    }

    useEffect(() => {
        axios.get(base + "/chatlist", {
            params: {
                user: username,
            }
        }).then(response => {
            setChats(response.data);
    
            // Fetch the latest message for each chat
            const fetchLatestMessages = async () => {
                const chatsWithMessages = await Promise.all(
                    response.data.map(async (chat) => {
                        const chatMessages = await axios.get(base + "/chat", {
                            params: {
                                table_name: chat.table_id,
                            }
                        });
                        const latestMessage = chatMessages.data[chatMessages.data.length - 1];
                        return {
                            ...chat,
                            latestMessage: latestMessage ? latestMessage.msg : "No messages",
                        };
                    })
                );
                setChats(chatsWithMessages);
            };
    
            fetchLatestMessages();
        });
    }, []);
    

    useEffect(()=>{
        if (tables.length>0)
        {
            if(tables.includes(username+msg)||tables.includes(msg+username))
            {   
                props.setChatId(tables.includes(username+msg)?username+msg:msg+username);
            }
            else{
                console.log("tables: "+tables);
                axios.post(base + "/createchat", {
                    touser: msg,
                    curuser:username,
        
                }).then(() => {
                    alert("success");
                });
                alert("table created... refresh page to view changes");
            }

        }
        
    },[tables]);



    const handleSubmit = (evt) => {
        evt.preventDefault();
        // axios.post(base + "/createchat", {
        //     touser: msg,
        //     curuser: username,

        // }).then(() => {
        //     alert("success");
        // });
        setTables(tables=>[...tables,msg]);
        chats.map(x=> {setTables(tables => [...tables,x.table_id])});
    }
    useEffect(() => {
        axios.get(base + "/chatlist", {
            params: {
                user: username,
            }
        }).then(response => {
            setChats(response.data);
        });
    }, []);

    // const logout = ()=>{
    //     axios.get(base+"/logout").then(response =>{
    //         console.log(response.data)
    //         history.replace("/login");
    //     })
    // };


    const nulldisplay =
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter user name to chat" onChange={e => setMsg(e.target.value)}/>
                    <button type="submit">Chat</button>
                </form>
            </div>;

    // Inside the Chatlist component
const chatdisplay = (
    <div>
      <h3>
        <AccountCircleIcon />
        {username}
      </h3>
      
      <form onSubmit={handleSubmit} className="add-contact-form">
        <input
          type="text"
          placeholder="Add User Name To Start Chat"
          className="chatInput"
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="chatBtn add-user-btn">
          Add <PersonAddAltIcon  className='add-user-icon'/>{" "}
        </button>
      </form>
      <div className='contacts-list'>
      {chats.map((data) => (
        <div className="chat-entry" key={data.table_id}>
          <div className='contact-link'>
          <button className="chatUser" onClick={() => onButtonClick(data.table_id)}>
            {(data.user1 === username) ? data.user2 : data.user1}
          </button>
          <div className="latestMessages">
            <p className='last-message'>{data.latestMessage1 === 'No messages' ? <span className='no-msg'>No messages</span> : data.latestMessage1}</p>
            {/* <p>{data.latestMessage2}</p> */}
          </div>
          </div>
          <button className="chat-delete-btn" onClick={() => handleDeleteChat(data.table_id, data.table_id)}><DeleteOutlineIcon className='delete-icon' /></button>
          <br />
        </div>
      ))}
      </div>
    </div>
  );
  
  useEffect(() => {
    axios.get(base + "/chatlist", {
      params: {
        user: username,
      },
    }).then(async (response) => {
      const chatsWithMessages = await Promise.all(
        response.data.map(async (chat) => {
          const chatMessages1 = await axios.get(base + "/chat", {
            params: {
              table_name: chat.table_id,
              user: chat.user1,
            },
          });
          const chatMessages2 = await axios.get(base + "/chat", {
            params: {
              table_name: chat.table_id,
              user: chat.user2,
            },
          });
  
          const latestMessage1 = chatMessages1.data[chatMessages1.data.length - 1];
  
          return {
            ...chat,
            latestMessage1: latestMessage1 ? latestMessage1.msg : "No messages",
          };
        })
      );
      setChats(chatsWithMessages);
    });
  }, []);
          

// Handle delete chat button click
// Handle delete chat button click
const handleDeleteChat = (tableId, tableName) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
  if (confirmDelete) {
    axios.post(base + "/deletechat", { table_name: tableName })
        .then((response) => {
            console.log(response.data);
            // Clear user session data
            axios.get(base + "/logout")
                .then((logoutResponse) => {
                    console.log(logoutResponse.data);
                    // Perform any necessary updates or refreshes
                })
                .catch((logoutError) => {
                    console.error(logoutError);
                });
        })
        .catch((error) => {
            console.error(error);
        });
      }
};


// Render chatlist entries with a delete button/icon

    <div>
       
        {chats.map(data => (
            <span className='chatusername'>
                <button className="chatUser" onClick={() => onButtonClick(data.table_id)}>
                    {(data.user1 === username) ? data.user2 : data.user1}
                </button>
                <br></br>
            </span>
        ))}
    </div>;



    return (
        <div>    
        {chatdisplay}
        </div>
    );

}

export default Chatlist;