const HOST = process.env.NEXT_PUBLIC_HOST;

export class ServerError extends Error {
  data: unknown;

  constructor(data: unknown) {
    super();
    this.data = data;
  }
}

async function parseResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function send(path: string, init?: RequestInit) {
  const response = await fetch(path, init);
  const parsedResponse = await parseResponse(response);

  if (!response.ok) {
    throw new ServerError(parsedResponse);
  }

  return parsedResponse;
}

export function get(path: string) {
  return send(`${HOST}${path}`, {
    credentials: "include",
  });
}

export function post(path: string, body: Record<string, unknown>) {
  return send(`${HOST}${path}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function upload(path: string, data: Record<string, string | Blob>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => formData.append(key, value));

  return send(`${HOST}${path}`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
}
