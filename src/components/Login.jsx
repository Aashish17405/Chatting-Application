import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate =useNavigate();

    async function handleSubmit(){
        try{
            const response = await fetch("http://localhost:5000/", {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    userId:123456,
                    username:username,
                    password:password
                })
            })
            const data = await response.json();
            if(data.token){
                localStorage.setItem('token', data.token);
                navigate('/send');
            }
            setMessage(data.message)
        }catch(e){
            console.error('Error:', e);
            setUsername('');
            setPassword('');
            setMessage(e.message);
        }
    }
    return <div>
        <h3>Enter Username:</h3>
        <input type="text" placeholder="username" onChange={(event)=>{
            setUsername(event.target.value);
        }}></input><br/><br/>
        <h3>Enter Password:</h3>
        <input type="password" placeholder="password" onChange={(event)=>{
            setPassword(event.target.value);
        }}></input><br/><br/>
        <button onClick={handleSubmit}>Login</button>
        {message && <p>{message}</p>}
        
    </div>
}
export default Login;