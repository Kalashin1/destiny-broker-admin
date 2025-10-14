/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const TradingComponent = () => {
  const [lotSize, setLotSize] = useState(0.1);
  const [selectedPair, 
    // setSelectedPair
  ] = useState("USD/BTC");
  const [price, 
    // setPrice
  ] = useState(1.08745);

  // const currencyPairs = [
  //   "USD/BTC",
  //   "USD/ETH",
  //   "USD/BNB",
  //   "USD/SOL",
  //   "USD/TRX",
  //   "More...",
  // ];

  const quickLotSizes = [0.01, 0.1, 0.5, 1.0];

  const handleLotSizeChange = (e: any) => {
    setLotSize(parseFloat(e.target.value));
  };

  const setQuickLotSize = (size: number) => {
    setLotSize(size);
  };

  // const handlePairSelect = (pair: any) => {
  //   setSelectedPair(pair);
  //   // In a real app, you'd fetch the current price for the selected pair
  //   // For demo, we'll just change the price slightly
  //   setPrice((prevPrice) => prevPrice + (Math.random() - 0.5) * 0.001);
  // };

  const handleBuy = () => {
    alert(`BUY order placed: ${lotSize} lots of ${selectedPair} at ${price}`);
    // In a real app, you would send this to your trading API
  };

  const handleSell = () => {
    alert(`SELL order placed: ${lotSize} lots of ${selectedPair} at ${price}`);
    // In a real app, you would send this to your trading API
  };

  return (
    <div className="max-w-md w-full -mb-4 mx-auto">
      {/* Trading Component */}
      <div className="dark-gradient rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white trading-font glow-text text-center">
            <i className="fas fa-chart-line mr-2"></i>TRADING TERMINAL
          </h2>
        </div>

        {/* Trading Content */}
        <div className="p-6">
          {/* Current Price Display */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 text-center border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">{selectedPair}</div>
            <div className="text-3xl font-bold text-white trading-font">
              {price.toFixed(5)}
            </div>
            <div className="text-green-500 text-sm mt-1">
              <i className="fas fa-arrow-up mr-1"></i>+0.24% Today
            </div>
          </div>

          {/* Lot Size Input */}
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="lotSize"
            >
              Lot Size
            </label>
            <div className="relative">
              <input
                type="number"
                id="lotSize"
                className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors trading-font"
                value={lotSize}
                min="0.01"
                step="0.01"
                onChange={handleLotSizeChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400">LOT</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              {quickLotSizes.map((size) => (
                <button
                  key={size}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                  onClick={() => setQuickLotSize(size)}
                >
                  {size.toFixed(2)}
                </button>
              ))}
            </div>
          </div>

          {/* Trade Pair Selection */}
          {/* <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Trade Pair
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currencyPairs.map((pair) => (
                <button
                  key={pair}
                  className={`bg-gray-800 text-white py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors trading-font ${
                    selectedPair === pair
                      ? "border-blue-500 bg-blue-900/30"
                      : ""
                  }`}
                  onClick={() => handlePairSelect(pair)}
                >
                  {pair}
                </button>
              ))}
            </div>
          </div> */}

          {/* Buy/Sell Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className="neon-buy bg-gradient-to-br from-cyan-900 to-blue-900 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 trading-font transform hover:scale-105"
              onClick={handleBuy}
            >
              <i className="fas fa-arrow-up mr-2"></i>BUY
            </button>
            <button
              className="neon-sell bg-gradient-to-br from-purple-900 to-pink-900 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 trading-font transform hover:scale-105"
              onClick={handleSell}
            >
              <i className="fas fa-arrow-down mr-2"></i>SELL
            </button>
          </div>

          {/* Trade Info */}
          <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Volume:</span>
              <span className="text-white trading-font">
                {(lotSize * 100000).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Spread:</span>
              <span className="text-white trading-font">0.6 pips</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Margin Required:</span>
              <span className="text-white trading-font">
                ${(lotSize * 435).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingComponent;
