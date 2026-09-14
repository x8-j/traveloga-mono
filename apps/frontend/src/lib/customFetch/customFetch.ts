export async function customFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const fullURL = new URL(input, process.env.REACT_APP_API).toString();
  const parsedInit = getFullRequestInit(init);

  try {
    const response = await fetch(fullURL, parsedInit);
    return new Response(JSON.stringify(response));
  } catch {
    throw new Error('Error');
  }
}

function getFullRequestInit(init: RequestInit | undefined): RequestInit {
  const controller = new AbortController();
  const signal = init?.signal ?? controller.signal;

  return {
    ...init,
    signal,
  };
}
