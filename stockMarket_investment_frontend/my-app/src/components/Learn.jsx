import React, { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineModeComment } from "react-icons/md";
import "../styles/Learn.css";

const topics = [
  "Trading", "NSE", "BSE", "Cryptocurrency", "Bitcoin", "Ethereum", "Mutual Funds", 
  "Fundamental Analysis", "Technical Analysis", "Stock Market Basics", "Candlestick Trading", 
  "Day Trading", "Swing Trading", "Financial Markets", "Algo Trading", "Web3 Investing",
  "Options Trading", "Futures Trading", "Bonds", "ETFs", "IPO", "Financial Planning",
  "Risk Management", "Portfolio Diversification", "Inflation", "Interest Rates"
];

const articles = {
  "Bitcoin": {
    title: "Understanding Bitcoin: A Decentralized Digital Currency",
    content: "Bitcoin is a decentralized digital currency without a central bank or single administrator that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin was invented by an unknown person or group of people under the name Satoshi Nakamoto and released as open-source software in 2009. Its creation and transfer are based on an open-source cryptographic protocol and is independent of any central authority.",
    link: "https://example.com/bitcoin"
  },
  "Ethereum": {
      title: "Ethereum: Smart Contracts and Decentralized Applications",
      content: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. It is the most actively used blockchain. Ethereum's cryptocurrency, Ether (ETH), is second only to Bitcoin in market capitalization. Ethereum allows anyone to deploy permanent and immutable decentralized applications onto it, with which users can interact.",
      link: "https://example.com/ethereum"
  },
  "Mutual Funds": {
    title: "How Mutual Funds Work: Diversifying Your Investments",
    content: "Mutual funds pool money from many investors to purchase securities. The fund manager selects investments based on the fund's objective. This diversification helps to reduce risk. Mutual funds offer a way to invest in a variety of stocks, bonds, or other assets without needing a large amount of capital. They are managed by professionals who make investment decisions on behalf of the fund's investors.",
    link: "https://example.com/mutual-funds"
  },
    "Fundamental Analysis":{
        title: "Fundamental Analysis: Evaluating Company Value",
        content: "Fundamental analysis involves evaluating a company's financial statements, industry trends, and economic conditions to determine its intrinsic value. It aims to identify undervalued or overvalued stocks. Key metrics include earnings per share (EPS), price-to-earnings ratio (P/E), and debt-to-equity ratio.",
        link: "https://example.com/fundamental-analysis"
    },
    "Technical Analysis":{
        title: "Technical Analysis: Chart Patterns and Trends",
        content:"Technical analysis studies historical price and volume data to predict future price movements. It utilizes charts, patterns, and indicators to identify trends and potential entry/exit points. Common tools include moving averages, relative strength index (RSI), and Fibonacci retracements.",
        link: "https://example.com/technical-analysis"
    },
    "Stock Market Basics":{
        title: "Stock Market Basics: Understanding Stocks and Shares",
        content: "The stock market is where shares of publicly traded companies are bought and sold. Stocks represent ownership in a company. Understanding concepts like market capitalization, dividends, and trading volume is crucial for beginners.",
        link: "https://example.com/stock-market-basics"
    },
    "Candlestick Trading":{
        title: "Candlestick Trading: Decoding Price Action",
        content: "Candlestick charts represent price movements over a specific time period. Each candlestick provides information about the open, high, low, and close prices. Patterns like doji, hammer, and engulfing patterns can signal potential reversals or continuations.",
        link: "https://example.com/candlestick-trading"
    },
    "Day Trading":{
        title: "Day Trading: Short-Term Trading Strategies",
        content: "Day trading involves buying and selling securities within the same trading day. It requires quick decision-making, discipline, and a thorough understanding of market dynamics. Day traders often use technical analysis and leverage to maximize profits.",
        link: "https://example.com/day-trading"
    },
    "Swing Trading":{
        title: "Swing Trading: Capturing Short-Term Price Swings",
        content: "Swing trading aims to capture short-term price swings that last a few days to a few weeks. It involves identifying trends and entering/exiting positions based on technical indicators and price patterns. Swing traders hold positions for longer than day traders but shorter than long-term investors.",
        link: "https://example.com/swing-trading"
    },
    "Financial Markets":{
        title: "Financial Markets: Overview and Functions",
        content: "Financial markets facilitate the buying and selling of financial instruments like stocks, bonds, and currencies. They play a crucial role in allocating capital and determining asset prices. Understanding the different types of financial markets, such as money markets and capital markets, is essential.",
        link: "https://example.com/financial-markets"
    },
    "Algo Trading":{
        title: "Algo Trading: Automated Trading Strategies",
        content: "Algorithmic trading uses computer programs to execute trades based on predefined rules and parameters. It allows for high-frequency trading and the implementation of complex trading strategies. Algo trading can automate trading decisions and reduce human error.",
        link: "https://example.com/algo-trading"
    },
    "Web3 Investing":{
        title: "Web3 Investing: Exploring Decentralized Technologies",
        content: "Web3 investing focuses on projects and technologies built on decentralized networks, such as blockchain. It includes investments in cryptocurrencies, decentralized finance (DeFi), and non-fungible tokens (NFTs). Understanding the underlying technologies and risks is crucial for Web3 investing.",
        link: "https://example.com/web3-investing"
    },
    "Options Trading":{
        title: "Options Trading: Leverage and Hedging",
        content: "Options trading involves buying and selling contracts that give the holder the right, but not the obligation, to buy or sell an asset at a specific price within a specific time. Options can be used for leverage, hedging, and generating income.",
        link: "https://example.com/options-trading"
    },
    "Futures Trading":{
        title: "Futures Trading: Contracts for Future Delivery",
        content: "Futures trading involves buying and selling standardized contracts that obligate the holder to buy or sell an asset at a predetermined price and date. Futures are commonly used for commodities, currencies, and financial indices.",
        link: "https://example.com/futures-trading"
    },
    "Bonds":{
        title: "Bonds: Fixed Income Investments",
        content: "Bonds are debt securities issued by governments or corporations. They offer fixed interest payments and return the principal amount at maturity. Bonds are considered less risky than stocks and provide a stable income stream.",
        link: "https://example.com/bonds"
    },
    "ETFs":{
        title: "ETFs: Exchange-Traded Funds",
        content: "Exchange-traded funds (ETFs) are investment funds traded on stock exchanges, similar to stocks. They offer diversification and track an index, sector, or commodity. ETFs provide a cost-effective way to invest in a basket of assets.",
        link: "https://example.com/etfs"
    },
    "IPO":{
        title: "IPO: Initial Public Offerings",
        content: "An initial public offering (IPO) is the process of a private company offering its shares to the public for the first time. IPOs allow companies to raise capital and provide investors with the opportunity to invest in emerging companies.",
        link: "https://example.com/ipo"
    },
    "Financial Planning":{
        title: "Financial Planning: Setting Financial Goals",
        content: "Financial planning involves creating a comprehensive plan to achieve financial goals, such as retirement, education, or homeownership. It includes budgeting, investing, and risk management. A well-structured financial plan provides a roadmap for financial success.",
        link: "https://example.com/financial-planning"
    },
    "Risk Management":{
        title: "Risk Management: Protecting Your Investments",
        content: "Risk management involves identifying, assessing, and mitigating potential risks associated with investments. It includes diversification, hedging, and setting stop-loss orders. Effective risk management is crucial for preserving capital and minimizing losses.",
        link: "https://example.com/risk-management"
    },
    "Portfolio Diversification":{
        title: "Portfolio Diversification: Spreading Your Investments",
        content: "Portfolio diversification involves investing in a variety of asset classes to reduce risk. It aims to minimize the impact of any single investment on the overall portfolio. Diversification can be achieved by investing in stocks, bonds, real estate, and other assets.",
        link: "https://example.com/portfolio-diversification"
    },
    "Inflation":{
        title: "Inflation: Understanding Price Increases",
        content: "Inflation is the rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling. It is measured by the consumer price index (CPI). Understanding inflation is crucial for investors as it impacts investment returns and purchasing power.",
        link: "https://example.com/inflation"
    },
    "Interest Rates":{
        title: "Interest Rates: Impact on Investments",
        content: "Interest rates are the cost of borrowing money or the return on lending money. They are influenced by central banks and economic conditions. Interest rates impact investment decisions, borrowing costs, and economic growth.",
        link: "https://example.com/interest-rates"
    },
    "Trading":{
        title: "Introduction to Trading: Basics and Strategies",
        content: "Trading involves buying and selling financial instruments such as stocks, bonds, and cryptocurrencies. It requires understanding market dynamics, risk management, and trading strategies. Whether you're a beginner or an experienced trader, continuous learning is essential.",
        link: "https://example.com/trading"
    },
    "NSE":{
        title: "National Stock Exchange (NSE): India's Leading Exchange",
        content: "The National Stock Exchange of India (NSE) is the leading stock exchange in India. It provides a platform for trading equities, derivatives, and other financial instruments. Understanding the NSE indices like Nifty 50 is crucial for Indian market participants.",
        link: "https://example.com/nse"
    },
    "BSE":{
        title: "Bombay Stock Exchange (BSE): Asia's Oldest Exchange",
        content: "The Bombay Stock Exchange (BSE) is Asia's oldest stock exchange. It plays a significant role in the Indian financial markets. The BSE Sensex is a key benchmark index. Understanding the BSE's history and operations is important for Indian investors.",
        link: "https://example.com/bse"
    },
    "Cryptocurrency":{
        title: "Cryptocurrency: Digital Assets and Blockchain",
        content: "Cryptocurrencies are digital or virtual currencies that use cryptography for security. They operate on decentralized networks called blockchains. Understanding the technology, risks, and potential of cryptocurrencies is essential for investors.",
        link: "https://example.com/cryptocurrency"
    },
};


const Learn = () => {
  const [selectedTopic, setSelectedTopic] = useState("Bitcoin");
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);

  const questions = [
    { id: 1, question: "What does NSE stand for?", options: ["National Stock Exchange", "New Stock Entity", ], answer: "National Stock Exchange" },
    { id: 2, question: "What is a blue-chip stock?", options: ["High-risk, high-reward stock", "Stock from a well-established company"], answer: "Stock from a well-established company" },
    { id: 3, question: "Which index represents India's top 50 companies?", options: ["NIFTY 50", "SENSEX"], answer: "NIFTY 50" },
    { id: 4, question: "What is the main purpose of IPO?", options: ["Raise money by selling shares", "Buy back shares"], answer: "Raise money by selling shares" },
    { id: 5, question: "Who regulates the stock market in India?", options: ["RBI", "SEBI"], answer: "SEBI" }
  ];


  const handleSaveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes]);
      setNotes("");
    }
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) correct++;
    });
    setScore(correct);
  };

  const handleLike = (topic) => {
    setLikes({ ...likes, [topic]: !likes[topic] });
  };

  const handleComment = (topic, comment) => {
    if (!comment.trim()) return;
    setComments({
      ...comments,
      [topic]: [...(comments[topic] || []), comment],
    });
  };

  return (
    <div className="learn-container">
      <div className="learn-page">
        <aside className="sidebar">
          {topics.map((topic) => (
            <div key={topic} className="topic" onClick={() => setSelectedTopic(topic)}>
              {topic}
            </div>
          ))}
        </aside>
        <main className="content">
          <h2>{articles[selectedTopic]?.title}</h2>
          <p>{articles[selectedTopic]?.content}</p>
          <a href={articles[selectedTopic]?.link} target="_blank" rel="noopener noreferrer">Read More</a>
          <div className="actions">
            <button onClick={() => handleLike(selectedTopic)} className="like-btn">
              <FcLikePlaceholder color={likes[selectedTopic] ? "red" : "black"} /> Like
            </button>
            <button className="comment-btn">
              <MdOutlineModeComment /> Comment
            </button>
          </div>
          <div className="comments">
            {comments[selectedTopic]?.map((cmt, index) => (
              <p key={index}>{cmt}</p>
            ))}
          </div>
          <iframe width="400" height="200" src="https://www.youtube.com/embed/example" title="YouTube video"></iframe>
        </main>

        <aside className="right-section">
          <div className="icons-container">
            <button className="icon-btn" onClick={() => setNotesOpen(!notesOpen)}>
              <GrNotes />
            </button>
            <button className="icon-btn" onClick={() => setQuizOpen(!quizOpen)}>
              <MdQuiz />
            </button>
          </div>

          {notesOpen && (
            <div className="notes-section">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes..."
              ></textarea>
              <button onClick={handleSaveNote} className="save-btn">Save</button>
              <div className="saved-notes">
                {savedNotes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </div>
            </div>
          )}

          {quizOpen && (
            <div className="quiz-section">
              <h3>Stock Market Quiz</h3>
              <div className="quiz-question">
                <p>{questions[currentQuestion].question}</p>
                {questions[currentQuestion].options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`q${questions[currentQuestion].id}`}
                      value={opt}
                      onChange={() =>
                        setSelectedAnswers({ ...selectedAnswers, [questions[currentQuestion].id]: opt })
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <div className="quiz-controls">
                {currentQuestion > 0 && (
                  <button className="nav-btn" onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                    Previous
                  </button>
                )}
                {currentQuestion < questions.length - 1 ? (
                  <button className="nav-btn" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                    Next
                  </button>
                ) : (
                  <button className="submit-btn" onClick={handleQuizSubmit}>
                    Submit
                  </button>
                )}
              </div>

              {score !== null && (
                <p className="quiz-result">You scored {score} / {questions.length}</p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Learn;
