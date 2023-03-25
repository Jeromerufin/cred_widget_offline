import React, { useState, useEffect } from 'react';
import './App.css';
import { AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import Confetti from 'react-confetti'

const CredWidget = (props) => {
  const [result, setResult] = useState(null);
  const [address, setAddress] = useState('');
  const [buttonReleased, setButtonReleased] = useState(false);
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

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleClick = async (element, next) => {

     if (!address) {
      setButtonReleased(true);
      return;
    }

    setButtonReleased(false);

    const token = props.token;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const url = `https://beta.credprotocol.com/api/score/address/${address}`;
    const response = await fetch(url, options);
    const data = await response.json();
    setResult(data);

    if (data.status_code === 406) {
      setResult({ message: 'Invalid Address' });
      setTimeout(() => {
        setResult({ message: 'Never Gonna...' });
        setTimeout(() => {
          window.open('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', '_blank');
        }, 2000);
      }, 2000);
    } else if (data.status_code === 422) {
      setResult({ message: 'No Score, go be a degen!' });
      setTimeout(() => {
        setResult(null);
        window.open('https://giphy.com/embed/ktlaD9M83JO80xeqQd', '_blank');
      }, 4000);
    }
    setButtonReleased(true);
    next();
  };

  return (
    <div className="App">
      <div className="input-wrapper-address">
        <label htmlFor="address">Enter an address:</label>
        <input type="text" id="address" value={address} onChange={handleChangeAddress} />
      </div>
      <AwesomeButtonProgress type="secondary" onPress={(element, next) => handleClick(element, next)}>
        <img
          src={require('./cred_signature.png')}
          style={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          alt="cred_signature.png"
        />
      </AwesomeButtonProgress>
      {result && (
        <div>
          <div className="result">
            {result.message ? <p>{result.message}</p> : <p>Cred Score: {result.value}</p>}
            {result.value >= 850 && (
                <div>
            <p>Congratulations! You have a high Cred Score!</p>
             <Confetti width={width} height={height} />
                </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CredWidget;