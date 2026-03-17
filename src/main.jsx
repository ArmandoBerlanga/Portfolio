import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initAnalytics } from './utils/analytics'

// Initialize analytics
initAnalytics();

createRoot(document.getElementById('root')).render(
    <App />
)
