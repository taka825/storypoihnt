import firebase, { storage } from 'common/firebase/firebase';

const storyFilePath = 'stories';
const iconFilePath = 'icon';

export const putSotryFile = (
  storyId: string,
  file: File,
): Promise<firebase.storage.UploadTask> =>
  storage
    .ref()
    .child(`${storyFilePath}/${storyId}/${file.name}`)
    .put(file)
    .then((snapshot) => {
      return snapshot;
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getIconFileURL = (fileName: string): Promise<any> =>
  storage.ref(iconFilePath).child(fileName).getDownloadURL();
