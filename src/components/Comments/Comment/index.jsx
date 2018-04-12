import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Icon, Divider } from 'antd';
import MainContent from './MainContent';
import { commentShape } from '../../../shapes';
import ActionBar from '../../../containers/Comments/Comment/ActionBar';
import CommentsSection from '../Section';
import Title from '../../Layout/Title';
import ProfileAvatar from '../../Users/Profile/Avatar';
import DataPlaceholder from '../../DataPlaceholder';

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
    loading: PropTypes.bool.isRequired,
    comment: commentShape,
    loadComment: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    comment: undefined,
  };

  state = { editing: false };

  componentDidMount() {
    this.props.loadComment();
  }

  handleStartEditing = () => this.setState({ editing: true });

  handleStopEditing = () => this.setState({ editing: false });

  render() {
    const { loading, comment, intl: { formatMessage: t } } = this.props;

    const noData = !loading && !comment;
    if (loading || noData) {
      return <DataPlaceholder noData={noData} absolute />;
    }

    const { editing } = this.state;

    return (
      <div>
        <ActionBar comment={comment} />
        <Title text={t({ id: 'comment' })} />

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
          reverseList
          answers
        />
      </div>
    );
  }
}
