/* eslint-disable no-process-env */
const compose = require('docker-compose');
const spawn = require('react-dev-utils/crossSpawn');

async function startEnvironment(args) {
	console.log('starting environment');
	if(args.working) {
		console.log("in working version")
		await spawn.sync(
			'docker-compose',
			[
				'-f',
				'/usr/src/app/e2e-example/scripts/docker/base.yml',
				'-p',
				'e2e-example',
				'up',
				'-d',
				'--build',
				'project'
			  ],
			  { stdio: 'inherit' }
		);
		return spawn.sync(
			'docker-compose',
			[ 'up', '-d', 'chrome', 'localserver.info.com' ],
			{ stdio: 'inherit' }
		);
	}
	
	await compose.upOne('project', {
		cwd: '/usr/src/app/e2e-example/scripts/docker/util',
		env: process.env,
		config: [ '/usr/src/app/e2e-example/scripts/docker/base.yml' ],
		composeOptions: [ '-p', 'e2e-example' ],
		commandOptions: ["--build"],
		stdio: 'inherit'
	});

	return compose.upMany(['selenium-chrome', 'localserver.info.com'],{
		cwd: '/usr/src/app/e2e-example/scripts/docker/util',
		env: process.env,
		config: [ '/usr/src/app/e2e-example/scripts/docker/base.yml' ],
		composeOptions: [ '-p', 'e2e-example' ]
	});
	
}

function runBrowserTestsInDockerWithWebdriverIO(args) {
	const cmdArray = args.sauce ?['npx', 'wdio', 'test/browser/config/sauce.conf.js']
		 : ['npx', 'wdio', 'test/browser/config/docker.conf.js']
	console.log(`now running the following config: ${cmdArray}`);
	return compose.exec(
		'project', 
		cmdArray,
		{
			cwd: '/usr/src/app/e2e-example/scripts/docker/util',
			log: true,
			env: process.env,
			config: [ '/usr/src/app/e2e-example/scripts/docker/base.yml' ],
			composeOptions: [ '-p', 'e2e-example' ]
		}
	);
}

module.exports = {
	startEnvironment,
	runBrowserTestsInDockerWithWebdriverIO
};
