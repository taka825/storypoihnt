import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { updateUser } from 'common/firebase/redux/authSlice';
import iconFiles from 'configs/iconFiles';
import { hideModal } from 'common/modal/redux/rootModalSlice';
import { useForm } from 'react-hook-form';
import { RootState } from 'redux/rootReducer';

interface FormInput {
  displayName: string;
}

const UserNameForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<FormInput>();

  const loading = useSelector((state: RootState) =>
    _.get(state, 'auth.loading'),
  );

  const onSubmit = ({ displayName }: FormInput) => {
    if (loading) return;
    const randomFileIndex = Math.floor(Math.random() * iconFiles.length);
    const icon = iconFiles[randomFileIndex];
    dispatch(
      updateUser({
        displayName,
        photoURL: icon,
        callback: () => {
          dispatch(hideModal());
        },
      }),
    );
  };

  return (
    <Dialog open disableBackdropClick disableEscapeKeyDown>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>ユーザーネームを入力してください。</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register({ required: true, minLength: 1, maxLength: 20 })}
            autoFocus
            margin="dense"
            id="displayName"
            name="displayName"
            label="ユーザーネーム"
            type="text"
            fullWidth
            disabled={loading}
            error={Boolean(errors.displayName)}
            helperText={'20文字以内で入力してください。'}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            決定
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserNameForm;
