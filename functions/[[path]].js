export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  let response = await env.ASSETS.fetch(request)

  if (response.status === 404) {
    response = await env.ASSETS.fetch(new URL('/index.html', url.origin))
  }

  return response
}
