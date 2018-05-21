import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, List } from 'antd';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import MajorItem from './Item';
import { majorShape } from '../../../shapes';
import { MAJORS_TAB_NAMES as TAB_NAMES } from '../../../routes';

const { TabPane } = Tabs;

export default class MajorsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    disciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    interdisciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    activeTab: TAB_NAMES.disciplinaries,
  };

  componentDidMount() {
    this.props.loadMajors();
  }

  handleTabChange = (key) => {
    this.setState({ activeTab: key });
  }

  renderMajors(majors) {
    const { loading } = this.props;

    return (
      <List
        itemLayout="horizontal"
        size="large"
        loading={loading}
        dataSource={majors}
        renderItem={major => <MajorItem major={major} />}
      />
    );
  }

  render() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    return (
      <Fragment>
        <ActionBar />
        <Title>Majors</Title>

        <Tabs activeKey={this.state.activeTab} size="large" onChange={this.handleTabChange}>
          <TabPane key={TAB_NAMES.disciplinaries} tab={t({ id: 'majors.disciplinaries' })}>
            {this.renderMajors(disciplinaryMajors)}
          </TabPane>

          <TabPane key={TAB_NAMES.interdisciplinaries} tab={t({ id: 'majors.interdisciplinaries' })}>
            {this.renderMajors(interdisciplinaryMajors)}
          </TabPane>
        </Tabs>
      </Fragment>
    );
  }
}
