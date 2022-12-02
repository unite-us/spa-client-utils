import _ from 'lodash';

export default function getStaticMapScheme(scheme) {
  const staticScheme = scheme.reduce((styleParams, { stylers = [], ...rest }) => {
    const flatScheme = _.assign({}, rest, ...stylers);

    const styleStrings = _.reduce(
      flatScheme, (styleString, val, key) => { // eslint-disable-line arrow-body-style
        styleString.push(`${key.replace(/type/gi, '')}:${val.replace(/#/g, '0x')}`);

        return styleString;
      }, []);

    styleParams.push(`style=${styleStrings.join('|')}`);

    return styleParams;
  }, []);

  return encodeURI(staticScheme.join('&'));
}
