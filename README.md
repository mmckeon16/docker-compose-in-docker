# Running the e2e "test" with only (docker-compose)[https://github.com/PDMLab/docker-compose]
    
    yarn docker:e2e-test


# Running the e2e "test" with crossSpawn from react-dev-utils to start the services
1. First navigate to `/tasks/e2e.test.sh` and then uncomment `--working` on line 14.   
2. Then run

    yarn docker:e2e-test


*test is in quotations since there is no browser test actually being run, this is just to exemplify the `docker-compose` issue in a dockerized environment

