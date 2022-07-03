import { FC } from 'react';
import './Card.scss';

type CardProps = {}

const Card: FC<CardProps> = ({ children }) => (
  <div className="card-container">
    {children}
  </div>
);

export default Card;
