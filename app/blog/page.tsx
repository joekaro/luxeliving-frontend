// app/blog/page.tsx - UPDATED WITH IMAGES
export default function BlogPage() {
  const posts = [
    { 
      title: 'Market Trends 2024: What Buyers Need to Know', 
      excerpt: 'Latest insights into the luxury real estate market and investment opportunities for the coming year.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
      date: 'Dec 15, 2024',
      readTime: '5 min read'
    },
    { 
      title: 'Home Staging Tips That Sell Properties Faster', 
      excerpt: 'Professional advice on preparing your home for sale to attract the best offers in record time.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
      date: 'Dec 10, 2024',
      readTime: '4 min read'
    },
    { 
      title: 'Smart Real Estate Investment Strategies', 
      excerpt: 'Learn how to build wealth through strategic property investments in todays market.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
      date: 'Dec 5, 2024',
      readTime: '6 min read'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real Estate Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Expert advice, market updates, and tips for buyers, sellers, and investors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Read More
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-blue-100 mb-6">Get weekly updates on market trends and new listings</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow p-3 rounded-lg text-gray-800"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}