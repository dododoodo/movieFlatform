import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import All from './comp/All';
import { MyContextProvider } from './state';

function App() {
  return (
    <Router>
      <MyContextProvider>
        <All />
      </MyContextProvider>
    </Router>
  );
}

export default App;
