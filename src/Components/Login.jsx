import React, { useState } from 'react'
import { Card} from 'react-bootstrap';

import logo from '../assets/Designer.png'
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate=useNavigate()
  const [userName,setUserName]=useState("")
  console.log(userName);
 

 
  const handleLogin=()=>{
   if(userName){
    navigate('/chat',{state:userName})
   }
   else{
    alert("Enter your Username")
   }

  }
  return (
    <>
      <div className="d-flex text-align-center justify-content-center align-items-center mt-5 mb-5 " style={{ height: '80vh' }}
      >
        <Card style={{ width: '20rem', height: '30rem',borderRadius:'20px',backgroundColor:'black'}}>
          <Card.Body>
            <div className="div  d-flex justify-content-center">
            <img className='mt-5' src={logo} width={'100px'} height={'100px'}>
              </img>
            </div>
         
            <div className='d-flex justify-content-center mt-3'>
              
              <h3 style={{fontFamily:'Josefin Sans'}}>
               NexaChat
              </h3>
            </div>
            <div className="inputDiv d-flex justify-content-center mt-5">
              <input
                style={{borderRadius:'15px',backgroundColor:'#161616',borderColor:''}}
                 value={userName}
                 onChange={(e)=>setUserName(e.target.value)}
                type="text"
                placeholder="Username"
                className="justify-content-center form-control"
              />

            </div>

            <div className="d-flex justify-content-center items-center mt-5">
              <button onClick={handleLogin}
                style={{backgroundColor:'#7C01F6',color:'white',fontFamily:'Josefin Sans'}}
                className=" hover:shadow-lg hover:shadow-pink-700 rounded border-none w-50"
              >
                Login
              </button>

            </div>


          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default Login