import React, { useState, useEffect } from "react";
import "./BMICalculator.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const calculateBMIValue = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    return weightKg / heightM ** 2;
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue <= 24.9) return "Normal Weight";
    if (bmiValue <= 29.9) return "Overweight";
    return "Obese";
  };

  useEffect(() => {
    if (bmi !== null) {
      setCategory(getBMICategory(bmi));
    }
  }, [bmi]);

  const handleCalculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    if (
      isNaN(weightValue) ||
      isNaN(heightValue) ||
      weightValue <= 0 ||
      heightValue <= 0
    ) {
      alert("Please enter valid weight and height.");
      return;
    }
    const bmiResult = calculateBMIValue(weightValue, heightValue);
    setBMI(bmiResult);
  };

  const handleResetBMI = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory("");
  };

  const isResultAvailable = bmi !== null;
  const formattedBMI = isResultAvailable ? bmi.toFixed(2) : "";

  return (
    <div className="bmi-card">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Weight(kg)</label>
        <input
          type="number"
          placeholder="Enter your weight"
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <div className="input-group">
        <label>Height(cm)</label>
        <input
          type="number"
          placeholder="Enter your height"
          value={height}
          onChange={handleHeightChange}
        />
      </div>
      {bmi == null && (
        <button className="btn-calculator" onClick={handleCalculateBMI}>
          Calculate BMI
        </button>
      )}
      {isResultAvailable && (
        <div className="result-card">
          <h3>Your BMI is: {formattedBMI}</h3>
          <h4>
            Category:{" "}
            <span className={category.toLowerCase().replace(/ /g, "-")}>
              {/*  / /g (The Pattern to Find) This is a regular expression (often
            shortened to "regex"). It's a powerful way to define search
            patterns. /.../: The forward slashes at the beginning and end simply
            denote that this is a regular expression. : The character inside the
            slashes (a single space) is what the expression looks for. g: This
            letter at the end is a "flag." The g flag stands for global, and
            it's very important here. It tells the replace method to replace all
            occurrences of the space, not just the first one it finds. */}
              {category}
            </span>
          </h4>
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
