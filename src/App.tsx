import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import PasswordGenerator from "./components/PasswordEncryption"
import About from "./components/About"

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0d0d0d] bg-[radial-gradient(ellipse_at_center,_rgba(35,35,35,0.3),rgba(10,10,10,0.5))]">
        <Header />

        {/* Main content with padding-top to account for fixed header */}
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
                    <PasswordGenerator />
                  </div>
                }
              />
              <Route
                path="/about"
                element={
                  <div className="py-12">
                    <About />
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <div className="max-w-7xl mx-auto">
            <p>© {new Date().getFullYear()} Password Generator. Created by Kinshuk Jain.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
