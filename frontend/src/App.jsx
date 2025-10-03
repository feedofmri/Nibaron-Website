import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import CursorGlow from './components/animations/CursorGlow/CursorGlow';
import FloatingElements from './components/animations/FloatingElements/FloatingElements';
import './styles/global.css';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <NotificationProvider>
                <div className="min-h-screen bg-background transition-colors duration-300">
                  {/* Background Effects */}
                  <FloatingElements />
                  <CursorGlow />

                  {/* Main Application */}
                  <AppRoutes />

                  {/* Global Toast Notifications */}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: 'var(--glass-light)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        color: 'var(--color-text-primary)',
                      },
                      success: {
                        iconTheme: {
                          primary: '#68911b',
                          secondary: '#ffffff',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#f04e23',
                          secondary: '#ffffff',
                        },
                      },
                    }}
                  />
                </div>
              </NotificationProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
