import {useEffect, useState} from "react";
import {getRooms} from "../utils/restApiUtils";
import Button from "@mui/material/Button";
import CreateRoomComponent from "./CreateRoomComponent";
import AbbreviatedRoomComponent from "./AbbreviatedRoomComponent";
import RoomComponent from "./RoomComponent";
import "./rooms.css"

const RoomsComponent = (props) => {

    const [roomList, setRoomList] = useState([])
    const [createRoomFlag, setCreateRoomFlag] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [choosingRoomFlag, setChoosingRoomFlag] = useState(false)

    useEffect(() => {
        getRooms()
            .then(async r => {
                console.log(r)
                setRoomList(r)
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);


    const changeCreateRoomFlag = (flag) => {
        setCreateRoomFlag(flag)
    }

    const handleChangeCurrentItem = (room) => {
        try {
            if(room.countPlayer > 1){
                return
            }
            setCurrentRoom(room)
            setChoosingRoomFlag(true)
        }catch (e){
            console.error("ошибка")
        }
    }

    const handleChangeChoosingRoomFlag = (value) => {
        setChoosingRoomFlag(value)
        getRooms()
            .then(async r => {
                console.log(r)
                setRoomList(r)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div>
            {createRoomFlag ? (
                <div>
                    <CreateRoomComponent
                        changeFlag={changeCreateRoomFlag}
                        handleChangeCurrentItem={handleChangeCurrentItem}
                    />
                </div>
            ) : (
                <div>
                    {choosingRoomFlag ? (
                        <div>
                            <RoomComponent name={props.name} item={currentRoom}
                                           handleChangeChoosingRoomFlag={handleChangeChoosingRoomFlag}/>
                        </div>
                    ) : (

                        <div className="container-rooms">
                            <div className="button">
                                <Button variant="outlined"
                                    onClick={
                                    () => {
                                        setCreateRoomFlag(true)
                                    }
                                } fullWidth={true} color={"secondary"}>
                                    Создать комнтату
                                </Button>
                                <Button variant="outlined"
                                        onClick={
                                            () => {
                                                getRooms()
                                                    .then(async r => {
                                                        console.log(r)
                                                        setRoomList(r)
                                                    })
                                                    .catch((e) => {
                                                        console.log(e)
                                                    })
                                            }
                                        } fullWidth={true} color={"secondary"}>
                                    Обновить
                                </Button>
                            </div>
                            <div className="content">
                                {
                                    roomList.map((item, index) => (
                                        <AbbreviatedRoomComponent
                                            item={item}
                                            handleChangeCurrentItem={handleChangeCurrentItem}
                                        />
                                    ))
                                }
                            </div>
                        </div>)
                    }
                </div>
            )
            }
        </div>
    )
}


export default RoomsComponent