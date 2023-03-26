import React, { useState, useEffect } from 'react';
import './App.css';
import { AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Confetti from 'react-confetti'
import cred_signature from './images/cred_signature.png';

const CredWidget = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [score, setScore] = useState(null);
    const [address, setAddress] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = async (element, release) => {

        setError(null);
        setScore(null);

        if (!address) {
            release();
            return;
        }

        const token = props.token;
        const url = `${process.env.CRED_APP_API_URI}/api/score/address/${address}/`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        fetch(url, options)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, response_json]) => {
                setIsLoaded(true);
                console.log(response_json);
                if(!response.ok) {
                    setError(response_json.error);
                    release(false, 'error');
                }
                else {
                    setScore(response_json.value);
                    release();
                }
            });
    };

    return (
        <div className="App">
            <div className="input-wrapper-address">
                <label htmlFor="address">Enter an address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
            </div>
            <AwesomeButtonProgress
                type="secondary"
                disabled={!address}
                onPress={(element, release) => handleClick(element, release)}
            >
                <img
                    src={cred_signature}
                    style={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    alt="cred_signature.png"
                />
            </AwesomeButtonProgress>
            <div className="result">
                {error && <p>{error}</p>}
                {score && <p>Cred Score: {score}</p>}
                {score >= 850 && (
                    <div>
                        <p>Congratulations! You have a high Cred Score!</p>
                        <Confetti width={width} height={height} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CredWidget;