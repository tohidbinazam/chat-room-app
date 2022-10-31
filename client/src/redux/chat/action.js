import { JOIN_ROOM, MESSAGES, SET_SOCKET } from "./types";

export const setSocket = (payload) => ({
    type: SET_SOCKET,
    payload
})

export const joinRoom = (payload) => async (dispatch, getState) => {

    const { socket } = getState().chat
    await socket.emit('join_room', payload.room)
    dispatch({
        type: JOIN_ROOM,
        payload
    })
    dispatch(sendMessage(`Hi, my name is ${payload.user}`))
    localStorage.setItem('room', payload.room)
}

export const sendMessage = (message) => async (dispatch, getState) => {

    const { socket, user, room } = getState().chat
    const hours = new Date(Date.now()).getHours()
    const minutes = new Date(Date.now()).getMinutes()
    const time = `${ hours < 10 ? '0'+hours : hours }:${minutes < 10 ? '0'+minutes : minutes}`
    const new_message = { user, message, time }
    await socket.emit('send_message', room, new_message)

    await socket.on('receive_message', (payload) => {
        dispatch({
            type: MESSAGES,
            payload
        })
    })
}
