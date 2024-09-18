import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-forest-green hover:text-terracotta mb-4 inline-block">
        ← Back to Products
      </Link>

      {user ? (
        <div>
          <h2 className="text-3xl font-bold text-forest-green mb-6">Order History for {user.firstName} {user.lastName}</h2>
          {user.orders.map((order) => (
            <div key={order._id} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-green mb-2">
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <Link to={`/products/${_id}`}>
                        <img
                          alt={name}
                          src={`/images/${image}`}
                          className="w-full h-32 object-cover mb-2 rounded"
                        />
                        <p className="text-forest-green font-semibold">{name}</p>
                      </Link>
                      <span className="text-terracotta font-bold">${price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default OrderHistory;