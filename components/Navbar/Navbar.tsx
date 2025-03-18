'use client'

import React, { useState } from 'react';
import CartSidePanel from './CardSidePanel';
import CartIcon from './CartIcon';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-8">
            {/* Logo or Brand Name */}
            <div className="text-2xl font-bold text-gray-800">
              Libreria Oculta
            </div>

            {/* Search Bar */}
            <div className="flex-grow mx-4 md:mx-8 max-w-sm">
              <input
                type="text"
                placeholder="Buscar libros..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-800 hover:text-blue-600" onClick={() => {setIsCartOpen(true)}}>
                  <CartIcon />
                </button>
                {/* Count items and display badge for cart items */}
                {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                3
              </span> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CartSidePanel isOpen={isCartOpen} onClose={toggleCart} />
    </>

  );
};

export default Navbar;