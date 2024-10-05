import React from 'react';
const CardItem = ({ item, addToCart }) => {
  return (
    <div className="col-md-3 mb-2">
      <div className="card">
        <img src={item.imgSrc} className="card-img-top" alt={item.title} />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="text-muted">${item.price.toFixed(2)}</p>
          <button className="form-control btn btn-dark" onClick={() => addToCart(item)}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;