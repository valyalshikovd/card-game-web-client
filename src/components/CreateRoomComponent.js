import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {createRoom} from "../utils/restApiUtils";
import "./roomCreate.css"


const CreateRoomComponent = (props) => {

    const [roomName, setRoomName] = useState('')
    const handleChange = (event) => {
        setRoomName(event.target.value)
    }
    const handleCreateRoom = () => {
        props.changeFlag(false)

        createRoom(roomName).then(
            (res) => {
                console.log("успешно")
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

        props.handleChangeCurrentItem({
            roomName : roomName,
            status : "OPEN",
            countPlayer : 1
        })
    }

    return(
        <div className={"component-create-room"}>
            <TextField  color="secondary"  value={roomName} onChange={handleChange}></TextField>
            <Button variant="outlined" color="secondary" fullWidth={true} onClick={handleCreateRoom}>Создать комнату</Button>
        </div>
    )

}

export default CreateRoomComponent