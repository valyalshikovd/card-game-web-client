import Button from "@mui/material/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {socketCreate, socketSendMessage} from "../utils/webSocketUtils";
import GameComponent from "./GameComponent";
import "./room.css"


const RoomComponent = (props) => {


    const [notifications, setNotifications] = useState([])
    const [readyFlag, setReadyFlag] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)




    const socketCommands = {
        "addNotification": (payload) => {
            let new_notification = "" + payload
            handleAddNewNotification(new_notification)
        },
        "textNotification": (payload) => {
            console.log(payload)
        },
        "start_game": (payload) => {
            console.log("Игра началась")
            setIsGameStarted(true)
        },
        "game_state": (payload) => {
            console.log(payload)
        }
    }

    const handleAddNewNotification = (new_notification) => {
        setNotifications(prevNotifications =>[...prevNotifications, new_notification])
    }

    let ws = useRef()
    useState(
        () => {
            ws.current = socketCreate(props.item.roomId, props.name, (event) => {
                     })

                 ws.current.onmessage = (event) => {
                     socketCommands[JSON.parse(event.data).command](JSON.parse(event.data).payload)
                 }
        }
    )

    const gameFinish = () => {
        setIsGameStarted(false)
        setReadyFlag(false)
        handleAddNewNotification("Игра завершилась")
    }


    const handleBackButton = () => {
        socketSendMessage(ws.current, props.item.roomId, props.name, 'leaveFromRoom', null)
        props.handleChangeChoosingRoomFlag(false)
    }

    function readyToPlayHandler() {
        if(readyFlag){
            socketSendMessage(ws.current, props.item.roomId, props.name, "unreadyToPlay", null)
        }else {
            socketSendMessage(ws.current, props.item.roomId, props.name, "readyToPlay", null)
        }
        setReadyFlag( prevReadyFlag => !prevReadyFlag)
    }

    return (
        <div>
        {
            isGameStarted ?
                (
                    <div>
                        <GameComponent ws={ws.current} room = {props.item.roomId} userName = {props.name} gameFinished = {gameFinish} wsCommand = {socketCommands} ></GameComponent>
                    </div>
                )
                :
                (
                    <div>
                        <div>
                        <div className="component-room">
                            <h2 className="title-room">{props.item.roomName}</h2>
                            <div className="button-container-room">
                                <Button variant="outlined" color="secondary"  fullWidth={true} onClick={handleBackButton}>Назад</Button>
                                <Button variant="outlined" color="secondary"  fullWidth={true} onClick={readyToPlayHandler}>
                                    {
                                        !readyFlag ? (<div>готов</div>) : (<div>не готов</div>)
                                    }
                                </Button>
                            </div>
                            <div className="messages-room">
                                {
                                    notifications.map((message) =>
                                        (
                                            <div>{message}</div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                )
        }
        </div>
    )
}

export default RoomComponent

