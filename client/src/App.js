import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from "react-redux";
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import Signup from './pages/Signup';
import SuccessOrder from "./pages/SuccessOrder";
import Nav from './components/Nav';
import store from "./utils/store";

const client = new ApolloClient({
	request: operation => {
		const token = localStorage.getItem('id_token');
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		});
	},
	uri: '/graphql',
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Provider store={store}>
						<Nav />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/orderHistory" component={OrderHistory} />
							<Route exact path="/products/:id" component={Detail} />
							<Route exact path="/successOrder" component={SuccessOrder} />
						</Switch>
					</Provider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;