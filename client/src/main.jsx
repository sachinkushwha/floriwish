import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './component/Home.jsx';
import Login from './component/login.jsx';
import { Protected } from './component/protected.jsx';
import { CreateSubAdmin } from './component/createSubAdmin.jsx';
import { Total_super_admin } from './component/total-super-admin.jsx';
import { Total_sub_admin } from './component/total-sub-admin.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      {
        element: <Protected />, children: [
          {
            path: '/', element: <Home />
          },
          {
            path: '/sub-admin', element: <CreateSubAdmin/>
          },
          {
            path: '/total-super-admin', element: <Total_super_admin/>
          },
          {
            path: '/total-sub-admin', element: <Total_sub_admin/>
          },
        ]
      },

      {
        path: 'login', element: <Login />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
