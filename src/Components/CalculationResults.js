// CalculationResults.js
function CalculationResults({ results }) {
    if (!results) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Calculation Results</h2>
            <p>Affordable Car Price: ${results.affordableCarPrice}</p>
            {/* Display other results here */}
        </div>
    );
}

export default CalculationResults;
