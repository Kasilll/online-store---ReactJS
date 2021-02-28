import React from 'react';
import './scss/app.scss';
import { useDispatch } from 'react-redux';
import { Header } from './components';
import { Route } from 'react-router-dom';
import { Home, Cart } from './page';

function App() {
	const dispatch = useDispatch();

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<Route exact path="/" component={Home} />
					<Route exact path="/cart" component={Cart} />
				</div>
			</div>
		</div>
	);
}

export default App;
