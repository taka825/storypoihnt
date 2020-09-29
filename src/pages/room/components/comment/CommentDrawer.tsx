import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CommentList from 'pages/room/components/comment/CommentList';
import CommentForm from 'pages/room/components/comment/CommentForm';

export const drawerWidth = '24em';

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const CommentDrawer: React.FC = () => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <CommentList />
        <CommentForm />
      </div>
    </Drawer>
  );
};

export default CommentDrawer;
