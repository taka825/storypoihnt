import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import { fetchUserIcon } from 'common/firebase/redux/authSlice';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  iconFileName: string;
}

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: '#eee',
  },
}));

const UserAvatar: React.FC<Props> = ({ iconFileName }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [iconURL, setIconURL] = useState<string>('');

  useEffect(() => {
    dispatch(
      fetchUserIcon({
        fileName: iconFileName,
        callback: (url) => {
          setIconURL(url);
        },
      }),
    );
  }, [dispatch, iconFileName]);

  return (
    <Avatar src={iconURL} className={classes.avatar}>
      {iconURL === '' ? <PersonIcon /> : null}
    </Avatar>
  );
};

export default UserAvatar;
