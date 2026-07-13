// Vercel Serverless Function — B站数据代理
// 部署到 Vercel 后，访问 /api/bili-stats 即可获取实时数据

export default async function handler(req, res) {
  const UID = '518565512';
  const FANS_URL = `https://api.bilibili.com/x/relation/stat?vmid=${UID}`;
  const PLAYS_URL = `https://api.bilibili.com/x/space/upstat?mid=${UID}`;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const [fansRes, playsRes] = await Promise.all([
      fetch(FANS_URL),
      fetch(PLAYS_URL)
    ]);
    const fansData = await fansRes.json();
    const playsData = await playsRes.json();

    res.json({
      fans: fansData?.data?.follower ?? null,
      totalPlays: playsData?.data?.archive?.view ?? null,
      likes: playsData?.data?.archive?.likes ?? null
    });
  } catch (e) {
    res.json({ fans: null, totalPlays: null });
  }
}
