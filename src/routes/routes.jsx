import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from '../Paginas/Cadastro';
import Home from '../Paginas/Home';

export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    </Router>
);