import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Tabs } from 'antd';
import MajorCard from './Card';
import Spinner from '../Spinner';
import { majorShape } from '../../shapes';
import { MAJORS_TAB_NAMES as TAB_NAMES } from '../../routes';

const { TabPane } = Tabs;

const styles = {
  majorsList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
  },
  majorCard: {
    margin: '15px 5px',
  },
};

class Majors extends Component {
  static propTypes = {
    disciplinaryMajors: ImmutablePropTypes.listOf(majorShape).isRequired,
    interdisciplinaryMajors: ImmutablePropTypes.listOf(majorShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
    goToMajor: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    activeTab: TAB_NAMES.disciplinaries,
  };

  componentWillMount() {
    this.props.loadMajors();
  }

  handleTabChange = (key) => {
    this.setState({ activeTab: key });
  }

  renderMajors = majors => (
    <div style={styles.majorsList}>
      {majors.map(({
        id, name, category, logo,
      }) => (
        <MajorCard
          key={id}
          name={name}
          category={category}
          logo={logo}
          style={styles.majorCard}
          onClick={() => this.props.goToMajor(id)}
        />
      ))}
    </div>
  )

  render() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    if (!disciplinaryMajors.size && interdisciplinaryMajors.size) {
      return <Spinner absolute />;
    }

    return (
      <Tabs
        activeKey={this.state.activeTab}
        size="large"
        tabPosition="left"
        onChange={this.handleTabChange}
      >
        <TabPane key={TAB_NAMES.disciplinaries} tab={t({ id: 'majors.disciplinaries' })}>
          {this.renderMajors(disciplinaryMajors)}
        </TabPane>

        <TabPane key={TAB_NAMES.interdisciplinaries} tab={t({ id: 'majors.interdisciplinaries' })}>
          {this.renderMajors(interdisciplinaryMajors)}
        </TabPane>
      </Tabs>
    );
  }
}

export default Majors;
