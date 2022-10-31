import React from 'react'
import { useState } from 'react';
import { Alert, Button, Card, Col, Form } from 'react-bootstrap';
import { FiCopy } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { joinRoom } from '../../redux/chat/action';
import { createOff } from '../../redux/create/action';
import { startOn } from '../../redux/start/action';
import randomCode from '../../utility/randomCode';

const Create = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        alert : false
    })

    const handleBack = () => {
        dispatch(createOff())
        dispatch(startOn())
    }

    const handleData = (e) => {
        setData((prev) => ({ ...prev, user: e.target.value }))
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.room)
        toast.success("Copied the Room ID")
    }

    const handleCreate = () => {

        if (data.user) {
            const room = randomCode(12)
            setData((prev) => ({ ...prev, room, alert: true }))
        }else{
            toast.error("Name field is required")
        }

    }

    const handleJoin = () => {
        const { user, room } = data
        dispatch(joinRoom({ user, room }))
        toast.success("Successfully joined this room")
        navigate('/chat')
    }

  return (
        <Col md='3'>
            <Card>
                <Card.Header>
                    <h3>Create You Room</h3>                
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Control onChange={ handleData } type='text' placeholder='Give your full name' />
                    </Form.Group>
                    <div className='buttons'>
                        <Button variant='secondary' onClick={ handleBack }>Back</Button> || <Button onClick={ handleCreate }>Create Room</Button>
                    </div>
                    <hr />
                    
                    { data.alert && <> <Form.Label>Click to copy and give your FNF for join</Form.Label>
                    <Alert variant='success' className='d-flex justify-content-between'> <strong>{` ROOM ID => ${data.room} `}</strong> <Button onClick={ handleCopy } size="sm"><FiCopy /></Button> </Alert> <Button size="lg" variant='success' onClick={ handleJoin }> Join This Room</Button> </> }
                </Card.Body>
            </Card>
        </Col>
  )
}

export default Create