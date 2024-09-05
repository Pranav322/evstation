import React, { useState } from 'react'
import { motion } from 'framer-motion'

function EvToEvCharge() {
  const [chargeAmount, setChargeAmount] = useState(50)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 mb-8 w-full max-w-3xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">EV to EV Charging</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/path-to-ev-to-ev-image.jpg"
              alt="EV to EV Charging"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Charge Amount</h2>
              <input
                type="range"
                min="0"
                max="100"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-right mt-1">{chargeAmount}%</p>
            </div>
            <button
              onClick={() => alert('Charging started!')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
            >
              Start Charging
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EvToEvCharge