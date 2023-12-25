import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button } from '@material-ui/core';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#088a3e',
      },
    },
  })
);

export default function EndCallButton(props: { className?: string }) {
  const classes = useStyles();
  const { room } = useVideoContext();

  function submit() {
    confirmAlert({
      title: 'დაადასტურეთ შეტყობინება!',
      message: 'გსურთ შეხვედრის დასრულება?',
      buttons: [
        {
          label: 'დიახ',
          onClick: () => room!.disconnect(),
        },
        {
          label: 'არა',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Button onClick={submit} className={clsx(classes.button, props.className)} data-cy-disconnect>
      გამორთვა
    </Button>
  );
}
