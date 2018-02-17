import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Tabs } from 'antd';
import keyMirror from 'keymirror';
import MajorCard from './Card';
import Spinner from '../Spinner';
import { majorShape, locationShape } from '../../shapes';

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

const TAB_NAMES = keyMirror({
  disciplinaries: null, interdisciplinaries: null,
});

function renderMajors(majors) {
  return (
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
        />
      ))}
    </div>
  );
}

class Majors extends Component {
  static propTypes = {
    disciplinaryMajors: ImmutablePropTypes.listOf(majorShape).isRequired,
    interdisciplinaryMajors: ImmutablePropTypes.listOf(majorShape).isRequired,
    location: locationShape.isRequired,
    loadMajors: PropTypes.func.isRequired,
    changeMajorsTab: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  componentWillMount() {
    this.props.loadMajors();
  }

  getActiveTab() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    const activeTab = urlSearchParams.get('tab');
    return TAB_NAMES[activeTab] || TAB_NAMES.disciplinaries;
  }

  handleTabChange = (key) => {
    this.props.changeMajorsTab(key);
  }

  render() {
    const { disciplinaryMajors, interdisciplinaryMajors, intl: { formatMessage: t } } = this.props;

    if (!disciplinaryMajors.size && interdisciplinaryMajors.size) {
      return <Spinner />;
    }

    return (
      <Tabs defaultActiveKey={this.getActiveTab()} size="large" tabPosition="left" onChange={this.handleTabChange}>
        <TabPane key={TAB_NAMES.disciplinaries} tab={t({ id: 'majors.disciplinaries' })}>
          {renderMajors(disciplinaryMajors)}
        </TabPane>

        <TabPane key={TAB_NAMES.interdisciplinaries} tab={t({ id: 'majors.interdisciplinaries' })}>
          {renderMajors(interdisciplinaryMajors)}
        </TabPane>
      </Tabs>
    );
  }
}

export default Majors;
