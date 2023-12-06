import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function LoginUser(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    var [usernameError,setUsernameError]=useState("");
    var [passwordError,setPasswordError]=useState("");
    var checkUSerData = ()=>{
        if(username==='')
        {
            setUsernameError("Username cannot be empty");
            return false;
        }
        else{
            setUsernameError("");
        }
           
        if(password===''){
            setPasswordError("Password cannot be empty");
            return false;
        }
        else{
            setPasswordError("");
        }
    }
    const Login = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData===false)
        {
            alert('please check your data')
            return;
        }
        
        axios.post("http://localhost:5057/api/User/login",{
            username: username,
            password:password
        })
        .then((userData)=>{
            var token = userData.data.token;
            localStorage.setItem("token",token);
            var username=userData.data.username;
            localStorage.setItem("username",username);
            var role=userData.data.role;
            localStorage.setItem("role",role);
            alert('Welcome to the quizapp =>'+username);
            navigate("/launch")
            
        })
        .catch((err)=>{
            if(err.response.data==="Invalid username or password"){
                alert('Either username or password does not match');
            }
            console.log(err)
        })
    }
    const logout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // Show an alert
        alert("You are logged out successfully.");
        navigate("/logout");
      };
    
    return(
        <form className="loginForm">
            <h1>Login</h1>
            <label className="form-control">Username</label>
            <input type="text" className="form-control" value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}/>
           <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control">Password</label>
            <input type="password" className="form-control" value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="alert alert-danger">{passwordError}</label><br/>
            <button className="btn btn-primary button" onClick={Login}>Login</button>
            
            <button className="btn btn-danger button">Cancel</button>
            <button className="btn btn-danger button" onClick={logout}>
                Logout
            </button>
        </form>
    );
}

export default LoginUser;