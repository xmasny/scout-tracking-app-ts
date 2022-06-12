import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

import css from './Subsection.module.css';
import ActivityCard from '../ActivityCard/ActivityCard';
import 'core-js/actual/array/group-by-to-map';

type Props = {
  id: number;
  name: string;
  program: any;
};

const Subsection: React.FC<Props> = ({ id: expId, name: expName, program }) => {
  const programMapped = program.map((aktivita: any) => {
    return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
  });

  return (
    <Box className={css.box}>
      {program.length !== 0 && (
        <Accordion expanded>
          <AccordionSummary>
            <Typography variant="h5">{expName}</Typography>
          </AccordionSummary>
          <AccordionDetails className={css.subsection}>
            {programMapped}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default Subsection;
