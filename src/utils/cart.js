export function cartQuantity( cart ) {
  let totalCartQuantity = 0;
  cart.forEach( (cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity;
};