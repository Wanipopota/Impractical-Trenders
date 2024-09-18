// client/src/components/CartItem/index.jsx
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <img
          src={`/images/${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-forest-green">{item.name}</h3>
          <p className="text-terracotta font-bold">${item.price}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            className="w-16 px-2 py-1 border rounded text-center"
          />
          <button
            onClick={() => removeFromCart(item)}
            className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
            aria-label="Remove item"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;