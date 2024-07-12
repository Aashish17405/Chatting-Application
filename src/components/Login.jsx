import { useState } from "react";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
        }catch(e){
            console.error('Error:', e);
            setUsername('');
            setPassword('');
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
    </div>
}
export default Login;