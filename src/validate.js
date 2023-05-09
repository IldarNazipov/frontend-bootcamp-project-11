import * as yup from 'yup';

const schema = yup.object().shape({
  website: yup.string().required().url(),
});

const validate = (field, watchedObject) => {
  const watchedState = watchedObject;
  return schema.validate({ website: field }, { abortEarly: false })
    .then((result) => {
      const feedLinks = watchedState.feeds.map((feed) => feed.feedLink);
      if (feedLinks.includes(result.website)) {
        watchedState.urlSubmitProcess.errorKey = 'alreadyExists';
        watchedState.urlSubmitProcess.state = 'invalid';
      } else {
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
};

export default validate;
