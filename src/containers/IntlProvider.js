import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import messages from '../i18n/messages';
import { getLocale } from '../store/ducks/i18n';

addLocaleData([...es, ...en]);

function mapStateToProps(state) {
  const locale = getLocale(state);

  return {
    locale,
    messages: messages[locale],
  };
}

export default connect(mapStateToProps)(IntlProvider);
