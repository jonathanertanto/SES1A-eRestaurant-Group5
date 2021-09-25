# react-box-sizing

[![Build Status](https://travis-ci.org/inuscript/react-box-sizing.svg?branch=master)](https://travis-ci.org/inuscript/react-box-sizing)

Tiny component for `box-sizing`.

* https://www.paulirish.com/2012/box-sizing-border-box-ftw/
* https://css-tricks.com/box-sizing/

## Usage

```js
import { BorderBox } from 'react-box-sizing'

const YourComponent = (
  <BorderBox>
    <div>This</div>
    <div>Items</div>
    <div>is</div>
    <div>border-box</div>
  </BorderBox>
)
```

This component inject this style

```css
// This is DUMMY CSS
<BorderBox> {
  box-sizing: border-box;
}
<BorderBox> *,
<BorderBox> *:before,
<BorderBox> *:after {
  box-sizing: inherit;
}
```

This module use [glammor](https://github.com/threepointone/glamor) for inject css.

# Component
## `<BorderBox>`
Inject `box-sizing: border-box`

## `<ContentBox>`
Inject `box-sizing: content-box`

## `<PaddingBox>`
Inject `box-sizing: padding-box`

see: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing

