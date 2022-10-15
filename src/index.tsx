import { render } from 'react-dom';
import Router from './router';
import './i18n';

const rootElement = document.getElementById('root');
render(<Router />, rootElement);
