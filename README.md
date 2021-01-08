# selectable-options [![NPM version][npm-image]][npm-url] [![Test coverage][coveralls-image]][coveralls-url]  [![bundle size][bundlephobia-image]][bundlephobia-url]

[React](https://reactjs.org/) component for selecting options.

This is a fork of the npm package, [rc-select](https://www.npmjs.com/package/rc-select), because I'm still waiting for them to review my pull request that refactored a sizable chunk of their codebase while adding new features, and it is uncertain if my changes will ever get merged in.

This may turn into an entirely separate endeavor, but I'm thankful to [Ant Design](https://reactjs.org/) for the initial code to create this component.

Currently the primary difference between this npm package and [rc-select](https://www.npmjs.com/package/rc-select) is the addition of the props: **optionSelectableLabelProp**, **optionSelectedLabelProp**, and **persistSelectedLabelsOnly**. These props are described [below](#selectable-options-props).

<!--
[![Dependencies][david-image]](david-url)
[![DevDependencies][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
-->

[npm-image]: http://img.shields.io/npm/v/selectable-options.svg?style=flat-square
[npm-url]: http://npmjs.org/package/selectable-options
[github-actions-image]: https://github.com/svpease/selectable-options/workflows/CI/badge.svg
[github-actions-url]: https://github.com/svpease/selectable-options/actions
[coveralls-image]: https://img.shields.io/coveralls/react-component/select.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/select?branch=master
[codecov-image]: https://img.shields.io/codecov/c/github/selectable-options/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/selectable-options/branch/main
[david-url]: https://david-dm.org/react-component/select
[david-image]: https://david-dm.org/svpease/selectable-options/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/svpease/selectable-options?type=dev
[david-dev-image]: https://david-dm.org/svpease/selectable-options/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/selectable-options.svg?style=flat-square
[download-url]: https://npmjs.org/package/selectable-options
[bundlephobia-url]: https://bundlephobia.com/result?p=selectable-options
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/selectable-options?style=flat-square

## Features

- Customizable labels for when an option is selected vs when they are selectable
- Use keys `Up`, `Down`, `Enter` to navigate selectable options
- Supports browsers: Chrome, Firefox, Safari, Edge, IE11+

## Install

[![selectable-options](https://nodei.co/npm/selectable-options.png?mini=true)](https://npmjs.org/package/selectable-options)

## Usage

### Simple

```js
import SelectableOptions from 'selectable-options';

export default () => (
  <SelectableOptions
    options={[
      { value: 'jack' },
      { value: 'lucy' },
      { value: 'yiminghe' },
    ]}
  />
);
```

## API

### <a name="selectable-options-props"></a>SelectableOptions props

| name | description | type | default |
| --- | --- | --- | --- |
| id | html id to set on the component wrapper | string | '' |
| className | additional css class of root dom node | string | '' |
| data-\* | html data attributes to set on the component wrapper | string | '' |
| prefixCls | prefix class | string | '' |
| animation | dropdown animation name. only support slide-up now | string | '' |
| transitionName | dropdown css animation name | string | '' |
| choiceTransitionName | css animation name for selected items at multiple mode | string | '' |
| dropdownMatchSelectWidth | whether dropdown's with is same with select | boolean | true |
| dropdownClassName | additional className applied to dropdown | string | - |
| dropdownStyle | additional style applied to dropdown | object | {} |
| dropdownAlign | additional align applied to dropdown | object | {} |
| dropdownMenuStyle | additional style applied to dropdown menu | object | {} |
| notFoundContent | specify content to show when no result matches. | string | 'Not Found' |
| tokenSeparators | separator used to tokenize on tag/multiple mode | string[] |  |
| open | Control whether the selectable options dropdown is visible | boolean |  |
| defaultOpen | Control whether the selectable options dropdown is visible by default | boolean |  |
| placeholder | The placeholder to be shown when no option has been selected yet and nothing has been typed into the search box | React Node |  |
| showSearch | Whether the search box for search for selectable options within its dropdown is enabled (only toggles when in a mode that only allows for one option to be selected at a time) | boolean | true |
| showArrow | Whether the arrow is shown that toggles the selectable options dropdown visibility | boolean | true (single mode), false (multiple mode) |
| allowClear | Whether the icon is shown that allows the user to clear the currently selected option as well as anything that is currently typed into the search box | boolean | false |
| tagRender | Customize how tags are rendered | (props: CustomTagProps) => ReactNode | - |
| maxTagTextLength | The maximum number of characters to show for a tag's label | number | - |
| maxTagCount | The maximum number of tags to show (the remaining are truncated) | number | - |
| maxTagPlaceholder | Placeholder shown for truncated tags | ReactNode \| (truncatedTagValues) => ReactNode | - |
| mode | Recognized [modes](#modes): 'combobox', 'multiple', 'tags' | string | undefined |
| disabled | Whether the component is disabled | boolean | false |
| filterOption | whether filter options by input value. default filter by option's optionFilterProp prop's value | boolean | true \| function(inputValue: string, option: OptionData) |
| optionFilterProp | which prop value of option will be used for filter if filterOption is true | string | 'value' |
| filterSort | Sort function for search options sorting, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. | function(optionA:Option, optionB: Option) | - |
| optionSelectedLabelProp | which property of option data is used as the selected option's label | string | 'value' \| 'children' \| 'label' |
| optionSelectableLabelProp | which property of option data is used as an option's label to appear in the option dropdown | string | 'children' \| 'label' |
| persistSelectedLabelsOnly | ensures that the search value only matches a selected option's selected label when the search field no longer has focus (only works in combobox mode) | boolean | false |
| optionLabelProp | render option value or option children as content of select | string | 'value' \| 'children' |
| defaultValue | Default selected option(s) | string \| number \| OptionData \| Array<string \| number \| OptionData> | - |
| value | Controlled currently selected option(s) | string \| number \| OptionData \| Array<string \| number \| OptionData> | - |
| labelInValue | whether to embed label in value, see above value type | boolean | false |
| backfill | whether backfill select option to search input (only works in single and combobox mode) | boolean | false |
| onChange | called when select an option or input value change(combobox) | (value, option: OptionData \| OptionData[]) => void | - |
| onSearch | called when input changed | () => void | - |
| onBlur | called when blur | () => void | - |
| onFocus | called when focus | () => void | - |
| onPopupScroll | called when menu is scrolled | () => void | - |
| onSelect | called when a option is selected. param is option's value and option instance | (value, option: Option) => void | - |
| onDeselect | called when a option is deselected. param is option's value. only called for multiple or tags | function(value, option:Option) | - |
| onInputKeyDown | called when key down on input | function(event) | - |
| defaultActiveFirstOption | whether active first option by default | boolean | true |
| getPopupContainer | container which popup select menu rendered into | (trigger: Node) => Node | function() { return document.body;} |
| getInputElement | customize input element | () => ReactNode | - |
| showAction | actions trigger the dropdown to show | Array<'focus' \| 'click'> | [] |
| autoFocus | Focus the component immediately after mounting | boolean | - |
| autoClearSearchValue | auto clear search input value when multiple select is selected/deselected | boolean | true |
| inputIcon | specify the select arrow icon | ReactNode | - |
| clearIcon | specify the clear icon | ReactNode | - |
| removeIcon | specify the remove icon | ReactNode | - |
| menuItemSelectedIcon | specify the remove icon | ReactNode \| (props: MenuItemProps) => ReactNode | - |
| appendSelectedTagOptionsToDropdown | Whether the selected options (when in "tags" mode) are appended to the end of the dropdown if they are not currently deselectable within the dropdown. (Deselecting options is also possible by clicking the close button for each selected option) | boolean | true |
| dropdownRender | Customize how the selectable options dropdown is rendered | (menu: ReactNode, props: MenuProps) => ReactNode | - |
| loading | Whether the loading icon should be shown (if visible, it appears where the arrow icon would be) | boolean | false |
| virtual | Enable virtual scroll | boolean | true |
| direction | direction of dropdown | 'ltr' \| 'rtl' | 'ltr' |

### <a name="modes"></a>Modes

- **default** - Allows the user to only select one option at a time.
- **combobox** - Allows the user to only select one option at a time.
- **multiple** - Allows the user to select multiple options at a time.
- **tags** - Allows the user to select multiple options at a time. In addition to the provided selectable options, the user may also create their own option by selecting whatever they've typed into the search box.

### Methods

| name  | description               | parameters | return |
| ----- | ------------------------- | ---------- | ------ |
| focus | focus select programmatically | -          | -      |
| blur  | blur select programmatically  | -          | -      |

### OptionData (JSON Object)

| name | description | type | default |
| --- | --- | --- | --- |
| className | additional class to option | string | '' |
| disabled | no effect for click or keydown for this item | boolean | false |
| value | The selectable option's unique value (no other options may have the same value) | string \| number | - |
| label | The selectable option's label as it appears when it is selectable in the options dropdown as well as how it appears when shown as a selected option (this can be overridden using props `optionSelectedLabelProp` and `optionSelectableLabelProp`) | string \| ReactNode | - |
| selectableLabel* | The option's label as it appears when it is selectable in the options dropdown (*there is nothing special about the "selectableLabel" property*, it only becomes meaningful when the `optionSelectableLabelProp` is set to "selectableLabel") | string \| ReactNode | - |
| selectedLabel* | The option's label as it appears when shown as a selected option (*there is nothing special about the "selectedLabel" property*, it only becomes meaningful when the `optionSelectedLabelProp` is set to "selectedLabel") | string \| ReactNode | - |
| title | Custom `title` shown while hovering on selected value (if not provided, this is created automatically using the option's label or value) | string | - |

\*The properties "selectableLabel" and "selectedLabel" do not work without using `optionSelectableLabelProp` and `optionSelectedLabelProp` to point to these properties respectively.

### OptionGroupData (JSON Object)

| name | description | type | default |
| --- | --- | --- | --- |
| label | The option group's label as it appears in the selectable options dropdown | string \| ReactNode | - |
| value | default filter by this attribute. if react want you to set key, then key is same as value, you can omit value | string | - |
| options | The options belonging to this option group | OptionData[] | - |

## Development

```
npm install
npm start
```

## Demos

- Local: http://localhost:9001/
- Online: https://selectable-options.vercel.app/

## Tests

```
npm test -- --silent --coverage
```

## Coverage

```
npm run coverage
```

## Maintainers
- [Steven Pease](https://github.com/svpease)

## License

selectable-options is released under the MIT license.
