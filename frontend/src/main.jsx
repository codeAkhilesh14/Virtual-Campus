import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

// ✅ Silence all logs in production
if (import.meta.env.MODE === 'production') {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

// ✅ Disable right-click and certain DevTools shortcuts
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  // F12 or Ctrl+Shift+I
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);
