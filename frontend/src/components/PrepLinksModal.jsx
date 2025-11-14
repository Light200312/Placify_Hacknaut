import React from 'react';

// Simple external link icon
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 inline-block ml-1 opacity-60"
  >
    <path
      fillRule="evenodd"
      d="M4.25 5.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm8.25 1a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM12 8.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM12 5.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
      clipRule="evenodd"
    />
    <path
      d="M14.75 3A2.75 2.75 0 0117.5 5.75v8.5A2.75 2.75 0 0114.75 17h-8.5A2.75 2.75 0 013.5 14.25v-8.5A2.75 2.75 0 016.25 3h8.5zM6.25 4.5a1.25 1.25 0 00-1.25 1.25v8.5a1.25 1.25 0 001.25 1.25h8.5a1.25 1.25 0 001.25-1.25v-8.5a1.25 1.25 0 00-1.25-1.25h-8.5z"
    />
  </svg>
);

// Close (X) icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
    />
  </svg>
);


const PrepLinksModal = ({ title, links, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto">
          {links && links.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-blue-600 hover:bg-gray-100 hover:border-blue-300 transition-all flex justify-between items-center"
                >
                  <span className="truncate pr-4">{link.title}</span>
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">No preparation links found for this round.</p>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrepLinksModal;