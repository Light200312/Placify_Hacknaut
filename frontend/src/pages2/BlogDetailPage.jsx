import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components2/Home/Header';
import Footer from '../components2/Home/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 text-lg">Loading blog...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-red-600 text-lg">Blog not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {blog.tags?.map((tag, idx) => (
              <span key={idx} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>By {blog.author}</span>
            <span>👁️ {blog.views} views</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <hr className="my-6" />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n').map((line, idx) => {
            if (line.startsWith('#')) {
              return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.replace('#', '').trim()}</h2>;
            }
            if (line.startsWith('##')) {
              return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{line.replace('##', '').trim()}</h3>;
            }
            if (line.startsWith('-')) {
              return <li key={idx} className="ml-6 text-gray-700">{line.replace('-', '').trim()}</li>;
            }
            if (line.trim() === '') {
              return <br key={idx} />;
            }
            return <p key={idx} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
          })}
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-bold mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Share on LinkedIn
            </button>
            <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition">
              Share on Twitter
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogDetailPage;
