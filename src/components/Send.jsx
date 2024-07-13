import { useState,useEffect } from "react"; 
import { checkAndRemoveExpiredToken } from "../../server/tokenService.js";
import { useNavigate } from "react-router-dom";

function SendMessage(){
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    function isLoggedIn(){
        if(checkAndRemoveExpiredToken()){
            navigate('/');
        };
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/');
        }
    }

    useEffect(()=>{
        isLoggedIn();
    },[message]);

    async function forwardMessage(message){
        try{
        if (!isLoggedIn()) {
            return;
        }
        const res  = await fetch('http://localhost:5000/send',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username:"aashish",
                    message:message
                })
            })
            setMessage('');
            const data = await res.json();
            console.log(data);
            setResponse(data);
        }catch(e){
            console.error('Error:', e);
            setMessage('');
        }
    };
    
    return <div>
        <h1>input</h1>

        <input onChange={(e)=>{
            setMessage(e.target.value);
            }} type="text" />

        <button onClick={()=>{
            forwardMessage(message);
        }}>Send</button>

        {response.msg}
    </div>
}

export default SendMessage;