import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MealInput from "./components/MealInput";
import Footer from "./components/Footer";
import BMI from "./components/BMI";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MealInput />
      <BMI />
      <Footer />
    </>
  );
}

export default App;
