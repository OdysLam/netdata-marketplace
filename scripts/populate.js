const { Downloader } = require('github-download-directory');
const repoUser = 'odyslam';
const repoBranch = 'chg-structure';
const fs = require('fs');
const path = require('path');

try {
    const filePath = process.cwd();
    fs.rm(`./alerts`, { recursive: true }, (err) => {
        if(err){
          console.log('/alerts folder is already deleted');
        }
    });
    fs.rm(`./collectors`, { recursive: true }, (err) => {
        if(err){
            // File deletion failed
               console.error(err.message);
                       return;}
                           });

  let dir = fs.readdirSync('./');
  console.log(`alerts, collectors deleted. Current directory: ${dir}`);
  const downloader = new Downloader({
    github: {'auth': "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"}
  });
  downloader.download(repoUser, 'community', 'collectors', { sha: repoBranch } );
  downloader.download(repoUser, 'community', 'alerts', { sha: repoBranch } );
  
}
catch( e ) {
  console.error("Encountered error while download GitHub repositories:", e);
}

async function moveFiles(){
  try {
    const directory1 = fs.readdirSync( './');
    const filePath = process.cwd();
    try{
      fs.rmSync('../content/pages/about.md');
    }
    catch (error) {
      console.log("../content/pages/about.md is already deleted!");
    }
    fs.copyFileSync('about.md', '../content/pages/about.md');
    for (const filename1  of directory1) {
      console.log(`filename1: ${filename1}`)
      if ( filename1 == 'collectors' || filename1 == 'alerts') {
        const directory2 = fs.readdirSync( `./${filename1}` );    
        for (const filename2 of directory2) { 
          console.log(`filename2: ${filename2}`);
          if ( filename2 == 'README' ) {
            let write = fs.createWriteStream("../content/pages/about.md", {flags: 'a'});
            let read = fs.createReadStream(`${filePath}/${filename1}/README`);
            write.on('close', ()=>{
              console.log(`${filePath}/${filename1}/${filename2} was appended to about.md`);
            });
            write.write('\n \n');
            read.pipe(write);
           }
          else {
            const directory3 = fs.readdirSync( `./${filename1}/${filename2}` );
            console.log(`collectors/alerts in ${filename2}: ${directory3}`);
            for (const filename3 of directory3){
              const directory4 = fs.readdirSync(`./${filename1}/${filename2}/${filename3}`);
              for (const filename4 of directory4){
                if( (filename4.toLowerCase()).match(/readme/) ){
                  fs.rename(`./${filename1}/${filename2}/${filename3}/${filename4}`, `../content/posts/${filename3}.md`, (error)=>{
                    console.log(`moved file ${filename3}/${filename4}`);
                  });
                }
                else if (filename4.toLowerCase().match(/.(jpg|jpeg|png|gif)$/i)) {
                  fs.rename(`./${filename1}/${filename2}/${filename3}/${filename4}`, `../static/media/${filename4}`, (error)=>{
                   console.log(`moved file ${filename3}/${filename4}`);
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
