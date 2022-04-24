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
import ActivityCard from '../ActivityCard/ActivityCard';

type Props = {
  id: number;
  name: string;
  program: Program[];
};

const Subsection: React.FC<Props> = ({ id: expId, name: expName, program }) => {
  //console.log(program);

  const programMapped = program.map((aktivita: Program) => {
    //console.log(aktivita);
    return <ActivityCard key={aktivita.id} program={aktivita} />;
  });

  return (
    <Box className={css.box}>
      <Accordion expanded>
        <AccordionSummary>
          <Typography variant="h5">{expName}</Typography>
        </AccordionSummary>
        <AccordionDetails className={css.subsection}>
          {programMapped}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Subsection;
