import { useState } from "react";
import axios from "axios";
function MealInput() {
  const [meal, setMeal] = useState("");
  const [result, setResult] = useState("");

async function analyzeMeal() {
  if (meal.trim() === "") {
    alert("Please enter your meal first!");
    return;
  }

  setResult("Analyzing your meal...");

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/analyze",
      {
        meal: meal,
      }
    );

    setResult(response.data);

  } catch (error) {
    console.log(error);
    setResult("Something went wrong!");
  }

}
  return (
    <section className="meal-input">

      <h2>🍽️ What did you eat today?</h2>

      <p>
        Describe your meal and let AI calculate calories,
        protein, carbs and fat.
      </p>

      <textarea
        placeholder="Example: 2 rotis, paneer sabzi and one glass of milk"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      ></textarea>

      <br />

      <button onClick={analyzeMeal}>Analyze with AI</button>
      <h3>Your Meal:</h3>

      <p>{meal}</p>
      {result && (

      <div className="result">

      <h2>Result</h2>

      {typeof result === "string" ? (
  <p>{result}</p>
) : (
  <>
    <p><b>Meal:</b> {result.meal}</p>
    <p><b>Calories:</b> {result.calories}</p>
    <p><b>Protein:</b> {result.protein}</p>
    <p><b>Carbs:</b> {result.carbs}</p>
    <p><b>Fat:</b> {result.fat}</p>
  </>
)}

      </div>

     )}

    </section>
  );
}

export default MealInput;
