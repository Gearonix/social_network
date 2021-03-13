import * as io from 'socket.io-client';
import config from "./config";

// if (!window.location) window.navigator.userAgent = 'ReactNative'
const socket = io(config.BASE_URL, {jsonp: false, transports: ['websocket']});
//@ts-ignore
window.socket = socket;
export default socket