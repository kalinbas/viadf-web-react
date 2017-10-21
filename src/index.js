import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter } from 'react-router-dom'

import Layout from './Layout';

import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
<BrowserRouter>
  <Layout hasAds></Layout>
</BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
