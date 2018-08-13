import gm from 'gm';
import fs from 'fs-extra';
import path from 'path';

const filters = ['.jpg', 'jpeg', '.png', '.gif'],
      buffer = fs.readFileSync(process.argv[2], 'utf8'),
      images = JSON.parse(buffer).values();
makeImage(images.next().value);

function makeImage(image)
{
    if (fs.lstatSync(image.src).isFile())
        writeSizes(image);
    else
    {
        listFiles(image.src, filters).forEach((src)=> {
            const diff = src.replace(image.src, ''),
                  dest = path.dirname(path.join(image.dest, diff));
            writeSizes({
                ...image,
                src, dest
            });
        });
    }
    
    const next = images.next();
    if (!next.done)
        makeImage(next.value);
}

function listFiles(dir, filters, list = [])
{
    fs.readdirSync(dir).forEach((file)=> {
        if (fs.statSync(path.join(dir, file)).isDirectory())
            listFiles(path.join(dir, file), filters, list);
        else if (filters.includes(path.extname(file)))
            list.push(path.join(dir, file));
    });
    return list;
}

function writeSizes(image)
{
    if (!fs.existsSync(image.dest))
        fs.mkdirpSync(image.dest);
    
    image.sizes.forEach((size)=> {
        const dest = path.join(image.dest,
                     path.basename(image.src, path.extname(image.src)) +
                     size.suffix + (image.ext || path.extname(image.src)));
        gm(image.src)
            .noProfile()
            .resize(size.resize)
            .blur(size.blur || image.blur || '0x0.001')
            .quality(size.quality || image.quality)
            .write(dest, err => err && console.log(err));
    });
}
