import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen'

function App() {
  return (
    <div>
      <Header/>
      <main className="text-center py-3">
        <Container>
        <HomeScreen/>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
