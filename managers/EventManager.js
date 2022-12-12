const fs = require("fs");
const path = require("path");

module.exports = (client, Discord) => {
    const commandFiles = getAllEventFiles("./events")

    for (const filePath of commandFiles){
        const event = require(filePath);

        client.on(event.name, obj => event.execute(client, Discord, obj));
    }

}

// Read Event Files
const getAllEventFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllEventFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
          if (file.endsWith(".js"))
          {
            arrayOfFiles.push(path.join(__basedir, dirPath, "/", file))
          }
      }
    })
  
    return arrayOfFiles
}