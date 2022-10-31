import React from 'react'
import { useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { joinRoom } from '../../redux/chat/action';
import { joinOff } from '../../redux/join/action';
import { startOn } from '../../redux/start/action';

const Join = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [data, setData] = useState('')

    const handleBack = () => {
        dispatch(joinOff())
        dispatch(startOn())
    }
    const handleData = (e) => {
        setData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleJoin = () => {
        const { user, room } = data
        if ( user && room ) {
            dispatch(joinRoom({ user, room }))
            toast.success("Successfully joined this room")
            navigate('/chat') 
        } else {
            toast.error("All fields are required")
        }
    }
  return (
    
        <Col md='3'>
            <Card>
                <Card.Header>
                    <h3>Join Room</h3>                
                </Card.Header>
                <Card.Body className='d-grid gap-2'>
                    <Form.Group className="mb-3">
                        <Form.Control onChange={ handleData } name='user' type='text' placeholder='Give your full name' />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control onChange={ handleData } name='room' type='text' placeholder='Room ID' />
                    </Form.Group>
                    <div className='buttons'>
                        <Button variant='secondary' onClick={ handleBack }>Back</Button> || <Button onClick={ handleJoin } variant='success'> Join Room </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
  )
}

export default Join