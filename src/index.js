import React from 'react';
import ReactDOM from 'react-dom';
import { routes } from './routes';

import './common/style/index.less';
import 'element-theme-default';

const rootEL = document.getElementById('root');
ReactDOM.render( routes, rootEL);
