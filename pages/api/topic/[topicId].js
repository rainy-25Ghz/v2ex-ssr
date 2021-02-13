
import { getTopicInfo } from "../../../lib/v2exApi";
export default async function handler(req, res) {
    const {
        query: { topicId },
    } = req
    const topic_info = await getTopicInfo(topicId);
    //console.log(topics);
    res.status(200).json(topic_info);
}
