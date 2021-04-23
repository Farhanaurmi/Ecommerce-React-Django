import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header/>
      <main className="text-center py-3">
        <Container>
        <h1>Hey!</h1>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
