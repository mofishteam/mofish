# Introduction

**Mofish** is a friendly Development tool platform.

# Usage

## Install

> npm install mofish -g

## Start

> mofish

If you want to start with super user permission, you can also

> sudo mofish

# Fork and Dev

## Start frontend develop

> npm run serve

## Start backend develop

> npm run dev:server

## Develop with plugin

> npm run dev:plugin -- --plugin /your-plugin-dir-path [--port xxxx]

## Plugin INIT Configs

### name

Name of plugin.

### libs

- Koa: Koa Class.
- KoaStatic: KoaStatic Class.
- KoaRouter: KoaRouter Class.

### utils

- lsof: As the shell command 'lsof', you can get process of which using the port.
- response: Response Function for Koa Router, @params(status: status code in response body; data: response data; errorMessage: A string inserted when response has error). @example(response(200, {result: 0, data: '100'}, null))
- check: A params check Function for Koa Router.
- urlParse: A tool to parse url.
- getConfig: A Function to get config of plugin its own.
- setConfig: A Function to set config of plugin its own.
- portIsOccupied: A Async Function to get to know if the port is already in used.
- getValidPort: A Async Function to get a valid port, param is a port number, if the port is in used, the function will retun a new port number after the port you inputed.

### eventBus

An Object extended from Vue.

### plugins

A list of global plugins.

### pluginObects

A list of global plugin Objects.
