import React, {useState} from 'react';

const Home: React.FC = () => {
    const [counter, setCounter] = useState(0)

    const onIncrease = () => {
        setCounter(counter + 1)
    }

    const onReset = () => {
        setCounter(0)
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>{counter}</h2>
            <button onClick={onReset}>Reset</button>
            <button onClick={onIncrease} style={{marginLeft: "20px"}}>Increase</button>
        </div>
    );
}

export default Home;
