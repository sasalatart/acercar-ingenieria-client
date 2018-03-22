import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import UsersList from '../../containers/Users/List';
import DataPlaceholder from '../DataPlaceholder';
import { majorShape } from '../../shapes';

const { Option, OptGroup } = Select;

const styles = {
  select: {
    minWidth: '400px',
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

    if (isEmpty(disciplinaryMajors) && isEmpty(interdisciplinaryMajors)) {
      return <DataPlaceholder />;
    }

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
    const { intl: { formatMessage: t } } = this.props;
    const { searchFilter } = this.state;

    return (
      <div>
        <ActionBar />
        <Title text={t({ id: 'users' })} />

        {this.renderSelect()}
        <UsersList {...searchFilter} />
      </div>
    );
  }
}
