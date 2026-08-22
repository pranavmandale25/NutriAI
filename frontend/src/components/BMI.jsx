import { useState } from "react";

function BMI() {

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState("");

    function calculateBMI() {

        if(height==="" || weight===""){
            alert("Please enter height and weight.");
            return;
        }

        const h = height / 100;
        const value = (weight / (h*h)).toFixed(1);

        let category="";

        if(value<18.5)
            category="Underweight";

        else if(value<25)
            category="Normal";

        else if(value<30)
            category="Overweight";

        else
            category="Obese";

        setBmi({
            value,
            category
        });

    }

    return(

        <section className="bmi" id="bmi">

            <h2>⚖️ BMI Calculator</h2>

            <p>Check whether your weight is healthy.</p>

            <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e)=>setHeight(e.target.value)}
            />

            <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e)=>setWeight(e.target.value)}
            />

            <br/>

            <button onClick={calculateBMI}>
                Calculate BMI
            </button>

            {bmi && (

                <div className="result">

                    <h2>Your BMI</h2>

                    <p><b>BMI:</b> {bmi.value}</p>

                    <p><b>Status:</b> {bmi.category}</p>

                </div>

            )}

        </section>

    );

}

export default BMI;