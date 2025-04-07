import React, { useContext, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import StockDataContext from '../contexts/StockDataContext';
import '../styles/Market.css';

const dummyNews = [
  { title: "Nifty hits all-time high", time: "2h ago" },
  { title: "RBI holds interest rate unchanged", time: "4h ago" },
  { title: "Reliance surges 5% on earnings beat", time: "6h ago" },
  { title: "Tech stocks rally as NASDAQ jumps", time: "1d ago" },
  { title: "Crude oil prices soften, easing inflation", time: "1d ago" }
];

const Market = () => {
  const { availableStocks = [] } = useContext(StockDataContext);

  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');

  const selectedStock1 = useMemo(() => availableStocks.find(s => s.symbol === stock1), [stock1, availableStocks]);
  const selectedStock2 = useMemo(() => availableStocks.find(s => s.symbol === stock2), [stock2, availableStocks]);

  const getAnalysis = () => {
    if (!selectedStock1 || !selectedStock2) return null;

    const diff = selectedStock1.change - selectedStock2.change;

    if (Math.abs(diff) < 1) {
      return "Both stocks have shown similar short-term performance.";
    }

    const better = diff > 0 ? selectedStock1 : selectedStock2;
    const weaker = diff < 0 ? selectedStock1 : selectedStock2;

    return `${better.symbol} is currently outperforming ${weaker.symbol} by ${Math.abs(diff).toFixed(2)}%. ` +
      `If the trend continues, ${better.symbol} might present stronger momentum in the short-term.`;
  };

  const topGainers = [...availableStocks].sort((a, b) => b.change - a.change).slice(0, 3);
  const topLosers = [...availableStocks].sort((a, b) => a.change - b.change).slice(0, 3);

  return (
    <Container fluid className="market-page-container">
      <Row>
        {/* === Left Content === */}
        <Col md={9}>
          <h2 className="market-title">Market Overview</h2>
          <p className="market-subtitle">Compare stocks and follow trends in real time.</p>

          {/* Top Gainers & Losers */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="market-card">
                <Card.Body>
                  <Card.Title>Top Gainers</Card.Title>
                  {topGainers.map(stock => (
                    <div key={stock.symbol}>
                      <strong>{stock.symbol}</strong> — ₹{stock.price.toFixed(2)} ({stock.change}%)
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="market-card">
                <Card.Body>
                  <Card.Title>Top Losers</Card.Title>
                  {topLosers.map(stock => (
                    <div key={stock.symbol}>
                      <strong>{stock.symbol}</strong> — ₹{stock.price.toFixed(2)} ({stock.change}%)
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Comparison Section */}
          <Card className="market-card mb-4">
            <Card.Body>
              <Card.Title>Compare Two Stocks</Card.Title>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Select value={stock1} onChange={(e) => setStock1(e.target.value)}>
                    <option value="">Select Stock 1</option>
                    {availableStocks.map(stock => (
                      <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select value={stock2} onChange={(e) => setStock2(e.target.value)}>
                    <option value="">Select Stock 2</option>
                    {availableStocks.map(stock => (
                      <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              {selectedStock1 && selectedStock2 && (
                <>
                  <div className="compare-table">
                    <Row className="compare-header">
                      <Col></Col>
                      <Col>{selectedStock1.symbol}</Col>
                      <Col>{selectedStock2.symbol}</Col>
                    </Row>
                    <Row className="compare-row">
                      <Col>Price</Col>
                      <Col>₹{selectedStock1.price.toFixed(2)}</Col>
                      <Col>₹{selectedStock2.price.toFixed(2)}</Col>
                    </Row>
                    <Row className="compare-row">
                      <Col>Change (%)</Col>
                      <Col className={selectedStock1.change >= 0 ? "positive" : "negative"}>
                        {selectedStock1.change}%
                      </Col>
                      <Col className={selectedStock2.change >= 0 ? "positive" : "negative"}>
                        {selectedStock2.change}%
                      </Col>
                    </Row>
                    <Row className="compare-row">
                      <Col>Volume</Col>
                      <Col>{selectedStock1.volume}</Col>
                      <Col>{selectedStock2.volume}</Col>
                    </Row>
                  </div>

                  {/* Dynamic Analysis */}
                  <div className="analysis-box mt-3">
                    <strong>Analysis:</strong> {getAnalysis()}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* === Right Sidebar === */}
        <Col md={3}>
          <div className="market-sidebar">
            <h5 className="sidebar-title">Trending News</h5>
            <ul className="news-list">
              {dummyNews.map((item, idx) => (
                <li key={idx}>
                  <span className="news-title">{item.title}</span>
                  <span className="news-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Market;
