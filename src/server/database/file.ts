import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

import { database } from ".";

const bucket = new GridFSBucket(database);

export const upload = (name: string, fileStream: Readable) => {
  fileStream.pipe(bucket.openUploadStream(name));
};
