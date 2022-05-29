import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';

import css from './VytvorNovuOdborkuDialog.module.css';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetAllCategoriesQuery,
  AddNewOdborkaMutation,
} from '../../queries.graphql';
import { ProgKatEnum } from '../../models/enums/prog-kat.enum';

const { ODBORKY } = ProgKatEnum;

type Props = {
  open: boolean;
  handleClose: () => void;
};

type Categories = {
  vekovaKat: [
    {
      id: number;
      name: string;
    }
  ];
  expertskeOdborky: [
    {
      id: number;
      name: string;
    }
  ];
  programKat: [
    {
      id: number;
      name: string;
    }
  ];
  stupen: [
    {
      id: number;
      name: string;
    }
  ];
};

type NewOdborka = {
  program_kat: number;
  vekova_kat: string;
  name: string;
  photo: string;
  stupen: string | number;
  expertske_odborky: string | number;
};

const VytvorNovuOdborkuDialog: React.FC<Props> = ({ handleClose, open }) => {
  const { data, loading } = useQuery(GetAllCategoriesQuery);

  const [openUlohy, setOpenUlohy] = useState<boolean>(false);
  const handleOpenUlohy = () => setOpenUlohy(true);
  const handleCloseUlohy = () => setOpenUlohy(false);

  const [odborkaData, setOdborkaData] = useState<NewOdborka>({
    program_kat: ODBORKY,
    vekova_kat: null,
    name: null,
    photo: null,
    stupen: 0,
    expertske_odborky: 0,
  });

  const [addNewOdborkaMutation, { error }] = useMutation<NewOdborka>(
    AddNewOdborkaMutation
  );
  console.log(error);
  if (loading) return null;

  const { vekovaKat, expertskeOdborky, stupen }: Categories = data;

  const vekovaKatMapped = vekovaKat.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  const expertskeOdborkyMapped = expertskeOdborky.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  const stupenMapped = stupen.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  console.log(odborkaData);

  return (
    <Box>
      <Dialog open={open} closeAfterTransition fullWidth maxWidth="md">
        <DialogTitle>Vlož záladne informácie o odborke</DialogTitle>
        <DialogContent>
          <TextField
            className={css.textFields}
            required
            label="Názov odborky"
            variant="outlined"
            color="secondary"
            fullWidth
            value={odborkaData.name}
            onChange={(e) => {
              setOdborkaData({
                ...odborkaData,
                name: e.target.value,
              });
            }}
          />

          <Box className={css.textFields}>
            <TextField
              required
              className={css.select}
              select
              label="Veková kategória odborky"
              variant="outlined"
              color="secondary"
              fullWidth
              value={odborkaData.vekova_kat}
              onChange={(e) => {
                setOdborkaData({
                  ...odborkaData,
                  vekova_kat: e.target.value,
                });
              }}
            >
              {vekovaKatMapped}
            </TextField>
            <TextField
              className={css.select}
              select
              label="Stupeň odborky"
              variant="outlined"
              color="secondary"
              fullWidth
              value={odborkaData.stupen}
              onChange={(e) => {
                setOdborkaData({
                  ...odborkaData,
                  stupen: e.target.value,
                });
              }}
            >
              <MenuItem key={0} value={0}>
                Bez voľby
              </MenuItem>
              {stupenMapped}
            </TextField>
            <TextField
              select
              label="Kategória expertských odboriek"
              variant="outlined"
              color="secondary"
              fullWidth
              value={odborkaData.expertske_odborky}
              onChange={(e) => {
                setOdborkaData({
                  ...odborkaData,
                  expertske_odborky: e.target.value,
                });
              }}
            >
              <MenuItem key={0} value={0}>
                Bez voľby
              </MenuItem>
              {expertskeOdborkyMapped}
            </TextField>
          </Box>
          <TextField
            className={css.textFields}
            label="Obrázok odborky"
            variant="outlined"
            color="secondary"
            fullWidth
            value={odborkaData.photo}
            onChange={(e) => {
              setOdborkaData({
                ...odborkaData,
                photo: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              addNewOdborkaMutation({
                variables: {
                  programKat: odborkaData.program_kat,
                  vekovaKat: odborkaData.vekova_kat,
                  name: odborkaData.name,
                  photo: odborkaData.photo,
                  stupen: odborkaData.stupen,
                  expertskeOdborky: odborkaData.expertske_odborky,
                },
              });
            }}
            variant="contained"
            color="primary"
          >
            Ďalej
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Zrušiť
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VytvorNovuOdborkuDialog;
