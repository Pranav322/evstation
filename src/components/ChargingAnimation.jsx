
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'

const ChargingAnimation = ({ isCharging, onChargingComplete }) => {
  const [chargeLevel, setChargeLevel] = useState(0)

  useEffect(() => {
    let interval
    if (isCharging && chargeLevel < 100) {
      interval = setInterval(() => {
        setChargeLevel(prev => {
          const newLevel = prev + 1
          if (newLevel >= 100) {
            clearInterval(interval)
            onChargingComplete()
          }
          return newLevel
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isCharging, chargeLevel, onChargingComplete])

  return (
    <AnimatePresence>
      {isCharging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Charging Your EV</h2>
            <div className="w-64 h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${chargeLevel}%` }}
                className="h-full bg-green-500"
              />
            </div>
            <p className="text-xl font-semibold">{chargeLevel}% Charged</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mt-4 text-4xl"
            >
              ⚡
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

ChargingAnimation.propTypes = {
  isCharging: PropTypes.bool.isRequired,
  onChargingComplete: PropTypes.func.isRequired,
}

export default ChargingAnimation