import './App.css'
import { TableWrapper } from './components/table-wrapper'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TableWrapper />
    </ThemeProvider>
  )
}

export default App
