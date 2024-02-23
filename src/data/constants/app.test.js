import * as platform from '@edx/frontend-platform';
import * as constants from './app';

jest.unmock('./app');
const ORA_ID = 'block-v1:C1+C1-STYLE-TEST+2023_T4+type@openassessment+block@dd33a23b8dc5499b9e4956d11672945a';

jest.mock('@edx/frontend-platform', () => {
  const PUBLIC_PATH = '/test-public-path/';
  return {
    getConfig: () => ({ PUBLIC_PATH }),
    PUBLIC_PATH,
  };
});

describe('app constants', () => {
  test('route path draws from public path and adds courseId', () => {
    expect(constants.routePath()).toEqual(`${platform.PUBLIC_PATH}:courseId`);
  });
  test('locationId returns trimmed pathname', () => {
    const old = window.location;
    window.history.pushState({}, '', `${platform.PUBLIC_PATH}${ORA_ID}`);
    expect(constants.locationId()).toEqual(ORA_ID);
    window.location = old;
  });
  test('locationId returns trimmed pathname even with extra slashes', () => {
    const old = window.location;
    window.history.pushState({}, '', `${platform.PUBLIC_PATH}${ORA_ID}/someuuid`);
    expect(constants.locationId()).toEqual(ORA_ID);
    window.location = old;
  });
  test('specificSubmissionId returns the submission id from path', () => {
    const old = window.location;
    window.history.pushState({}, '', `${platform.PUBLIC_PATH}${ORA_ID}/0b9407b5-8ce3-41cf-9c4e-64216a6119d9`);
    expect(constants.specificSubmissionId()).toEqual('0b9407b5-8ce3-41cf-9c4e-64216a6119d9');
    window.location = old;
  });
  test('specificSubmissionId returns undefined for invalid uuid', () => {
    const old = window.location;
    window.history.pushState({}, '', `${platform.PUBLIC_PATH}${ORA_ID}/asd`);
    expect(constants.specificSubmissionId()).toEqual(undefined);
    window.location = old;
  });
  test('specificSubmissionId returns undefined for empty uuid', () => {
    const old = window.location;
    window.history.pushState({}, '', `${platform.PUBLIC_PATH}${ORA_ID}/`);
    expect(constants.specificSubmissionId()).toEqual(undefined);
    window.location = old;
  });
});
