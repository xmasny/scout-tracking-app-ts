import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import css from './ProgramInfoCategory.module.css';

type Props = {
  title: string;
  items: string[];
};

const ProgramInfoCategory: React.FC<Props> = ({ title, items }) => {
  const mapItems = items.map((item: string) => {
    return <li className={css.item}>{item}</li>;
  });

  return (
    <Accordion>
      <AccordionSummary className={css.title}>{title}</AccordionSummary>
      <AccordionDetails>
        <ul>{mapItems}</ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProgramInfoCategory;
