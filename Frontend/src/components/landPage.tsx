import { useEffect } from "react";
//import { Button } from "@/components/ui/button";
import { FaWhatsapp ,FaFacebook,FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import style from"../styles/landingPage.module.css";
const logo = '/images/logo.png'
interface LandingPageProps {
    onEnter: () => void;
  }

export default function LandingPage({ onEnter }: LandingPageProps){
  useEffect(() => {
    document.title = "Cerro Arriba";
  }, []);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER; // Reemplaza con tu número
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const facebookLink = "https://facebook.com";
  const instagramLink = "https://instagram.com";

  return (
    <div className={style.landing_container}>
           <div className={style.title_wraper}>
           <h1 className={style.image_title}>Cerro Arriba Desayunos</h1>
      <div className={style.image_wrapper}>
        <motion.img 
          src={logo}
          alt="Cerro Arriba Restaurante"
          className={style.landing_image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
     
      </div>
    </div>
      
      <motion.h2 
        className={style.landing_subtitle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      Delivery de desayunos en Humahuaca
      </motion.h2>
      <motion.h3 
        className={style.landing_text}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
     Te llevamos tu desayuno adonde quieras dentro de la ciudad
      </motion.h3>

      <motion.p 
        className={style.landing_text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      Conocé nuestras opciones para darte el gusto o un regalo !
      </motion.p>

      
      <motion.img 
        src="https://i.postimg.cc/zGTzwRsN/coffee-563800-640.jpg"
        alt="Cerro Arriba Restaurante"
        className={style.landing_image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />




      <button className={style.landing_button}onClick={onEnter} >
        Mira lo que tenemos para vos!
      </button>
      <a href={facebookLink} target="_blank" rel="noopener noreferrer" className={style.facebook_button}>
        <FaFacebook className={style.facebook_icon} />
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer" className={style.instagram_button}>
        <FaInstagram className={style.instagram_icon} />
      </a>
      <a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className={style.whatsapp_button}
>
  <FaWhatsapp className={style.whatsapp_icon} />
  <span className={style.whatsapp_tooltip}>Contáctanos</span>
</a>
    </div>
  );
}
