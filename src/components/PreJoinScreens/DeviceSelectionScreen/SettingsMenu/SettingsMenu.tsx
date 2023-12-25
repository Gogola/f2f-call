import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Theme, useMediaQuery, makeStyles } from '@material-ui/core';

import AboutDialog from '../../../AboutDialog/AboutDialog';
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog';
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog';
import SettingsIcon from '../../../../icons/SettingsIcon';
import { useAppState } from '../../../../state';

const useStyles = makeStyles((theme: Theme) => ({
  settingsButton: {
    margin: '1.8em 0 0',
    padding: '0',
    lineHeight: '1',
    paddingBottom: '13px',
    fontFamily: 'FiragoMedium',
  },
  firagoRegular: {
    fontFamily: "'FiragoRegular'",
  },
}));

export default function SettingsMenu({ mobileButtonClass }: { mobileButtonClass?: string }) {
  const { roomType } = useAppState();
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isMobile ? (
        <Button
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
          startIcon={<MoreIcon />}
          className={mobileButtonClass}
        >
          მეტის ნახვა
        </Button>
      ) : (
        <Button ref={anchorRef} onClick={() => setMenuOpen(true)} startIcon={<SettingsIcon />}>
          პარამეტრები
        </Button>
      )}
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => setAboutOpen(true)}>
          <Typography variant="body1">About</Typography>
        </MenuItem>
        <MenuItem onClick={() => setDeviceSettingsOpen(true)}>
          <Typography variant="body1">აუდიო და ვიდეო პარამეტრები</Typography>
        </MenuItem>
        {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem onClick={() => setConnectionSettingsOpen(true)}>
            <Typography variant="body1" className={classes.firagoRegular}>
              ინტერნეტ კავშირის პარამეტრები
            </Typography>
          </MenuItem>
        )}
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
      <ConnectionOptionsDialog
        open={connectionSettingsOpen}
        onClose={() => {
          setConnectionSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </>
  );
}
