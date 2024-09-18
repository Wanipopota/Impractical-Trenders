import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-10" onClick={toggleCart}>
        <button className="bg-sunflower text-forest-green p-4 rounded-full shadow-lg hover:bg-terracotta hover:text-white transition duration-300">
          🛒
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-forest-green">Shopping Cart</h2>
        <button onClick={toggleCart} className="text-terracotta hover:text-forest-green">
          ✕
        </button>
      </div>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <strong className="text-lg">Total:</strong>
              <strong className="text-lg text-terracotta">${calculateTotal()}</strong>
            </div>

            {Auth.loggedIn() ? (
              <button
                onClick={submitCheckout}
                className="w-full bg-sunflower text-forest-green font-bold py-2 px-4 rounded hover:bg-terracotta hover:text-white transition duration-300"
              >
                Checkout
              </button>
            ) : (
              <p className="text-center text-gray-600 italic">(log in to check out)</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 italic">
          <span role="img" aria-label="shocked" className="mr-2">
            😱
          </span>
          You haven't added anything to your cart yet!
        </p>
      )}
    </div>
  );
};

export default Cart;