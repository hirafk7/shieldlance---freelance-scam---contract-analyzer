import { runShieldLanceAnalysis } from '../../src/server/analyzerCore';

export const handler = async (event: any, _context: any) => {
  // Only allow POST
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  try {
    let body: any = {};
    if (event.body) {
      try {
        body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      } catch (pErr) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Invalid JSON request payload.' })
        };
      }
    }

    const { text, imageBase64, mimeType } = body;

    const result = await runShieldLanceAnalysis(text, imageBase64, mimeType);

    if (result.error) {
      return {
        statusCode: result.status || 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: result.error })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data)
    };

  } catch (err: any) {
    console.error('Netlify function error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error while executing analysis.' })
    };
  }
};
