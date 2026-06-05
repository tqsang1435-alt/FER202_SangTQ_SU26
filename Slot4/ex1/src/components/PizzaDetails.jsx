import React from 'react';

function PizzaDetails({ pizza }) {
  if (!pizza) return null;
  return (
    <>
      {pizza.Image && (
        <img src={pizza.Image} alt={pizza.Name} style={{ width: '100%', marginBottom: '10px' }} />
      )}
      <p><strong>ID:</strong> {pizza.Id}</p>
      <p><strong>Description:</strong> {pizza.Description}</p>
      <p><strong>Old Price:</strong> <del>{pizza.OldPrice}</del></p>
      <p><strong>New Price:</strong> {pizza.newPrice}</p>
      <p><strong>Tag:</strong> {pizza.tag}</p>
    </>
  );
}

export default PizzaDetails;
