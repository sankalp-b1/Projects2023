import React, { useState } from 'react';

const UserContext = React.createContext(null);

const CartContext = React.createContext([]);

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));

const cartFromSessionStorage = JSON.parse(sessionStorage.getItem('cart'));

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userFromSessionStorage || null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromSessionStorage || []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { UserContext, UserProvider, CartContext, CartProvider};
