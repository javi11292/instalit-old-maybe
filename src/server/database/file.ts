import { Document, GridFSBucket, ObjectId } from "mongodb";
import type { Readable } from "node:stream";
import sharp from "sharp";

import { database } from ".";

const PHOTO_WIDTH = 1080;
const THUMBNAIL_WIDTH = 100;

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
  return new Promise<Document>((resolve, reject) => {
    const buffers: Buffer[] = [];

    file.on("data", (data) => buffers.push(data));
    file.on("error", reject);
    file.on("end", async () => {
      const buffer = Buffer.concat(buffers);

      const thumbnail = sharp(buffer).resize(THUMBNAIL_WIDTH).jpeg().toBuffer();
      const photo = sharp(buffer)
        .resize(PHOTO_WIDTH)
        .jpeg({ progressive: true })
        .toBuffer();

      const stream = bucket.openUploadStream(name, {
        metadata: { userId: new ObjectId(userId), thumbnail: await thumbnail },
      });

      stream.on("error", reject);
      stream.on("finish", () =>
        resolve({ _id: stream.id.toString(), filename: name })
      );

      stream.write(await photo);
      stream.end();
    });
  });
};

export const like = (fileId: string, userId: string, value: boolean) => {
  const operator = value ? "$addToSet" : "$pull";

  return collection.updateOne(
    { _id: new ObjectId(fileId) },
    { [operator]: { "metadata.likes": new ObjectId(userId) } }
  );
};

export const getFile = (id: string) => {
  return collection
    .find({ _id: new ObjectId(id) })
    .project({
      _id: 0,
      "metadata.likes": 1,
    })
    .next();
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

export const getThumbnail = async (id: string) => {
  const file = await collection.findOne(
    { _id: new ObjectId(id) },
    {
      projection: {
        _id: 0,
        "metadata.thumbnail": 1,
      },
    }
  );

  return file?.metadata.thumbnail.buffer;
};

export const download = async (id: string) => {
  const _id = new ObjectId(id);
  const file = await bucket.find({ _id }).next();

  if (!file) throw new Error();

  return bucket.openDownloadStream(
    new ObjectId(_id)
  ) as unknown as ReadableStream;
};
