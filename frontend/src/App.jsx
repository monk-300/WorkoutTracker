import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("Connecting...");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  // runs once on load to verify the connection
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessage("Backend not found. Check if app.py is running!");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://127.0.0.1:5000/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        exercise_name: exercise,
        reps: parseInt(reps),
        weight: parseInt(weight)
      })
    });

    // clears the form after submitting
    setExercise("");
    setReps("");
    setWeight("");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Workout Tracker</h1>
      <p style={{ color: '#646cff' }}>{message}</p>

      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Exercise:</label><br />
        <input 
          type="text" 
          value={exercise} 
          onChange={(e) => setExercise(e.target.value)} 
          placeholder="e.g. Bench Press"
        /><br /><br />

        <label>Reps:</label><br />
        <input 
          type="number" 
          value={reps} 
          onChange={(e) => setReps(e.target.value)} 
        /><br /><br />

        <label>Weight (lbs):</label><br />
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        /><br /><br />

        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Log Workout
        </button>
      </form>
    </div>
  );
}

export default App;