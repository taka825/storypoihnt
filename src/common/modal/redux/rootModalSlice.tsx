import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModalType from 'common/modal/config/ModalType';

interface RootModalState {
  show: boolean;
  type: ModalType;
  props: CreateStoryProps | null;
}

interface CreateStoryProps {
  roomId: string;
}

interface ShowModalAction {
  type: ModalType;
  props?: CreateStoryProps;
}

const initialState: RootModalState = {
  show: false,
  type: ModalType.None,
  props: null,
};

const rootModalSlice = createSlice({
  name: 'rootModal',
  initialState,
  reducers: {
    showModal: (
      state: RootModalState,
      action: PayloadAction<ShowModalAction>,
    ) => {
      state.show = true;
      state.type = action.payload.type;
      if (action.payload?.props) {
        state.props = action.payload.props;
      }
    },
    hideModal: (state) => {
      state.show = false;
      state.type = ModalType.None;
      state.props = null;
    },
  },
});

export const { showModal, hideModal } = rootModalSlice.actions;

export default rootModalSlice.reducer;
