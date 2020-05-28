import React from 'react';

import { ChartContext } from '../../context/ChartContext';

/**
 * Chart menu component `<MenuEvents>`
 *
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 *
 * Dropdown menu of event marker display settings
 *
 * @export
 * @class MenuEvents
 * @extends {React.Component}
 */
export default class MenuEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      activeEvent: 'none',
    };
    this.markerImplementation = {};
    this.menuEl = React.createRef();
  }

  componentDidMount() {
    const { UIContext, stx } = this.context;
    return;

    // set up helper for forwarding marker handling events
    const self = this;
    const Markers = {
      show(node, item) {
        self.setState({ activeEvent: item });
        self.markerImplementation.hideMarkers();
        self.markerImplementation.showMarkers(item.replace('none', ''));
      },
    };

    UIContext.advertiseAs(Markers, 'Markers');
  }

  render() {
    const { activeEvent } = this.state;
    const { menuEvents, plugins } = this.context.config;
    if (!menuEvents) {
      return null;
    }

    const menuItems = (menuEvents || []).map((item, index) => {
      // hiding items will allow to bind to stxtap event at once without
      // requiring additional binding request
      const style = {
        display:
          item.required && !this.markerImplementation[item.required]
            ? 'none'
            : '',
      };

      return (
        <MenuItem
          {...item}
          selected={activeEvent === item.markertype}
          key={index}
          style={style}
        />
      );
    });

    return (
      <cq-menu class="ciq-menu stx-markers collapse" ref={this.menuEl}>
        <span>Events</span>
        <cq-menu-dropdown ref={this.markerDropdown}>
          {menuItems}
        </cq-menu-dropdown>
      </cq-menu>
    );
  }
}

function MenuItem({ label, markertype, selected, style }) {
  return !label ? (
    <cq-separator />
  ) : (
    <cq-item stxtap={`Markers.show('${markertype}')`} key={label} style={style}>
      {label}
      <span className={`ciq-radio ${selected ? 'ciq-active' : ''}`}>
        <span />
      </span>
    </cq-item>
  );
}

MenuEvents.contextType = ChartContext;
