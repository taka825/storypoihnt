import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchStoryFile } from 'common/firebase/redux/storiesSlice';

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
  const dispatch = useDispatch();
  const [fileURL, setFileURL] = useState<string>('');

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

  useEffect(() => {
    console.log(story, fileURL);
    if (!story?.file) return;
    dispatch(
      fetchStoryFile({
        storyId: currentStoryId,
        fileName: story.file.name,
        callback: (url) => {
          setFileURL(url);
        },
      }),
    );
  }, [dispatch, currentStoryId, story]);

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
        {fileURL !== '' ? <Divider /> : null}
        <AccordionActions>
          {
            // <Button size="small" color="primary">
            //   編集
            // </Button>
          }
          {fileURL !== '' ? (
            <Button
              component="a"
              href={fileURL}
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
