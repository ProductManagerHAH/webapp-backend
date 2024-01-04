
    import fs from 'fs';



    export const readHTMLFile = (path: string, callback: any) => {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };