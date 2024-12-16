import React, { useState, useEffect } from "react";
import { SPINNING_API } from '~/apis/spinningAPI';

const SpinningNumberWheel = () => {
  const numbers = [2000, 5000, 1000, 500];
  const [currentNumber, setCurrentNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isSpinDisabled, setIsSpinDisabled] = useState(false); 

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());

    // Check if the user has already spun today
    const lastSpinDate = localStorage.getItem(`lastSpinDate_${userId}`);
    if (lastSpinDate === today.toLocaleDateString()) {
      setIsSpinDisabled(true); 
    } else {
      setIsSpinDisabled(false); 
    }
  }, [userId]);

  const handleSpin = () => {
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);

    let rollingInterval;
    let index = 0;

    rollingInterval = setInterval(() => {
      setCurrentNumber(numbers[index]);
      index = (index + 1) % numbers.length;
    }, 100);

    setTimeout(() => {
      clearInterval(rollingInterval);
      const winningNumber = numbers[randomIndex];
      setCurrentNumber(winningNumber);
      setSpinning(false);

      // Call the API to update the balance and record the spin
      SPINNING_API(winningNumber)
        .then(response => {
          console.log('API Response:', response.data);
          // Update the localStorage with today's date when the user spins
          localStorage.setItem(`lastSpinDate_${userId}`, currentDate);
          setIsSpinDisabled(true); // Disable spin for the rest of the day
        })
        .catch(error => {
          console.error('Error calling API:', error);
        });
    }, 3000); // Spin lasts for 3 seconds
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "rgba(255, 192, 203, 0.5)",
      padding: "20px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
      color: "#ff7f50",
      marginBottom: "30px",
      textAlign: "center",
    },
    header: {
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "20px",
      color: "#333",
    },
    wheelBox: {
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      border: "10px solid #ff7f50",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f4f4f4, #e6e6e6)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
      fontSize: "50px",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "20px",
    },
    button: {
      padding: "14px 30px",
      fontSize: "20px",
      borderRadius: "10px",
      border: "none",
      background: "#ff7f50",
      color: "#fff",
      fontWeight: "bold",
      cursor: spinning || isSpinDisabled ? "not-allowed" : "pointer",
      opacity: spinning || isSpinDisabled ? 0.6 : 1,
      transition: "all 0.3s ease",
      marginBottom: "10px",
    },
    resultText: {
      marginTop: "20px",
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Spinning Game 🎡</div>
      <div style={styles.header}>
        <p>Today's Date: {currentDate}</p>
      </div>
      <div style={styles.wheelBox}>
        {currentNumber !== null ? currentNumber : "🎲"}
      </div>
      <button
        style={styles.button}
        onClick={handleSpin}
        disabled={spinning || isSpinDisabled}
      >
        Spin
      </button>
      {currentNumber !== null && !spinning && (
        <p style={styles.resultText}>🎉 You won: {currentNumber}đ</p>
      )}
    </div>
  );
};

export default SpinningNumberWheel;
