import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SendMessage from './components/Send';
import Login from './components/Login';
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/send" element={<SendMessage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
