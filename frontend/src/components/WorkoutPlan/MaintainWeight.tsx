import React, { useState, useEffect } from 'react';
import "./Weight.css";
import Header from '../LandingPage/Header';
import axios from 'axios';

interface StrengthTrainingDetails {
    day: string;
    exercise?: string;
    details: string | string[];
    duration_for_cardio?: string;
    focus?: string;
    strength_training_details?: string[];
    reps?: string;
    weights?: string;
    calories_burned: number;
    rest_day?: boolean;
}

interface WorkoutPlan {
    goal: string;
    plan_name: string;
    workouts: StrengthTrainingDetails[];
}

const WorkoutCard: React.FC<{ workout: StrengthTrainingDetails }> = ({ workout }) => {
    const {
        day,
        exercise,
        details,
        duration_for_cardio,
        focus,
        strength_training_details,
        reps,
        weights,
        calories_burned,
        rest_day,
    } = workout;

    return (
        <div className="workout-card">
            <h2>{day}</h2>
            {rest_day ? (
                <p>Rest Day: {details}</p>
            ) : (
                <>
                    {exercise && <p>Exercise: {exercise}</p>}
                    <p>Details: {Array.isArray(details) ? details.join(', ') : details}</p>
                    {duration_for_cardio && <p>Duration for Cardio: {duration_for_cardio}</p>}
                    {focus && <p>Focus: {focus}</p>}
                    {strength_training_details && (
                        <div>
                            <p>Strength Training:</p>
                            <ul>
                                {strength_training_details.map((exercise, index) => (
                                    <li key={index}>{exercise}</li>
                                ))}
                            </ul>
                            {reps && <p>Reps: {reps}</p>}
                            {weights && <p>Weights: {weights}</p>}
                        </div>
                    )}
                    <p>Calories Burned: {calories_burned}</p>
                </>
            )}
        </div>
    );
};

const DisplayWorkoutPlan: React.FC<{ workoutPlan: WorkoutPlan }> = ({ workoutPlan }) => {
    const { plan_name, workouts } = workoutPlan;
  
    return (
      <div className="workout-plan">
        <h1>{plan_name}</h1>
        {workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
    );
  };

const MaintainWeightApp: React.FC = () => {
  const [maintainWeightPlan, setMaintainweightPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/workouts');
        const fetchedMaintainweightPlan = response.data[0].workout_plans.find((plan: WorkoutPlan) => plan.plan_name === "Weight Maintenance Plan");
        setMaintainweightPlan(fetchedMaintainweightPlan);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!maintainWeightPlan) {
    return (
      <div>
        <Header />
        <p>Weight loss plan not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <DisplayWorkoutPlan workoutPlan={maintainWeightPlan} />
    </div>
  );
};

export default MaintainWeightApp;
