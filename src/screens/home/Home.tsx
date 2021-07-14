import React, {useState} from 'react';
import './Home.css'

const Home: React.FC = () => {
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

export default Home;
