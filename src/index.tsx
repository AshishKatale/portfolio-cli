/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const root = document.getElementById('root');

render(() => {

  document.documentElement.dataset['theme'] = 'dark';

  return <App />;
}
, root!);
