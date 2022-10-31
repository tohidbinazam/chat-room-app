import React, { useState } from 'react'
import './chat.css'
import { FiCopy } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/chat/action';

const Chat = () => {

    const dispatch = useDispatch()
    const { user, room, chats } = useSelector(state => state.chat)

    const [ message, setMessage ] = useState('')

    const handleCopy = () => {

        if (room) {
            navigator.clipboard.writeText(room)
            toast.success("Copied the Room ID")
        } else {
            toast.error("Don't find Room ID")
        }
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSend = () => {
        if (message) {
            dispatch(sendMessage(message))
            setMessage('')
        } else {
            toast.error("Empty message")
        }
    }

  return (
    <div>
        <Container>
            <Row className='chat'>
                <Col md='6'>
                    <Card>
                        <Card.Header className='chat-header'>
                            <img className='chat-logo' src="https://www.quickchat.ai/img/logo_color.png" alt="" />
                            <div variant='success' className='chat-id'> <strong>{`ROOM ID => ${ room || 'Not Found' }`}</strong> <Button onClick={ handleCopy } size="sm" variant='dark'><FiCopy /></Button> </div>
                        </Card.Header>
                        <Card.Body>
                            <ScrollToBottom className="message-container">
                            {
                                chats.map(data => 
                                    <>
                                        {
                                            data.user !== user ? <> <h6 className='time'>{ data.time }</h6>
                                            <div className='message-box'>
                                                <img className='chat-img' src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png" alt=""/>
                                                <div className='message'>
                                                    <p>{ data.message }</p>
                                                    <h6>send by <strong>{ data.user }</strong></h6>
                                                </div>
                                            </div> </> : <> <h6 className='time'>{ data.time }</h6>
                                            <div className='message-box right'>
                                                <div className='message'>
                                                    <p>{ data.message }</p>
                                                    <h6>me <strong>{ data.user }</strong></h6>
                                                </div>
                                                <img className='chat-img' src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png" alt=""/>
                                            </div> </>
                                        }
                                    </>    
                                )
                            }
                            </ScrollToBottom>
                            <hr />
                            <div className='send-box'>
                                <Form.Control onKeyUp={ e => e.key === 'Enter' && handleSend() } onChange={ handleMessage } value={ message } className='type-box' type='text' placeholder="Type a message"/>
                                <Button onClick={ handleSend } ><IoMdSend /></Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>                
            </Row>
        </Container>
    </div>
  )
}

export default Chat