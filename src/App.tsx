import { AnimatePresence } from "framer-motion"
import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { EmitterPage } from "./pages/EmitterPage"
import { ReceiverPage } from "./pages/ReceiverPage"


function App() {

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<EmitterPage />} />
          <Route path="receiver" element={<ReceiverPage />} />
        </Route>

      </Routes>
    </AnimatePresence>
  )
}

export default App
