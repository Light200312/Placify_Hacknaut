import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components2/Home/Header';
import Footer from '../components2/Home/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Blog 📚</h1>
          <p className="text-lg text-blue-100">Tips, tricks, and insights for placement success</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="h-40 bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {blog.tags?.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>👁️ {blog.views} views</span>
                    <span>Read More →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default BlogPage;
