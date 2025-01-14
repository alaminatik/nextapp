import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push("/add")
        }
    },[])

    async function login(){
        console.warn(email.password)
        let item={email,password};
        let result = await fetch("http://127.0.0.1:8000/api/sanctum/token",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem(JSON.stringify(result))
        history.push("/add")
    }

  return (
    <div>
        <h1>Login</h1>
        <div className='col-sm-6 offset-sm-3'>
        <input type="text" placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='form-control'/>
        <br/>
        <input type="text" placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='form-control'/>
        <br/>
        <button className='btn btn-primary'>Login</button>
        </div>
    </div>
  )
}

export default LoginForm