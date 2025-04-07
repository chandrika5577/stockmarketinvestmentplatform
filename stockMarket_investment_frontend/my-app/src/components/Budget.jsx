import React, { useState, useContext, useMemo } from "react";
import StockDataContext from '../contexts/StockDataContext';
import "../styles/Budget.css";

const Budget = () => {
  const { availableStocks, wallet, updateWallet } = useContext(StockDataContext);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [budgetSet, setBudgetSet] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const remainingFunds = useMemo(() => currentBudget - spentAmount, [currentBudget, spentAmount]);

  const highDemandStocks = useMemo(() => {
    return [...availableStocks]
      .sort((a, b) => b.change - a.change)
      .slice(0, 5);
  }, [availableStocks]);

  const affordableRecommendedStocks = useMemo(() => {
    if (!budgetSet) return [];
    return availableStocks
      .filter((stock) => stock.price <= remainingFunds)
      .sort((a, b) => {
        const priceDiffA = remainingFunds - a.price;
        const priceDiffB = remainingFunds - b.price;
        return (b.change + (1 / (priceDiffB + 1))) - (a.change + (1 / (priceDiffA + 1)));
      });
  }, [availableStocks, remainingFunds, budgetSet]);

  const handleSetBudget = (e) => {
    e.preventDefault();
    const amount = Number(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive investment amount.");
      return;
    }
    if (amount > wallet) {
      alert(
        `Investment amount (₹${amount.toFixed(
          2
        )}) exceeds available wallet balance (₹${wallet.toFixed(2)}).`
      );
      return;
    }
    setCurrentBudget(amount);
    setSpentAmount(0);
    setPurchasedStocks([]);
    setBudgetSet(true);
  };

  const handleBuyStock = (stock) => {
    if (stock.price <= remainingFunds) {
      const newSpentAmount = spentAmount + stock.price;
      setSpentAmount(newSpentAmount);
      updateWallet(-stock.price);
      setPurchasedStocks((prev) => [
        ...prev,
        { ...stock, purchasePrice: stock.price },
      ]);
    } else {
      alert("Not enough budget remaining to buy this stock!");
    }
  };

  const handleResetBudget = () => {
    setInvestmentAmount("");
    setCurrentBudget(0);
    setSpentAmount(0);
    setPurchasedStocks([]);
    setBudgetSet(false);
  };

  const progressPercent = budgetSet && currentBudget > 0
    ? (spentAmount / currentBudget) * 100
    : 0;

  const progressBarClass =
    progressPercent < 50
      ? "low"
      : progressPercent < 85
      ? "medium"
      : "high";

  const showProfitOrLoss = (purchasePrice, currentPrice) => {
    const diff = currentPrice - purchasePrice;
    const percent = (diff / purchasePrice) * 100;
    const status = diff > 0 ? "profit" : diff < 0 ? "loss" : "neutral";
    return {
      percent: percent.toFixed(2),
      status,
      label: `${diff >= 0 ? '+' : ''}${percent.toFixed(2)}%`
    };
  };

  return (
    <div className="budget-container">
      <header className="budget-header">
        <h2>Budget & Invest</h2>
        {user.email && <div className="budget-user-info">Logged in as: {user.email}</div>}
      </header>

      <section className="budget-wallet-info budget-card">
        <h3>Your Wallet</h3>
        <div className="budget-balance">
          <span>Available Balance:</span>
          <strong>₹{wallet.toFixed(2)}</strong>
        </div>
      </section>

      <section className="budget-setup budget-card">
        <h3>Plan Your Investment</h3>
        <form className="budget-input-form" onSubmit={handleSetBudget}>
          <label htmlFor="investmentAmount">Set Investment Amount (₹)</label>
          <div className="input-group">
            <input
              id="investmentAmount"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="e.g., 5000"
              min="0.01"
              step="0.01"
              required
              disabled={budgetSet}
              className="budget-input"
            />
            <button type="submit" className="budget-button primary" disabled={budgetSet}>
              Set Budget
            </button>
          </div>
        </form>
        {budgetSet && (
          <button onClick={handleResetBudget} className="budget-button secondary reset-button">
            Reset Plan
          </button>
        )}
      </section>

      {budgetSet && (
        <section className="budget-progress-section budget-card">
          <h3>Investment Progress</h3>
          <div className="budget-summary">
            <span>Planned: ₹{currentBudget.toFixed(2)}</span>
            <span>Spent: ₹{spentAmount.toFixed(2)}</span>
            <span>Remaining: ₹{remainingFunds.toFixed(2)}</span>
          </div>
          <div className="progress-bar-container">
            <div
              className={`progress-bar-fill ${progressBarClass}`}
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent.toFixed(0)}%
            </div>
          </div>
        </section>
      )}

      {budgetSet && (
        <section className="budget-recommendations budget-card">
          <h3>Recommended Stocks (Within Budget)</h3>
          {affordableRecommendedStocks.length > 0 ? (
            <div className="stocks-table-container">
              <table className="stocks-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {affordableRecommendedStocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td>{stock.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="budget-button buy"
                          onClick={() => handleBuyStock(stock)}
                          disabled={stock.price > remainingFunds}
                          title={stock.price > remainingFunds ? "Not enough funds" : ""}
                        >
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">
              No affordable stocks match your remaining budget.
            </p>
          )}
        </section>
      )}

      {purchasedStocks.length > 0 && (
        <section className="budget-purchased budget-card">
          <h3>Stocks Purchased in this Session</h3>
          <div className="stocks-table-container">
            <table className="stocks-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Purchase Price (₹)</th>
                  <th>ROI</th>
                </tr>
              </thead>
              <tbody>
                {purchasedStocks.map((stock, index) => {
                  const currentStock = availableStocks.find(s => s.symbol === stock.symbol);
                  const roi = currentStock
                    ? showProfitOrLoss(stock.purchasePrice, currentStock.price)
                    : null;
                  return (
                    <tr key={`${stock.symbol}-${index}`}>
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td>{stock.purchasePrice.toFixed(2)}</td>
                      <td>
                        {roi ? (
                          <span className={`roi-${roi.status}`}>{roi.label}</span>
                        ) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="budget-high-demand budget-card">
        <h3>🔥 Top 5 High Demand Stocks Today</h3>
        <div className="stocks-table-container">
          <table className="stocks-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {highDemandStocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td className={stock.change > 0 ? "positive-change" : "negative-change"}>
                    {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="budget-tips budget-card">
        <h3>Investment Tips</h3>
        <ul>
          <li><strong>Diversify:</strong> Spread investments across sectors.</li>
          <li><strong>Research:</strong> Understand the company before investing.</li>
          <li><strong>Long-Term View:</strong> Stay patient during market dips.</li>
          <li><strong>Invest Wisely:</strong> Only invest what you can afford to lose.</li>
        </ul>
      </section>
    </div>
  );
};

export default Budget;
