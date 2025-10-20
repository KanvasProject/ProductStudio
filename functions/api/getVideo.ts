// functions/api/getVideo.ts

// Fix: Define PagesFunction type to resolve compilation error.
// In a real Cloudflare Pages project, this would be provided by the environment.
type PagesFunction<Env = any> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

export const onRequest: PagesFunction<{ API_KEY: string }> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return new Response('Missing video URL parameter', { status: 400 });
  }

  if (!env.API_KEY) {
    return new Response('API key not configured on server', { status: 500 });
  }

  const fullVideoUrl = `${videoUrl}&key=${env.API_KEY}`;

  try {
    const response = await fetch(fullVideoUrl);

    if (!response.ok) {
      console.error(`Failed to fetch video from Google. Status: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Google API Error:', errorText);
      return new Response(`Error fetching video from source: ${response.statusText}`, { status: response.status });
    }

    // Stream the video back to the client
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
    headers.set('Content-Length', response.headers.get('Content-Length') || '');
    
    return new Response(response.body, { headers });

  } catch (error) {
    console.error('Error in proxy function:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};