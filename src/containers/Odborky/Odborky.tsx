import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';

const QUERY = gql`
  {
    program {
      ulohy {
        cislo_ulohy
        text_ulohy
        podulohy
      }
    }
  }
`;

const Odborky: React.FC = (props) => {
  const { data, loading, error } = useQuery(QUERY);

  console.log(data);

  return <div></div>;
};

export default Odborky;
