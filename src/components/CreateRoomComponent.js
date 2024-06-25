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
        if(roomName === ""){
            return
        }
        createRoom(roomName).then(
            async (result) => {
                console.log(result)
                props.changeFlag(false)

                props.handleChangeCurrentItem(result)
            }
        )
            .catch(
                (err) => {
                    console.log(err)
                    alert("что-то полшло не так")
                }
            )
    }

    return (
        <div className={"component-create-room"}>
            <TextField color="secondary" value={roomName} onChange={handleChange}></TextField>
            <Button variant="outlined" color="secondary" fullWidth={true} onClick={handleCreateRoom}>Создать
                комнату</Button>
        </div>
    )

}

export default CreateRoomComponent