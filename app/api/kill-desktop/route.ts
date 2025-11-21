import { killDesktop } from "@/lib/kernel/utils";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Common handler for both GET and POST requests
async function handleKillDesktop(request: Request) {
  const { searchParams } = new URL(request.url);
  const sandboxId = searchParams.get("sandboxId");

  console.log(`Kill desktop request received via ${request.method} for ID: ${sandboxId}`);

  if (!sandboxId) {
    return new Response("No sandboxId provided", { 
      status: 400,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }

  try {
    await killDesktop(sandboxId);
    return new Response("Desktop killed successfully", { 
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error(`Failed to kill desktop with ID: ${sandboxId}`, error);
    return new Response("Failed to kill desktop", { 
      status: 500,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}

// Handle POST requests
export async function POST(request: Request) {
  return handleKillDesktop(request);
}