import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { createComment } from 'common/firebase/redux/createCommentSlice';
import { RootState } from 'redux/rootReducer';
import { QueryPrams } from 'pages/room/Room';

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.divider,
  },
  submitGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  submitButton: {
    height: 'fit-content',
  },
}));

interface FormInput {
  comment: string;
}

const CommentForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm<FormInput>();

  const { roomId } = useParams<QueryPrams>();
  const loading = useSelector((state: RootState) =>
    _.get(state, 'createStory.loading'),
  );

  const onSubmit = ({ comment }: FormInput) => {
    if (loading) return;

    dispatch(
      createComment({
        roomId,
        comment,
      }),
    );
    reset();
  };

  return (
    <Container className={classes.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              inputRef={register({
                required: true,
                minLength: 1,
                maxLength: 140,
              })}
              multiline
              id="comment"
              name="comment"
              rowsMax={3}
              placeholder="コメント"
              type="text"
              disabled={loading}
              error={Boolean(errors.comment)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} className={classes.submitGrid}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}>
              送信
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CommentForm;
