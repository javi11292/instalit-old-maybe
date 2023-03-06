import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";

import { database } from ".";

const bucket = new GridFSBucket(database);

const collection = database.collection("fs.files");
collection.createIndex({ "metadata.user_id": 1 });

export const upload = ({
  name,
  file,
  user_id,
}: {
  name: string;
  file: Readable;
  user_id: string;
}) => {
  file.pipe(
    bucket.openUploadStream(name, {
      metadata: { user_id: new ObjectId(user_id) },
    })
  );
};

export const getFiles = () => {
  return bucket.find().toArray();
};
