'use client'

import { useState } from 'react'

export default function CalculatorPage() {
  const [price, setPrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)

  const calculateMonthly = () => {
    const loanAmount = price * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const months = loanTerm * 12
    const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1)
    return monthly.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mortgage Calculator</h1>
        <p className="text-gray-600 mb-12">Calculate your monthly mortgage payments</p>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Home Price ($)</label>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="10000"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between">
                <span>$100,000</span>
                <span className="text-xl font-bold">${price.toLocaleString()}</span>
                <span>$2,000,000</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Down Payment: {downPayment}%</label>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Interest Rate: {interestRate}%</label>
              <input
                type="range"
                min="3"
                max="10"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Loan Term: {loanTerm} years</label>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-2">Estimated Monthly Payment</h3>
            <div className="text-4xl font-bold">${calculateMonthly()}</div>
            <p className="mt-4 text-blue-100">Based on your inputs</p>
          </div>
        </div>
      </div>
    </div>
  )
}