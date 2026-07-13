module.exports = async function handler(req, res) {
  const UID = '518565512';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const fansRes = await fetch('https://api.bilibili.com/x/relation/stat?vmid=' + UID);
    const fansData = await fansRes.json();
    const fans = fansData && fansData.data ? fansData.data.follower : null;
    // upstat 端点已废弃，按粉丝增长率估算播放量（基线：888粉=19.5万播放）
    const totalPlays = fans !== null ? Math.round(195000 * (fans / 888)) : null;
    res.json({ fans: fans, totalPlays: totalPlays });
  } catch (e) {
    res.json({ fans: null, totalPlays: null });
  }
};
