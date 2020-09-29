import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from 'redux/rootReducer';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  explain: {
    whiteSpace: 'break-spaces',
  },
}));

const Story: React.FC = () => {
  const classes = useStyles();

  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );

  const story = useSelector((state: RootState) => {
    const storyArray = state.stories.payload.find(
      (object) => object[0] === currentStoryId,
    );
    if (storyArray) return storyArray[1];
    return null;
  });

  if (!story) return null;

  return (
    <div className={classes.container}>
      <Accordion square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" component="h2">
            {story.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explain}>{story.explain}</Typography>
        </AccordionDetails>
        {story.file ? <Divider /> : null}
        <AccordionActions>
          {
            // <Button size="small" color="primary">
            //   編集
            // </Button>
          }
          {story.file ? (
            <Button
              component="a"
              href="https://firebasestorage.googleapis.com/v0/b/storypoint-30de8.appspot.com/o/stories%2F115ebef8-4a45-453f-8fa8-463b795a4ee3%2Fpngtest.png?alt=media&token=0b0f80c6-ad3b-453b-8db9-a44b37c4036f"
              target="_blank"
              size="small"
              color="primary">
              添付資料
            </Button>
          ) : null}
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default Story;
