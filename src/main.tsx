import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
// Import amplify outputs (this file will be generated after deployment)
// If the file doesn't exist yet, it will be created after running npx ampx sandbox
import amplifyOutputs from '../amplify_outputs.json'

import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Configure Amplify with the outputs from the backend deployment
Amplify.configure(amplifyOutputs)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
