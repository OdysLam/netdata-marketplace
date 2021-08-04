const downloader = require('github-download-directory');
const repoUser = 'odyslam';
const repoBranch = 'chg-structure';
const fs = require('fs');
const path = require('path');

try {
  downloader.download(repoUser, 'community', 'collectors', { sha: repoBranch } );
  downloader.download(repoUser, 'community', 'alerts', { sha: repoBranch } );
}
catch( e ) {
  console.error("Encountered error while download GitHub repositories:", e);
}

async function moveFiles(){
  try {
    const directory1 = await fs.promises.readdir( '.');
    const filePath = process.cwd();
    fs.copyFile('./about.md', '../content/pages/about.md', (error)=>{
      if (error){
        throw error;
      }
      console.log('moved baseline about.md file');
    }); 
    for (const filename1  of directory1) {
      console.log(filename1)
      if ( filename1 == 'collectors' || filename1 == 'alerts') {
        const directory2 = await fs.promises.readdir( `./${filename1}` );
        
        for (const filename2 of directory2) { 
          console.log(filename2);
          if ( filename2 == 'README' ) {
            console.log(process.cwd())
            let write = fs.createWriteStream("../content/pages/about.md", {flags: 'a'});
            let read = fs.createReadStream(`${filePath}/${filename1}/README`);
            write.on('close', ()=>{
              console.log(`${filePath}/${filename1}/${filename2} was appended to about.md`);
            });
            write.write('\n \n');
            read.pipe(write);
           }
          else {
            const directory3 = await fs.promises.readdir( `./${filename1}/${filename2}` );
            console.log(directory3);
            for (const filename3 of directory3){
              
              const directory4 = await fs.promises.readdir(`./${filename1}/${filename2}/${filename3}`);
              for (const filename4 of directory4){
                if( filename4 == 'README' ){
                  console.log(directory3, filename3, directory4, filename4);
                  fs.rename(`./${filename1}/${filename2}/${filename3}/README`, `../content/posts/${filename3}.md`, (error)=>{
                    if (error) throw error;
                    console.log(`moved file ${filename3}`);
                  });
                }
              }
            }
          } 
        }
      }  
    }
   }

  catch ( e ) {
    console.error( 'Encountered error while handling files', e);
  }
}

moveFiles();
