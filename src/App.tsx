import React, { useEffect, useState } from 'react';
import { styled, Theme } from '@material-ui/core/styles';

import MenuBar from './components/MenuBar/MenuBar';
import MobileTopMenuBar from './components/MobileTopMenuBar/MobileTopMenuBar';
import PreJoinScreens from './components/PreJoinScreens/PreJoinScreens';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import { useAppState } from './state';
import { useLocation, useParams } from 'react-router-dom';
import useVideoContext from './hooks/useVideoContext/useVideoContext';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr auto',
});

const Main = styled('main')(({ theme }: { theme: Theme }) => ({
  overflow: 'hidden',
  paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
  background: 'black',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px`, // Leave some space for the mobile header and footer
  },
}));

export default function App() {
  const roomState = useRoomState();
  const { error, setError } = useAppState();
  const [callStatus, setCallStatus] = useState(0);
  const { room } = useVideoContext();
  const { search } = useLocation();
  const [participantsStringState, setParticipantsStringState] = useState<string>('');

  useEffect(() => {
    checkRoom();
  }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  // @ts-ignore
  const roomName = useParams()['URLRoomName'];

  function checkRoom() {
    const token = query.get('token');

    axios
      .get('https://api.face2face.ge/api/video-call-info/' + token + '/' + roomName)
      .then((reason: AxiosResponse) => {
        setTimeout(function() {
          if (reason.status === 201) {
            setCallStatus(1);
            setParticipantsStringState(reason.data.customerName + ' 2 ' + reason.data.mentorName);
          }
        }, 2000);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          setCallStatus(2);
        }
      });
  }

  const errorMessage = {
    name: 'შეხვედრა არ არის აქტიური!',
    code: 200,
    message: 'შეხვედრა არ არის აქტიური!',
  };

  const waitingMessage = {
    name: 'იტვირთება...',
    code: 301,
    message: 'იტვირთება...',
  };

  const successRoom =
    roomState === 'disconnected' ? (
      <PreJoinScreens participantsString={participantsStringState} />
    ) : (
      <Main>
        <ReconnectingNotification />
        <MobileTopMenuBar />
        <Room />
        <MenuBar />
      </Main>
    );

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  return (
    <Container style={{ height }}>
      {callStatus == 1 ? (
        successRoom
      ) : (
        <ErrorDialog dismissError={() => setError(null)} error={callStatus == 0 ? waitingMessage : errorMessage} />
      )}
    </Container>
  );
}
