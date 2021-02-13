import { getTopicsUnderNode } from "../../lib/v2exApi";
export default async function handler(req, res) {
  const {
    query: { nodeName },
  } = req
  const topics = await getTopicsUnderNode(nodeName);
  //console.log(topics);
  res.status(200).json(topics);
}
