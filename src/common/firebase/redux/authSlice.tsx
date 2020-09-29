import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface AuthState {
  success: boolean;
  loading: boolean;
  payload: firebase.auth.UserCredential | null;
  error: firebase.auth.Error | null;
}

interface UserState {
  success: boolean;
  loading: boolean;
  payload: firebase.User | null;
  error: firebase.auth.Error | null;
}

export interface UserUpdateAction {
  displayName: string | undefined;
  photoURL: string | undefined;
  callback?: () => void;
}

export interface FetchUserIconAction {
  fileName: string;
  callback: (url: string) => void;
}

const initialState: AuthState = {
  success: false,
  loading: true,
  payload: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchAnonymousUser: (state: AuthState) => {
      state.success = initialState.success;
      state.loading = true;
      state.payload = initialState.payload;
      state.error = initialState.error;
    },
    fetchAnonymousUserSuccess: (
      state: AuthState,
      action: PayloadAction<firebase.auth.UserCredential>,
    ) => {
      state.success = true;
      state.loading = false;
      state.payload = action.payload;
    },
    fetchAnonymousUserFailure: (
      state: AuthState,
      action: PayloadAction<firebase.auth.Error>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUser: (state: AuthState, action: PayloadAction<UserUpdateAction>) => {
      state.success = false;
      state.loading = true;
      state.error = initialState.error;
    },
    updateUserSuccess: (
      state: AuthState,
      action: PayloadAction<firebase.User | null>,
    ) => {
      if (state.payload) {
        state.success = true;
        state.loading = false;
        state.payload.user = action.payload;
      }
    },
    updateUserFailure: (
      state: AuthState,
      action: PayloadAction<firebase.auth.Error>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserSuccess: (state: AuthState) => {
      state.success = initialState.success;
      state.loading = initialState.loading;
      state.payload = initialState.payload;
      state.error = initialState.error;
    },
    signOutUserFailure: (
      state: AuthState,
      action: PayloadAction<firebase.auth.Error>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const signOutUser = createAction(`${authSlice.name}/signOutUser`);
export const fetchUserIcon = createAction(
  `${authSlice.name}/fetchUserIcon`,
  (action: FetchUserIconAction) => ({ payload: action }),
);
export const {
  fetchAnonymousUser,
  fetchAnonymousUserSuccess,
  fetchAnonymousUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
