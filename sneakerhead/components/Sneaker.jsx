import React, { useEffect, useState } from 'react';

function Sneaker({ sneaker }) {
    if (!sneaker) {
        return <div>Loading...</div>;
    }
    return (
        <div className="sneaker">
            <h2>{sneaker.shoeName}</h2>
            {sneaker.brand && <button className="tags">{sneaker.brand}</button>}
            {sneaker.colorway && <button className="tags">{sneaker.colorway}</button>}
            {sneaker.retailPrice && <button className="tags">{sneaker.retailPrice}</button>}
            <img className="sneaker-image" src={sneaker.thumbnail} alt={sneaker.shoeName} />
            <p>{sneaker.description}</p>
            
        </div>
    );
}

export default Sneaker;
