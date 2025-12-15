const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (weight <= 0 || height <= 0) {
        return res.send("Invalid input");
    }

    const bmi = weight / (height * height);
    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "blue";
    } else if (bmi < 24.9) {
        category = "Normal weight";
        color = "green";
    } else if (bmi < 29.9) {
        category = "Overweight";
        color = "orange";
    } else {
        category = "Obese";
        color = "red";
    }

    let resultPage = fs.readFileSync(
        path.join(__dirname, "views", "result.html"),
        "utf8"
    );

    resultPage = resultPage
        .replace("{{BMI}}", bmi.toFixed(2))
        .replace("{{CATEGORY}}", category)
        .replace("{{COLOR}}", color);

    res.send(resultPage);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});