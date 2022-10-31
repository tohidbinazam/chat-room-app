import './App.css';
import { Route, Routes } from 'react-router-dom'
import Start from './pages/start/Start';
import Chat from './pages/chat/Chat';
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { setSocket } from './redux/chat/action';

function App() {
  const socket = io.connect('http://localhost:5050')

  const dispatch = useDispatch()
  dispatch(setSocket(socket))


  return (
    <Routes>
      <Route path='/' element={ <Start /> }/>
      <Route path='/chat' element={ <Chat /> }/>
    </Routes>
  );
}

export default App;
