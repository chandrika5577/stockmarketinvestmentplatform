import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ historicalData, timeframe, setTimeframe }) {
  const [showNSE, setShowNSE] = useState(true);
  const [showBSE, setShowBSE] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [show50DMA, setShow50DMA] = useState(false);
  const [show200DMA, setShow200DMA] = useState(false);

  const labels = historicalData.map((data) => data.date);
  const nsePrices = historicalData.map((data) => data.nsePrice);
  const bsePrices = historicalData.map((data) => data.bsePrice);
  const volumes = historicalData.map((data) => data.volume);

  const calculateSMA = (data, window) => {
    return data.map((_, index) => {
      if (index < window - 1) return null;
      const sum = data.slice(index - window + 1, index + 1).reduce((a, b) => a + b, 0);
      return sum / window;
    });
  };

  const sma50 = calculateSMA(nsePrices, 50);
  const sma200 = calculateSMA(nsePrices, 200);

  const chartData = {
    labels: labels,
    datasets: [
      ...(showNSE ? [{
        label: 'NSE Price',
        data: nsePrices,
        borderColor: '#FFD700', 
        tension: 0.4,
        yAxisID: 'y-price',
        pointRadius: 0,
      }] : []),
      ...(showBSE ? [{
        label: 'BSE Price',
        data: bsePrices,
        borderColor: '#FF4500',
        tension: 0.4,
        yAxisID: 'y-price',
        pointRadius: 0,
      }] : []),
      ...(showVolume ? [{
        label: 'Volume',
        data: volumes,
        backgroundColor: 'rgba(30, 144, 255, 0.4)', // Blue
        yAxisID: 'y-volume',
        type: 'bar',
        barThickness: timeframe === '1D' ? 4 : 8,
      }] : []),
      ...(show50DMA ? [{
        label: '50 DMA',
        data: sma50,
        borderColor: '#32CD32', // Green
        borderDash: [5, 5],
        tension: 0,
        yAxisID: 'y-price',
        pointRadius: 0,
      }] : []),
      ...(show200DMA ? [{
        label: '200 DMA',
        data: sma200,
        borderColor: '#9400D3', // Purple
        borderDash: [5, 5],
        tension: 0,
        yAxisID: 'y-price',
        pointRadius: 0,
      }] : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { 
        mode: 'index', 
        intersect: false,
        position: 'nearest',
      }
    },
    scales: {
      'y-price': {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
      },
      'y-volume': {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { drawOnChartArea: false },
      },
    },
  };

  const containerStyle = {
    width: '100%',
    height: '500px',
    position: 'relative',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    margin: '10px 0'
  };

  const timeframeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '15px',
    zIndex: 100
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    fontSize: '14px',
    padding: '2px 5px',
    transition: 'all 0.2s',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    color: '#2962FF',
    fontWeight: '600',
    borderBottom: '2px solid #2962FF'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px',
    flexWrap: 'wrap',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={timeframeStyle}>
        {['1D', '1W', '1M', '1Y', '2Y'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            style={timeframe === tf ? activeButtonStyle : buttonStyle}
          >
            {tf}
          </button>
        ))}
      </div>
      
      <Chart type="line" options={options} data={chartData} />

      <div style={checkboxContainerStyle}>
        {[
          { label: 'NSE', state: showNSE, setter: setShowNSE },
          { label: 'BSE', state: showBSE, setter: setShowBSE },
          { label: 'Volume', state: showVolume, setter: setShowVolume },
          { label: '50 DMA', state: show50DMA, setter: setShow50DMA },
          { label: '200 DMA', state: show200DMA, setter: setShow200DMA },
        ].map((item) => (
          <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={item.state}
              onChange={() => item.setter(!item.state)}
              style={{ accentColor: '#2962FF' }}
            />
            <span style={{ color: '#333', fontSize: '14px' }}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ChartComponent;