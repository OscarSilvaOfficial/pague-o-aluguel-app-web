import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ChakraProvider } from '@chakra-ui/react'

const root = document.getElementById('root');
const RootDOM = ReactDOM.createRoot(root!);

RootDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
