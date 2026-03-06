import { useEffect, useState } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchWorkouts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/workouts");
      const data = await res.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/workouts");
      const data = await res.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  fetchWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://127.0.0.1:5000/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        exercise_name: exercise,
        reps: parseInt(reps),
        weight: parseInt(weight),
        workout_date: date
      })
    });

    // clears the form after submitting
    setExercise("");
    setReps("");
    setWeight("");

    fetchWorkouts();
  };

  const deleteWorkout = async (id) => {
    await fetch(`http://127.0.0.1:5000/api/workouts/${id}`, {
      method: "DELETE"
    });
    
    fetchWorkouts();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Workout Tracker</h1>

      {/* Information and Submit */}
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

        <label>Date:</label><br />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        /><br /><br />

        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Log Workout
        </button>
      </form>

      <hr />

      {/* Logged Workouts Section */}
      <h2>Logged Workouts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {workouts.map((w) => (
          <div key={w.id} style={{ 
            border: '1px solid #ccc', 
            margin: '5px', 
            padding: '15px', 
            width: '350px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '8px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ fontSize: '1.1rem' }}>{w.exercise_name}</strong><br />
              <span style={{ color: '#666' }}>{w.reps} reps @ {w.weight} lbs</span><br />
              <span>{w.workout_date ? new Date(w.workout_date.replace(/-/g, '/')).toLocaleDateString() : "No Date"}</span>
            </div>

            {/* The Delete Button */}
            <button 
              onClick={() => deleteWorkout(w.id)} 
              style={{ 
                backgroundColor: '#ff4d4d', 
                color: 'white', 
                border: 'none', 
                padding: '8px 12px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;