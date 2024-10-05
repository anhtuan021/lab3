import React from 'react';

const SelectItemsPopup = ({ cart, onClose, onQuantityChange }) => {
    return (
        <div>
            {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {Object.values(cart).map(item => (
                        <div key={item.id} className="d-flex justify-content-between align-items-center">
                            <div>{item.title} - ${item.price} x {item.count}</div>
                            <div>
                                <button className="btn btn-sm btn-secondary" onClick={() => onQuantityChange(item.id, -1)}>-</button>
                                <button className="btn btn-sm btn-secondary" onClick={() => onQuantityChange(item.id, 1)}>+</button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default SelectItemsPopup;
