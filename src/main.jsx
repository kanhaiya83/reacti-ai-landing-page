import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <App />
    <ToastContainer/>
    </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
