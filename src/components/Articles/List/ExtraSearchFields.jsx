import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { SelectField, TagsField } from '../../Forms';
import { optionShape } from '../../../shapes';

function ArticlesListExtraSearchFields({ majorId, majorOptions, categoryOptions }) {
  return (
    <Fragment>
      {!majorId &&
        <Field
          name="majorId"
          component={SelectField}
          label="Major"
          options={majorOptions}
        />
      }
      <Field
        name="categoryList"
        component={TagsField}
        mode="multiple"
        label={<FormattedMessage id="categories" />}
        options={categoryOptions}
      />
    </Fragment>
  );
}

ArticlesListExtraSearchFields.propTypes = {
  majorId: PropTypes.number,
  majorOptions: PropTypes.arrayOf(optionShape).isRequired,
  categoryOptions: PropTypes.arrayOf(optionShape).isRequired,
};

ArticlesListExtraSearchFields.defaultProps = {
  majorId: undefined,
};

export default ArticlesListExtraSearchFields;
