import type { NextApiRequest, NextApiResponse } from "next";

export default function register(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  res.status(200).send({ username, password });
}
