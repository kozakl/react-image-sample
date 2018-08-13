import {exec} from 'child_process';

exec(`rm -rf ./public/assets &&\
      find ./public -name "*.js" -delete &&\
      find ./public -name "*.map" -delete`);
