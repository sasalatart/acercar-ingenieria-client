import React, { Component, Fragment } from 'react';
import { intlShape } from 'react-intl';
import { Divider } from 'antd';
import lowerFirst from 'lodash/lowerFirst';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';
import ActionBar from './ActionBar';
import EditIcon from '../../Icons/Edit';
import MainContent from './MainContent';
import CommentsSection from '../Section';
import ProfileAvatar from '../../Users/Profile/Avatar';
import MajorLink from '../../Majors/Major/Link';
import ArticleLink from '../../Articles/Article/Link';
import DiscussionLink from '../../Discussions/Discussion/Link';
import { commentShape } from '../../../shapes';
import collections from '../../../lib/collections';

const LINKABLE_COMMENTABLES = {
  major: 'Major',
  article: 'Article',
  discussion: 'Discussion',
};

const LINKS = {
  [LINKABLE_COMMENTABLES.major]: MajorLink,
  [LINKABLE_COMMENTABLES.article]: ArticleLink,
  [LINKABLE_COMMENTABLES.discussion]: DiscussionLink,
};

const styles = {
  wrapper: {
    display: 'flex',
  },
  avatar: {
    marginRight: '10px',
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

  renderSubtitle() {
    const { comment: { commentableType, commentableId }, intl: { formatMessage: t } } = this.props;
    const CommentableLink = LINKS[commentableType];
    if (!CommentableLink) return null;

    const translatedCommentable = commentableType === LINKABLE_COMMENTABLES.major
      ? commentableType
      : t({ id: lowerFirst(commentableType) });

    return (
      <SubTitle>
        <CommentableLink id={commentableId}>
          {t({ id: 'comments.goToCommentable' }, { commentable: translatedCommentable })}
        </CommentableLink>
      </SubTitle>
    );
  }

  render() {
    const { comment, intl: { formatMessage: t }, ...restProps } = this.props;
    const { editing } = this.state;

    return (
      <Fragment>
        <ActionBar comment={comment} {...restProps} />
        <Title>{t({ id: 'comment' })}</Title>
        {this.renderSubtitle()}

        <div style={styles.wrapper}>
          <ProfileAvatar user={comment.author} style={styles.avatar} />
          <MainContent
            comment={comment}
            editing={editing}
            onStopEditing={this.handleStopEditing}
          />
          {!editing && <EditIcon onClick={this.handleStartEditing} />}
        </div>

        <Divider />
        <CommentsSection
          baseResourceName={collections.comments}
          baseResourceId={comment.id}
          disabled={!comment.approvedCommentable}
          answersList
        />
      </Fragment>
    );
  }
}
