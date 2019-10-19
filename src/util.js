import R from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export function getErrorProjection(err) {
  const { response } = err;

  if (response) {
    const desiredFields = ['status', 'statusText', 'data'];

    return R.pick(desiredFields, response);
  }

  return err;
}
