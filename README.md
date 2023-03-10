# react-components
[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://accel-hack.github.io/react-components/)

## Installation:

```bash
npm install ah-react-components --save-dev
```

or

```bash
yarn add -D ah-react-components
```

## Usage :

Add `MyCounter` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MyCounter } from 'my-react-typescript-package'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <div>
            <h2>Default counter</h2>
            <MyCounter />
        </div>
        <hr />
        <div>
            <h2>Counter with predefined value</h2>
            <MyCounter value={5} />
        </div>
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/ah-react-components
[npm-image]: https://img.shields.io/npm/v/ah-react-components
[github-license]: https://img.shields.io/github/license/Accel-Hack/react-components
[github-license-url]: https://github.com/Accel-Hack/react-components/blob/master/LICENSE
[github-build]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/ah-react-components

#### Reference

* [How to Create and Publish React TypeScript npm Package With Demo and Automated Build](https://betterprogramming.pub/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca)