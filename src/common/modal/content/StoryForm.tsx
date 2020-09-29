import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FileInput from 'common/input/FileInput';

import { createStory } from 'common/firebase/redux/createStorySlice';
import { setCuurentStoryId } from 'common/firebase/redux/storiesSlice';
import { hideModal } from 'common/modal/redux/rootModalSlice';
import { RootState } from 'redux/rootReducer';

interface FormInput {
  title: string;
  explain: string;
}

const StoryForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<FormInput>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roomId = useSelector((state: RootState) =>
    _.get(state, 'rootModal.props.roomId'),
  );
  const loading = useSelector((state: RootState) =>
    _.get(state, 'createStory.loading'),
  );

  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = ({ title, explain }: FormInput) => {
    if (loading) return;

    let file;
    if (fileInputRef.current?.files) {
      file = fileInputRef.current?.files[0];
    }

    dispatch(
      createStory({
        roomId,
        title,
        explain,
        file,
        callback: (storyId) => {
          dispatch(setCuurentStoryId({ storyId }));
        },
      }),
    );
  };

  return (
    <Dialog open onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>ストーリーを入力してください。</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register({ required: true, minLength: 1, maxLength: 20 })}
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="タイトル"
            type="text"
            fullWidth
            disabled={loading}
            error={Boolean(errors.title)}
            helperText={'20文字以内で入力してください。'}
          />
          <TextField
            inputRef={register({
              required: true,
              minLength: 1,
              maxLength: 500,
            })}
            autoFocus
            margin="dense"
            id="explain"
            name="explain"
            label="説明"
            type="text"
            fullWidth
            multiline
            disabled={loading}
            error={Boolean(errors.explain)}
            helperText={'500文字以内で入力してください。'}
          />
          <FileInput
            inputRef={fileInputRef}
            name="file"
            accept=".png,.jpeg,.jpg,.pdf,.pptx,.key"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            キャンセル
          </Button>
          <Button type="submit" color="primary">
            登録
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StoryForm;
