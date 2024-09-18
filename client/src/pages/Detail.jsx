import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import CommentSection from '../components/Comments';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCT_BY_ID } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import AuthService from '../utils/auth';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { cart } = state;

  const { loading, data, error } = useQuery(QUERY_PRODUCT_BY_ID, {
    variables: { id },
  });

  const isLoggedIn = AuthService.loggedIn();

  useEffect(() => {
    if (data) {
      const product = data.product;
      setCurrentProduct(product);
      idbPromise('products', 'put', product);
    } else if (!loading) {
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

  if (loading) return <img src={spinner} alt="Loading" className="mx-auto" />;
  if (error) return <p className="text-red-500 text-center">Error loading product details</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {currentProduct && cart ? (
        <>
          <Link to="/" className="text-forest-green hover:text-terracotta mb-4 inline-block">
            ← Back to Products
          </Link>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-forest-green mb-4">{currentProduct.name}</h2>
              <p className="text-gray-700 mb-4">{currentProduct.description}</p>
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain' }}
                className="mb-4"
              />
              <p className="text-xl font-bold text-terracotta mb-4">
                Price: ${currentProduct.price}{' '}
                <button
                  onClick={addToCart}
                  className="bg-sunflower text-forest-green py-2 px-4 rounded hover:bg-terracotta hover:text-white transition duration-300 mr-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={removeFromCart}
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  className="bg-terracotta text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove from Cart
                </button>
              </p>
            </div>
          </div>

          <CommentSection
            comments={currentProduct.comments || []}
            isLoggedIn={isLoggedIn}
            productId={currentProduct._id}
          />
        </>
      ) : null}
      <Cart />
    </div>
  );
}

export default Detail;