import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import axios from "axios";
import React from 'react'
import CookieImg from "../assets/cookie.png";

const rotateAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  };

  100%
  {
    transform: rotate(360deg);
  }
`

const IncrementButton =  styled.button`
  width: 15rem;
  height: 15rem;
  background-size: cover;
  border: none;
  cursor: pointer;
  transition: all 0.4s;
  background-color: #FFFFFF;
  &:active
  {
    transform: scale(1.1);
  }
  position: relative;
`


const ClickerContainer =  styled.div`
  width: 100%;
  height: 100vh;
`

const ClickerContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Scores = styled.p`
  color: #150000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 5em;

  text-shadow: #fc0 1px 0 10px;
`

const CookieImage = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  transition: all 0.4s;
  background-color: #FFFFFF;
  animation: ${rotateAnimation} 8s linear infinite;
`



function LeadPage()
{
  const [scores, setScores] = useState();
  const tg = window.Telegram.WebApp;

  function GetScoresByTelegramId()
  {
            
    tg.ready();
    tg.expand();

    if (tg.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      axios.get("https://localhost:7057/api/checkuser", {
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
      axios.post("https://localhost:7057/api/addscores", 
          {
            telegramId: user.id,
            ScoresCount: 1
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
        <IncrementButton onClick={() => AddScoresAsync()}>
          <CookieImage src={CookieImg} alt='CookieImg'/>
          <Scores>{scores}</Scores>
        </IncrementButton>
      </ClickerContent>
    </ClickerContainer>
  )
}

export default LeadPage;