import React, {useState} from 'react';
import './Counter.css'

export const Counter: React.FC = () => {
    const [counter, setCounter] = useState(0)

    const onIncrease = () => {
        setCounter(counter + 1)
    }

    const onReset = () => {
        setCounter(0)
    }

    return (
        <div className="container">
            <h2>{counter}</h2>
            <button onClick={onReset}>Reset</button>
            <button onClick={onIncrease} className="ml-1">Increase</button>
        </div>
    );
}
