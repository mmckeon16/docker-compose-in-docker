#!/usr/bin/env node

'use strict';

// logs any errors on unhandled rejections instead of ignoring them. 
process.on('unhandledRejection', (err) => {
	if(err) {
		console.log("err: ",err);
		console.log("error code: ", err.exitCode);
		process.exit(err.exitCode);
	}
});

const { browserTestOperations } = require('./docker/util');

// run the browser tests
const { argv } = require('yargs');

// starts the services in the docker-compose file to run the browser tests
browserTestOperations.startEnvironment({...argv}).then(async ()=> {
	console.log('Waiting for environment...');

	console.log('Running tests...');
	// run the tests
	let result = null;
	result = await browserTestOperations.runBrowserTestsInDockerWithWebdriverIO(argv);

	process.exit(result.status);
});
	