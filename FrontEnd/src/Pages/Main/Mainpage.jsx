import styles from "./styles.module.scss";
import { useState } from "react";
import Header from "../../Components/Header/header.jsx";

//? Lembrete revisar as propriedades do js
function Home() {
  const [activeDay, setActiveDay] = useState("Monday");

  //? função para verificar o id da task se é igual do usuário para mostrar ("nota extra foi uma desgraça fazer isso quando dava f5 ficava limpado a array e eu demorei para notar tentei de tudo")
 
  //? deleta a task pelo id

  // TODO: 
  /*
    -Vento médio
    -Gust of wind
    -Direção do vento
    -Temperatura
    -Umidade
    -Luminosidade
    -Raios ultra violeta
    -Radiação solar
    -Pressão atmosférica
    -Temperatura interna
    -Umidade interna
  */

  return (
    //HTML:
    <div className={styles.pageContainer}>

      <Header/>


    </div>
  );
}

export default Home;