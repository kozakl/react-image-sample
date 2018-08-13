import fs from 'fs-extra';
import path from 'path';
import {exec} from 'child_process';

const server = '/home/luke/Public/kozakluke.bitbucket.org/',
      process = exec('git rev-parse --abbrev-ref HEAD && git describe --tags');
process.stdout.on('data', (result)=> {
    const name = require('../package.json').name;
    if (!result.includes('fatal:'))
    {
        const lines = result.trim().split(/\s*[\r\n]+\s*/g),
               branch = lines[0],
               tag = lines[1];
        if (branch === 'master')
            deploy(path.join(name, tag));
        else
            deploy(path.join(name, branch));
    }
    else
        deploy(name)
});

function deploy(project)
{
    fs.removeSync(server + project);
    fs.copySync('./public', server + project);
    if (fs.existsSync(server + project + '/bundle.js')) {
        const cache = Math.random();
        fs.renameSync(server + project + '/bundle.js',
                      server + project + `/bundle-${cache}.js`);
        fs.writeFileSync(server + project + '/index.html',
            fs.readFileSync(server + project + '/index.html', 'utf8')
            .replace('bundle.js', `bundle-${cache}.js`));
    }
    
    const process = exec(`cd ${server} &&\
                          git add . &&\
                          git commit -m "Update: ${project}." &&\
                          git push origin`);
    process.stdout.on('data', console.log);
    process.stderr.on('data', console.log);
}
