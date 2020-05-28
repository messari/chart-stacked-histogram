import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';

/**
 * Share chart button component `<ShareChart/>`
 *
 * Button to activate the share dialog in {@link DialogShare}
 *
 * @export
 * @class ShareChart
 * @extends {React.Component}
 */
export default class ShareChart extends React.Component {
  render() {
    return (
      <cq-share-button>
        <div stxtap="tap();">Share</div>
      </cq-share-button>
    );
  }
}
