import React, { useEffect } from 'react';
import Chatlist from './components/chatlist'; // Import your Chatlist component
import Chat from './components/chat'; // Import your Chat component
import Login from './components/login/login';
import Register from './components/register/register';
import Axios from 'axios';
import './App.css';
import { baseUrl } from './base.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [chatId, setChatId] = useState('DEFAULT');
  const [username, setusername] = useState(null);
  Axios.defaults.withCredentials = true;

  useEffect(() => { 
    Axios.get(baseUrl + "/login").then((response) => {
      if (response.data.loggedIn == true) {
        console.log(response.data);
        setusername(response.data.user[0].username);
      }
    });
  }, []);

  // Reload the page every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 500000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Router>
      <Switch>
        <div className="container-fluid row m-0 p-0">
          <Route exact path="/register">
            <Register setusername={setusername} />
          </Route>
          <Route exact path="/login">
            <Login setusername={setusername} />
          </Route>

          <Route exact path="/">
            <div class="chatlist col-md-4 mt-2">
              <Chatlist username={username} setChatId={setChatId} />
            </div>
            <div class="chat col-md-8 mt-2">
              <Chat username={username} table_id={chatId} />
            </div>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
