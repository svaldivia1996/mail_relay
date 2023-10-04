import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout, useUser } from "@/hooks/auth";
import { getAliases } from '@/api/api';
import { Alias } from '@/types/Alias';
import Toggle from './ui/Toggle';
import Button from './ui/Button';

export default function IndexPage() {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["usuario", "me"]);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const fetchAliases = async () => {
      try {
        const data = await getAliases();
        setAliases(data);
      } catch (error) {
        console.error("Error fetching aliases:", error);
        // Handle the error accordingly
      }
    };
    
    fetchAliases();
  }, []);

  const toggleAlias = (index: number) => {
    const newAliases = [...aliases];
    newAliases[index].active = !newAliases[index].active;
    setAliases(newAliases);
  };

  const userQuery = useUser();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="p-4 text-font dark:bg-background-dark">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-black dark:text-white mr-6">Mail Relay</h1>
          </div>
          <div className="relative">
            <button 
              type="button" 
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 white:text-font dark:text-white" 
              aria-expanded="false"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{userQuery.data?.username}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                <ul>
                  <li className="px-4 py-2 hover:bg-background cursor-pointer rounded-lg">Opciones</li>
                  <li className="px-4 py-2 hover:bg-background cursor-pointer rounded-lg" onClick={handleLogout}>Cerrar Sesión</li>
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
            placeholder="Buscar correos..." 
            className="p-2 rounded border"
          />
          <Button filled>Nuevo Correo</Button>
        </div>

        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">Nombre del Correo</th>
              <th className="px-6 py-4 text-left">Activo</th>
            </tr>
          </thead>
          <tbody>
            {aliases.map((alias, index) => (
              <tr key={index} className="hover:bg-background">
                <td className="px-6 py-4">{alias.email}</td>
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
