module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }
  const UID = '518565512';
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const fansRes = await fetch('https://api.bilibili.com/x/relation/stat?vmid=' + UID);
    const fansData = await fansRes.json();
    const fans = fansData && fansData.data ? fansData.data.follower : null;
    const totalPlays = fans !== null ? Math.round(195000 * (fans / 888)) : null;
    res.json({ fans: fans, totalPlays: totalPlays });
  } catch (e) {
    res.json({ fans: null, totalPlays: null });
  }
};
