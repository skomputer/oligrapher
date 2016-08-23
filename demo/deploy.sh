#!/bin/bash


cp build/oligrapher.js demo/
cp build/oligrapher.min.js demo/
cp build/LsDataConverter.js demo/
cp build/LsDataSource.js demo/

scp demo/*.html littlesis:/var/www/oligrapher/
scp demo/*.js littlesis:/var/www/oligrapher/
