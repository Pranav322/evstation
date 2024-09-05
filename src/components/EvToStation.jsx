import React, { useState } from 'react'
import { motion } from 'framer-motion'

function EvToStationCharge() {
  const [selectedStation, setSelectedStation] = useState('')

  const stations = [
    { id: 1, name: 'Station A' },
    { id: 2, name: 'Station B' },
    { id: 3, name: 'Station C' },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 mb-8 w-full max-w-3xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">EV to Station Charging</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/path-to-ev-to-station-image.jpg"
              alt="EV to Station Charging"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Select Station</h2>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full p-2 rounded-lg"
              >
                <option value="">Choose a station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => alert('Station selected!')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
              disabled={!selectedStation}
            >
              Select Station
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EvToStationCharge