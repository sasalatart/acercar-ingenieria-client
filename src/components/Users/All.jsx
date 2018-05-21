import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../containers/Users/List/ActionBar';
import Title from '../Layout/Title';
import UsersList from '../../containers/Users/List';
import DataPlaceholder from '../DataPlaceholder';
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
    intl: intlShape.isRequired,
  }

  state = {
    searchFilter: { admins: false, majorId: undefined },
  };

  componentDidMount() {
    this.props.loadMajors();
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

  mapMajors = (majors) => {
    const { intl: { formatMessage: t } } = this.props;

    return majors.map(({ id, name }) =>
      <Option key={id} value={id}>{t({ id: 'admins.ofMajor' }, { majorName: name })}</Option>);
  }

  renderSelect() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    if (isEmpty(disciplinaryMajors) && isEmpty(interdisciplinaryMajors)) {
      return <DataPlaceholder />;
    }

    const disciplinaryMajorOptions = this.mapMajors(disciplinaryMajors);
    const interdisciplinaryMajorOptions = this.mapMajors(interdisciplinaryMajors);

    return (
      <div style={styles.selectContainer}>
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
      </div>
    );
  }

  render() {
    const { intl: { formatMessage: t } } = this.props;
    const { searchFilter } = this.state;

    return (
      <Fragment>
        <ActionBar {...searchFilter} />
        <Title>{t({ id: 'users' })}</Title>

        {this.renderSelect()}
        <UsersList {...searchFilter} />
      </Fragment>
    );
  }
}
