import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import { CSSMotionList } from 'rc-motion';
import TransBtn from '../TransBtn';
import { LabelValueType, RawValueType, CustomTagProps } from '../interface/generator';
import { RenderNode } from '../interface';
import { InnerSelectorProps } from '.';
import Input from './Input';
import useLayoutEffect from '../hooks/useLayoutEffect';

const REST_TAG_KEY = '__RC_SELECT_MAX_REST_COUNT__';

interface SelectorProps extends InnerSelectorProps {
  // Icon
  removeIcon?: RenderNode;

  // Tags
  maxTagCount?: number;
  maxTagTextLength?: number;
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: LabelValueType[]) => React.ReactNode);
  tokenSeparators?: string[];
  tagRender?: (props: CustomTagProps) => React.ReactElement;

  // Motion
  choiceTransitionName?: string;

  // Event
  onSelect: (value: RawValueType, option: { selected: boolean }) => void;
}

const SelectSelector: React.FC<SelectorProps> = props => {
  const {
    id,
    prefixCls,

    displayValues: providedDisplayValues,
    open,
    searchValue,
    inputRef,
    placeholder,
    disabled,
    mode,
    showSearch,
    autoFocus,
    autoComplete,
    accessibilityIndex,
    tabIndex,

    removeIcon,
    choiceTransitionName,

    maxTagCount,
    maxTagTextLength,
    maxTagPlaceholder = (omittedValues: LabelValueType[]) => `+ ${omittedValues.length} ...`,
    tagRender,

    onSelect,
    onInputChange,
    onInputPaste,
    onInputKeyDown,
    onInputMouseDown,
    onInputCompositionStart,
    onInputCompositionEnd,
  } = props;

  const [motionAppear, setMotionAppear] = useState(false);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);
  const [focused, setFocused] = useState(false);

  // ===================== Motion ======================
  React.useEffect(() => {
    setMotionAppear(true);
  }, []);

  // ===================== Search ======================
  const inputValue = open || mode === 'tags' ? searchValue : '';
  const inputEditable: boolean = mode === 'tags' || (showSearch && (open || focused));

  // We measure width and set to the input immediately
  useLayoutEffect(() => {
    setInputWidth(measureRef.current.scrollWidth);
  }, [inputValue]);

  // ==================== Selection ====================
  let displayValues: LabelValueType[] = providedDisplayValues;
  let truncatedDisplayValues: LabelValueType[] = [];

  if (typeof maxTagCount === 'number' && providedDisplayValues.length > maxTagCount) {
    displayValues = providedDisplayValues.slice(0, maxTagCount);
    truncatedDisplayValues = providedDisplayValues.slice(maxTagCount);
  }

  // Update by `maxTagTextLength`
  if (typeof maxTagTextLength === 'number') {
    const getTruncatedLabel = label => {
      if (typeof label === 'string' || typeof label === 'number') {
        if (String(label).length > maxTagTextLength) {
          return `${String(label).slice(0, maxTagTextLength)}...`;
        }
      }
      return label;
    };
    displayValues = displayValues.map(({ label, ...rest }) => ({
      ...rest,
      label: getTruncatedLabel(label),
    }));
  }

  if (truncatedDisplayValues.length) {
    displayValues.push({
      key: REST_TAG_KEY,
      label:
        typeof maxTagPlaceholder === 'function'
          ? maxTagPlaceholder(truncatedDisplayValues)
          : maxTagPlaceholder,
    });
  }

  const selectionNode = (
    <CSSMotionList
      component={false}
      keys={displayValues as Required<LabelValueType>[]}
      motionName={choiceTransitionName}
      motionAppear={motionAppear}
    >
      {({ key, label, value, disabled: itemDisabled, className, style }) => {
        const mergedKey = key || value;
        const closable = !disabled && key !== REST_TAG_KEY && !itemDisabled;
        const onMouseDown = (event: React.MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
        };
        const onClose = (event?: React.MouseEvent) => {
          if (event) event.stopPropagation();
          onSelect(value, { selected: false });
        };

        return typeof tagRender === 'function' ? (
          <span key={mergedKey} onMouseDown={onMouseDown} className={className} style={style}>
            {tagRender({
              label,
              value,
              disabled: itemDisabled,
              closable,
              onClose,
            })}
          </span>
        ) : (
          <span
            key={mergedKey}
            className={classNames(className, `${prefixCls}-selection-item`, {
              [`${prefixCls}-selection-item-disabled`]: itemDisabled,
            })}
            style={style}
          >
            <span className={`${prefixCls}-selection-item-content`}>{label}</span>
            {closable && (
              <TransBtn
                className={`${prefixCls}-selection-item-remove`}
                onMouseDown={onMouseDown}
                onClick={onClose}
                customizeIcon={removeIcon}
              >
                ×
              </TransBtn>
            )}
          </span>
        );
      }}
    </CSSMotionList>
  );

  return (
    <>
      {selectionNode}

      <span
        className={`${prefixCls}-selection-search`}
        style={{ width: inputWidth }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      >
        <Input
          ref={inputRef}
          open={open}
          prefixCls={prefixCls}
          id={id}
          inputElement={null}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          editable={inputEditable}
          accessibilityIndex={accessibilityIndex}
          value={inputValue}
          onKeyDown={onInputKeyDown}
          onMouseDown={onInputMouseDown}
          onChange={onInputChange}
          onPaste={onInputPaste}
          onCompositionStart={onInputCompositionStart}
          onCompositionEnd={onInputCompositionEnd}
          tabIndex={tabIndex}
          attrs={pickAttrs(props, true)}
        />

        {/* Measure Node */}
        <span ref={measureRef} className={`${prefixCls}-selection-search-mirror`} aria-hidden>
          {inputValue}&nbsp;
        </span>
      </span>

      {!providedDisplayValues.length && !inputValue && (
        <span className={`${prefixCls}-selection-placeholder`}>{placeholder}</span>
      )}
    </>
  );
};

export default SelectSelector;
