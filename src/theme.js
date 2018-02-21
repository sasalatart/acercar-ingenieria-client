export const colors = {
  primaryLight: '#85C8FF',
  primaryDark: '#40A9FF',
  secondaryLight: '#FDFDFD',
  primaryTextLight: 'white',
  fieldPrefix: 'rgba(0, 0, 0, .25)',
};

export const measures = {
  paddingHorizontal: '75px',
};

export const themeStyles = {
  title: {
    fontSize: '3em',
    textAlign: 'center',
    marginBottom: '25px',
  },
  subTitle: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: '-25px',
    marginBottom: '25px',
  },
  innerLayout: {
    background: colors.secondaryLight,
    padding: '24px 0',
  },
  innerSider: {
    background: colors.secondaryLight,
    marginRight: '25px',
  },
  innerContent: {
    padding: '0 24px',
  },
};

export const breakpoints = {
  lg: '@media (max-width : 1400px)',
  bg: '@media (max-width : 1200px)',
  md: '@media (max-width : 992px)',
  sm: '@media (max-width : 768px)',
  xs: '@media (max-width : 480px)',
};
