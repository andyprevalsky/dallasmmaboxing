import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Boxing from './pages/Boxing'
import MuayThai from './pages/MuayThai'
import MMA from './pages/MMA'
import Wrestling from './pages/Wrestling'
import BrazilianJiuJitsu from './pages/BrazilianJiuJitsu'
import Checkout from './pages/Checkout'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/boxing" element={<Boxing />} />
            <Route path="/muay-thai" element={<MuayThai />} />
            <Route path="/mma" element={<MMA />} />
            <Route path="/wrestling" element={<Wrestling />} />
            <Route path="/brazilian-jiu-jitsu" element={<BrazilianJiuJitsu />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
