import "./App.css";

function App() {
    return (
        <div className="App">
            <h1> Hola</h1>
            <p>{process.env.REACT_APP_SALUDOS}</p>
        </div>
    );
}

export default App;
