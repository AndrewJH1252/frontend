import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, markCartItem, unmarkCartItem } from '../../redux/Thunks/cartThunk';
import { FiCheckCircle,  FiPlusCircle } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';

const CartItem = React.memo(({ item, onRemove, setReloadRequests }) => {
  const dispatch = useDispatch();
 

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
    onRemove(item._id);
    setReloadRequests(true);
  };

  const handleMarkCartItem = () => {
    if (item.marked) {
      // If already marked, unmark the item
      dispatch(unmarkCartItem(item._id));
    } else {
      // If not marked, mark the item
      dispatch(markCartItem(item._id));
    }
    setReloadRequests(true);
  };
  

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${item.marked ? 'bg-green-200' : ''}`}>
      <h2 className=" font-semibold mb-2 truncate">{item.itemName}</h2>
      <p
  className="text-gray-500 mb-4"
  style={{
    maxHeight: "1.2em", // Adjust the height as needed
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }}
  dangerouslySetInnerHTML={{ __html: item.itemDescription }}
></p>


      <div className="flex items-center">
        <p className="ml-auto text-sm text-gray-700">Quantity: {item.quantity}</p>
        <p className="ml-auto text-lg font-semibold">${item.price.toFixed(2)}</p>
        <button
          onClick={handleMarkCartItem}
          className={`p-2 rounded-md ${
            item.marked
              ? ' text-white'
              : ' text-gray-600 '
          } transition ml-auto`}
        >
           {item.marked ? (
          <FiCheckCircle className='text-xl text-blue-400 hover:text-blue-600'/>
        ) : (
          <FiPlusCircle className='text-xl text-yellow-600 hover:text-yellow-700' />
        )}
    
      </button>
        <button
          onClick={handleRemove}
          className="text-xl ml-4 text-red-500 hover:text-red-600"
        >
          <BiTrash className="" />
        </button>
      </div>
</div>


  );
});

export default CartItem;
