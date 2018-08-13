import {exec} from 'child_process';

exec(`rm -rf coverage &&\
      rm -rf node_modules &&
      rm -rf package-lock.js`);
