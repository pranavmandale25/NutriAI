import { useState, useEffect } from "react";
import axios from "axios";

function MealInput() {
  const [meal, setMeal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("mealHistory");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mealHistory", JSON.stringify(history));
  }, [history]);

  const totalCalories = history.reduce(
  (total, item) => total + Number(item.calories || 0),
  0
);

  async function analyzeMeal() {
    if (meal.trim() === "") {
      alert("Please enter your meal first!");
      return;
    }

    setLoading(true);
    setResult("");

    

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        {
          meal: meal,
        }
      );

      setResult(response.data);

      setHistory((prev) => [...prev, response.data]);

    } catch (error) {
      console.log(error);
      setResult("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <section className="meal-input" id="meal">

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

      <button className="analyze-button" onClick={analyzeMeal}>
        ✨ Analyze with AI
      </button>

      {loading && (
        <div className="loading">
          🤖 AI is analyzing your meal...
        </div>
      )}

      {result && typeof result !== "string" && (
        <div className="result">

          <div className="result-header">
            <span className="result-icon">🥗</span>

            <div>
              <h2>Nutrition Result</h2>
              <p>{result.meal}</p>
            </div>
          </div>

          <div className="nutrition-grid">

            <div className="nutrition-card calories">
              <span className="nutrition-icon">🔥</span>
              <h3>{result.calories}</h3>
              <p>Calories</p>
              <small>kcal</small>
            </div>

            <div className="nutrition-card protein">
              <span className="nutrition-icon">💪</span>
              <h3>{result.protein}</h3>
              <p>Protein</p>
            </div>

            <div className="nutrition-card carbs">
              <span className="nutrition-icon">🍞</span>
              <h3>{result.carbs}</h3>
              <p>Carbohydrates</p>
            </div>

            <div className="nutrition-card fat">
              <span className="nutrition-icon">🥑</span>
              <h3>{result.fat}</h3>
              <p>Fat</p>
            </div>

          </div>

          {result.suggestion && (
            <div className="ai-suggestion">
              <div className="suggestion-icon">💡</div>

              <div>
                <h3>AI Suggestion</h3>
                <p>{result.suggestion}</p>
              </div>
            </div>
          )}

        </div>
      )}

      {result && typeof result === "string" && (
        <div className="result error-result">
          <h2>Result</h2>
          <p>{result}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">

        {history.length > 0 && (
  <div className="daily-summary">

    <h2>📊 Today's Summary</h2>

    <div className="summary-content">

      <div>
        <h3>{totalCalories}</h3>
        <p>Total Calories</p>
      </div>

      <div>
        <h3>{history.length}</h3>
        <p>Meals Analyzed</p>
      </div>

    </div>

  </div>
)}

          <h2>📜 Meal History</h2>

          {history.map((item, index) => (
            <div className="history-card" key={index}>
              <p>
                <b>{item.meal}</b>
              </p>

              <p>
                🔥 {item.calories} kcal
              </p>
            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default MealInput;
