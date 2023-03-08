import { Document, GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "node:stream";
import sharp from "sharp";

import { database } from ".";

const WIDTH = 100;

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

      const thumbnail = await sharp(buffer)
        .resize(WIDTH, WIDTH, { fit: "outside" })
        .jpeg()
        .toBuffer();

      const stream = bucket.openUploadStream(name, {
        metadata: { userId: new ObjectId(userId), thumbnail },
      });

      stream.on("error", reject);
      stream.on("finish", () =>
        resolve({ _id: stream.id.toString(), filename: name })
      );

      stream.write(buffer);
      stream.end();
    });
  });
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

export const download = (id: string) => {
  return Readable.toWeb(
    bucket.openDownloadStream(new ObjectId(id))
  ) as ReadableStream;
};