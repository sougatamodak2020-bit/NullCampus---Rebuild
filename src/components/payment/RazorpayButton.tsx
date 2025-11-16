"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

interface RazorpayButtonProps {
  amount: number
  courseId: string
  courseName: string
  onSuccess: () => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayButton({
  amount,
  courseId,
  courseName,
  onSuccess,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpayScript = () => {
      // Check if script already exists
      if (document.getElementById("razorpay-script")) {
        setScriptLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.defer = true

      script.onload = () => {
        setScriptLoaded(true)
        console.log("Razorpay script loaded")
      }

      script.onerror = () => {
        console.error("Failed to load Razorpay script")
        toast.error("Payment system failed to load. Please refresh the page.")
      }

      document.body.appendChild(script)
    }

    loadRazorpayScript()

    // Cleanup
    return () => {
      const script = document.getElementById("razorpay-script")
      if (script) {
        script.remove()
      }
    }
  }, [])

  const handlePayment = async () => {
    if (!scriptLoaded) {
      toast.error("Payment system is still loading. Please wait.")
      return
    }

    if (!window.Razorpay) {
      toast.error("Payment system not available. Please refresh the page.")
      return
    }

    setLoading(true)

    try {
      // In production, you would create an order on your backend first
      // const orderResponse = await fetch('/api/payment/create-order', {
      //   method: 'POST',
      //   body: JSON.stringify({ amount, courseId }),
      // })
      // const order = await orderResponse.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE",
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "NullCampus",
        description: courseName,
        image: "/logo.png", // Your logo
        // order_id: order.id, // Use this in production
        handler: function (response: any) {
          console.log("Payment successful:", response)
          
          // In production, verify payment on backend
          // await fetch('/api/payment/verify', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_order_id: response.razorpay_order_id,
          //     razorpay_signature: response.razorpay_signature,
          //   }),
          // })

          toast.success("Payment successful! 🎉")
          onSuccess()
          setLoading(false)
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          course_id: courseId,
        },
        theme: {
          color: "#8b5cf6", // Purple theme
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            toast.error("Payment cancelled")
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className={`w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
        loading || !scriptLoaded
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-lg"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : !scriptLoaded ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading Payment...</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          <span>Enroll Now - ₹{amount.toLocaleString()}</span>
        </>
      )}
    </motion.button>
  )
}