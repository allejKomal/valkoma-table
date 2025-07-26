import './App.css'
import { TooltipProvider } from 'valkoma-package/primitive'
import { TableWrapper } from './components/table-wrapper'
import { ThemeProvider } from 'valkoma-package/hooks'

function App() {

  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TableWrapper />
      </ThemeProvider>
    </TooltipProvider>
  )
}

export default App
