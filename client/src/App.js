import './App.css';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/start/Start';
import Chat from './pages/chat/Chat';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { joinRoom, setSocket } from './redux/chat/action';

function App() {
  const dispatch = useDispatch();
  const socket = io(process.env.REACT_APP_API_URL);

  const info = JSON.parse(localStorage.getItem('info'));

  socket.on('connect', () => {
    dispatch(setSocket(socket));
    dispatch(joinRoom(info));
  });

  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  );
}

export default App;
