import React from 'react';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

type CartButtonProps = {
  itemCount: number;
  showAddedMessage?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({ itemCount, showAddedMessage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleClick = () => {
    if (isCartPage) {
      navigate('/', { replace: true });
    } else {
      navigate('/cart', { replace: true });
    }
  };

  // Ajustamos el tamaño en función del dispositivo
  const buttonStyle = {
    position: 'relative' as const,
    backgroundColor: "rgba(247, 195, 6, 0.82)",
    border: 'none',
    borderRadius: '50%',
    width: isMobile ? '4rem' : '3rem',  // Mayor en móvil
    height: isMobile ? '4rem' : '3rem',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    cursor: 'pointer',
    boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.3)',
  };

  const iconStyle = {
    fontSize: isMobile ? '1.5rem' : '1.5rem',  // Ícono más grande en móvil
    color: 'black',
  };

  return (
    <div style={cartButtonStyles.buttonContainer}>
      <button style={buttonStyle} onClick={handleClick}>
        {isCartPage ? (
          <FaArrowLeft style={iconStyle} />
        ) : (
          <FaShoppingCart style={iconStyle} />
        )}
        {!isCartPage && itemCount > 0 && (
          <span style={cartButtonStyles.badge}>{itemCount}</span>
        )}
      </button>
      {showAddedMessage && <div style={cartButtonStyles.toast}>Producto agregado</div>}
    </div>
  );
};

const cartButtonStyles = {
  buttonContainer: {
    position: 'fixed' as const,
    bottom: '2vh',
    right: '2vh',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
  },
  badge: {
    position: 'absolute' as const,
    top: '-0.5rem',
    right: '-0.5rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '0.2rem 0.4rem',
    fontSize: '0.8rem',
  },
  toast: {
    marginTop: '0.5rem',
    backgroundColor: '#222',
    color: '#fff',
    padding: '0.4rem 0.8rem',
    borderRadius: '0.4rem',
    fontSize: '0.8rem',
    opacity: 0.9,
  },
};

export default CartButton;
