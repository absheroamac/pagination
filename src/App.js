import { Table } from "./Table";

function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
      }}
      className="App"
    >
      <h1>Employee Data Table</h1>
      <Table />
    </div>
  );
}

export default App;
