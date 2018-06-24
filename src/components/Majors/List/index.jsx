import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Tabs, Alert, List } from 'antd';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import MajorItem from './Item';
import { majorShape } from '../../../shapes';
import { MAJORS_TAB_NAMES as TAB_NAMES } from '../../../lib/routes';

const { TabPane } = Tabs;

const styles = {
  typeDefinition: {
    marginBottom: '25px',
  },
};

export default class MajorsList extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
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

  renderTypeDefinition(type) {
    const { formatMessage: t } = this.props.intl;

    return (
      <Alert
        description={t({ id: `majors.${type}.description` })}
        type="info"
        style={styles.typeDefinition}
        showIcon
      />
    );
  }

  renderMajors(majors) {
    return (
      <List
        itemLayout="horizontal"
        size="large"
        loading={this.props.loading}
        dataSource={majors}
        renderItem={major => <MajorItem admin={this.props.admin} major={major} />}
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
            {this.renderTypeDefinition(TAB_NAMES.disciplinaries)}
            {this.renderMajors(disciplinaryMajors)}
          </TabPane>

          <TabPane key={TAB_NAMES.interdisciplinaries} tab={t({ id: 'majors.interdisciplinaries' })}>
            {this.renderTypeDefinition(TAB_NAMES.interdisciplinaries)}
            {this.renderMajors(interdisciplinaryMajors)}
          </TabPane>
        </Tabs>
      </Fragment>
    );
  }
}
