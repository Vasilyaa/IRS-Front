import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {StyledEngineProvider} from "@mui/material";
import './css/style.css'
import './css/bootstrap.css'
import HomePage from "./components/page/HomePage";

ReactDOM.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
          <HomePage/>
      </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
