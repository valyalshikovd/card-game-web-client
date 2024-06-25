import React, {useRef, useEffect, useState} from "react";
import {socketSendMessage} from "../utils/webSocketUtils";
import Button from "@mui/material/Button";
import TimerComponent from "./TimerComponent";
import {Card3} from "../utils/cards";
import "./cards.css"
import "./game.css"
import CardInHandComponent from "./CardInHandComponent";
import GameOverComponent from "./GameOverComponent";


const GameComponent = (props) => {

    const [currentPlayer, setCurrentPlayer] = useState(false)
    const [cards, setCards] = useState([])
    const [table, setTable] = useState([])
    const [trump, setTrump] = useState(null)
    const [isWsActual, setIsWsActual] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [countCardsOnTable, setCountCardsOnTable] = useState(0)
    const [areThereAnyUnbrokenCards, setAreThereAnyUnbrokenCards] = useState(false)
    const [deffensePlayer, setDeffensePlayer] = useState(false);
    const [countCardInStack, setCountCardInStack] = useState(0);
    const [countCardAtOpp, setCountCardAtOpp] = useState(0);
    const [draw, setDraw] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isWinner, setIsWinner] = useState(false)
    const [timeHidden, setTimeHidden] = useState(true)
    const [time, setTime] = useState(30)
    const [containerBounds, setContainerBounds] = useState(null);
    const containerRef = useRef()
    const [containerInfo, setContainerInfo] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const cardValues = {
        "TWO": 2,
        "THREE": 3,
        "FOUR": 4,
        "FIVE": 5,
        "SIX": 6,
        "SEVEN": 7,
        "EIGHT": 8,
        "NINE": 9,
        "TEN": 10,
        "JACK": 11,
        "QUEEN": 12,
        "KING": 13,
        "ACE": 14
    };

    window.addEventListener("alert", function(event){
        surrender()
        setIsGameOver(true)
        setIsWinner(false)
    });


    const socketCommands = {
        ...props.wsCommand,

        "textNotification": (payload) => {
            console.log(payload)
        },
        "game_state": (payload) => {

            try {
                let gameState = JSON.parse(payload)
                setCards(gameState.playerCards)
                setTrump(gameState.trump)
                setCurrentPlayer(gameState.currentPlayer)
                setCountCardsOnTable(gameState.countCardsOnTable)
                setAreThereAnyUnbrokenCards(gameState.areThereAnyUnbrokenCards)
                setDeffensePlayer(gameState.deffencePlayer)
                setCountCardInStack(gameState.countCardsInStack)
                setDraw(gameState.draw)
                setIsGameOver(gameState.gameOver)
                setIsWinner(gameState.winner)
                setCountCardAtOpp(gameState.countCardAtOpp)

                if (gameState.table == null)
                    setTable([])
                else
                    setTable(gameState.table)

                if (gameState.currentPlayer) {
                    setTimeHidden(false)
                    setTime(30)
                }
                if (!gameState.currentPlayer)
                    setTimeHidden(true)
                updateContainerInfo()
            }catch (e){
                alert("Ошибка в принятии игрового состояния")
            }
        }
    }

    const updateContainerInfo = () => {
        const containers = document.querySelectorAll('.card');
        const containerData = Array.from(containers).map(container => {
            const {top, left, width, height} = container.getBoundingClientRect();
            return {top, left, width, height};
        });
        setContainerInfo(containerData);
    };

    useEffect(() => {

        try {

            updateContainerInfo();

            if (!isWsActual) {
                props.ws.onmessage = (event) => {
                    socketCommands[JSON.parse(event.data).command](JSON.parse(event.data).payload)
                }

                socketSendMessage(props.ws, props.room, props.userName, "getGameState", null)
                setIsWsActual(true)
            }
            if (containerRef.current) {
                const bounds = containerRef.current.getBoundingClientRect();
                setContainerBounds(bounds);
            }

            const handleResize = () => {
                setIsMobile(window.innerWidth <= 600);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };

        }catch (e){
            alert("Что-то не так")
        }
    }, []);

    const surrender = () => {
        socketSendMessage(props.ws, props.room, props.userName, "surrender", null)
    }

    const placeDrag = (item) => {
        try {
            setSelectedCard(item)
        }catch (e){
            alert("что-то пошло не так...")
        }
    }

    const sendStepMessage = (pos, down) => {
        try {
            let payload = {
                inTablePos: pos,
                down: down,
                card: selectedCard
            }
            socketSendMessage(props.ws, props.room, props.userName, "gameStep", payload)
            setSelectedCard(null)
        }catch (e){
            console.log(e)
        }
        setTime(30)
    }

    const dropSelectCard = () => {
        setSelectedCard(null)
    }

    const checkTablePossibleToGiveCard = (item) => {
        try {
            for (const element of table) {
                if (element.downCard != null && element.downCard.rank === item.rank)
                    return true

                if (element.upCard != null && element.upCard.rank === item.rank)
                    return true
            }
            return false
        }catch (e){
            alert("критическая ошибка")
        }
    }

    const placeDrop = (item, index) => {

        try {
            if (!deffensePlayer && countCardsOnTable !== 0 && checkTablePossibleToGiveCard(selectedCard)
            ) {
                sendStepMessage(countCardsOnTable, true)
                return;
            }

            if (item == null) {
                sendStepMessage(0, true)
                return
            }

            console.log(selectedCard)
            console.log(table[index])
            console.log(table)
            console.log(index)
            if (selectedCard != null && selectedCard.suit === table[index].downCard.suit && cardValues[selectedCard.rank] >= cardValues[table[index].downCard.rank]
                || (selectedCard.suit === trump.suit && table[index].downCard.suit !== trump.suit)
            ) {
                sendStepMessage(index, false)
            }
        }catch (e){
            alert("критическая ошибка")
        }
    }

    const complete = () => {
        socketSendMessage(props.ws, props.room, props.userName, "complete", null)
        setSelectedCard(null)
    }

    const pullOf = () => {
        socketSendMessage(props.ws, props.room, props.userName, "pullOf", null)
        setSelectedCard(null)
    }

    return (
        <div>
            {
                isGameOver ? (
                    <GameOverComponent win={isWinner} gameFinished = {props.gameFinished}></GameOverComponent>
                ) : (
                    <div>
                        <div className={"title"}>
                            {
                                timeHidden ?
                                    (
                                        <div>Не ваш ход</div>
                                    )
                                    :
                                    (
                                        <TimerComponent time={30} timeIsUp={surrender}/>
                                    )
                            }
                        </div>

                        <div ref={containerRef} className={"container-game"}>
                            <div className="box-2">
                                <div className="cardhandler" >
                                    {Array.from({length: countCardAtOpp}, (_, index) => index).map((item, index) =>
                                        (
                                            <div
                                                className="card3"
                                                style={{
                                                    backgroundPosition: 0,
                                                    right: -72 - item * 20 + "px",
                                                    bottom: "-200px",
                                                    position: "absolute",
                                                    zIndex: item,
                                                    minWidth: isMobile ? "72px" : "100px",
                                                    maxHeight: isMobile ? "100px" : "140px"
                                                }}
                                            ></div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className={"box-1"}>
                                <div style={{paddingBottom: "200px"}}>
                                    {
                                        countCardsOnTable === 0 ? (<div></div>) :
                                            (
                                                <div>
                                                    {table.map((item, index) =>
                                                        (
                                                            <div className={"cardHolder"}>
                                                                {
                                                                    item.downCard ?
                                                                        (
                                                                            <div>
                                                                                <div
                                                                                    className="card style-card-size"
                                                                                    style={{backgroundPosition: new Card3(item.downCard.rank, item.downCard.suit).backgroundPosition}}
                                                                                >
                                                                                    {
                                                                                        item.upCard ?
                                                                                            (
                                                                                                <div
                                                                                                    className="card2child style-card-size"
                                                                                                    style={{backgroundPosition: new Card3(item.upCard.rank, item.upCard.suit).backgroundPosition}}>
                                                                                                </div>
                                                                                            ) : (<div></div>)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ) : (<div></div>)
                                                                }
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                    }
                                </div>
                                <div className="trump">
                                    <div
                                        className="card3 style-card-size"
                                        style={{backgroundPosition: 0}}>
                                        {
                                            trump ? (
                                                <div
                                                    className="card2child style-card-size"
                                                    style={{backgroundPosition: new Card3(trump.rank, trump.suit).backgroundPosition}}>
                                                </div>
                                            ) : (<div/>)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={"box-2"}>
                                <div>
                                    {cards.map((item, index) =>
                                        (
                                            <div className="cardhandler">
                                                {
                                                    item ? (<div>
                                                        <div
                                                        >
                                                            <CardInHandComponent item={item}
                                                                                 index={index}
                                                                                 size={containerBounds}
                                                                                 sizesCards={containerInfo}
                                                                                 updater={updateContainerInfo}
                                                                                 placeDrop={placeDrop}
                                                                                 dropSelectCard={dropSelectCard}
                                                                                 defence={deffensePlayer}
                                                                                 placeDrag={placeDrag}></CardInHandComponent>
                                                        </div>
                                                    </div>) : (<div></div>)
                                                }
                                            </div>

                                        )
                                    )}
                                </div>
                            </div>
                            <div className="button-container">
                                <div>
                                    {
                                        currentPlayer ?
                                            (
                                                <div>
                                                    {
                                                        deffensePlayer ?
                                                            (<Button style={{
                                                                margin: "10px",
                                                                backgroundColor: "white"
                                                            }} color="success" onClick={pullOf} >pull off</Button>)
                                                            :
                                                            (<Button style={{
                                                                margin: "10px",
                                                                backgroundColor: "white"
                                                            }} color="success" onClick={complete} >complete</Button>)
                                                    }
                                                </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )
                                    }
                                </div>
                                <Button style={{
                                    margin: "10px",
                                    backgroundColor: "white"
                                }} color="success" onClick={surrender} >surrender</Button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default GameComponent