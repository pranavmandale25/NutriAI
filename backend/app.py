from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "NutriAI Backend Running!"


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json

    meal = data.get("meal")

    return jsonify({
        "meal": meal,
        "calories": 450,
        "protein": "20g",
        "carbs": "55g",
        "fat": "12g"
    })


if __name__ == "__main__":
    app.run(debug=True)