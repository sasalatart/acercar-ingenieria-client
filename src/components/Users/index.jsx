import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Select } from 'antd';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import UsersList from '../../containers/Users/List';
import Spinner from '../Spinner';
import { majorShape } from '../../shapes';

const { Option, OptGroup } = Select;

const styles = {
  select: {
    minWidth: '400px',
  },
};

class Users extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    disciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    interdisciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
  }

  state = {
    searchFilter: { admins: false, majorId: undefined },
  };

  componentDidMount() {
    if (this.props.admin) {
      this.props.loadMajors();
    }
  }

  handleChange = (value) => {
    const searchFilter = {
      admins: value !== 'all',
      majorId: Number.isInteger(value) ? value : undefined,
    };

    this.setState(
      { searchFilter },
      () => this.props.addQueryToCurrentUri({ page: 1, ...searchFilter }),
    );
  };

  mapMajors = (majors) => {
    const { intl: { formatMessage: t } } = this.props;

    return majors.map(({ id, name }) =>
      <Option key={id} value={id}>{t({ id: 'admins.ofMajor' }, { majorName: name })}</Option>);
  }

  renderSelect() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    const disciplinaryMajorOptions = this.mapMajors(disciplinaryMajors);
    const interdisciplinaryMajorOptions = this.mapMajors(interdisciplinaryMajors);

    return (
      <Select defaultValue="all" style={styles.select} onChange={this.handleChange}>
        <Option value="all">{t({ id: 'users.all' })}</Option>
        <Option value="platformAdmins">{t({ id: 'admins.platform' })}</Option>
        <OptGroup label={t({ id: 'majors.disciplinaries' })}>
          {disciplinaryMajorOptions}
        </OptGroup>
        <OptGroup label={t({ id: 'majors.interdisciplinaries' })}>
          {interdisciplinaryMajorOptions}
        </OptGroup>
      </Select>
    );
  }

  render() {
    const {
      admin, majorId, loading, intl: { formatMessage: t },
    } = this.props;

    if (loading) {
      return <Spinner absolute />;
    }

    const { searchFilter } = this.state;
    const usersListParams = admin
      ? { ...searchFilter, majorId: searchFilter.majorId || majorId }
      : { majorId };

    return (
      <div>
        <ActionBar />
        <Title text={t({ id: 'users' })} />

        {admin && this.renderSelect()}
        <UsersList {...usersListParams} />
      </div>
    );
  }
}

export default Users;
