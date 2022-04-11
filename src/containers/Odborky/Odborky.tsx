import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Container } from '@mui/material';

import {
  GetVekKatOdborkyQuery,
  GetProgramOdborkyQuery,
} from '../../queries.graphql';
import { VekKat } from '../../models/entities';
import Section from '../../components/Section/Section';
import css from './Odborky.module.css';

const Odborky: React.FC = () => {
  const { data: vekKatData, loading: vekKatLoading } = useQuery(
    GetVekKatOdborkyQuery
  );

  if (vekKatLoading) {
    return (
      <Box className={css.spinner}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const sections = vekKatData.vekovaKat.map((section: VekKat) => {
    return <Section key={section.id} id={section.id} name={section.name} />;
  });

  return (
    <Box className={css.box}>
      <Container>{sections}</Container>
    </Box>
  );
};

export default Odborky;
