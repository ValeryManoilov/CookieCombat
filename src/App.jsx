import { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";
import axios from "axios";

const IncrementButton =  styled.button`

`

const ClickerContainer =  styled.div`

`

const ClickerContent = styled.div`

`

const Scores = styled.div`

`



function App() {

  const [scores, setScores] = useState();
  const tg = window.Telegram.WebApp;

  function GetScoresByTelegramId()
  {
            
    tg.ready();
    tg.expand();

    if (tg.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      axios.get("https://localhost:7057/checkuser", {
          params:
          {
              telegramId: user.id
          },
          headers: 
          {
              "Content-type": "application/json"
          }
      })
      .then((res) => {
        setScores(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else {
        console.error('User data not available');
    }
  }

  function AddScoresAsync()
  {
    tg.ready();
    tg.expand();

    if (tg.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      axios.post("https://localhost:7057/addscores", 
          {
            telegramId: user.id
          },
          {
            headers: 
            {
                "Content-type": "application/json"
            }
          }
      )
      .then((res) => {
        setScores(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else {
        console.error('User data not available');
      }
    }

  useEffect(() => {
    GetScoresByTelegramId()
  }, [])
  
  return (
    <ClickerContainer>
      <ClickerContent>
        <Scores>{scores}</Scores>
        <IncrementButton onClick={() => AddScoresAsync()}>+</IncrementButton>
      </ClickerContent>
    </ClickerContainer>
  )
}

export default App
