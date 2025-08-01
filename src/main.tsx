import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './themes/base.css';
import './themes/theme1.css';
import './themes/theme2.css';
import './themes/theme3.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
  // https://priyanshu-mehta-react-frontend-asse.vercel.app/
)
