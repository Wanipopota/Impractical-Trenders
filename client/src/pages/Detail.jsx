import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import CommentSection from '../components/Comments'; // Import CommentSection
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCT_BY_ID } from '../utils/queries'; // Import the query to fetch product by ID
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import AuthService from '../utils/auth'; // Import AuthService

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { cart } = state;

  // Query the product by ID instead of querying all products
  const { loading, data, error } = useQuery(QUERY_PRODUCT_BY_ID, {
    variables: { id },
  });

  // Check if the user is logged in
  const isLoggedIn = AuthService.loggedIn();

  useEffect(() => {
    if (data) {
      const product = data.product;

      // Save product in state and in IndexedDB for offline use
      setCurrentProduct(product);
      idbPromise('products', 'put', product);
    } else if (!loading) {
      // Get product from IndexedDB if not available in the server response
      idbPromise('products', 'get').then((indexedProducts) => {
        const product = indexedProducts.find((p) => p._id === id);
        if (product) {
          setCurrentProduct(product);
        }
      });
    }
  }, [data, loading, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  if (loading) return <img src={spinner} alt="Loading" />;
  if (error) return <p>Error loading product details</p>;

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <h3>{currentProduct.description}</h3>

          <p>
            <strong>Price:</strong> ${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />

          {/* Render the CommentSection component */}
          <CommentSection
            comments={currentProduct.comments || []}
            isLoggedIn={isLoggedIn}
            productId={currentProduct._id}
          />
        </div>
      ) : null}
      <Cart />
    </>
  );
}

export default Detail;
