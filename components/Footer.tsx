'use client';
import { useState } from 'react';
import { versions } from '../app/version';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const latestVersion = versions[0]?.version || "0.0.0";

  // funcție click pe fundal pentru a închide
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <>
      <footer
        className="bg-gray-900 text-gray-300 p-4 text-center cursor-pointer hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        Versiunea {latestVersion}
      </footer>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-gray-800 text-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-auto p-6 relative">
            <h2 className="text-xl font-bold mb-4">History versiuni</h2>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-600 p-2 text-left">Data</th>
                  <th className="border-b border-gray-600 p-2 text-left">Versiune</th>
                  <th className="border-b border-gray-600 p-2 text-left">Schimbări</th>
                </tr>
              </thead>
              <tbody>
                {versions.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-700">
                    <td className="border-b border-gray-700 p-2">{v.date}</td>
                    <td className="border-b border-gray-700 p-2">{v.version}</td>
                    <td className="border-b border-gray-700 p-2">
                      <ul className="list-disc pl-5">
                        {v.changes.map((c, j) => <li key={j}>{c}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* buton închidere */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}