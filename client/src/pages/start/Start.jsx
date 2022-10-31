import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Create from '../../components/create/Create';
import Join from '../../components/join/Join';
import { createOn } from '../../redux/create/action';
import { joinOn } from '../../redux/join/action';
import { startOff } from '../../redux/start/action';

const Start = () => {

    const { start, create, join } = useSelector(state => state)

    const dispatch = useDispatch()

    const handleStart = (e) => {

        const name = e.target.name
        dispatch(startOff())

        if (name === 'create') {
            dispatch(createOn())
        } else if (name === 'join') {
            dispatch(joinOn())
        }
    }
  return (
    <div>
        <Container>
            <Row className='start'>
                {start && <Col md='3'>
                            <Card>
                                <Card.Header>
                                    <h3>Choose You Room</h3>                
                                </Card.Header>
                                <Card.Body className='d-grid gap-2'>
                                    <Button name='create' onClick={ handleStart } size="lg" >Create Room</Button>
                                    <h5>OR</h5>
                                    <Button name='join' onClick={ handleStart } variant='secondary' size="lg" >Join Room</Button>
                                </Card.Body>
                            </Card>
                    </Col>
                }
                { create && <Create /> }
                { join && <Join /> }
            </Row>
        </Container>
    </div>
  )
}

export default Start