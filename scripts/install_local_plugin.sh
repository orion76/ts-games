#!/bin/sh
rm -rf ./node_modules/@orion76
mkdir -p ./node_modules/@orion76
ln -s ~/www/ca/projects/@orion76/plugin/lib ./node_modules/@orion76/plugin
ln -s ~/www/ca/projects/@orion76/ng-plugin/lib ./node_modules/@orion76/ng-plugin
# ln -s ~/www/ca/projects/@orion76/ng-logger/lib ./node_modules/@orion76/ng-logger
ln -s ~/www/ca/projects/@orion76/debug-logger/lib ./node_modules/@orion76/debug-logger