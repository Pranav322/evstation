import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ethers } from 'ethers'
import './App.css'
import myImage from './assets/evcar.jpeg'
import IntroPage from './components/IntroPgae'
import ChargingAnimation from './components/ChargingAnimation'
import EvToEvCharge from './components/EvToEvCharge'
import EvToStationCharge from './components/EvToStation'

function App() {
  const [currentPage, setCurrentPage] = useState('intro')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [chargeAmount, setChargeAmount] = useState('')
  const [chargeUnits, setChargeUnits] = useState(0)
  const [walletAddress, setWalletAddress] = useState('')
  const [isCharging, setIsCharging] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(75)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setWalletAddress(address)
      } catch (error) {
        console.error('Error connecting to MetaMask', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('')
  }

  const handleWalletClick = () => {
    if (walletAddress) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleChargeAmountChange = (e) => {
    const amount = e.target.value
    setChargeAmount(amount)
    const units = amount ? (parseFloat(amount) * 3) / 25 : 0
    setChargeUnits(units.toFixed(2))
  }

  const handleStartCharging = () => {
    setIsPopupOpen(false)
    setIsCharging(true)
  }

  const handleChargingComplete = () => {
    setIsCharging(false)
    setBatteryLevel(prevLevel => Math.min(100, prevLevel + parseFloat(chargeUnits)))
    setChargeAmount('')
    setChargeUnits(0)
  }

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 mb-8 w-full max-w-3xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your EV Dashboard</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={myImage}
              alt="Electric Car"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Battery Status</h2>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-green-500 rounded-full h-4"
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <p className="text-right mt-1">{batteryLevel}%</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Range</h2>
              <p className="text-3xl font-bold text-blue-600">{Math.round(batteryLevel * 3.5)} km</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Next Service</h2>
              <p className="text-lg">In 3 months or 5,000 km</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl"
        >
          Charge your EV
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWalletClick}
          className={`${
            walletAddress ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'
          } text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl`}
        >
          {walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}
        </motion.button>
      </div>

      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-3xl font-bold mb-6">Charge Your EV</h2>
            <p className="mb-4 text-lg">Enter the amount you want to charge (in Rupees):</p>
            <input
              type="number"
              value={chargeAmount}
              onChange={handleChargeAmountChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter amount in Rupees"
            />
            <p className="text-center mb-6 text-xl">
              Charge Units: <span className="font-semibold">{chargeUnits}</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleStartCharging}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
                disabled={!chargeAmount || parseFloat(chargeAmount) <= 0}
              >
                Start Charging
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'intro':
        return (
          <IntroPage
            onComplete={() => setCurrentPage('dashboard')}
            onEvToEvSelect={() => setCurrentPage('evToEv')}
            onEvToStationSelect={() => setCurrentPage('evToStation')}
          />
        )
      case 'dashboard':
        return renderDashboard()
      case 'evToEv':
        return <EvToEvCharge />
      case 'evToStation':
        return <EvToStationCharge />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {renderPage()}
      {isCharging && (
        <ChargingAnimation
          isCharging={isCharging}
          onChargingComplete={handleChargingComplete}
          chargeUnits={parseFloat(chargeUnits)}
        />
      )}
    </AnimatePresence>
  )
}

export default App