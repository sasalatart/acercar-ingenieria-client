import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import { Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import DataPlaceholder from '../../DataPlaceholder';
import ActionBar from '../../../containers/Discussions/Discussion/ActionBar';
import Title from '../../Layout/Title';
import TagList from '../../TagList';
import DateWithFormat from '../../DateWithFormat';
import RichText from '../../RichText';
import Attachments from '../../Attachments';
import Comments from '../../Comments';
import { discussionShape } from '../../../shapes';
import ROUTES from '../../../routes';

const styles = {
  author: {
    fontWeight: 'bold',
    fontSize: '1.25em',
    margin: '5px 0',
  },
  date: {
    fontWeight: 'bold',
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default class Discussion extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    discussion: discussionShape,
    loadDiscussion: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    discussion: undefined,
  }

  componentDidMount() {
    this.props.loadDiscussion();
  }

  renderAuthor() {
    const { discussion: { author }, intl: { formatMessage: t } } = this.props;

    const href = ROUTES.USER(author.id);
    const authorName = `${author.firstName} ${author.lastName}`;

    return (
      <p style={styles.author}>
        <span>{t({ id: 'submittedBy' })}</span>
        <Link to={href} href={href}>{authorName}</Link>
      </p>
    );
  }

  render() {
    const { loggedIn, loading, discussion } = this.props;

    const noData = !loading && !discussion;
    if (loading || noData) {
      return <DataPlaceholder noData={noData} absolute />;
    }

    return (
      <div>
        <ActionBar discussion={discussion} />
        <Title text={discussion.title} />

        {discussion.tagList.length > 0 &&
          <div style={styles.tagsContainer}>
            <TagList tags={discussion.tagList} />
          </div>
        }

        <Divider />

        {this.renderAuthor()}
        <DateWithFormat dateString={discussion.createdAt} style={styles.date} />

        <Divider />
        <RichText content={discussion.description} />

        {!isEmpty(discussion.attachments) &&
          <div>
            <Divider />
            <Attachments attachments={discussion.attachments} />
          </div>
        }

        {loggedIn &&
          <div>
            <Divider />
            <Comments baseResourceName="discussions" baseResourceId={discussion.id} />
          </div>
        }
      </div>
    );
  }
}
