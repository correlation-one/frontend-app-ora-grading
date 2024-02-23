import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

export const TableAction = ({ tableInstance, handleClick, handleClickRef }) => (
  <Button
    onClick={handleClick(tableInstance.rows)}
    variant="primary"
    className="view-all-responses-btn"
    ref={handleClickRef}
  >
    <FormattedMessage {...messages.viewAllResponses} />
  </Button>
);

TableAction.defaultProps = {
  tableInstance: {
    rows: [],
  },
  handleClickRef: null,
};
TableAction.propTypes = {
  tableInstance: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.object),
  }),
  handleClick: PropTypes.func.isRequired,
  handleClickRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
export default TableAction;
