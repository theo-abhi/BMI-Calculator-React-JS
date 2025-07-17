import React, { useState } from "react";
import "./BMICalculator.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  function handleResetBMI() {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory("");
  }

  function handleCalculateBMI() {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum)) {
      alert("Please enter both weight and height.");
      return;
    }

    if (weightNum <= 0 || heightNum <= 0) {
      alert("Please enter valid weight and height.");
      return;
    }

    const bmiValue = weightNum / (heightNum / 100) ** 2;

    setBMI(bmiValue);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory("Normal Weight");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  }

  return (
    <div className="bmi-card">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Weight(kg)</label>
        <input
          type="number"
          placeholder="Enter your weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Height(cm)</label>
        <input
          type="number"
          placeholder="Enter your height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      {bmi == null && (
        <button className="btn-calculator" onClick={handleCalculateBMI}>
          Calculate BMI
        </button>
      )}
      {bmi && (
        <div className="result-card ">
          <h3>Your BMI is: {bmi.toFixed(2)}</h3>
          <h4>Category: {category}</h4>
        </div>
      )}
      {bmi !== null && (
        <button className="btn-calculator" onClick={handleResetBMI}>
          Reset
        </button>
      )}
    </div>
  );
};

export default BMICalculator;
