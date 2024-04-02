import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../REDUX/slice/chatUsersSlice'; 
import ChatBox from './ChatBox';

function Chat() {

  const location = useLocation();
  const user = location.state;
  const [typeMessage, setTypeMessage] = useState("");
  const [newSocket, setNewSocket] = useState(null);
  const [id, setUserId] = useState("");
  const boxref = useRef(null);
  const dispatch = useDispatch();
  const datared = useSelector(state => state.chatUsersReducer);

  useEffect(() => {
    const socket = io("https://ca-server-7vl8.onrender.com");
    // http://localhost:3001
    socket.on("connect", () => {
      setNewSocket(socket);
      setUserId(socket.id);
      socket.emit('joined', { user });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on('welcome', (data) => {
      dispatch(setChat(data));
      console.log(data.user, data.message);
    });

    socket.on('userJoined', (data) => {
      dispatch(setChat(data));
      console.log(data.user, data.message);
    });

    socket.on('sendMessage', (data) => {
      dispatch(setChat(data));
      console.log(data.user, data.message, data.id);
    });

    socket.on('disconnect', () => {
      socket.emit("disconnect", { user });
    });

    socket.on('leave', (data) => {
      dispatch(setChat(data));
      console.log(data.user, data.message);
    });

    // Clean up function to close the socket connection
    return () => {
      socket.disconnect();
    };

  }, []);

  const send = () => {
    if (typeMessage !== "") {
      newSocket.emit('message', { message: typeMessage, id: newSocket.id });
      setTypeMessage("");
    }
  }

  useEffect(() => {
    boxref.current?.lastElementChild?.scrollIntoView();
  }, [datared]);

  return (
    <div className="d-flex text-align-center justify-content-center align-items-center mt-5 mb-5" style={{ height: '80vh' }}>
      <Card style={{ width: '20rem', height: '30rem', borderRadius: '20px', backgroundColor: 'black' }}>
        <Card.Body>
          <div className=' w-100  rounded' style={{ backgroundColor: '#2b2b2b', width: '100%', height: '40px' }}>
            <h6 className='mt-2 ms-2'>Messages</h6>
          </div>
          <div ref={boxref} className="chatarea" style={{ height: "76%" }}>
            {datared && datared.map((item, index) => (
              <ChatBox key={index} user={user} name={item.user} message={item.message} />
            ))}
          </div>
          <div className="inputbox px-2 py-2 d-flex" style={{ height: "12%", width: "100%" }}>
            <input onChange={(e) => setTypeMessage(e.target.value)}  value={typeMessage} style={{ width: "70%" ,borderRadius:'15px',backgroundColor:'#161616',border:'none',color:'white'}} type="text" className="me-2 " placeholder="Message"  />
            <button onClick={send} style={{ width: "30%",borderRadius:'15px',backgroundColor:'#161616',border:'none' }}><i class="fa-solid fa-paper-plane" style={{color:'#7C01F6'}}></i></button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Chat;
