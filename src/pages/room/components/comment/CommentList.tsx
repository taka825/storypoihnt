import React, { useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import CommentListItem from 'pages/room/components/comment/CommentListItem';
import { RootState } from 'redux/rootReducer';
import { setComments, Comment } from 'common/firebase/redux/commentsSlice';
import { useStoryCommentsRef } from 'common/firebase/network/room';
import { QueryPrams } from 'pages/room/Room';

const CommentList: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams<QueryPrams>();
  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );
  const storyCommentsRef = useStoryCommentsRef(roomId);

  const comments: [string, Comment][] = useSelector((state: RootState) =>
    _.get(state, `comments.payload.${currentStoryId}`, []),
  );

  useEffect(() => {
    storyCommentsRef.on(
      'value',
      (childSnapshot: firebase.database.DataSnapshot) => {
        dispatch(setComments(childSnapshot.val()));
      },
    );
  }, [storyCommentsRef, dispatch]);

  return (
    <List>
      {comments.map((value, index) => (
        <CommentListItem key={index.toString()} comment={value[1]} />
      ))}
    </List>
  );
};

export default CommentList;
