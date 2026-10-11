import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// import BrowserRouter dari react router
import { BrowserRouter } from 'react-router';

// import QueryClient dan QueryClientProvider dari react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// init QueryClient
const queryClient = new QueryClient()

// import AuthProvider dari file AuthProvider.tsx
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)