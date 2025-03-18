import React from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidePanel = ({ isOpen, onClose }: CartProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Carrito de compras</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            CERRAR X
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-4">
          <p>No hay productos en el carrito.</p>
        </div>
      </div>
    </>
  );
};

export default CartSidePanel;