import shortid from 'shortid'
import URL from '../models/url.js'

async function handleNewUrl(req, res) {
  const body = req.body;
  if (!body.url){

    return res.status(400).json({ error: "url is required" });
  } 
  const shortID = shortid();
  

  const url = await URL({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
   url.save();

  return res.json({ success:true,id: url.shortId});
}

async function handleGet(req, res) {
  try {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if(!result){
    return  res.json({msg:"Error"})
  }
  result.visitHistory.push({timestamp: Date.now()});
  result.save();
  return res.redirect(result.redirectURL);
  } catch (error) {
    res.json({msg:"Error"})
  }
}
async function getUrls(req, res) {
  try {
  const result = await URL.find();
  if(!result){
    return  res.json({msg:"Error"})
  }
    return  res.json({success: true, result})
  } catch (error) {
    res.json({msg:"Error"})
  }
}

export{
  handleNewUrl,
  handleGet,
  getUrls
};
