/* @flow */

import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage, formatMessage } from 'react-intl';
import classNames from 'classnames';

import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentValue: PropTypes.string,
  };

  blocksTypes: Array<Object> = [
    { label: 'Normal', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.normal'}), style: 'unstyled' },
    { label: 'H1', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h1'}), style: 'header-one' },
    { label: 'H2', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h2'}), style: 'header-two' },
    { label: 'H3', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h3'}), style: 'header-three' },
    { label: 'H4', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h4'}), style: 'header-four' },
    { label: 'H5', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h5'}), style: 'header-five' },
    { label: 'H6', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.h6'}), style: 'header-six' },
    { label: 'Blockquote', displayName: this.props.intl.formatMessage({ id:'components.controls.blocktype.blockquote'}), style: 'blockquote' },
  ];

  renderFlat(blocks: Array<Object>): void {
    const { config: { className }, onChange, currentValue } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {
        blocks.map((block, index) =>
          <Option
            key={index}
            value={block.style}
            active={currentValue === block.style}
            onClick={onChange}
          >
            {block.displayName}
          </Option>
        )
      }
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    const {
      config: { className, dropdownClassName },
      currentValue,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
    } = this.props;
    const currentBlockData = blocks.filter(blk => blk.style === currentValue);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
    return (
      <div className="rdw-block-wrapper" aria-label="rdw-block-control">
        <Dropdown
          className={classNames('rdw-block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <span>{currentLabel || <FormattedMessage id="components.controls.blocktype.blocktype" />}</span>
          {
            blocks.map((block, index) =>
              <DropdownOption
                active={currentValue === block.style}
                value={block.style}
                key={index}
              >
                {block.displayName}
              </DropdownOption>)
          }
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const { inDropdown } = config;
    const blocks = this.blocksTypes.filter(({ label }) => config.options.includes(label));
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default injectIntl(LayoutComponent);