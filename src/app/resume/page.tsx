'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResumePage() {
  const router = useRouter();

  useEffect(() => {
    // Set page title
    document.title = 'Resume - Aakash Swain';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to Portfolio</span>
            </button>
            
            <div className="flex items-center gap-6">
              <a
                href="/Aakash%20Swain%20resume.pdf"
                download="Aakash Swain resume.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <embed
            src="/Aakash%20Swain%20resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            type="application/pdf"
            className="w-full"
            style={{ height: 'calc(100vh - 120px)' }}
            title="Aakash Swain Resume"
          />
        </div>
      </main>
    </div>
  );
}
