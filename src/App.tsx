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
import { useRecoilState } from 'recoil';
import { timeSelector, roundAtom } from './atoms';

const timeCardVariants = {
  start: { scale: 0.8 },
  end: { scale: 1.2 },
};

export default function App() {
  const timer = useRef<NodeJS.Timer | null>(null);
  const [time, setTime] = useRecoilState(timeSelector);
  const [round, setRound] = useRecoilState(roundAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const minute = `${Math.floor(time / 60)}`.padStart(2, '0');
  const second = `${Math.floor(time % 60)}`.padStart(2, '0');

  function tick() {
    setTime((prevTime) => {
      const time = prevTime - 1;
      if (time === 0) {
        clearInterval(timer.current as NodeJS.Timer);
        setIsPlaying((value) => !value);
        return time;
      }

      return time;
    });
  }

  function onButtonClick() {
    if (isPlaying) {
      clearInterval(timer.current as NodeJS.Timer);
      setIsPlaying((value) => !value);
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
        <TimeCard
          key={minute}
          variants={timeCardVariants}
          initial='start'
          animate='end'
        >
          {minute}
        </TimeCard>
        :
        <TimeCard
          key={second}
          variants={timeCardVariants}
          initial='start'
          animate='end'
        >
          {second}
        </TimeCard>
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
