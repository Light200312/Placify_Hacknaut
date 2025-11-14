import React from 'react';

/**
 * Loading spinner component
 */
const Loader = () => (
    <div className="text-center py-20">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mx-auto" style={{ borderTopColor: '#3498db', animation: 'spin 1s linear infinite' }}></div>
        <p className="mt-4 text-lg text-gray-600">Analyzing... This may take a moment.</p>
    </div>
);

export default Loader;