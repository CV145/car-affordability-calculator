// CalculatorForm.js
import React from 'react';
import InputField from './InputField';

function CalculatorForm({ formData, setFormData, setResults }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Before update:', formData.creditScore);

        let modifiedValue = value;
        if (name === "creditScore") {
            switch (value) {
                case "excellent":
                    modifiedValue = 750;
                    break;
                case "good":
                    modifiedValue = 700;
                    break;
                case "fair":
                    modifiedValue = 650;
                    break;
                case "poor":
                    modifiedValue = 600;
                    break;
                case "bad":
                    modifiedValue = 550; // or whatever you deem appropriate
                    break;
                default:
                    modifiedValue = null; // if no selection is made, or it's an invalid value
            }
        }

        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, [name]: value };
            console.log('Updating formData:', name, value);
            console.log('After update:', updatedFormData.creditScore);
            return updatedFormData;
        });
    };



    function calculateAffordability(data) {
        const {
            monthlyPayment: rawMonthlyPayment,
            downPayment: rawDownPayment,
            tradeInValue: rawTradeInValue,
            owedOnTrade: rawOwedOnTrade,
            creditScore,
            loanTerm // assuming loanTerm is in months
        } = data;

        // Convert all inputs to numbers, ensuring they're not NaN
        const monthlyPayment = Number(rawMonthlyPayment) || 0;
        const downPayment = Number(rawDownPayment) || 0;
        const tradeInValue = Number(rawTradeInValue) || 0;
        const owedOnTrade = Number(rawOwedOnTrade) || 0;

        // Convert creditScore range to an actual number
        let numericalCreditScore;
        switch (data.creditScore) {
            case 'excellent':
                numericalCreditScore = 750;
                break;
            case 'good':
                numericalCreditScore = 700;
                break;
            case 'fair':
                numericalCreditScore = 650;
                break;
            case 'poor':
                numericalCreditScore = 600;
                break;
            case 'bad':
                numericalCreditScore = 550;
                break;
            default:
                numericalCreditScore = null; // Handle the 'Select Credit Score Range' or any invalid cases
        }

        // Assume the interest rate based on the converted credit score
        let interestRate;
        if (numericalCreditScore >= 750) {
            interestRate = 0.05;
        } else if (numericalCreditScore >= 700) {
            interestRate = 0.075;
        } else if (numericalCreditScore >= 650) {
            interestRate = 0.10;
        } else {
            interestRate = 0.15; // Assuming a default higher interest rate for 'poor' and 'bad' or any invalid score
        }
        let monthlyInterestRate = interestRate / 12;

        // Calculate the total loan amount
        const loanAmount = monthlyPayment *
            ((1 - Math.pow(1 + monthlyInterestRate, -loanTerm)) / monthlyInterestRate);

        // Adjust the loan amount based on down payment, trade-in value, and amount owed on trade-in
        const totalCarValue = loanAmount + downPayment + tradeInValue - owedOnTrade;

        // Calculate total interest paid over the life of the loan
        const totalInterestPaid = (monthlyPayment * loanTerm) - loanAmount;

        // Calculate total repayment amount (loan amount plus interest)
        const totalLoanAndInterest = loanAmount + totalInterestPaid;

        return {
            affordableCarPrice: totalCarValue.toFixed(2),
            totalLoanAmount: loanAmount.toFixed(2),
            totalInterestPaid: totalInterestPaid.toFixed(2),
            totalLoanAndInterest: totalLoanAndInterest.toFixed(2),
            monthlyPayment: monthlyPayment.toFixed(2), // This is provided by the user
            downPayment: downPayment.toFixed(2),
            tradeInValue: tradeInValue.toFixed(2),
            owedOnTrade: owedOnTrade.toFixed(2),
            interestRate: (monthlyInterestRate * 12 * 100).toFixed(2), // Convert to annual percentage rate
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
