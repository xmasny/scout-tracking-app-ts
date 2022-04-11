import gql from 'graphql-tag';

export const GetProgramOdborkyQuery = gql`
  query GetProgram($programId: Int!, $vekovaKatId: Int!) {
    program(program_id: $programId, vekova_kat_id: $vekovaKatId) {
      id
      vekova_kat {
        id
      }
      name
      photo
      ulohy {
        uloha_id
        text_ulohy
        potrebny_pocet_poduloh
        podulohy
      }
      stupen {
        id
        name
      }
      expertske_odborky {
        id
      }
      info
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
