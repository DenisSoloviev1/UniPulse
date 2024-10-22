import { Routes } from 'react-router-dom';
import { routes } from '../index';
import { CreateRoute } from './index';

export const Routing = () => {
  return <Routes>{routes.map(CreateRoute)}</Routes>;
};
