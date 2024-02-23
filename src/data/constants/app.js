import { getConfig } from '@edx/frontend-platform';

export const routePath = () => `${getConfig().PUBLIC_PATH}:courseId`;
export const locationId = () => window.location.pathname.replace(getConfig().PUBLIC_PATH, '').split('/')[0];
export const specificSubmissionId = () => {
  const submissionUUID = window.location.pathname.replace(getConfig().PUBLIC_PATH, '').split('/')[1];
  if (submissionUUID === '') {
    return undefined;
  }
  const re = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!re.test(submissionUUID)) {
    return undefined;
  }
  return submissionUUID;
};
