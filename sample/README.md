# How to start example page?

## Prerequisites
```shell
$ pwd  
# ./react-components/packages
$ yarn link
$ npm ls --global | grep @accelhack-org/react-components
# ├── @accelhack-org/react-components@0.2.12 -> **
```

## Link to sample project
```shell
$ pwd  
# ./react-components/sample
$ yarn link "@accelhack-org/react-components"
```

## Run Dev Server
```shell
$ yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```shell
# update package files to show in sample
$ yarn run update:package
```