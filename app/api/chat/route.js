const chatbotUrl =
  process.env.CHATBOT_URL?.trim() ||
  "http://suamai-670525487.us-east-1.elb.amazonaws.com/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.text();

    const upstream = await fetch(chatbotUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/x-ndjson",
      },
      body,
      signal: AbortSignal.timeout(300_000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      const contentType = upstream.headers.get("content-type") || "";
      let detail = `Chatbot service returned HTTP ${upstream.status}.`;

      if (contentType.includes("application/json")) {
        try {
          detail = JSON.parse(errorText).detail || detail;
        } catch {
          // Keep the status-based message when the upstream JSON is malformed.
        }
      } else if (errorText.trim() && !/<!doctype html|<html[\s>]/i.test(errorText)) {
        detail = errorText.trim();
      }

      return Response.json({ detail }, {
        status: upstream.status >= 500 ? 503 : upstream.status,
        headers: {
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    if (!upstream.body) {
      return new Response(
        JSON.stringify({
          detail: "Chatbot returned an empty stream.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body.getReader();

        try {
          while (true) {
            const { value, done } =
              await reader.read();

            if (done) {
              break;
            }

            if (value) {
              controller.enqueue(value);
            }
          }
          controller.close();
        } catch (error) {
          console.error(
            "Streaming proxy error:",
            error
          );

          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error(
      "Chatbot upstream request failed:",
      error
    );

    return Response.json(
      {
        detail:
          "The chatbot service is unavailable.",
      },
      {
        status: 503,
      }
    );
  }
}