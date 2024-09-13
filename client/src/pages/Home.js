import React, { useState } from 'react';
import ProductList from '../components/Product-list';
import Cart from '../components/Cart';

const Home = () => {
	return (
		<div className="container">
			<ProductList />
			<Cart />
		</div>
	);
};

export default Home;