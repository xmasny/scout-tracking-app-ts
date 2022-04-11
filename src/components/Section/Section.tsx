import React from 'react';
import css from './Section.module.css';
import { useQuery } from '@apollo/client';
import {
  GetExpertskeOdborkyQuery,
  GetProgramOdborkyQuery,
} from '../../queries.graphql';
import { CircularProgress } from '@mui/material';
import { VekKat, ExpertskeOdborky, Program } from '../../models/entities';
import Subsection from './Subsection/Subsection';
import { VekKatEnum } from '../../models/enums/vek-kat.enum';
import { ProgKatEnum } from '../../models/enums/prog-kat.enum';
import {
  Accordion,
  Box,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

const { SKAUTI } = VekKatEnum;
const { ODBORKY } = ProgKatEnum;

const Section: React.FC<VekKat> = ({ name: vekKatName, id: vekKatId }) => {
  const { data: expertskeOdborkyData, loading: expertskeOdborkyLoading } =
    useQuery(GetExpertskeOdborkyQuery);

  const { data: programData, loading: programLoading } = useQuery(
    GetProgramOdborkyQuery,
    { variables: { programId: ODBORKY, vekovaKatId: vekKatId } }
  );

  if (expertskeOdborkyLoading || programLoading) {
    return (
      <Box className={css.spinner}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const subsections = () =>
    expertskeOdborkyData.expertskeOdborky.map(
      (subsection: ExpertskeOdborky) => {
        const expFiltered = programData.program.filter(
          (odborka: Program) => odborka.expertske_odborky?.id === subsection.id
        );

        return (
          <Subsection
            key={subsection.id}
            id={subsection.id}
            name={subsection.name}
            program={expFiltered}
          />
        );
      }
    );

  return (
    <Box className={css.section}>
      <Accordion expanded>
        <AccordionSummary>
          <Typography variant="h4">{vekKatName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {vekKatId === SKAUTI ? subsections() : <Typography></Typography>}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Section;
