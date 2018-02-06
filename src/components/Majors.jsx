import React from 'react';
import PropTypes from 'prop-types';

function Majors({ goToLanding }) {
  return (
    <div>
      <h1>Majors</h1>
      <button onClick={goToLanding}>Go to Landing</button>
    </div>
  );
}

Majors.propTypes = {
  goToLanding: PropTypes.func.isRequired,
};

export default Majors;
