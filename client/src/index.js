import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';


import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import RestaurantsRecommender from './pages/RestaurantsRecommender';
import FriendsPage from './pages/FriendsPage';
import ScientistPage from './pages/ScientistPage';
import Home from './pages/HomePage';

ReactDOM.render(
	<div>
		<Router>
			<Switch>
				<Route exact
					path="/"
					render={() => (
						<Home />
					)} />
				<Route exact
					path="/friends"
					render={() => (
						<FriendsPage />
					)} />
				<Route exact
					path="/businesses"
					render={() => (
						<RestaurantsRecommender />
					)} />
				<Route exact
					path="/scientists"
					render={() => (
						<ScientistPage />
					)} />

			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);
