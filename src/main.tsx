import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ANSElderly from './ANSElderly.tsx'
import { UserStateProvider } from './util/UserState.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserStateProvider>
        <ANSElderly />
      </UserStateProvider>
    </QueryClientProvider>
  </StrictMode>
)
