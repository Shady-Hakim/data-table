import { Container } from '@mui/system';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='App'>
      <Container maxWidth='xl'>
        <HomePage />
      </Container>
    </div>
  );
}

export default App;
