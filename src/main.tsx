import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ANSElderly from './ANSElderly.tsx'
import { UserStateProvider } from './util/UserState.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserStateProvider>
      <ANSElderly />
    </UserStateProvider>
  </StrictMode>
)
