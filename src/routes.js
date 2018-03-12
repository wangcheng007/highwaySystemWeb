import React from "react";
import {
	Route,
	IndexRoute,
	Router,
	browserHistory,
	hashHistory,
	applyRouterMiddleware
} from "react-router";
import {
	useScroll
} from 'react-router-scroll';

import Home from './pages/home/index';

export const routes = (
	<Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={Home}></Route>
	</Router>
);