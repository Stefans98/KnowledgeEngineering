import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={MainLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
