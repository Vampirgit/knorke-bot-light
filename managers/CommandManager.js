const fs = require('fs');
const path = require("path");

module.exports = (client, Discord) => {
    const commandFiles = getAllCommandFiles("./commands")

    for (const filePath of commandFiles){
        const command = require(filePath);

        if(command.name){
            client.commands.set(command.name, command)
        } else {
            continue;
        }
    }

}

// Just a helping function
const getAllCommandFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllCommandFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
          if (file.endsWith(".js"))
          {
            arrayOfFiles.push(path.join(__basedir, dirPath, "/", file))
          }
      }
    })
  
    return arrayOfFiles
}