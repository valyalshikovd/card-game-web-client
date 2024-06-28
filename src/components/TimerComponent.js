import React, { useState, useEffect } from 'react';

function TimerComponent(props) {
    const [timeLeft, setTimeLeft] = useState(props.time); // Таймер на 10 секунд

    useEffect(() => {
        if (timeLeft === 0){
            props.timeIsUp()
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId); // Очищаем таймер при размонтировании компонента
    }, [timeLeft]);

    return (
        <div>
            <p>Осталось: {timeLeft} сек</p>
        </div>
    );
}

export default TimerComponent;
