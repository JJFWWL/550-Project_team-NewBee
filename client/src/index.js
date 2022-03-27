import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import FriendPage from './pages/FriendPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import RestaurantsRecommender from './pages/RestaurantsRecommender';

ReactDOM.render(
	<div>
		<Router>
			<Switch>
				<Route exact
					path="/"
					render={() => (
						<HomePage />
					)} />
				<Route exact
					path="/friends"
					render={() => (
						<FriendPage />
					)} />
				<Route exact
					path="/restaurants"
					render={() => (
						<RestaurantsRecommender />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);
