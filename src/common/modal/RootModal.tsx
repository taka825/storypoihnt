import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import RoomForm from 'common/modal/content/RoomForm';
import UserNameForm from 'common/modal/content/UserNameForm';
import SelectPointForm from 'common/modal/content/SelectPointForm';
import StoryForm from 'common/modal/content/StoryForm';
import { RootState } from 'redux/rootReducer';
import ModalType from 'common/modal/config/ModalType';

const RootModal: React.FC = () => {
  const show = useSelector((state: RootState) =>
    _.get(state, 'rootModal.show'),
  );
  const type = useSelector((state: RootState) =>
    _.get(state, 'rootModal.type'),
  );

  if (!show) return null;

  switch (type) {
    case ModalType.CreateRoom:
      return <RoomForm />;
    case ModalType.RegistName:
      return <UserNameForm />;
    case ModalType.SelectPoint:
      return <SelectPointForm />;
    case ModalType.CreateStory:
      return <StoryForm />;
    default:
      return null;
  }
};

export default RootModal;
