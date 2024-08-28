import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes.js';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
