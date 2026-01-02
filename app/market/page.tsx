export default function MarketPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Market Insights</h1>
        <p className="text-gray-600 mb-12">Latest trends and data for informed decisions</p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Market Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">+5.2%</div>
              <p className="text-gray-600">Price Growth</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">28 days</div>
              <p className="text-gray-600">Avg. Time on Market</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.2%</div>
              <p className="text-gray-600">Mortgage Rates</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">+12%</div>
              <p className="text-gray-600">Demand Increase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}