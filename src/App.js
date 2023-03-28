import React, { useState, useEffect } from 'react';
import './App.css';
import { AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Confetti from 'react-confetti'
import { CredScoreTopSection } from "./modules/CredScoreTopSection";

const CRED_APP_API_URI = "https://beta.credprotocol.com";

const CredWidget = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [score, setScore] = useState({value: 722, value_rating: "Fair"});
    const [address, setAddress] = useState('');

    const handleClick = async (element, release) => {

        setError(null);
        setScore(null);

        if (!address) {
            setError('Address is empty');
            release(false, 'error');
            return;
        }

        const token = props.token;
        const url = `${CRED_APP_API_URI}/api/score/address/${address}/`;
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
                if(!response.ok) {
                    setError(response_json.error);
                    release(false, 'error');
                }
                else {
                    setScore(response_json);
                    release();
                }
            });
    };

    return (
        <div className='grid place-items-center'>
            <div className='flex bg-dark-blue min-w-[300px] min-h-[200px]'>
                <div className='min-w-[300px]'>
                    <CredScoreTopSection
                        address={address}
                        credScoreData={score}
                        loading={!isLoaded}
                    />
                </div>
                <div className='flex flex-col m-16 justify-center'>
                    <div className='p-3'>
                        <input
                            className='border border-gray-300 text-sm rounded-lg block p-1.5'
                            type="text"
                            value={address}
                            placeholder="Enter address"
                            onChange={event => setAddress(event.target.value)}
                        />
                    </div>
                    <div className='flex flex-col p-auto'>
                        <AwesomeButtonProgress
                            type="secondary"
                            disabled={!address}
                            onPress={(element, release) => handleClick(element, release)}
                        >
                            Get Score
                        </AwesomeButtonProgress>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CredWidget;