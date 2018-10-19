import _ from 'lodash';

export function parseErrors(response) {
  let errors = "";
  if (response.data.errors) {
    _.forEach(Object.keys(response.data.errors), (key) => {
      errors += _.get(response.data.errors, key, []) +  "\n";
    });
  } else if (response.data.error) {
    errors = response.data.error;
  }
  return errors;
}
