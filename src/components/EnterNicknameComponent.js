import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import "./inputWindow.css"

const EnterNicknameComponent = (props) => {

    const [nickName, setNickName] = useState("")

    const handleNickName = (event) => {
        setNickName(event.target.value)
    }
    const handleRooms = () => {
        props.handleSetRooms(true)
        props.handleSetName(nickName)
    }


    return(

        <div >
            <div className="container">
                <div className="input_title">CardGame</div>
                <TextField color="secondary"  value={nickName} fullWidth={true}  onChange={handleNickName}>
                    введите никнейм
                </TextField>
                <Button variant="outlined" color="secondary"  fullWidth={true} onClick={handleRooms}>
                    ввести имя
                </Button>
            </div>
        </div>
    )
}

export default EnterNicknameComponent