import axios from 'axios'
import { useState } from 'react'

/**
 * Custom hook to handle subscription process.
 *
 * @returns {Object} - An object containing the subscription handler and processing state.
 * @returns {Function} onSubscribe - Function to initiate the subscription process.
 * @returns {boolean} isProcessing - State indicating if the subscription process is ongoing.
 */
export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const onSubscribe = async () => {
        setIsProcessing(true)
        try {
            const response = await axios.get('/api/payment')
            if (response.data.status === 200) {
                return (window.location.href = `${response.data.session_url}`)
            }
        } catch (error) {
            console.error('Subscription error:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return { onSubscribe, isProcessing }
}