// CalculatorForm.js
import React from 'react';
import InputField from './InputField';

function CalculatorForm({ formData, setFormData, setResults }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };


    function calculateAffordability(data) {
        const {
            monthlyPayment,
            downPayment,
            tradeInValue,
            owedOnTrade,
            creditScore,
            loanTerm
        } = data;

        // Assume the interest rate based on credit score ranges, for example purposes
        let interestRate = creditScore >= 750 ? 0.05 : creditScore >= 650 ? 0.075 : 0.10;

        // Convert the loan term in months to years for the calculation
        const loanTermYears = loanTerm / 12;

        // Calculate loan amount that can be taken out based on monthly payment and interest rate
        // This is a reverse calculation from the monthly payment of a simple loan formula
        const loanAmount = (monthlyPayment / ((interestRate / 12) / (1 - Math.pow(1 + (interestRate / 12), -loanTerm))));

        // The total price of the car you can afford is then the loan amount plus down payment plus trade-in value minus owed on trade
        const affordableCarPrice = loanAmount + Number(downPayment) + Number(tradeInValue) - Number(owedOnTrade);

        return {
            affordableCarPrice: affordableCarPrice.toFixed(2)
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const results = calculateAffordability(formData);
        setResults(results);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Car Affordability Calculator</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Desired Monthly Payment Input */}
                <InputField
                    label="Desired Monthly Payment"
                    name="monthlyPayment"
                    type="number"
                    value={formData.monthlyPayment}
                    onChange={handleChange}
                    placeholder="Desired Monthly Payment"
                    prefix="$"
                />

                {/* Down Payment Input */}
                <InputField
                    label="Down Payment"
                    name="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={handleChange}
                    placeholder="Down Payment"
                    prefix="$"
                />

                {/* Trade-in Value Input */}
                <InputField
                    label="Trade-in Value"
                    name="tradeInValue"
                    type="number"
                    value={formData.tradeInValue}
                    onChange={handleChange}
                    placeholder="Trade-in Value"
                    prefix="$"
                />

                {/* Credit Score Range Selector */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="creditScore">
                        Credit Score Range
                    </label>
                    <select
                        name="creditScore"
                        value={formData.creditScore}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="">Select Credit Score Range</option>
                        <option value="excellent">750+</option>
                        <option value="good">700-749</option>
                        <option value="fair">650-699</option>
                        <option value="poor">600-649</option>
                        <option value="bad">Below 600</option>
                    </select>
                </div>

                {/* Loan Term Input */}
                <InputField
                    label="Loan Term (months)"
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    options={[36, 48, 60, 72]}
                    isCurrency={false}
                />


                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Calculate
                    </button>
                </div>
            </form>
        </div>
    );

}

export default CalculatorForm;
