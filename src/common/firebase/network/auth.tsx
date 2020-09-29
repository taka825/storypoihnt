import firebase from 'common/firebase/firebase';

export const signInAnonymous = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInAnonymously();
};

export const setLocalPersistence = (): Promise<void> => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

export const signOut = (): Promise<void> => {
  return firebase.auth().signOut();
};

export const updateProfile = (
  currentUser: firebase.User | null,
  displayName?: string | undefined,
  photoURL?: string | undefined,
): Promise<void> => {
  if (currentUser === null) throw new Error('user object is null');
  return currentUser.updateProfile({
    displayName,
    photoURL,
  });
};
