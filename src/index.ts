import { Game } from '/game';
import './style.scss';

const root = document.getElementById('root');
if (root) new Game(root);
