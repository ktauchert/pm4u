 import { Box } from '@mui/material';
import React from 'react'
import AddClientsModal from '../components/AddClientsModal'
import AddProjectModal from '../components/AddProjectModal';
import Clients from '../components/Clients';
import Projects from '../components/Projects'
 
export default function Home() {
  return (
      <>
      <Box>
          <AddClientsModal />
          <AddProjectModal />
      </Box>
          <Projects />
          <Clients />
      </>
  );
}
