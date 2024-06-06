import "./AbbreviatedRoom.css"
const AbbreviatedRoomComponent = (props) => {
    function handleClick() {
        props.handleChangeCurrentItem(props.item)
    }

    return (
        <div className={"abbriv"} onClick={handleClick}>
            <p>{props.item.roomName}</p>
            <p>{props.item.status}</p>
            <p>Количество человек {props.item.countPlayer}</p>
        </div>
    )
}

export default AbbreviatedRoomComponent