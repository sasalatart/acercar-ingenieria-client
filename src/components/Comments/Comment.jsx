import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Button, Icon, Divider } from 'antd';
import { commentShape } from '../../shapes';
import LikeButton from '../../containers/LikeButton';
import DestroyButton from '../../containers/Comments/DestroyButton';
import NewForm from '../../containers/Comments/NewForm';
import EditForm from '../../containers/Comments/EditForm';
import ProfileAvatar from '../Profile/Avatar';
import DateWithFormat from '../DateWithFormat';
import ChildComments from './ChildComments';

const styles = {
  parentWrapper: {
    display: 'flex',
    marginTop: '33px',
  },
  childWrapper: {
    display: 'flex',
    marginTop: '20px',
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
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  cancelButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 24px 5px',
  },
  answerButton: {
    marginTop: '10px',
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

  handleStartEditing = () => this.setState({ editing: true });

  handleStopEditing = () => this.setState({ editing: false });

  handleStartAnswering = () => this.setState({ answering: true });

  handleStopAnswering = () => this.setState({ answering: false });

  renderMainContent() {
    if (this.state.editing) {
      return (
        <div style={styles.formWrapper}>
          <div style={styles.mainContent}>
            <EditForm comment={this.props.comment} onSubmitSuccess={this.handleStopEditing} />
          </div>
          {this.renderCancelButton(this.handleStopEditing)}
        </div>
      );
    }

    const { author, content, createdAt } = this.props.comment;
    return (
      <div style={styles.mainContent}>
        <p style={styles.metaData}>
          {author.firstName} {author.lastName}, <DateWithFormat dateString={createdAt} withTime />
        </p>
        <p style={styles.content}>{content}</p>
      </div>
    );
  }

  renderLikeButton() {
    const { id, likedByCurrentUser, likesCount } = this.props.comment;

    return (
      <LikeButton
        collectionName="comments"
        resourceId={id}
        likedByCurrentUser={likedByCurrentUser}
        likesCount={likesCount}
        iconOnly
      />
    );
  }

  renderEditButton() {
    return (
      <span>
        <Divider type="vertical" />
        <Icon type="edit" onClick={this.handleStartEditing} />
      </span>
    );
  }

  renderDestroyButton() {
    const { id, commentableType, commentableId } = this.props.comment;
    const buttonProps = { id, [`${commentableType.toLowerCase()}Id`]: commentableId };

    return (
      <span>
        <Divider type="vertical" />
        <DestroyButton {...buttonProps} iconOnly />
      </span>
    );
  }

  renderCancelButton(onClick) {
    const { intl: { formatMessage: t } } = this.props;

    return (
      <div style={styles.cancelButtonWrapper}>
        <Button icon="close" onClick={onClick}>
          {t({ id: 'forms.confirm.cancel' })}
        </Button>
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
    const { adminOrMajorAdmin, isAuthor } = this.props;

    return (
      <div>
        {this.renderLikeButton()}
        {isAuthor && this.renderEditButton()}
        {(adminOrMajorAdmin || isAuthor) && this.renderDestroyButton()}
      </div>
    );
  }

  renderAnswerForm() {
    const { id, commentableType, commentableId } = this.props.comment;

    const baseResourceName = `${commentableType.toLowerCase()}s`;

    return (
      <div style={styles.formWrapper}>
        <div style={styles.mainContent}>
          <NewForm
            parentCommentId={id}
            baseResourceName={baseResourceName}
            baseResourceId={commentableId}
            onSubmitSuccess={this.handleStopAnswering}
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
