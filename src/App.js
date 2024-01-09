// App.js
import React, { useState } from 'react';
import CalculatorForm from './Components/CalculatorForm';
import CalculationResults from './Components/CalculationResults';

function App() {
  const [formData, setFormData] = useState({
    monthlyPayment: '',
    downPayment: '',
    tradeInValue: '',
    owedOnTrade: '',
    creditScore: '',
    loanTerm: ''
  });
  const [results, setResults] = useState(null);

  return (
    <div className="rainy-backdrop bg-no-repeat bg-fixed flex justify-center items-center p-4" style={{ minHeight: '100vh' }}>
      <div className="bg-white bg-opacity-75 shadow-lg rounded px-8 pt-6 pb-8 max-w-md mx-auto mb-4">
        <CalculatorForm
          formData={formData}
          setFormData={setFormData}
          setResults={setResults}
        />
        {results && <CalculationResults results={results} />}
      </div>
    </div>
  );
}

export default App;
