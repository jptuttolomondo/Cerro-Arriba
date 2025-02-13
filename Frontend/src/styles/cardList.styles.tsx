export const cardListStyles = {
    container: {
      alignItems: "center",
      gap: "1.25rem",            // 20px → 1.25rem
      padding: "1.25rem",         // 20px → 1.25rem
      backgroundColor: "#121212",
      color: "#fff",
      minHeight: "100vh",
      width: "100%",
      flexWrap: "wrap" as const,
    },
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "0.5rem",     // 8px → 0.5rem
      boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)", // 4px 8px → 0.25rem y 0.5rem
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      width: "100%",
      maxWidth: "18.75rem",       // 300px → 18.75rem
    },
    wrapperHover: {
      transform: "scale(1.05)",
    },
    overlay: {
      position: "fixed" as const,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    overlayContent: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      backgroundColor: "#222",
      padding: "1.25rem",         // 20px → 1.25rem
      borderRadius: "0.5rem",      // 8px → 0.5rem
      boxShadow: "0 0.5rem 1rem rgba(171, 37, 37, 0.39)", // 8px y 16px → 0.5rem y 1rem
      width: "80%",
      zIndex: 1001,
    },
    overlayImage: {
      width: "100%",
      maxHeight: "12.5rem",       // 200px → 12.5rem
      objectFit: "cover" as const,
      marginBottom: "1rem",       // 16px → 1rem
      borderRadius: "0.5rem",      // 8px → 0.5rem
    },
    overlayDetails: {
      textAlign: "center" as const,
      color: "#fff",
    },
    price: {
      fontSize: "1.6rem",         // 25px → 1.6rem (aproximadamente)
      color: "#fff",
      margin: "0.5rem 0",         // 8px 0 → 0.5rem 0
      zIndex: 1002,
    },
    button: {
      padding: "0.625rem 1.25rem", // 10px 20px → 0.625rem y 1.25rem
      backgroundColor: "rgb(255, 228, 0)",
      color: "rgb(0, 0, 0)",
      border: "none",
      borderRadius: "0.25rem",     // 4px → 0.25rem
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#0056b3",
      },
    },
    title: {
      fontSize: "3rem",           // El tamaño puede mantenerse en rem para escalabilidad
      marginBottom: "1rem",       // 16px → 1rem
      textAlign: "center" as const,
      color: "#fff",
      width: "100%",
    },
    productsSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(12.5rem, 1fr))", // 200px → 12.5rem
      gap: "1rem",                // 16px → 1rem (aproximadamente)
      width: "100%",
      margin: "0 auto",
      padding: "1.25rem",         // 20px → 1.25rem
      justifyItems: "center",
    },
    toast: {
      position: "fixed" as const,
      top: "2vh",
      right: "2vh",
      backgroundColor: "#222",
      color: "#fff",
      padding: "0.5em 1em",       // Se mantiene en em para ser relativo al tamaño de fuente
      borderRadius: "0.25rem",    // 4px → 0.25rem
      zIndex: 1100,
      fontSize: "1rem",
    },
  };