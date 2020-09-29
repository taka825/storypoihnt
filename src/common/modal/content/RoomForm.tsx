import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { createRoom } from 'common/firebase/redux/createRoomSlice';
import { hideModal } from 'common/modal/redux/rootModalSlice';
import { RootState } from 'redux/rootReducer';

interface FormInput {
  roomName: string;
}

const RoomForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<FormInput>();

  const loading = useSelector((state: RootState) =>
    _.get(state, 'createRoom.loading'),
  );

  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = ({ roomName }: FormInput) => {
    if (loading) return;
    dispatch(
      createRoom({
        roomName,
        callback: (roomId) => {
          dispatch(hideModal());
          history.push(`/room/${roomId}`);
        },
      }),
    );
  };

  return (
    <Dialog open onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>ルーム名を入力してください。</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register({ required: true, minLength: 1, maxLength: 20 })}
            autoFocus
            margin="dense"
            id="roomName"
            name="roomName"
            label="ルーム名"
            type="text"
            fullWidth
            disabled={loading}
            error={Boolean(errors.roomName)}
            helperText={'20文字以内で入力してください。'}
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

export default RoomForm;
