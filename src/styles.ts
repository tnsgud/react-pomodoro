import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  align-items: center;
  background-color: tomato;
  padding: 20px 0;
`;
export const Title = styled.span`
  font-weight: bold;
  font-size: 70px;
  color: white;
`;
export const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 20px;
  font-size: 60px;
`;
export const TimeCard = styled.span`
  background-color: #f2f2f2;
  color: tomato;
  font-weight: 900;
  padding: 30px 20px;
  border-radius: 10px;
`;
export const ButtonWrapper = styled(motion.svg)`
  fill: white;
  width: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  padding: 20px;
`;

export const PlayIcon = styled.path``;

export const PauseIcon = styled.path``;

ButtonWrapper.defaultProps = {
  viewBox: '0 0 20 20',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
};

PauseIcon.defaultProps = {
  d: 'M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z',
};

PlayIcon.defaultProps = {
  d: 'M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z',
};

export const CountWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export const Counter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const CountTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

export const Count = styled.span`
  font-size: 25px;
  font-weight: bold;
`;
