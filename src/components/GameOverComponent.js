import Button from "@mui/material/Button";
import "./inputWindow.css"


const GameOverComponent = (props) => {

    const handleBackButton = () => {
        props.gameFinished()
    }

    return(
        <div className="container">
            {
                props.win ? (
                    <div className="input_title">Вы выйграли</div>
                ) : (
                    <div className="input_title" >Вы проиграли</div>
                )
            }
            <Button onClick={handleBackButton}> Назад </Button>
        </div>
    )
}

export default GameOverComponent