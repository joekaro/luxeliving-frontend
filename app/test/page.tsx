// app/test/page.tsx (temporary test file)
export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">Box 1</div>
        <div className="bg-red-500 p-4 rounded-lg shadow text-white">Box 2</div>
        <div className="bg-green-500 p-4 rounded-lg shadow text-white">Box 3</div>
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Test Button
      </button>
    </div>
  )
}