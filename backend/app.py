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

# route to save a workout
@app.route('/api/workouts', methods=['POST'])
def add_workout():
    data = request.json
    exercise = data.get('exercise_name')
    reps = data.get('reps')
    weight = data.get('weight')
    date = data.get('workout_date')

    supabase.table('workouts').insert({
        "exercise_name": exercise,
        "reps": reps,
        "weight": weight,
        "workout_date": date
    }).execute()
    return jsonify({"message": "Workout logged"})

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    response = supabase.table('workouts').select('*').order('created_at', desc = True).execute()
    return jsonify(response.data)

@app.route('/api/workouts/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    supabase.table('workouts').delete().eq('id', workout_id).execute()
    return jsonify({"message": "Workout deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)