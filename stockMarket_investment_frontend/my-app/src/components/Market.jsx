import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Container, Row, Col, Card, Spinner, Alert, Table, Badge } from 'react-bootstrap';
import { FiTrendingUp, FiTrendingDown, FiActivity, FiBarChart2, FiClock, FiAlertCircle, FiSun, FiMoon } from 'react-icons/fi'; // Example icons
import '../styles/Market.css'; // Make sure you have this CSS file

// --- Mock Data Fetching (Keep as is or replace with real API) ---
const fetchMarketData = async () => {
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay

    // Simulate potential API failure occasionally
    // if (Math.random() < 0.1) {
    //  throw new Error("Failed to fetch market data. Network issue.");
    // }

    const randomChange = (min = -2.5, max = 2.5) => (Math.random() * (max - min) + min);
    const randomValue = (base) => (base + base * (randomChange(-5, 5) / 100));

    return {
        marketIndices: [
            { id: 'sp500', name: 'S&P 500', value: parseFloat(randomValue(5100).toFixed(2)), change: parseFloat(randomChange(-1.5, 2.0).toFixed(2)) },
            { id: 'nasdaq', name: 'NASDAQ', value: parseFloat(randomValue(16000).toFixed(2)), change: parseFloat(randomChange(-2.5, 3.0).toFixed(2)) },
            { id: 'djia', name: 'Dow Jones', value: parseFloat(randomValue(39000).toFixed(2)), change: parseFloat(randomChange(-1.0, 1.5).toFixed(2)) },
            { id: 'nifty', name: 'NIFTY 50', value: parseFloat(randomValue(22000).toFixed(2)), change: parseFloat(randomChange(-2.0, 2.5).toFixed(2)) },
            { id: 'ftse', name: 'FTSE 100', value: parseFloat(randomValue(7500).toFixed(2)), change: parseFloat(randomChange(-1.2, 1.8).toFixed(2)) },
        ],
        topGainers: [
            { symbol: 'AAPL', name: 'Apple Inc.', price: parseFloat(randomValue(175).toFixed(2)), change: parseFloat((Math.random() * 4 + 1.5).toFixed(2)) },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: parseFloat(randomValue(410).toFixed(2)), change: parseFloat((Math.random() * 3 + 0.8).toFixed(2)) },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: parseFloat(randomValue(880).toFixed(2)), change: parseFloat((Math.random() * 5 + 2.0).toFixed(2)) },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: parseFloat(randomValue(140).toFixed(2)), change: parseFloat((Math.random() * 2.5 + 0.5).toFixed(2)) },
            { symbol: 'AMD', name: 'AMD Inc.', price: parseFloat(randomValue(180).toFixed(2)), change: parseFloat((Math.random() * 3.5 + 1.0).toFixed(2)) },
        ].sort((a, b) => b.change - a.change), // Ensure sorted
        topLosers: [
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: parseFloat(randomValue(170).toFixed(2)), change: parseFloat((-Math.random() * 4 - 1.5).toFixed(2)) },
            { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: parseFloat(randomValue(180).toFixed(2)), change: parseFloat((-Math.random() * 3 - 0.8).toFixed(2)) },
            { symbol: 'META', name: 'Meta Platforms, Inc.', price: parseFloat(randomValue(480).toFixed(2)), change: parseFloat((-Math.random() * 5 - 2.0).toFixed(2)) },
            { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: parseFloat(randomValue(190).toFixed(2)), change: parseFloat((-Math.random() * 2.5 - 0.5).toFixed(2)) },
            { symbol: 'INTC', name: 'Intel Corp.', price: parseFloat(randomValue(45).toFixed(2)), change: parseFloat((-Math.random() * 3.0 - 0.7).toFixed(2)) },
        ].sort((a, b) => a.change - b.change), // Ensure sorted
        sectorPerformance: [
            { name: 'Technology', change: parseFloat(randomChange(-3, 3.5).toFixed(2)) },
            { name: 'Healthcare', change: parseFloat(randomChange(-1.5, 2).toFixed(2)) },
            { name: 'Financials', change: parseFloat(randomChange(-2, 2.5).toFixed(2)) },
            { name: 'Consumer Disc.', change: parseFloat(randomChange(-4, 4).toFixed(2)) },
            { name: 'Energy', change: parseFloat(randomChange(-2.5, 3).toFixed(2)) },
            { name: 'Industrials', change: parseFloat(randomChange(-1, 1.5).toFixed(2)) },
            { name: 'Utilities', change: parseFloat(randomChange(-1.8, 1.2).toFixed(2)) },
            { name: 'Real Estate', change: parseFloat(randomChange(-2.2, 2.0).toFixed(2)) },
        ],
    };
};

// --- Reusable Chart Component ---
const PerformanceBarChart = ({ data, dataKey, valueKey, unit = "%" }) => {
    if (!data || data.length === 0) return <div className="text-center text-muted">No data available</div>;

    const changes = data.map(item => item[valueKey]);
    const minY = Math.min(0, ...changes) * 1.2; // Add some padding below 0
    const maxY = Math.max(0, ...changes) * 1.2; // Add some padding above 0
    const domain = [minY.toFixed(1), maxY.toFixed(1)]; // Use fixed precision for domain

    const formatTooltip = (value) => `${value.toFixed(2)}${unit}`;
    const formatYAxisTick = (tick) => `${tick}${unit}`;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis
                    dataKey={dataKey}
                    angle={-35}
                    textAnchor="end"
                    height={50}
                    interval={0}
                    tick={{ fontSize: 10, fill: '#6c757d' }} // Lighter tick color
                    stroke="#adb5bd"
                />
                <YAxis
                    tickFormatter={formatYAxisTick}
                    domain={domain}
                    tick={{ fontSize: 10, fill: '#6c757d' }}
                    allowDecimals={true}
                    stroke="#adb5bd"
                />
                <Tooltip
                    formatter={formatTooltip}
                    cursor={{ fill: 'rgba(206, 212, 218, 0.3)' }} // Light hover effect
                    contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
                        borderColor: '#adb5bd',
                        borderRadius: '4px',
                        fontSize: '12px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                />
                <Bar dataKey={valueKey} barSize={20}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry[valueKey] >= 0 ? '#28a745' : '#dc3545'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

// --- Reusable Stock Table Component ---
const StockTable = ({ data, title, icon, variant = 'light' }) => {
     if (!data || data.length === 0) return <div className="text-center text-muted">No data available</div>;

    const isGainers = variant === 'success'; // Determine if it's for gainers or losers

    return (
        <>
            <Card.Title as="h6" className="mb-3 d-flex align-items-center card-subtitle">
                 {icon} <span className="ms-2">{title}</span>
            </Card.Title>
            <Table responsive hover size="sm" className="stock-table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stock) => (
                        <tr key={stock.symbol}>
                            <td>
                                <div className="fw-bold">{stock.symbol}</div>
                                <small className="text-muted d-block d-md-none">{stock.name}</small> {/* Show name on small screens */}
                            </td>
                            <td>${stock.price.toFixed(2)}</td>
                            <td>
                                <Badge pill bg={isGainers ? 'success-light' : 'danger-light'} text={isGainers ? 'success' : 'danger'}>
                                    {isGainers ? '+' : ''}{stock.change.toFixed(2)}%
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};


// --- Main Market Component ---
function Market() {
    const [marketData, setMarketData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [marketStatus, setMarketStatus] = useState('Closed'); // Simulated

    // Function to simulate market open/close (e.g., weekdays 9:30 AM - 4:00 PM ET)
    // This is a rough simulation and doesn't account for holidays or exact market hours per index
    const updateMarketStatus = () => {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = now.getUTCHours(); // Use UTC for wider applicability or adjust as needed
        // Example: Simulate open roughly 13:30-20:00 UTC (9:30 AM - 4 PM ET) on weekdays
        if (day >= 1 && day <= 5 && hour >= 13 && hour < 20) {
             setMarketStatus('Open');
        } else {
             setMarketStatus('Closed');
        }
    };


    const loadData = async () => {
        // Don't clear error immediately, show old data if fetch fails
        // setError(null);
        try {
            const data = await fetchMarketData();
            setMarketData(data);
            setCurrentTime(new Date());
            setError(null); // Clear error only on successful fetch
        } catch (err) {
            console.error("Failed to load market data:", err);
            setError(err.message || "An unexpected error occurred while fetching data.");
            // Don't set data to null, keep stale data if needed
        } finally {
            // Only set loading to false on the *first* load attempt
            if (isLoading) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        loadData(); // Initial load
        updateMarketStatus(); // Initial status check

        const dataIntervalId = setInterval(loadData, 15000); // Fetch data every 15 seconds
        const statusIntervalId = setInterval(updateMarketStatus, 60000); // Check market status every minute

        return () => {
            clearInterval(dataIntervalId);
            clearInterval(statusIntervalId);
        };
    }, []); // Empty dependency array means this runs once on mount


    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading Market Data...</span>
                </Spinner>
                <span className="ms-3">Loading Market Data...</span>
            </Container>
        );
    }

    const lastUpdated = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const isMarketOpen = marketStatus === 'Open';

    return (
        <Container fluid className="py-4 market-page">
            {/* --- Header --- */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="market-title">Market Dashboard</h1>
                </Col>
                <Col xs="auto" className="text-end">
                     <div className={`market-status ${isMarketOpen ? 'open' : 'closed'}`}>
                        {isMarketOpen ? <FiSun className="me-1"/> : <FiMoon className="me-1"/>}
                        Market {marketStatus}
                    </div>
                    <small className="text-muted d-block mt-1">
                        <FiClock className="me-1" /> Last Updated: {lastUpdated}
                    </small>
                </Col>
            </Row>

            {/* --- Error Message --- */}
            {error && !isLoading && ( // Show error only if not loading and error exists
                <Alert variant="danger" className="d-flex align-items-center">
                     <FiAlertCircle className="me-2"/>
                    <div>
                        <strong>Error:</strong> {error}
                        <small className="d-block">Displaying potentially stale data.</small>
                    </div>
                </Alert>
            )}

            {/* --- Indices Section --- */}
            {marketData?.marketIndices && (
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow-sm h-100 market-card">
                            <Card.Body>
                                <Card.Title as="h5" className="mb-3 card-header-title">
                                    <FiActivity className="me-2" />Indices Performance (% Change)
                                </Card.Title>
                                <PerformanceBarChart
                                    data={marketData.marketIndices}
                                    dataKey="name"
                                    valueKey="change"
                                />
                                <hr className="my-3" />
                                <div className="index-values-grid">
                                    {marketData.marketIndices.map(index => (
                                        <div key={index.id} className="index-value-item">
                                            <strong>{index.name}:</strong> {index.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                            <span className={`ms-1 fw-bold ${index.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                                ({index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%)
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* --- Movers Section (Gainers & Losers) --- */}
            <Row className="mb-4">
                {/* Top Gainers */}
                <Col md={6} className="mb-4 mb-md-0">
                     <Card className="shadow-sm h-100 market-card">
                         <Card.Body>
                             {marketData?.topGainers && (
                                 <StockTable
                                     data={marketData.topGainers}
                                     title="Top Gainers"
                                     icon={<FiTrendingUp className="text-success" />}
                                     variant="success"
                                 />
                             )}
                              {!marketData?.topGainers && <div className="text-center text-muted">Gainers data unavailable.</div>}
                         </Card.Body>
                     </Card>
                 </Col>

                {/* Top Losers */}
                 <Col md={6}>
                     <Card className="shadow-sm h-100 market-card">
                         <Card.Body>
                             {marketData?.topLosers && (
                                 <StockTable
                                     data={marketData.topLosers}
                                     title="Top Losers"
                                     icon={<FiTrendingDown className="text-danger" />}
                                     variant="danger"
                                 />
                              )}
                               {!marketData?.topLosers && <div className="text-center text-muted">Losers data unavailable.</div>}
                         </Card.Body>
                     </Card>
                 </Col>
            </Row>

            {/* --- Sector Performance Section --- */}
            {marketData?.sectorPerformance && (
                 <Row className="mb-4">
                     <Col>
                         <Card className="shadow-sm h-100 market-card">
                             <Card.Body>
                                 <Card.Title as="h5" className="mb-3 card-header-title">
                                     <FiBarChart2 className="me-2" />Sector Performance (% Change)
                                 </Card.Title>
                                 <PerformanceBarChart
                                     data={marketData.sectorPerformance}
                                     dataKey="name"
                                     valueKey="change"
                                 />
                             </Card.Body>
                         </Card>
                     </Col>
                 </Row>
            )}

             {/* --- Placeholder for News/Other Features --- */}
            {/*
            <Row>
                 <Col md={6} className="mb-4">
                    <Card className="shadow-sm h-100 market-card">
                        <Card.Body>
                            <Card.Title as="h5" className="mb-3 card-header-title"><FiFileText className="me-2" />Market News</Card.Title>
                            <p className="placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                             <Button variant="outline-primary" size="sm">Read More</Button>
                         </Card.Body>
                     </Card>
                </Col>
                 <Col md={6} className="mb-4">
                     <Card className="shadow-sm h-100 market-card">
                        <Card.Body>
                            <Card.Title as="h5" className="mb-3 card-header-title"><FiEye className="me-2" />My Watchlist</Card.Title>
                             <p>Watchlist feature coming soon...</p>
                         </Card.Body>
                     </Card>
                 </Col>
             </Row>
            */}

        </Container>
    );
}

export default Market;