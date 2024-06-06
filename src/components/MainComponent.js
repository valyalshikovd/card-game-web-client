import EnterNicknameComponent from "./EnterNicknameComponent";
import {useEffect, useState} from "react";
import RoomsComponent from "./RoomsComponent";


const MainComponent = () => {

    const [isRoomsOpen, setIsRoomsOpen] = useState(false)
    const [name, setName] = useState('')
    const handleSetRooms =  (val) => {
        setIsRoomsOpen(val)
    }
    const handleSetName = (name) => {
        setName(name)
    }

    return(
        <div>
            {
                isRoomsOpen ? (
                    <div>
                        <RoomsComponent name={name}></RoomsComponent>
                    </div>
                ) : (
                    <div>
                        <EnterNicknameComponent handleSetName = {handleSetName} handleSetRooms={handleSetRooms}/>
                    </div>
                )
            }

        </div>
    )
}

export default MainComponent