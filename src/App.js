import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizHomeComponent from './Components/QuizHomeComponent';
import QuizResultsComponent from './Components/QuizResultsComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHomeComponent />} />
        <Route path="/results" element={<QuizResultsComponent />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
