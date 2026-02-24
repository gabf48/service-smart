'use client';
import { versions } from '@/version';

export default function VersionHistory() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Changelog / Version History</h2>
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-2 py-1 text-left">Data</th>
            <th className="border border-gray-600 px-2 py-1 text-left">Versiune</th>
            <th className="border border-gray-600 px-2 py-1 text-left">Schimbări</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((v) => (
            <tr key={v.version} className="border-t border-gray-700">
              <td className="border border-gray-600 px-2 py-1 align-top">{v.date}</td>
              <td className="border border-gray-600 px-2 py-1 align-top">{v.version}</td>
              <td className="border border-gray-600 px-2 py-1">
                <ul className="list-disc list-inside">
                  {v.changes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}