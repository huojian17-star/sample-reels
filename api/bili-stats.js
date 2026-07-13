// Vercel Serverless Function — B站数据代理
// 部署到 Vercel 后，访问 /api/bili-stats 即可获取实时数据

module.exports = async function handler(req, res) {
  const UID = '518565512';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const [fansRes, upstatRes] = await Promise.all([
      fetch('https://api.bilibili.com/x/relation/stat?vmid=' + UID),
      fetch('https://api.bilibili.com/x/space/upstat?mid=' + UID)
    ]);

    const fansData = await fansRes.json();
    const upstatData = await upstatRes.json();

    var totalPlays = null;
    if (upstatData && upstatData.data) {
      // 新版 API：archive.view；旧版：直接 data.view
      totalPlays = (upstatData.data.archive && upstatData.data.archive.view)
                || upstatData.data.view
                || null;
    }

    res.json({
      fans: fansData && fansData.data ? fansData.data.follower : null,
      totalPlays: totalPlays
    });
  } catch (e) {
    res.json({ fans: null, totalPlays: null });
  }
};
