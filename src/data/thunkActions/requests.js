import { StrictDict } from 'utils';

import { RequestKeys } from 'data/constants/requests';
import actions from 'data/actions';
import api from 'data/services/lms/api';
import * as module from './requests';

/**
 * Wrapper around a network request promise, that sends actions to the redux store to
 * track the state of that promise.
 * Tracks the promise by requestKey, and sends an action when it is started, succeeds, or
 * fails.  It also accepts onSuccess and onFailure methods to be called with the output
 * of failure or success of the promise.
 * @param {string} requestKey - request tracking identifier
 * @param {Promise} promise - api event promise
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const networkRequest = ({
  requestKey,
  promise,
  onSuccess,
  onFailure,
}) => (dispatch) => {
  dispatch(actions.requests.startRequest(requestKey));
  return promise.then((response) => {
    dispatch(actions.requests.completeRequest({ requestKey, response }));
    if (onSuccess) { onSuccess(response); }
  }).catch((error) => {
    dispatch(actions.requests.failRequest({ requestKey, error }));
    if (onFailure) { onFailure(error); }
  });
};

/**
 * Tracked initializeApp api method.
 * Tracked to the `initialize` request key.
 * @param {string} locationId - ora location id
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const initializeApp = ({ locationId, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    requestKey: RequestKeys.initialize,
    promise: api.initializeApp(locationId),
    ...rest,
  }));
};

/**
 * Tracked fetchSubmissionResponse api method.
 * Tracked either prefetchNext or prefetchPrev request key.
 * @param {string} submissionId - target submission id
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const fetchSubmissionResponse = ({ submissionId, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    promise: api.fetchSubmissionResponse(submissionId),
    ...rest,
  }));
};

/**
 * Tracked fetchSubmissionStatus api method.
 * Tracked to the `fetchSubmissinStatus` request key.
 * @param {string} submissionId - target submission id
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const fetchSubmissionStatus = ({ submissionId, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    requestKey: RequestKeys.fetchSubmissionStatus,
    promise: api.fetchSubmissionStatus(submissionId),
    ...rest,
  }));
};

/**
 * Tracked initializeApp api method.  tracked to the `initialize` request key.
 * @param {string} submissionId - target submission id
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const fetchSubmission = ({ submissionId, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    requestKey: RequestKeys.fetchSubmission,
    promise: api.fetchSubmission(submissionId),
    ...rest,
  }));
};

/**
 * Tracked initializeApp api method.  tracked to the `initialize` request key.
 * @param {string} submissionId - target submission id
 * @param {bool} value - requested lock value
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const setLock = ({ submissionId, value, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    requestKey: RequestKeys.setLock,
    promise: api.lockSubmission({ submissionId, value }),
    ...rest,
  }));
};

/**
 * Tracked initializeApp api method.  tracked to the `initialize` request key.
 * @param {string} submissionId - target submission id
 * @param {obj} gradeData - grade data object
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const submitGrade = ({ submissionId, gradeData, ...rest }) => (dispatch) => {
  dispatch(module.networkRequest({
    requestKey: RequestKeys.submitGrade,
    promise: api.updateGrade(submissionId, gradeData),
    ...rest,
  }));
};

export default StrictDict({
  fetchSubmission,
  fetchSubmissionResponse,
  fetchSubmissionStatus,
  setLock,
  submitGrade,
});
