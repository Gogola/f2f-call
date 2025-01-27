import React, { ChangeEvent, FormEvent } from 'react';
import { Typography, makeStyles, TextField, Grid, Button, InputLabel, Theme } from '@material-ui/core';
import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.5em 0 3.5em',
    '& div:not(:last-child)': {
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5em 0 2em',
    },
  },
  textFieldContainer: {
    width: '100%',
  },
  continueButton: {
    display: 'flex',
    height: 'fit-content',
    padding: '12px 16px 10px',
    lineHeight: '1',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  firagoMedium: {
    fontFamily: "'FiragoMedium'",
    fontFeatureSettings: "'case' on",
  },
  firagoRegular: {
    fontFamily: "'FiragoRegular'",
  },
}));

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ name, roomName, setName, setRoomName, handleSubmit }: RoomNameScreenProps) {
  const classes = useStyles();
  const { user } = useAppState();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

  return (
    <>
      <Typography variant="h5" className={[classes.gutterBottom, classes.firagoMedium].join(' ')}>
        შეხვედრის დაწყება
      </Typography>
      <Typography variant="body1" className={classes.firagoMedium}>
        {hasUsername ? 'შეიყვანეთ თქვენი სახელი' : 'შეიყვანეთ თქვენი სახელი'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name" className={classes.firagoRegular}>
                თქვენი სახელი
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                className={classes.firagoRegular}
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name" className={classes.firagoRegular}>
              ოთახის იდენტიფიკატორი
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              className={classes.firagoRegular}
              fullWidth
              disabled
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
        </div>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName}
            className={[classes.continueButton, classes.firagoMedium].join(' ')}
          >
            გაგრძელება
          </Button>
        </Grid>
      </form>
    </>
  );
}
