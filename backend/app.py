from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("ERROR: GEMINI_API_KEY was not found!")

client = genai.Client(api_key=api_key)


@app.route("/")
def home():
    return "NutriAI Backend Running!"


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    meal = data.get("meal")

    if not meal:
        return jsonify({
            "error": "Please enter a meal"
        }), 400

    prompt = f"""
You are NutriAI, a nutrition assistant.

Analyze this meal:

{meal}

Estimate the nutrition based on the food and quantity provided.

Return the nutrition information in JSON format.
Calories should be a number.
Protein, carbs and fat should be strings containing grams.

Give a short healthy suggestion.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "meal": {
                            "type": "STRING"
                        },
                        "calories": {
                            "type": "NUMBER"
                        },
                        "protein": {
                            "type": "STRING"
                        },
                        "carbs": {
                            "type": "STRING"
                        },
                        "fat": {
                            "type": "STRING"
                        },
                        "suggestion": {
                            "type": "STRING"
                        }
                    },
                    "required": [
                        "meal",
                        "calories",
                        "protein",
                        "carbs",
                        "fat",
                        "suggestion"
                    ]
                }
            )
        )

        result = json.loads(response.text)

        print("GEMINI RESULT:")
        print(result)

        return jsonify(result)

    except Exception as e:

        print("GEMINI ERROR:")
        print(repr(e))

        return jsonify({
            "error": "AI analysis failed",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)