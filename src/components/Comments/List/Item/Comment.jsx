import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Radium from 'radium';
import { Button, Divider } from 'antd';
import Actions from './Actions';
import MainContent from '../../Comment/MainContent';
import AnswerForm from './AnswerForm';
import ProfileAvatar from '../../../Users/Profile/Avatar';
import ChildComments from './Children';
import Hideable from '../../../Layout/Hideable';
import { commentShape } from '../../../../shapes';
import { breakpoints } from '../../../../theme';

const styles = {
  parentWrapper: {
    display: 'flex',
    marginTop: '33px',
  },
  childWrapper: {
    display: 'flex',
    marginTop: '25px',
    marginLeft: '66px',
    [breakpoints.sm]: {
      marginLeft: '33px',
    },
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
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
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
    const {
      comment: {
        approvedCommentable,
        commentableType,
      },
      answeringDisabled,
      intl: { formatMessage: t },
    } = this.props;

    if (answeringDisabled || !approvedCommentable || commentableType === 'Comment') {
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
    const {
      adminOrMajorAdmin,
      currentUserId,
      comment,
      comment: {
        id,
        author,
        commentableType,
        commentableId,
        childComments,
        extraComments,
      },
      answeringDisabled,
    } = this.props;

    const { editing, answering } = this.state;
    const isChild = commentableType === 'Comment';

    return (
      <Fragment>
        <div style={(isChild && !answeringDisabled) ? styles.childWrapper : styles.parentWrapper}>
          <Hideable>
            <ProfileAvatar user={author} style={styles.avatar} />
          </Hideable>

          <MainContent
            comment={comment}
            editing={editing}
            onStopEditing={this.handleStopEditing}
          />
          {!editing &&
            <Actions
              adminOrMajorAdmin={adminOrMajorAdmin}
              currentUserId={currentUserId}
              comment={comment}
              onStartEditing={this.handleStartEditing}
            />
          }
        </div>

        {childComments &&
          <ChildComments
            adminOrMajorAdmin={adminOrMajorAdmin}
            currentUserId={currentUserId}
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
      </Fragment>
    );
  }
}

export default injectIntl(Radium(CommentItem));
