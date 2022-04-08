import socketIOClient from "socket.io-client";

import BASEIP from "../constants/baseIp";
const ENDPOINT = `${BASEIP}:8080`;

export const socket = socketIOClient(ENDPOINT);
