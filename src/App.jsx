import './App.css';
import Employe from "./components/employe/employe";
import PostList from "./components/post/PostList";
import UserHeader from "./components/userheader/UserHeader"
import axios from 'axios';
import React, { useState, useEffect } from "react";

function App() {

    const [token, setToken] = useState(null);
    const [employee, setEmployee] = useState([]);
    const BASE_URL = 'http://localhost:8080';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [fetchedCount, setFetchedCount] = useState(0);

    function fetchEmploye(userId) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        };
        axios.get(`${BASE_URL}/api/employe/`+userId, { headers })
            .then(response => {
                setEmployee(response.data);
                setFetchedCount((prev) => prev + 1);
            })
            .catch(error => {
                console.error(error);
            });
    };

    function login() {

        axios.post(`${BASE_URL}/api/login`, {
            password: password,
            username: username
        })
            .then((response) => {
                console.log(response.data);
                setToken(response.data);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error(error);
            });
    };


    useEffect(() => {
        if(token != null) {
            const fetchData = async () => {
                console.log(token);
                const response = await fetchEmploye(1);
                await setEmployee(response);
                console.log(employee);
            }
            fetchData();
        }
    }, [token]);


  return (
      <div>
          {isLoggedIn && fetchedCount>=1 ?
              (
                          <div className="App">
                              <Employe employe={employee}  />
                          </div>
              )
              :
              (<div className="App">
                  <input
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      type="user"
                      />
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      type="password"
                  />
                  <button onClick={login}>login</button>
              </div>)
          }
      </div>
  );
}

export default App;
