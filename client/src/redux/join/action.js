import { JOIN_OFF, JOIN_ON } from "./types";

export const joinOn = () => ({
    type: JOIN_ON
})

export const joinOff = () => ({
    type: JOIN_OFF
})