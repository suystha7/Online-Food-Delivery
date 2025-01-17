"use client";

import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const StripePayment: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/orderSuccess");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-32 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Stripe Payment</h2>
      <p className="text-gray-600 mb-4">
        Please enter your card details below to complete your payment.
      </p>

      <div className="space-y-4">
        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          inputProps={{ maxLength: 16 }}
          placeholder="1234 5678 9012 3456"
        />
        <div className="flex gap-4">
          <TextField
            label="Expiry Date"
            variant="outlined"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            inputProps={{ maxLength: 5 }}
            className="w-1/2"
          />
          <TextField
            label="CVV"
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            inputProps={{ maxLength: 3 }}
            className="w-1/2"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Total Amount</h3>
        <p className="text-xl font-bold text-red-600">NRS 2000</p>
      </div>

      <div className="mt-6">
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <CircularProgress size={24} className="text-white" />
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StripePayment;
