import React, { Component, Fragment } from 'react';
import { intlShape } from 'react-intl';
import { Icon, Divider } from 'antd';
import MainContent from './MainContent';
import { commentShape } from '../../../shapes';
import ActionBar from '../../../containers/Comments/Comment/ActionBar';
import CommentsSection from '../Section';
import Title from '../../Layout/Title';
import ProfileAvatar from '../../Users/Profile/Avatar';

const styles = {
  wrapper: {
    display: 'flex',
  },
  avatar: {
    marginRight: '10px',
  },
  editButton: {
    cursor: 'pointer',
  },
};

export default class Comment extends Component {
  static propTypes = {
    comment: commentShape.isRequired,
    intl: intlShape.isRequired,
  };

  state = { editing: false };

  handleStartEditing = () => this.setState({ editing: true });

  handleStopEditing = () => this.setState({ editing: false });

  render() {
    const { comment, intl: { formatMessage: t } } = this.props;

    const { editing } = this.state;

    return (
      <Fragment>
        <ActionBar comment={comment} />
        <Title>{t({ id: 'comment' })}</Title>

        <div style={styles.wrapper}>
          <ProfileAvatar user={comment.author} style={styles.avatar} />
          <MainContent
            comment={comment}
            editing={editing}
            onStopEditing={this.handleStopEditing}
          />
          {!editing &&
            <Icon type="edit" onClick={this.handleStartEditing} style={styles.editButton} />}
        </div>

        <Divider />
        <CommentsSection
          baseResourceName="comments"
          baseResourceId={comment.id}
          disabled={!comment.approvedCommentable}
          reverseList
          answers
        />
      </Fragment>
    );
  }
}
