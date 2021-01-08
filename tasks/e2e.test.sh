#!/bin/bash
#APP_DIR must be supplied and is expected to be given by docker compose file.  It is the location to generate the test app to
echo 'using node version';
node --version;

cd "e2e-example"

#build in anticipation of browser tests below
yarn run build

echo 'build run'

# uncomment --working to get the example of a working version running (up until the tests are executed)
node ./scripts/browser-tests.js #--working 

cd ..;
