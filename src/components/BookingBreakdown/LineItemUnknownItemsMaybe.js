/**
 * Renders non-reversal line items that are not listed in the
 * `LINE_ITEMS` array in util/types.js
 *
 * The line items are rendered so that the line item code is formatted to human
 * readable form and the line total is printed as price.
 *
 * If you require another kind of presentation for your line items, add them to
 * the `LINE_ITEMS` array in util/types.js and create a specific line item
 * component for them that can be used in the `BookingBreakdown` component.
 */
import React from 'react';
import { intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { humanizeLineItemCode } from '../../util/data';
import { LINE_ITEMS, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemUnknownItemsMaybe = props => {
  const { transaction, intl } = props;

  // resolve unknown non-reversal line items
  const items = transaction.attributes.lineItems.filter(
    item => LINE_ITEMS.indexOf(item.code) === -1 && !item.reversal
  );

  return items.length > 0 ? (
    <React.Fragment>
      {items.map((item, i) => {
        const label = humanizeLineItemCode(item.code);
        const formattedTotal = formatMoney(intl, item.lineTotal);
        return (
          <div key={`${i}-item.code`} className={css.lineItem}>
            <span className={css.itemLabel}>{label}</span>
            <span className={css.itemValue}>{formattedTotal}</span>
          </div>
        );
      })}
    </React.Fragment>
  ) : null;
};

LineItemUnknownItemsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnknownItemsMaybe;
