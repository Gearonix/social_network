import io from 'socket.io-client';
import config from "./config___";
if (!window.location) window.navigator.userAgent = 'ReactNative';
const socket = io(config.BASE_URL, {jsonp: false, transports: ['websocket']});
window.socket = socket;
export default socket