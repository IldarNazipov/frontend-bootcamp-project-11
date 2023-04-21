/* eslint-disable no-param-reassign */
import * as yup from 'yup';

const schema = yup.object().shape({
  website: yup.string().required().url(),
});

const validate = (fields, watchedState) => schema.validate(fields, { abortEarly: false })
  .then((result) => {
    if (watchedState.urlSubmitProcess.urls.includes(result.website)) {
      watchedState.urlSubmitProcess.errorKey = 'alreadyExists';
      watchedState.urlSubmitProcess.state = 'invalid';
    } else {
      watchedState.urlSubmitProcess.urls.push(result.website);
      watchedState.urlSubmitProcess.state = 'valid';
    }
  })
  .catch((e) => {
    watchedState.urlSubmitProcess.state = 'invalid';
    if (e.message === 'website is a required field') {
      watchedState.urlSubmitProcess.errorKey = 'emptyInput';
    } else {
      watchedState.urlSubmitProcess.errorKey = 'invalidUrl';
    }
  });

export default validate;
