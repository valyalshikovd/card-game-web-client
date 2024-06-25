

export const socketCreate =  (room, userName, func ) => {

    const ws = new WebSocket("ws://localhost:8080/websocket");

    console.log("Сокет создается")

    ws.onopen = () => {
        const message = {
            room: room,
            userName: userName,
            command: "connecting"
        }

        //ws.onmessage = func

        ws.send(JSON.stringify(message));


        socketSendMessage(ws, room, userName, "regUserInRoom", null)
    }


    return ws
}

export const socketSendMessage = (ws, room, userName, command, payload) => {

    try {
        const message = {
            room: room,
            userName: userName,
            command: command,
            payload: JSON.stringify(payload)
        }

        console.log("отправленно сообщение " + JSON.stringify(message))

        ws.send(JSON.stringify(message))
    }catch (e){

        alert("Ошибка!")
    }

}



