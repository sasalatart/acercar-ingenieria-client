import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Button, Icon, Divider } from 'antd';
import Linkify from 'react-linkify';
import lowerFirst from 'lodash/lowerFirst';
import { commentShape } from '../../../shapes';
import Form from '../../../containers/Comments/Form';
import LikeButton from '../../../containers/LikeButton';
import EnrollButton from '../../../containers/EnrollButton';
import DestroyButton from '../../../containers/DestroyButton';
import HideableButton from '../../HideableButton';
import ProfileAvatar from '../../Users/Profile/Avatar';
import DateWithFormat from '../../DateWithFormat';
import ChildComments from './ChildComments';
import ProfileLink from '../../Users/Profile/Link';
import { themeStyles } from '../../../theme';

const styles = {
  parentWrapper: {
    display: 'flex',
    marginTop: '33px',
  },
  childWrapper: {
    display: 'flex',
    marginTop: '25px',
    marginLeft: '66px',
  },
  formWrapper: {
    display: 'flex',
    width: '100%',
  },
  avatar: {
    marginRight: '10px',
  },
  mainContent: {
    flex: 1,
  },
  metaData: {
    margin: 0,
    fontWeight: 'bold',
  },
  content: {
    margin: '0 20px 0 0',
    ...themeStyles.justifiedTextContainer,
  },
  cancelButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 24px 5px',
  },
  answerButton: {
    marginTop: '10px',
  },
  editButton: {
    cursor: 'pointer',
  },
  childNode: {
    marginLeft: '66px',
  },
};

export default class Comment extends Component {
  static propTypes = {
    isAuthor: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    comment: commentShape.isRequired,
    intl: intlShape.isRequired,
  };

  state = { editing: false, answering: false };

  getBaseResourceName() {
    return `${lowerFirst(this.props.comment.commentableType)}s`;
  }

  handleStartEditing = () => this.setState({ editing: true });

  handleStopEditing = () => this.setState({ editing: false });

  handleStartAnswering = () => this.setState({ answering: true });

  handleStopAnswering = () => this.setState({ answering: false });

  renderMainContent() {
    if (this.state.editing) {
      const { comment } = this.props;

      return (
        <div style={styles.formWrapper}>
          <div style={styles.mainContent}>
            <Form
              baseResourceName={this.getBaseResourceName()}
              baseResourceId={comment.commentableId}
              comment={comment}
              onSubmitSuccess={this.handleStopEditing}
              autoFocus
            />
          </div>
          {this.renderCancelButton(this.handleStopEditing)}
        </div>
      );
    }

    const { author, content, createdAt } = this.props.comment;
    return (
      <div style={styles.mainContent}>
        <p style={styles.metaData}>
          <ProfileLink id={author.id}>{author.firstName} {author.lastName}</ProfileLink>{', '}
          <DateWithFormat dateString={createdAt} withTime />
        </p>
        <Linkify>
          <p style={styles.content}>{content}</p>
        </Linkify>
      </div>
    );
  }

  renderLikeButton() {
    const { id, likedByCurrentUser, likesCount } = this.props.comment;

    return (
      <LikeButton
        collection="comments"
        id={id}
        likedByCurrentUser={likedByCurrentUser}
        likesCount={likesCount}
        iconOnly
      />
    );
  }

  renderEnrollButton() {
    const { id, enrolledByCurrentUser } = this.props.comment;

    return (
      <span>
        <Divider type="vertical" />
        <EnrollButton
          collection="comments"
          id={id}
          enrolledByCurrentUser={enrolledByCurrentUser}
          iconOnly
        />
      </span>
    );
  }

  renderEditButton() {
    return (
      <span>
        <Divider type="vertical" />
        <Icon type="edit" onClick={this.handleStartEditing} style={styles.editButton} />
      </span>
    );
  }

  renderDestroyButton() {
    const { id, commentableId, parentCommentId } = this.props.comment;

    return (
      <span>
        <Divider type="vertical" />
        <DestroyButton
          collection="comments"
          id={id}
          baseResourceName={this.getBaseResourceName()}
          baseResourceId={commentableId}
          parentCommentId={parentCommentId}
          iconOnly
        />
      </span>
    );
  }

  renderCancelButton(onClick) {
    const { intl: { formatMessage: t } } = this.props;

    return (
      <div style={styles.cancelButtonWrapper}>
        <HideableButton icon="close" onClick={onClick}>
          {t({ id: 'forms.confirm.cancel' })}
        </HideableButton>
      </div>
    );
  }

  renderAnswerButton() {
    const { comment, intl: { formatMessage: t } } = this.props;

    if (comment.parentCommentId) {
      return null;
    }

    return (
      <Button
        type="primary"
        icon="message"
        size="small"
        onClick={this.handleStartAnswering}
        style={styles.answerButton}
        ghost
      >
        {t({ id: 'comments.answer' })}
      </Button>
    );
  }

  renderActions() {
    const { adminOrMajorAdmin, isAuthor, comment: { parentCommentId } } = this.props;

    return (
      <div>
        {this.renderLikeButton()}
        {!parentCommentId && this.renderEnrollButton()}
        {isAuthor && this.renderEditButton()}
        {(adminOrMajorAdmin || isAuthor) && this.renderDestroyButton()}
      </div>
    );
  }

  renderAnswerForm() {
    const { id, commentableId } = this.props.comment;

    return (
      <div style={styles.formWrapper}>
        <div style={styles.mainContent}>
          <Form
            parentCommentId={id}
            baseResourceName={this.getBaseResourceName()}
            baseResourceId={commentableId}
            onSubmitSuccess={this.handleStopAnswering}
            autoFocus
          />
        </div>
        {this.renderCancelButton(this.handleStopAnswering)}
      </div>
    );
  }

  render() {
    const { author, parentCommentId, childComments } = this.props.comment;
    const { editing, answering } = this.state;

    return (
      <div>
        <div style={parentCommentId ? styles.childWrapper : styles.parentWrapper}>
          <ProfileAvatar user={author} style={styles.avatar} />
          {this.renderMainContent()}
          {!editing && this.renderActions()}
        </div>

        {childComments && <ChildComments comments={childComments} />}

        {answering ? this.renderAnswerForm() : this.renderAnswerButton()}

        {!parentCommentId && <Divider />}
      </div>
    );
  }
}
