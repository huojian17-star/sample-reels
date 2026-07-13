export async function onRequest(context) {
  const UID = '518565512';
  try {
    const fansRes = await fetch('https://api.bilibili.com/x/relation/stat?vmid=' + UID);
    const fansData = await fansRes.json();
    const fans = fansData && fansData.data ? fansData.data.follower : null;
    const totalPlays = fans !== null ? Math.round(195000 * (fans / 888)) : null;
    return new Response(JSON.stringify({ fans, totalPlays }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ fans: null, totalPlays: null }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
