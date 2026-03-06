export const config = {
  runtime: 'edge',
};

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await request.json();

    // EmailJS REST API, requires service/template/user IDs stored as secrets in Cloudflare
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        template_params: body,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`EmailJS error: ${response.status} ${text}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error('contact function error', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || String(err) }),
      { status: 500 }
    );
  }
}