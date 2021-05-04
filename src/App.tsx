import React from 'react';
import './App.css';
import { Container } from '@chakra-ui/react';

import { HomePage } from './pages';

function App() {
    return (
        <Container maxW="container.xl">
            <HomePage />
        </Container>
    );
}

export default App;
