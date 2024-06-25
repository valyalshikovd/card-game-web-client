import React, { useState } from 'react';
import "./cards.css"
import "./game.css"
import {Card3} from "../utils/cards";

const CardInHandComponent = (props) =>  {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
        try {
            startDragging(event.clientX, event.clientY)
        }catch (e){
            console.error("Something wrong..")
        }
    };

    const handleMouseUp = () => {
        try {
            endDragging()
        }catch (e){
            console.error("Something wrong..")
        }
    };

    const startDragging = (x , y) => {
        setDragging(false)
        console.log("Начало драга для " + props.item.suit)
        props.placeDrag(props.item)
        setDragging(true);
        setStartPos({
            x: x - pos.x,
            y: y - pos.y
        });
        console.log(props.size)
        setPos({ x: 0, y: 0 });
    }

    const handleTouchStart = (e) => {
        try {
            const touch = e.touches[0];
            startDragging(touch.clientX, touch.clientY);
        }catch (e){
            console.error("Something wrong..")
        }
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPos({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };
    const handleTouchMove = (e) => {
        if (dragging) {
            const touch = e.touches[0];
            setPos({
                x: touch.clientX - startPos.x,
                y: touch.clientY - startPos.y
            });
        }
    };

    const handleTouchEnd = () => {
        endDragging();
    };

    const endDragging = () => {
        setDragging(false);

        props.sizesCards.forEach(
            (elem, index) => {
                console.log(index + "")
                if(pos.x + startPos.x >= elem.left && pos.x + startPos.x  <= elem.left + elem.width &&
                    pos.y + startPos.y  >= elem.top && pos.y + startPos.y <= elem.top +elem.height){
                    console.log("гоооол" + index)
                    props.placeDrop(props.item, index)
                    props.dropSelectCard()
                    props.updater()
                    setPos({ x: 0, y: 0 });
                    return
                }
            })

        if(pos.x + startPos.x >= props.size.left && pos.x + startPos.x  <= props.size.left + props.size.width &&
            pos.y + startPos.y  >= props.size.top && pos.y + startPos.y <= props.size.top + props.size.height
            && !props.defence){
            console.log("гоооол")
            props.placeDrop(null, 0)
            props.dropSelectCard()
            setPos({ x: 0, y: 0 });
            props.updater()
            return
        }

        props.dropSelectCard()
        setPos({ x: 0, y: 0 });
        setDragging(false);

        props.updater()
    }



    return (
        <div className="moved" style={{
            zIndex: props.index,
            top: pos.y, left: pos.x
        }}
             onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}>
            <div
                className="card2 style-card-size"
                style={{
                    backgroundPosition: new Card3(props.item.rank, props.item.suit).backgroundPosition,
                    left: props.index * 20 + "px",
                    position: "absolute"
                }}
            ></div>
        </div>
    );
}

export default CardInHandComponent;