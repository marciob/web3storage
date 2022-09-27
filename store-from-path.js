import process from "process";
import minimist from "minimist";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import dotenv from "dotenv";
dotenv.config();

//token access - got from https://web3.storage
const WEB3_STORAGE_API = process.env.WEB3_STORAGE_API;

async function main() {
  const args = minimist(process.argv.slice(2));
  const token = WEB3_STORAGE_API;

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  //the script requires passing the file/directory path when running
  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  //instante the web3storage
  const storage = new Web3Storage({ token });
  const files = [];

  //each file/directory passed as argument is placed in files array
  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }

  //it stores data from files array to IPFS and returns the cid
  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

main();

//script to run:
//node put-files.js --token=<YOUR_TOKEN> ~/filename1 ~/filename2 ~/filenameN
//you can upload a single file, directory, or more files
//ex.:
// node put-files.js --token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZFYTRhODlFNUVhRjY5YWI4QUZlZUU3MUE5OTgwQjFGQ2REZGQzNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjY5Njk3OTY1NTQsIm5hbWUiOiJib25maXJlIn0.0S9Ua2FWEAZSwaemy92N7bW8ancRUtu4XtLS3Gy1ouA ~/hello.txt

//http gateways:
//https://ipfs.io/ipfs/
//https://w3s.link/ipfs/
