module.exports = async function handler(req, res) {
  const UID = '518565512';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const [fansRes, playsRes] = await Promise.all([
      fetch('https://api.bilibili.com/x/relation/stat?vmid=' + UID),
      fetch('https://api.bilibili.com/x/space/upstat?mid=' + UID)
    ]);
    const fansData = await fansRes.json();
    const playsData = await playsRes.json();
    res.json({
      fans: fansData && fansData.data ? fansData.data.follower : null,
      totalPlays: playsData && playsData.data && playsData.data.archive ? playsData.data.archive.view : null
    });
  } catch (e) {
    res.json({ fans: null, totalPlays: null });
  }
};
