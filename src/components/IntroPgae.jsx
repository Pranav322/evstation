import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Building = ({ height, width, left, delay, windows }) => (
  <motion.div
    initial={{ y: 200, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay }}
    className="absolute bottom-0"
    style={{ height, width, left }}
  >
    <div className="w-full h-full bg-gray-800 relative rounded-t-lg shadow-2xl">
      {/* Windows */}
      {windows.map((row, i) => (
        <div key={i} className="flex justify-around absolute w-full" style={{ top: `${i * 20}%` }}>
          {row.map((isLit, j) => (
            <div
              key={j}
              className={`w-3 h-4 ${isLit ? 'bg-yellow-300' : 'bg-gray-700'} rounded-sm`}
              style={{ boxShadow: isLit ? '0 0 10px rgba(255, 255, 0, 0.5)' : 'none' }}
            />
          ))}
        </div>
      ))}
      {/* Roof details */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gray-700 rounded-t-lg" />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gray-700" />
    </div>
  </motion.div>
)

const IntroPage = ({ onComplete, onEvToEvSelect, onEvToStationSelect }) => {
  const generateWindows = (rows, cols) => {
    return Array(rows).fill().map(() => 
      Array(cols).fill().map(() => Math.random() > 0.6)
    )
  }

  return (
    <div className="h-screen w-full bg-gray-950 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Buildings */}
      <Building height={200} width={80} left="5%" delay={0.2} windows={generateWindows(5, 4)} />
      <Building height={300} width={100} left="20%" delay={0.4} windows={generateWindows(7, 5)} />
      <Building height={250} width={90} left="40%" delay={0.6} windows={generateWindows(6, 4)} />
      <Building height={350} width={110} left="60%" delay={0.8} windows={generateWindows(8, 5)} />
      <Building height={220} width={85} left="80%" delay={1} windows={generateWindows(5, 4)} />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-white mb-8 text-center"
        >
          Welcome to EV Charging Revolution
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl text-white mb-12 text-center max-w-2xl"
        >
          Experience the future of electric vehicle charging with our innovative solutions.
          Choose your preferred charging method and join the sustainable energy movement.
        </motion.p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={onComplete}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl"
          >
            Station To EV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={onEvToEvSelect}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl"
          >
            EV to EV Charge
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            onClick={onEvToStationSelect}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl"
          >
            EV to Station Charge
          </motion.button>
        </div>
      </div>

      {/* Animated car */}
      <motion.div
        className="absolute bottom-0 left-0"
        initial={{ x: '-10%', y: 0 }}
        animate={{ x: '80%', y: [0, -20, 0] }}
        transition={{
          x: { duration: 7, repeat: Infinity, ease: "linear" },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
        }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="100" height="25" rx="5" fill="#3B82F6" />
          <rect x="25" y="20" width="70" height="20" rx="5" fill="#60A5FA" />
          <circle cx="30" cy="55" r="10" fill="#1F2937" />
          <circle cx="90" cy="55" r="10" fill="#1F2937" />
        </svg>
      </motion.div>

      {/* Charging station */}
      <div className="absolute bottom-0 right-20">
        <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="50" width="80" height="100" rx="10" fill="#4B5563" />
          <rect x="30" y="70" width="40" height="60" rx="5" fill="#60A5FA" />
          <path d="M50 90L40 110H60L50 130" stroke="#FBBF24" strokeWidth="4" />
        </svg>
      </div>
    </div>
  )
}

IntroPage.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onEvToEvSelect: PropTypes.func.isRequired,
  onEvToStationSelect: PropTypes.func.isRequired,
}

export default IntroPage