import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Divider } from 'antd';
import Actions from '../../../../containers/Comments/List/Item/Actions';
import MainContent from '../../Comment/MainContent';
import AnswerForm from './AnswerForm';
import ProfileAvatar from '../../../Users/Profile/Avatar';
import ChildComments from './Children';
import { commentShape } from '../../../../shapes';

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
  avatar: {
    marginRight: '10px',
  },
  answerButton: {
    marginTop: '10px',
  },
};

class CommentItem extends Component {
  static propTypes = {
    comment: commentShape.isRequired,
    answeringDisabled: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    answeringDisabled: false,
  }

  state = { editing: false, answering: false };

  handleStartEditing = () => this.setState({ editing: true });

  handleStopEditing = () => this.setState({ editing: false });

  handleStartAnswering = () => this.setState({ answering: true });

  handleStopAnswering = () => this.setState({ answering: false });

  renderAnswerButton() {
    const { comment, answeringDisabled, intl: { formatMessage: t } } = this.props;

    if (answeringDisabled || comment.commentableType === 'Comment') {
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

  render() {
    const { comment, answeringDisabled } = this.props;
    const {
      id,
      author,
      commentableType,
      commentableId,
      childComments,
      extraComments,
    } = comment;

    const { editing, answering } = this.state;
    const isChild = commentableType === 'Comment';

    return (
      <div>
        <div style={(isChild && !answeringDisabled) ? styles.childWrapper : styles.parentWrapper}>
          <ProfileAvatar user={author} style={styles.avatar} />
          <MainContent
            comment={comment}
            editing={editing}
            onStopEditing={this.handleStopEditing}
          />
          {!editing && <Actions comment={comment} onStartEditing={this.handleStartEditing} />}
        </div>

        {childComments &&
          <ChildComments
            parentCommentId={id}
            parentCommentCommentableType={commentableType}
            parentCommentCommentableId={commentableId}
            comments={childComments}
            extraComments={extraComments}
          />
        }

        {answering
          ? <AnswerForm parentCommentId={comment.id} onStopAnswering={this.handleStopAnswering} />
          : this.renderAnswerButton()}

        {(!isChild || answeringDisabled) && <Divider />}
      </div>
    );
  }
}

export default injectIntl(CommentItem);
