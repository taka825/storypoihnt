import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import UserAvatar from 'common/icon/UserAvatar';
import Typography from '@material-ui/core/Typography';
import { Comment } from 'common/firebase/redux/commentsSlice';

export const drawerWidth = '24em';

interface Props {
  comment: Comment;
}

const useStyles = makeStyles(() => ({
  comment: {
    display: 'inline',
    width: '100%',
    overflowWrap: 'break-word',
    whiteSpace: 'break-spaces',
  },
}));

const CommentListItem: React.FC<Props> = ({ comment }) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar iconFileName={comment.user.photoUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={comment.user.displayName}
        secondary={
          <Typography
            component="span"
            variant="body2"
            className={classes.comment}
            color="textPrimary">
            {comment.comment}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CommentListItem;
