const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <form action="/calculate-bmi" method="POST">
            <label>Weight (kg):</label>
            <input type="number" name="weight" required />

            <label>Height (m):</label>
            <input type="number" step="0.01" name="height" required />

            <button type="submit">Calculate BMI</button>
        </form>
    `);
});

app.post("/calculate-bmi", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (weight <= 0 || height <= 0) {
        return res.send("Invalid input. Weight and height must be positive.");
    }

    const bmi = weight / (height * height);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    res.send(`
        <h1>Your BMI Result</h1>
        <p>BMI: ${bmi.toFixed(2)}</p>
        <p>Category: ${category}</p>
        <a href="/">Go Back</a>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});