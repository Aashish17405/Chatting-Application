import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SendMessage from './components/Send';
import Home from './components/Home';
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/send" element={<SendMessage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
