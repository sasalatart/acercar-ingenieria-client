import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Tabs, Alert, List } from 'antd';
import Title from '../../Layout/Title';
import ActionBar from './ActionBar';
import MajorItem from './Item';
import { majorShape } from '../../../shapes';
import { MAJORS_TAB_NAMES as TAB_NAMES } from '../../../lib/routes';

const { TabPane } = Tabs;

const styles = {
  typeDefinition: {
    marginBottom: '25px',
  },
};

function renderTypeDefinition(type) {
  return (
    <Alert
      description={<FormattedMessage id={`majors.${type}.description`} />}
      type="info"
      style={styles.typeDefinition}
      showIcon
    />
  );
}

export default class MajorsList extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    disciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    interdisciplinaryMajors: PropTypes.arrayOf(majorShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
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
    const { disciplinaryMajors, interdisciplinaryMajors } = this.props;

    return (
      <Fragment>
        <ActionBar />
        <Title>Majors</Title>

        <Tabs activeKey={this.state.activeTab} size="large" onChange={this.handleTabChange}>
          <TabPane key={TAB_NAMES.disciplinaries} tab={<FormattedMessage id="majors.disciplinaries" />}>
            {renderTypeDefinition(TAB_NAMES.disciplinaries)}
            {this.renderMajors(disciplinaryMajors)}
          </TabPane>

          <TabPane key={TAB_NAMES.interdisciplinaries} tab={<FormattedMessage id="majors.interdisciplinaries" />}>
            {renderTypeDefinition(TAB_NAMES.interdisciplinaries)}
            {this.renderMajors(interdisciplinaryMajors)}
          </TabPane>
        </Tabs>
      </Fragment>
    );
  }
}
