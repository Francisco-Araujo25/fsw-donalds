import { redirect } from "next/navigation";

const HomePage = () => {
  // Redirecionar para o restaurante FSW Donalds
  redirect("/fsw-donalds");
}

export default HomePage;
