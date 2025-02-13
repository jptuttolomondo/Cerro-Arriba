import React, { useState, useEffect } from "react";
import { useDispatch } from "../redux/store/store.tsx";
import { useProductsSelector } from "../redux/selectors/Products.selectors.tsx";
import { getAllProducts } from "../redux/actions/products.actions.tsx";
import Card from "./cards.tsx";
import { Product } from "../types/product.types.tsx";
import { CardListProps } from "../types/card.types.tsx";
import { AddToCart } from "../redux/actions/carts.actions.tsx";
import { cardListStyles } from "../styles/cardList.styles.tsx";
import { useMediaQuery } from "react-responsive";

const CardList: React.FC<CardListProps> = () => {
    // Detecta si es móvil (por ejemplo, ancho menor o igual a 768px)
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });  
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const products = useProductsSelector();
  
  const handleAddToCart = (product: Product) => {
    dispatch(AddToCart(product));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getAllProducts());
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }


 

  // Si es móvil, sobreescribimos algunos estilos para que la lista se muestre vertical
  const containerStyle = isMobile
    ? {
        ...cardListStyles.container,
        flexDirection: "column" as const, // Apila los elementos verticalmente
        alignItems: "flex-start", // Alinea a la izquierda
      }
    : cardListStyles.container;

  return (
    <div style={containerStyle}>
      <h1 style={cardListStyles.title}>Nuestra Cafetería</h1>
      {showToast && (
        <div style={cardListStyles.toast}>
          Producto agregado
        </div>
      )}
      <div style={cardListStyles.productsSection}></div>
      {products.map((product) => (
        <div
          key={product._id}
          style={cardListStyles.wrapper}
          onClick={() => setActiveProduct(product)}
        >
          <Card
            image={product.image}
            name={product.product_name}
            price={product.price}
          />
        </div>
      ))}
      {activeProduct && (
        <div
          style={cardListStyles.overlay}
          onClick={() => setActiveProduct(null)}
        >
          <div
            style={cardListStyles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.product_name}
              style={cardListStyles.overlayImage}
            />
            <div style={cardListStyles.overlayDetails}>
              <h2>{activeProduct.product_name}</h2>
              <p>{activeProduct.description}</p>
              <p style={cardListStyles.price}>
                Precio: ${activeProduct.price.toFixed(2)}
              </p>
              <button
                style={cardListStyles.button}
                onClick={() => handleAddToCart(activeProduct)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
