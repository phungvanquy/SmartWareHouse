import socketIOClient from "socket.io-client";

import BASEIP from "../constants/baseIp";
// const ENDPOINT = `${BASEIP}`; // this is for test
const ENDPOINT = `http://${BASEIP}:8080`; // this is for main

export const socket = socketIOClient(ENDPOINT);
