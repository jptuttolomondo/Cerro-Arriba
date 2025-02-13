export const styles = {
    buttonContainer: {
      position: 'fixed' as const,
      bottom: '2vh',
      right: '2vh',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
    },
    cartButton: {
      position: 'relative' as const,
      backgroundColor: 'rgb(255, 228, 0)',
      border: 'none',
      borderRadius: '50%',
      width: '3rem',   // Medida relativa (3rem)
      height: '3rem',  // Medida relativa (3rem)
      display: 'flex',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      cursor: 'pointer',
      boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.3)',
    },
    cartIcon: {
      fontSize: '1.5rem',
      color: 'black',
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
  }
  