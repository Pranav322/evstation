import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Cloud = ({ delay, duration, scale, yPosition }) => (
  <motion.svg
    viewBox="0 0 640 512"
    initial={{ x: -200 }}
    animate={{ x: '100vw' }}
    transition={{ repeat: Infinity, duration, delay }}
    className="absolute fill-current text-white opacity-80"
    style={{ top: yPosition, width: `${scale * 100}px` }}
  >
    <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/>
  </motion.svg>
)

const Building = ({ height, width, left, delay }) => (
  <motion.div
    initial={{ y: 200, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay }}
    className="absolute bottom-16"
    style={{ height, width, left }}
  >
    <div className="w-full h-full bg-gray-800 relative rounded-t-lg">
      {[...Array(Math.floor(height / 20))].map((_, i) => (
        <div key={i} className="absolute w-3 h-3 bg-yellow-300 rounded-sm"
             style={{ top: `${i * 20 + 10}px`, left: `${Math.random() * (width - 12)}px` }} />
      ))}
    </div>
  </motion.div>
)

const ChargingStation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="absolute bottom-0 right-16 z-10"
  >
    <div className="w-24 h-48 bg-gray-300 rounded-t-lg relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-600 rounded-full" />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-24 bg-gray-400" />
    </div>
  </motion.div>
)

const Car = () => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: 'calc(100vw - 180px)' }}
    transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
    className="absolute bottom-8 left-0"
  >
    <div className="w-40 h-20 bg-blue-600 rounded-lg relative">
      <div className="absolute top-0 right-6 w-16 h-10 bg-blue-400 rounded-t-lg" />
      <div className="absolute bottom-0 left-6 w-10 h-10 bg-gray-700 rounded-full" />
      <div className="absolute bottom-0 right-6 w-10 h-10 bg-gray-700 rounded-full" />
      <div className="absolute top-2 left-4 w-6 h-3 bg-yellow-400 rounded" />
      <div className="absolute top-2 right-24 w-6 h-3 bg-yellow-400 rounded" />
    </div>
  </motion.div>
)

const Road = () => (
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-700">
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, delay: 0.5, ease: "linear" }}
        className="h-2 bg-yellow-400"
      />
    </div>
  </div>
)

function IntroPage({ onComplete, onEvToEvSelect, onEvToStationSelect }) {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <Cloud delay={0} duration={30} scale={1} yPosition="5%" />
      <Cloud delay={5} duration={35} scale={0.7} yPosition="15%" />
      <Cloud delay={10} duration={40} scale={0.5} yPosition="25%" />

      <Building height={150} width={60} left="5%" delay={0.2} />
      <Building height={200} width={80} left="20%" delay={0.4} />
      <Building height={180} width={70} left="40%" delay={0.6} />
      <Building height={220} width={90} left="60%" delay={0.8} />
      <Building height={160} width={65} left="80%" delay={1} />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="text-5xl font-bold text-white mb-8 z-20 text-center"
      >
        The Future of EV Charging
      </motion.h1>
      
      <ChargingStation />
      <Car />
      <Road />

      <div className="flex space-x-4 mt-8 z-20">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl"
        >
          Station To Ev
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEvToEvSelect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl"
          >
            EV to EV Charge
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEvToStationSelect}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl"
          >
            EV to Station Charge
          </motion.button>
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