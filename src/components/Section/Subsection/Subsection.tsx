import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

import { Program } from '../../../models/entities';

import css from './Subsection.module.css';

type Props = {
  id: number;
  name: string;
  program: Program;
};

const Subsection: React.FC<Props> = ({ id: expId, name: expName, program }) => {
  console.log(program);
  return (
    <Box className={css.subsection}>
      <Accordion expanded>
        <AccordionSummary>
          <Typography variant="h5">{expName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Subsection;
