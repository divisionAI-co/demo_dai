import './App.css';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ship features with agents</h1>
      </header>
      <main>
        <section className="capabilities">
          <h2>Our Capabilities</h2>
          <div className="card">
            <h3>Multi-agent routing</h3>
            <p>Description for multi-agent routing.</p>
          </div>
          <div className="card">
            <h3>Human-in-the-loop</h3>
            <p>Description for human-in-the-loop.</p>
          </div>
        </section>
      </main>
      <footer className="App-footer">
        {currentYear} Powered by DAI
      </footer>
    </div>
  );
}

export default App;
