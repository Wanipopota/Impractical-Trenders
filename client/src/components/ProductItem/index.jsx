import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const { image, name, _id, price, quantity } = item;
  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="mt-2">
            <span className="text-sm text-gray-600">{quantity} {pluralize("item", quantity)} in stock</span>
            <span className="block text-terracotta font-bold">${price}</span>
          </div>
        </div>
      </Link>
      <button 
        onClick={addToCart}
        className="w-full bg-sunflower text-forest-green font-bold py-2 px-4 hover:bg-terracotta hover:text-white transition duration-300"
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductItem;