import './App.css';
import CharactersList from './components/CharactersList/CharactersList.tsx';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <CharactersList/>
      <Footer/>
    </div>
  );
}

export default App;
