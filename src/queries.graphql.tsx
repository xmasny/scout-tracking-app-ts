import gql from 'graphql-tag';

export const GetProgramOdborkyQuery = gql`
  query GetProgram($programId: Int!, $vekovaKatId: Int!) {
    program(program_id: $programId, vekova_kat_id: $vekovaKatId) {
      name
      expertske_odborky {
        id
        name
      }
    }
  }
`;

export const GetVekKatOdborkyQuery = gql`
  query GetVekKatOdborky {
    vekovaKat {
      id
      name
    }
  }
`;

export const GetExpertskeOdborkyQuery = gql`
  query GetExpertskeOdborky {
    expertskeOdborky {
      id
      name
    }
  }
`;
