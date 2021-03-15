import { io } from 'socket.io-client';
import { SERVER_ADDRESS } from "./settings";

// Status messages

const STATUS = {
    OK: 0,

    EXISTS: 402,
    ACCESS_DENIED: 403,
    NOT_FOUND: 404,

    // Register
    

    // Login
    EMAIL_NOT_REGISTERED: 201,
    WRONG_PASSWORD: 202
}


// Client notifications

const NTF_TYPE = {
    USER_NEW_NTF: 0, 

    FILE_UPDATE: 3, 
    FILE_UPDATE_CONTENT: 4, //quando tem o ficheiro aberto, e quando o ficheiro muda
    FILE_INVITE: 5,
    FILE_REMOVE: 6,
    FILE_START_EDIT: 7,
    FILE_END_EDIT: 8,
    FILE_ADD_USER: 9,
    FILE_REMOVE_USER: 10,

    // Control panel
    CP_NEW_USER: 101,
    CP_NEW_NOTIFICATION: 102,
    CP_NEW_FILE: 103,
    CP_DEL_NOTIFICATION: 104,
    CP_DEL_FILE: 105
}



class NotificationManager
{
    constructor()
    {
        this.callbacks = [];
        for (let s in STATUS)
            this.callbacks[STATUS[s]] = null;
    }

    call(message, data)
    {
        if (this.callbacks[message] == null)
            return;
        this.callbacks[message](data);
    }

    register_callback(message, callback)
    {
        this.callbacks[message] = callback;
    }

    unregister_callback(message)
    {
        this.callbacks[message] = null;
    }
} 



let socket = null;
let ntf_manager = null;
let g_user_data = null;

function set_g_user_data(user_data)
{
    g_user_data = user_data;
}

function initSocket(){
    //Metam o vosso proprio ip (ipconfig)
    socket = io(SERVER_ADDRESS);
    ntf_manager = new NotificationManager();

    socket.on("user_update", data => {
        for (let n of data)
            ntf_manager.call(n.type, n.data);
    });
    socket.on("connect_error", (data) => {
        console.log("connect_error");
        console.log(data);
    });
    socket.on("connect_failed", (data) => {
        console.log("connect_failed");
        console.log(data);
    });
    socket.on("disconnect", (data) => {
        console.log("disconnect");
        console.log(data);
    });
} 

export {socket, ntf_manager, g_user_data, set_g_user_data, initSocket, STATUS, NTF_TYPE};