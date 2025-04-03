import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../styles/Market.css";

const Market = () => {
  return (
    <Container fluid className="py-4 market-container">
      <h2 className="text-center mb-4 market-title">Market Overview</h2>
      <p className="text-center market-subtitle">Stay ahead with real-time market insights, news, and research tools.</p>
      
      <Row className="mb-3">
        <Col md={4}>
          <Card className="h-100 shadow-lg market-card">
            <Card.Body>
              <Card.Title className="market-card-title">Live Market Data</Card.Title>
              <Card.Text className="market-card-text">
                Get real-time updates on indices, trending stocks, and price movements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-lg market-card">
            <Card.Body>
              <Card.Title className="market-card-title">Market News</Card.Title>
              <Card.Text className="market-card-text">
                Stay informed with expert analysis, financial reports, and breaking news.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-lg market-card">
            <Card.Body>
              <Card.Title className="market-card-title">Stock Insights</Card.Title>
              <Card.Text className="market-card-text">
                Analyze stock performance with interactive tools and research data.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Card className="shadow-lg market-card">
            <Card.Body>
              <Card.Title className="market-card-title">Investment Strategies</Card.Title>
              <Card.Text className="market-card-text">
                Discover market trends and optimize your portfolio with AI-driven insights.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg market-card">
            <Card.Body>
              <Card.Title className="market-card-title">Trading Opportunities</Card.Title>
              <Card.Text className="market-card-text">
                Identify potential trades with our real-time screening and analytics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Market;
