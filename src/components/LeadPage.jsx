import { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from "styled-components";
import axios from "axios";
import React from 'react'
import CookieImg from "../assets/cookie.png";
import cookieStore from '../stores/cookieStore';

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
  background-color: #5db3fe;
  &:active
  {
    transform: scale(1.1);
  }
  position: relative;
`


const ClickerContainer =  styled.div`
  width: 100%;
  height: 100vh;
  background-color: #5db3fe;
`

const ClickerContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Scores = styled.p`
  color: #150000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5em;

  text-shadow: #fc0 1px 0 10px;
`

const CookieImage = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  transition: all 0.4s;
  background-color: #5db3fe;
  animation: ${rotateAnimation} ${props => props.RotateSpeed} linear infinite;
  box-shadow: #ff3700 1px 0 10px;
`

const Title = styled.h1`
  margin-bottom: 5rem;
  padding: 0;
  font-size: 3rem;
`



function LeadPage()
{
  const [scores, setScores] = useState();
  const tg = window.Telegram.WebApp;

  const currentLevel = useMemo(() => {

    const data = [...cookieStore.data].reverse()
    const foundLevel = data.find(level => scores >= level.Scores);
    console.log(foundLevel)
    return foundLevel || data[data.length - 1];
  }, [scores])


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
            ScoresCount: currentLevel.AddScores
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
        <Title>
          {currentLevel.Title}
        </Title>
        <IncrementButton onClick={() => AddScoresAsync()}>
          <CookieImage src={currentLevel.Image} alt='CookieImg' RotateSpeed={currentLevel.RotateSpeed}/>
          <Scores>{scores}</Scores>
        </IncrementButton>
      </ClickerContent>
    </ClickerContainer>
  )
}

export default LeadPage;