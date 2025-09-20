import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/home.page'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThemeProvider } from './components/theme-provider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
)
