import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

app = Flask(__name__)
CORS(app) # allows React frontend to talk with API

# initializing SupaBase client
url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_KEY')
supabase = create_client(url, key)

@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"message": "Hello Jeremy! The clean slate is ready."})

# route to save a note
@app.route('/api/workouts', methods=['POST'])
def add_workout():
    data = request.json
    exercise = data.get('exercise_name')
    reps = data.get('reps')
    weight = data.get('weight')

    supabase.table('workouts').insert({
        "exercise_name": exercise,
        "reps": reps,
        "weight": weight
    }).execute()

    return jsonify({"message": "Workout logged"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)