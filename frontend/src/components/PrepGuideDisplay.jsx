import React, { useState } from 'react';
import useAiStore from '../store/aiStore';
import PrepLinksModal from './PrepLinksModal'; // Import the modal
import PracticeTest from './PracticeTest'; // Import PracticeTest component

// --- Reusable SVG Icons ---

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1 opacity-60">
    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm8.25 1a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM12 8.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM12 5.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z" clipRule="evenodd" />
    <path d="M14.75 3A2.75 2.75 0 0117.5 5.75v8.5A2.75 2.75 0 0114.75 17h-8.5A2.75 2.75 0 013.5 14.25v-8.5A2.75 2.75 0 016.25 3h8.5zM6.25 4.5a1.25 1.25 0 00-1.25 1.25v8.5a1.25 1.25 0 001.25 1.25h8.5a1.25 1.25 0 001.25-1.25v-8.5a1.25 1.25 0 00-1.25-1.25h-8.5z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.44A2.25 2.25 0 0015 6.75v8.5A2.75 2.75 0 0112.25 18h-4.5A2.75 2.75 0 015 15.25v-8.5A2.25 2.25 0 006 4.19v-.44zm-.75 3v8.5a1.25 1.25 0 001.25 1.25h4.5a1.25 1.25 0 001.25-1.25v-8.5a.75.75 0 00-1.5 0v1a.75.75 0 01-1.5 0v-1a.75.75 0 00-1.5 0v1a.75.75 0 01-1.5 0v-1a.75.75 0 00-1.5 0z" clipRule="evenodd" />
    <path d="M8.75 3a1.25 1.25 0 00-1.25 1.25v.44a.75.75 0 01-1.5 0V4.25A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.44a.75.75 0 01-1.5 0V4.25a1.25 1.25 0 00-1.25-1.25h-2.5z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M.93 15.842A.75.75 0 011.5 15.12V14.5a3 3 0 013-3h.605a3.752 3.752 0 001.62-.395 1.875 1.875 0 012.55 0A3.752 3.752 0 0014.9 11.5h.605a3 3 0 013 3v.62c0 .309.18.591.452.722l.16.08a.75.75 0 01.388 1.129l-1.35 2.113A2.25 2.25 0 0118.75 18h-1.07a.75.75 0 01-.638-.344l-1.423-2.135A3.75 3.75 0 0014.095 15H5.905a3.75 3.75 0 00-1.524.566l-1.423 2.135a.75.75 0 01-.638.344H1.25a2.25 2.25 0 01-2.126-.938L-.225 17.05a.75.75 0 01.388-1.129l.16-.08z" clipRule="evenodd" />
  </svg>
);

const TestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v10a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 9.5a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zM7 10.5a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75H7zm3.25.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zM10 6.5a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75H10zM12.25.75A.75.75 0 0113 0h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V.75zm3 0a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V.75z" clipRule="evenodd" />
    <path d="M3 6a1 1 0 011-1h1V4a1 1 0 112 0v1h1a1 1 0 110 2H7v1a1 1 0 11-2 0V7H4a1 1 0 01-1-1z" />
  </svg>
);

const NoNegativeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
  </svg>
);

// --- Child Components ---

// Card for key hiring stats
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className={`flex items-start p-4 bg-white rounded-lg shadow border-l-4 ${colorClass}`}>
    <div className="mr-3">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value || 'N/A'}</p>
    </div>
  </div>
);

// Card for the main preparation rounds (Aptitude, Tech, etc.)
const PrepRoundCard = ({ title, description, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
    <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-sm text-gray-600 grow mb-4">{description || `Preparation resources for the ${title.toLowerCase()} round.`}</p>
    <button
      onClick={onClick}
      className="mt-auto w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md font-medium text-sm hover:bg-blue-100 transition-colors"
    >
      View Preparation Links
    </button>
  </div>
);

// --- Main Display Component ---

const PrepGuideDisplay = () => {
  const [modalData, setModalData] = useState(null); // { title: '', links: [] }
  const [practiceSession, setPracticeSession] = useState(null); // { company, round, numQuestions }

  // Get all prep guide data from the Zustand store
  const isFetching = useAiStore((state) => state.isFetchingPrepGuide);
  const data = useAiStore((state) => state.prepGuideData);
  const error = useAiStore((state) => state.prepGuideError);

  if (isFetching) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mx-auto" style={{ borderTopColor: '#3498db', animation: 'spin 1s linear infinite' }}></div>
          <p className="mt-4 text-lg text-gray-600">Searching for the latest hiring data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Company Prep Guide</h2>
        <div className="text-center py-20">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Company Prep Guide</h2>
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Get a company-specific prep guide using the form on the left.</p>
        </div>
      </div>
    );
  }

  // --- NEW: Handle case where company does not exist ---
  if (data.DoesNotExist) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Company Prep Guide</h2>
        <div className="text-center py-20">
          <p className="text-2xl font-semibold text-gray-700 mb-2">Company Not Found</p>
          <p className="text-lg text-gray-500">
            We couldn't find any hiring information for "<strong>{data.company}</strong>".
          </p>
          <p className="text-md text-gray-400 mt-2">Please check the spelling and try again.</p>
        </div>
      </div>
    );
  }

  // --- Data Destructuring (from the new schema) ---
  const { hiringStats, detailedRounds, prepLinks, topicsToFocusOn, discussionThreads } = data;
  const stats = hiringStats || {};
  const rounds = detailedRounds || [];
  const links = prepLinks || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Company Prep Guide</h2>
      
      {/* --- Hiring Stats Cards (from screenshot) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Job Openings" value={stats.jobOpenings} icon={<BriefcaseIcon />} colorClass="border-blue-500" />
        <StatCard title="Applications" value={stats.applications} icon={<UserGroupIcon />} colorClass="border-red-500" />
        <StatCard title="Type of Test" value={stats.testType} icon={<TestIcon />} colorClass="border-yellow-500" />
        <StatCard title="Negative Marking" value={stats.negativeMarking} icon={<NoNegativeIcon />} colorClass="border-purple-500" />
      </div>

      {/* --- Detailed Rounds Table (from screenshot) --- */}
      <div className="mb-8">
{/*         <h3 className="text-xl font-semibold text-gray-800 mb-4">Hiring Process & Rounds</h3> */}
         {/* Rounds Table */}

      <div className="mb-8">

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hiring Process & Rounds</h3>



        <div className="rounded-lg border">

          <table className="min-w-full divide-y divide-gray-200">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Round</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessment</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. of Questions</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>

              </tr>

            </thead>



            <tbody className="bg-white divide-y divide-gray-200">

              {rounds.length > 0 ? (

                rounds.map((round, i) => (

                  <tr key={i} className="hover:bg-gray-50">

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{round.round}</td>

                    <td className="px-6 py-4 text-sm text-gray-600">{round.assessment}</td>

                    <td className="px-6 py-4 text-sm text-gray-600">{round.numQuestions}</td>

                    <td className="px-6 py-4 text-sm text-gray-600">{round.duration}</td>



                    <td className="px-6 py-4 text-sm">

                      <button

                        onClick={() =>

                          setPracticeSession({

                            company: data.company,

                            round: round.assessment,

                            numQuestions: round.numQuestions,

                            timeLimit: round.duration,

                          })

                        }

                        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium text-xs"

                      >

                        📝 Practice

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">

                    No detailed round information found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
      </div>

      {/* --- Prep Links Cards (from previous design) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <PrepRoundCard
          title="Aptitude"
          description={links.aptitude?.description}
          onClick={() => setModalData({ title: 'Aptitude Preparation Links', links: links.aptitude?.preparationLinks })}
        />
        <PrepRoundCard
          title="Technical"
          description={links.technical?.description}
          onClick={() => setModalData({ title: 'Technical Preparation Links', links: links.technical?.preparationLinks })}
        />
        <PrepRoundCard
          title="Interview (HR/Managerial)"
          description={links.interview?.description}
          onClick={() => setModalData({ title: 'Interview Preparation Links', links: links.interview?.preparationLinks })}
        />
      </div>

      {/* --- Topics & Discussions (from previous design) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topics to Focus On */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Topics to Focus On</h4>
          {topicsToFocusOn && topicsToFocusOn.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {topicsToFocusOn.map((topic, i) => <li key={i}>{topic}</li>)}
            </ul>
          ) : <p className="text-gray-500">No specific topics found.</p>}
        </div>

        {/* Discussion Threads */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Reddit/Quora Discussion</h4>
          {discussionThreads && discussionThreads.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {discussionThreads.map((thread, i) => (
                <a
                  key={i}
                  href={thread.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate text-sm"
                >
                  {thread.title} <ExternalLinkIcon />
                </a>
              ))}
            </div>
          ) : <p className="text-gray-500">No discussion threads found.</p>}
        </div>
      </div>

      {/* --- Modal --- */}
      {modalData && (
        <PrepLinksModal
          title={modalData.title}
          links={modalData.links}
          onClose={() => setModalData(null)}
        />
      )}

      {/* --- Practice Session Modal --- */}
      {practiceSession && (
        <PracticeTest
          company={practiceSession.company}
        timeLimit={practiceSession.timeLimit}
          round={practiceSession.round}
          numQuestions={practiceSession.numQuestions}
          onClose={() => setPracticeSession(null)}
        />
      )}
    </div>
  );
};

export default PrepGuideDisplay;