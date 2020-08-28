#! /bin/bash

# turn off apt errors "dpkg-preconfigure: unable to re-open stdin: No such file or directory"
export DEBIAN_FRONTEND=noninteractive

#update apt
apt-get update

#make sure we have up to date versions of git and curl 
apt-get install git
apt-get install curl

#install build essentials
sudo apt install -y build-essential

#instlal nodejs 10
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get install -y nodejs

#get latest npm
npm install npm --global

#get yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

#install gatsby
npm install -g gatsby-cli