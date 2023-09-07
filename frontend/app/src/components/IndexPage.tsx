import { useState } from 'react';
import Toggle from './ui/toggle';

export default function IndexPage() {
  const [aliases, setAliases] = useState([
    { name: "alias1", active: true },
    { name: "alias2", active: false },
    //(sample aliases)
  ]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAlias = (index: number) => {
    const newAliases = [...aliases];
    newAliases[index].active = !newAliases[index].active;
    setAliases(newAliases);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="p-4 bg-blue-500 text-font">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1>Mail Relay</h1>
          </div>
          <div className="relative">
            <button 
              type="button" 
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-font" 
              aria-expanded="false"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>Username</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-4">
          <input 
            type="text" 
            placeholder="Search aliases..." 
            className="p-2 rounded border"
          />
          <button className="bg-blue-500 text-white p-2 rounded">New Alias</button>
        </div>

        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">Alias Name</th>
              <th className="px-6 py-4 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {aliases.map((alias, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4">{alias.name}</td>
                <td className="px-6 py-4">
                  <Toggle isActive={alias.active} onToggle={() => toggleAlias(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      
    </div>
  );
}