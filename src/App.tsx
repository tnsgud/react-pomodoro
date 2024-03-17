import { useEffect, useRef, useState } from 'react';
import {
  ButtonWrapper,
  Count,
  CountTitle,
  CountWrapper,
  Counter,
  PauseIcon,
  PlayIcon,
  TimeCard,
  TimerWrapper,
  Title,
  Wrapper,
} from './styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { timeSelector, roundAtom } from './atoms';

export default function App() {
  const timer = useRef<NodeJS.Timer | null>(null);
  const [time, setTime] = useRecoilState(timeSelector);
  const [round, setRound] = useRecoilState(roundAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const minute = `${Math.floor(time / 60)}`.padStart(2, '0');
  const second = `${Math.floor(time % 60)}`.padStart(2, '0');

  function tick() {
    setTime((prevTime) => prevTime - 1);
  }

  function onButtonClick() {
    if (isPlaying) {
      clearInterval(timer.current as NodeJS.Timer);
      setIsPlaying(!isPlaying);
      return;
    }

    const interval = setInterval(tick, 1000);

    timer.current = interval;
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const localStorageTime = localStorage.getItem('time');
    const localStorageRound = localStorage.getItem('round');

    setTime(Number(localStorageTime) ?? 1500);
    setRound(Number(localStorageRound) ?? 0);
  }, []);

  return (
    <Wrapper>
      <Title>Pomodoro</Title>

      <TimerWrapper>
        <TimeCard>{minute}</TimeCard>:<TimeCard>{second}</TimeCard>
      </TimerWrapper>

      <ButtonWrapper onClick={onButtonClick}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </ButtonWrapper>

      <CountWrapper>
        <Counter>
          <Count>{round % 4}/4</Count>
          <CountTitle>ROUND</CountTitle>
        </Counter>
        <Counter>
          <Count>{`${Math.floor(round / 4)}`}/12</Count>
          <CountTitle>GOAL</CountTitle>
        </Counter>
      </CountWrapper>
    </Wrapper>
  );
}
