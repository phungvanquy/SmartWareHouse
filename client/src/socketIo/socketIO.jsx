import socketIOClient from "socket.io-client";

const ENDPOINT = "http://192.168.0.107:8080";

export const socket = socketIOClient(ENDPOINT);
