import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "node:stream";

import { database } from ".";

const bucket = new GridFSBucket(database);

const collection = database.collection("fs.files");
collection.createIndex({ "metadata.userId": 1 });

export const upload = ({
  name,
  file,
  userId,
}: {
  name: string;
  file: Readable;
  userId: string;
}) => {
  const id = file
    .pipe(
      bucket.openUploadStream(name, {
        metadata: { userId: new ObjectId(userId) },
      })
    )
    .id.toString();

  return { _id: id, filename: name };
};

export const getFiles = (userId: string) => {
  return bucket
    .find({ "metadata.userId": new ObjectId(userId) })
    .project({
      _id: { $toString: "$_id" },
      filename: 1,
    })
    .toArray();
};

export const getFile = (id: string) => {
  return Readable.toWeb(
    bucket.openDownloadStream(new ObjectId(id))
  ) as ReadableStream;
};
