import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import UsersList from '../../containers/Users/List';
import Title from '../Layout/Title';
import DataPlaceholder from '../Layout/DataPlaceholder';
import ActionBar from './List/ActionBar';
import { majorShape } from '../../shapes';

const { Option, OptGroup } = Select;

const styles = {
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '-25px 0 25px 0',
  },
  select: {
    minWidth: '350px',
  },
};

export default class SearchUsers extends Component {
  static propTypes = {
    disciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    interdisciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    resetUsersPagination: PropTypes.func.isRequired,
    resetAdminsPagination: PropTypes.func.isRequired,
  }

  state = {
    searchFilter: { admins: false, majorId: undefined },
  };

  componentDidMount() {
    this.props.loadMajors();
  }

  handleResetPagination = () => {
    const { resetAdminsPagination, resetUsersPagination } = this.props;
    const { admins, majorId } = this.state.searchFilter;
    const resetPaginationFn = admins ? resetAdminsPagination : resetUsersPagination;
    return resetPaginationFn({ baseId: majorId });
  }

  handleChange = (value) => {
    const searchFilter = {
      admins: value !== 'all',
      majorId: Number.isInteger(value) ? value : undefined,
    };

    this.setState(
      { searchFilter },
      () => this.props.addQueryToCurrentUri({ page: 1, ...searchFilter }, true),
    );
  };

  mapMajors = majors => (
    majors.map(({ id, name }) => (
      <Option key={id} value={id}>
        <FormattedMessage id="admins.ofMajor" values={{ majorName: name }} />
      </Option>
    )))

  renderSelect() {
    const { disciplinaryMajors, interdisciplinaryMajors } = this.props;

    if (isEmpty(disciplinaryMajors) && isEmpty(interdisciplinaryMajors)) {
      return <DataPlaceholder />;
    }

    const disciplinaryMajorOptions = this.mapMajors(disciplinaryMajors);
    const interdisciplinaryMajorOptions = this.mapMajors(interdisciplinaryMajors);

    return (
      <div style={styles.selectContainer}>
        <Select defaultValue="all" style={styles.select} onChange={this.handleChange}>
          <Option value="all"><FormattedMessage id="users.all" /></Option>
          <Option value="platformAdmins"><FormattedMessage id="admins.platform" /></Option>
          <OptGroup key="disciplinaries" label={<FormattedMessage id="majors.disciplinaries" />}>
            {disciplinaryMajorOptions}
          </OptGroup>
          <OptGroup key="interdisciplinaries" label={<FormattedMessage id="majors.interdisciplinaries" />}>
            {interdisciplinaryMajorOptions}
          </OptGroup>
        </Select>
      </div>
    );
  }

  render() {
    const { searchFilter } = this.state;

    return (
      <Fragment>
        <ActionBar {...searchFilter} resetPagination={this.handleResetPagination} />
        <Title><FormattedMessage id="users" /></Title>

        {this.renderSelect()}
        <UsersList {...searchFilter} />
      </Fragment>
    );
  }
}
