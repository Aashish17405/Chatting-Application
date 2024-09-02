import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SendMessage from './components/Send';
import Login from './components/Login';
function App() {

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
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
