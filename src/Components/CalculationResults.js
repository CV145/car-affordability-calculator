// CalculationResults.js
function CalculationResults({ results }) {
    if (!results) return null;

    return (
        <div className="mt-6 p-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">You can afford cars up to</h2>

            {/* The value here is dynamically updated based on the results */}
            <div className="text-center text-3xl font-bold text-blue-600 mb-6">
                ${new Intl.NumberFormat('en-US').format(results.affordableCarPrice)}
            </div>

            <p className="text-center mb-4">Based on {results.interestRate}% APR*</p>

            <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                    <span>Monthly car payment</span>
                    <span>${results.monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                    <span>Down payment</span>
                    <span>-${results.downPayment}</span>
                </div>
                <div className="flex justify-between">
                    <span>Trade-in value</span>
                    <span>+${results.tradeInValue}</span>
                </div>
                <div className="flex justify-between">
                    <span>Estimated sales tax</span>
                    <span>+$0</span>
                </div>
                <div className="flex justify-between">
                    <span>Other fees*</span>
                    <span>not included</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold">
                    <span>Total loan amount</span>
                    <span>${results.totalLoanAmount}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total interest paid (over life of loan)</span>
                    <span>+${results.totalInterestPaid}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total loan & interest paid</span>
                    <span>${results.totalLoanAndInterest}</span>
                </div>
            </div>
            <div className="text-xs text-center text-gray-600 mt-4 px-4">
                <p>
                    The results provided by this calculator are for informational purposes only
                    and should not be taken as financial advice. Actual terms, including APR and
                    other fees, will vary based on the final agreement with your lender. For
                    accurate car loan information, it's important to consult with a financial
                    advisor or loan officer.
                </p>
            </div>
        </div>
    );
}

export default CalculationResults;

