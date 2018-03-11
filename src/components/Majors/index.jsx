import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Tabs, List } from 'antd';
import MajorsActionBar from './ActionBar';
import Title from '../Layout/Title';
import MajorItem from './Item';
import { majorShape } from '../../shapes';
import { MAJORS_TAB_NAMES as TAB_NAMES } from '../../routes';

const { TabPane } = Tabs;

class MajorsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    disciplinaryMajors: ImmutablePropTypes.setOf(majorShape).isRequired,
    interdisciplinaryMajors: ImmutablePropTypes.setOf(majorShape).isRequired,
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
        dataSource={majors.toJS()}
        renderItem={major => <MajorItem major={major} />}
      />
    );
  }

  render() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    return (
      <div>
        <MajorsActionBar />
        <Title text="Majors" />

        <Tabs activeKey={this.state.activeTab} size="large" onChange={this.handleTabChange}>
          <TabPane key={TAB_NAMES.disciplinaries} tab={t({ id: 'majors.disciplinaries' })}>
            {this.renderMajors(disciplinaryMajors)}
          </TabPane>

          <TabPane key={TAB_NAMES.interdisciplinaries} tab={t({ id: 'majors.interdisciplinaries' })}>
            {this.renderMajors(interdisciplinaryMajors)}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default MajorsList;
