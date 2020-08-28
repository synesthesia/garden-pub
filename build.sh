 #! /bin/bash
yarn install
cd notes && git pull origin master && cd ..
npm run build -- --prefix-paths
