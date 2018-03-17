import React from "react";
import {
	Route,
	IndexRoute,
	Router,
	hashHistory,
	applyRouterMiddleware
} from "react-router";
import {
	useScroll
} from 'react-router-scroll';

import LoginView from '../pages/login/index';
import HomeView from '../pages/home/index';
import LayoutView from '../pages/layout/index';
import UserInfoView from '../pages/userInfo/index';

export const routes = (
	<Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path='/' component={LoginView}/>
		<Route path='/home' component={LayoutView}>
			<IndexRoute component={HomeView} />
			<Route path='/userInfo' component={UserInfoView} />
		</Route>
	</Router>
);