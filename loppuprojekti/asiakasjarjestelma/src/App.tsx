import React from 'react';
import { useState, useEffect } from "react";
import { Client } from './types';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import clientService from './services/clientService';




const App = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/clients`)

    const fetchClientList = async () => {
      const clients = await clientService.getClients()
      setClients(clients)
      console.log(clients)
    }
    void fetchClientList()
  },[])

  return (
    <div className="App">
    <Router>
    <Typography variant="h3" style = {{marginBottom: "0.5em"}}>
      Asiakasjärjestelmä
    </Typography>
    <Button component={Link} to="/" variant='contained' color='primary'>
      Home
    </Button>
    <Container>
    </Container>
    </Router>

    </div>
  );
}

export default App;
