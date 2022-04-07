import socketIOClient from "socket.io-client";

import BASEIP from "../constants/baseIp";
const ENDPOINT = `http://${BASEIP}:8080`;

export const socket = socketIOClient(ENDPOINT);
