#!/usr/bin/env bash
sudo docker stop ofc
sudo docker rm ofc
sudo docker build -t ofc .
sudo docker run --name ofc -d -p 4000:4000 ofc