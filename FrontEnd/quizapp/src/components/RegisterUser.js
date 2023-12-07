import { useState } from "react";
import './RegisterUser.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterUser(){
    const roles =["Creator","Participant"];
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setrePassword] = useState("");
    const [role,setRole] = useState("");
    var [usernameError,setUsernameError]=useState("");
    var [passwordError,setPasswordError]=useState("");
    const navigate = useNavigate();

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
        if(role==='Select Role'){
            return false;
        }
        return true;
    }
    const signUp = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData===false)
        {
            alert('please check your data')
            return;
        }
        
        axios.post("http://localhost:5057/api/User/register",{
            username: username,
            role:	role,
            password:password
    })
        .then((userData)=>{
            console.log(userData)
            alert('Welcome to the quizapp'+{username});
            navigate("/quizs");
        })
        .catch((err)=>{
            if(err.response.data==="Duplicate username"){
                alert('The username already exists, please login if that is urs');
            }
            console.log(err)
        })
    }
    const goToLogin=()=>{
        navigate("/login");
    }
    
    return(
        <form className="registerForm">
            <h1>Register</h1>
            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <label for="floatingInput">Username</label>
        </div>
            <label className="alert alert-danger">{usernameError}</label>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
            value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <label for="floatingPassword">Password</label>
        </div>
            <label className="alert alert-danger">{passwordError}</label><br/>
        <div class="form-floating">
            <input type="Password" class="form-control" id="floatingPassword" placeholder="ReTypePassword"
            value={repassword} onChange={(e)=>{setrePassword(e.target.value)}}/>
            <label for="floatingPassword">ReTypePassword</label>
        </div>
            <select className="form-select" onChange={(e) => { setRole(e.target.value) }}>
                <option value="select">Select Role</option>
                {roles.map((r) =>
                    <option value={r} key={r}>{r}</option>
                )}
            </select>
            <br/>
            <button className="btn btn-login button" onClick={signUp}>Sign Up</button>
            
            <hr/>
            <div class="text-center fs-6">
            Already have an account? <Link to="/login">Login</Link>
            </div>
            
        </form>
    );
}

export default RegisterUser;