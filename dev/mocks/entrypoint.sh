#!/bin/bash

nohup node ~/zyme-caucus-mock/index.js > /var/log/zyme-caucus-mock.log &

nginx -g 'daemon off;'
