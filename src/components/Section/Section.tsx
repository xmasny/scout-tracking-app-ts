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
import ActivityCard from './ActivityCard/ActivityCard';
import { collect } from 'collect.js';

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
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const collection = collect(programData.program);
  const program = collection.groupBy('name').toArray();

  const subsections = () =>
    expertskeOdborkyData.expertskeOdborky.map(
      (subsection: ExpertskeOdborky) => {
        const expFiltered = program.filter(
          (odborka: any) =>
            odborka.items[0].expertske_odborky.id === subsection.id
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

  const programMapped = program.map((aktivita: any) => {
    return <ActivityCard key={aktivita.id} program={aktivita.items} />;
  });

  return (
    <Box className={css.box}>
      <Accordion expanded>
        <AccordionSummary>
          <Typography variant="h4">{vekKatName}</Typography>
        </AccordionSummary>
        <AccordionDetails
          className={vekKatId === SKAUTI ? null : css.sectionOther}
        >
          {vekKatId === SKAUTI ? subsections() : programMapped}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Section;
