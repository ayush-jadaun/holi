import React, { useState, useEffect } from "react";

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [rsvp, setRsvp] = useState(null);

  // Animation for color splashes
  const [splashes, setSplashes] = useState([]);

  const addColorSplash = (e) => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F033FF",
      "#FF33A8",
      "#FFFC33",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newSplash = {
      id: Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: randomColor,
      size: Math.random() * 50 + 30,
    };

    setSplashes([...splashes, newSplash]);

    // Remove splash after animation
    setTimeout(() => {
      setSplashes((splashes) =>
        splashes.filter((splash) => splash.id !== newSplash.id)
      );
    }, 2000);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleRSVP = (response) => {
    setRsvp(response);
    setShowConfetti(true);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4 overflow-hidden"
      onClick={addColorSplash}
    >
      {/* Color splashes */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute rounded-full animate-ping opacity-70"
          style={{
            left: `${splash.x}px`,
            top: `${splash.y}px`,
            width: `${splash.size}px`,
            height: `${splash.size}px`,
            backgroundColor: splash.color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Floating colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              backgroundColor: [
                "#FF5733",
                "#33FF57",
                "#3357FF",
                "#F033FF",
                "#FF33A8",
                "#FFFC33",
              ][Math.floor(Math.random() * 6)],
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: [
                  "#FF5733",
                  "#33FF57",
                  "#3357FF",
                  "#F033FF",
                  "#FF33A8",
                  "#FFFC33",
                ][Math.floor(Math.random() * 6)],
                animation: `fall ${Math.random() * 3 + 2}s linear`,
                animationFillMode: "forwards",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden relative z-10">
        {/* Header with Holi elements */}
        <div className="relative h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                  backgroundColor: [
                    "#FF5733",
                    "#33FF57",
                    "#3357FF",
                    "#F033FF",
                    "#FF33A8",
                    "#FFFC33",
                  ][Math.floor(Math.random() * 6)],
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white text-center z-10 px-4">
            होली मिलन 2025
          </h1>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-800 mb-2">
              ECE E1 Batch Holi Celebration
            </h2>
            <p className="text-xl text-pink-600 font-semibold">
              MNNIT Allahabad
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                Event Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">📅</span>
                  </div>
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>March 4, 2025</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">🕒</span>
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>11:30 AM - JabTakMn</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>Doondhni padegi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">👥</span>
                  </div>
                  <div>
                    <p className="font-semibold">For</p>
                    <p>ECE E1 Batch Students</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                What to Expect
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-2xl mr-2">🎵</span>
                  <span>Kale Kale log</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-2">🍬</span>
                  <span>Cr ki trf se treat</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-2">🌈</span>
                  <span>Pride waale londe</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-2">📸</span>
                  <span>Photo kichani me sharmile log</span>
                </li>
              </ul>
            </div>

            {/* RSVP Section */}
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-purple-700 mb-4">RSVP</h3>
              {rsvp === null ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleRSVP("yes")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105 focus:outline-none"
                  >
                    I'm Coming! 🎉
                  </button>
                  <button
                    onClick={() => handleRSVP("maybe")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105 focus:outline-none"
                  >
                    Maybe 🤔
                  </button>
                  <button
                    onClick={() => handleRSVP("no")}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105 focus:outline-none"
                  >
                    Can't Make It 😢
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">
                    {rsvp === "yes" &&
                      "Great! We look forward to celebrating Holi with you! 🎉"}
                    {rsvp === "maybe" &&
                      "We hope you can make it! We'll keep you updated. 🤔"}
                    {rsvp === "no" && "We'll miss you! Maybe next time. 😢"}
                  </p>
                  <button
                    onClick={() => setRsvp(null)}
                    className="text-sm text-purple-600 underline"
                  >
                    Change your response
                  </button>
                </div>
              )}
            </div>

            {/* QR Code Contribution Section */}
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                Contribute for Colors
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white p-4 rounded-lg shadow-md w-48 h-48 flex items-center justify-center">
                  {/* Placeholder for QR code - In a real app, replace with actual QR code */}
                  <div className="w-50 h- bg-black p-2 rounded-md flex items-center justify-center">
                    <img src="./qr.jpg" alt="" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="mb-4">
                    Help us make this Holi celebration colorful and fun! Scan
                    the QR code to contribute ₹50 for organic colors and
                    supplies.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Pay using:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        UPI
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Google Pay
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        PhonePe
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        Paytm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">👨</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ayush Jadaun</p>
                    <p>+91 9548999129</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">👩</span>
                  </div>
                  <div>
                    <p className="font-semibold">Akshay Yadav</p>
                    <p>+91 9120991471</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with decorative elements */}
        <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4 text-center text-white relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  backgroundColor: "white",
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          <p className="font-bold text-lg z-10 relative">
            बुरा न मानो होली है! 🎭
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
