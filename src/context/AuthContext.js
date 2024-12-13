// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} AuthContextProps
 * @property {boolean} isAuthenticated - Indica se o usuário está autenticado.
 * @property {Function} setIsAuthenticated - Função para atualizar o estado de autenticação.
 */

/**
 * Cria o contexto de autenticação.
 *
 * @type {React.Context<AuthContextProps>}
 */
export const AuthContext = createContext();

/**
 * Componente provedor de autenticação que envolve os componentes filhos.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 * @returns {JSX.Element} O provedor de contexto de autenticação.
 */
export function AuthProvider({ children }) {
  /**
   * Estado que determina se o usuário está autenticado.
   *
   * @type {[boolean, Function]}
   */
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  /**
   * Efeito que monitora mudanças no armazenamento local para atualizar o estado de autenticação.
   */
  useEffect(() => {
    /**
     * Função de callback para lidar com mudanças no armazenamento local.
     */
    function handleStorageChange() {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }

    window.addEventListener('storage', handleStorageChange);

    // Cleanup: Remove o listener quando o componente é desmontado.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
