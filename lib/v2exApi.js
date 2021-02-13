const axios = require('axios').default;
// 最热主题
// 相当于首页右侧的 10 大每天的内容。
// https://www.v2ex.com/api/topics/hot.json
// Method: GET
// Authentication: None
export const getHotTabContents = async function () {
    return await axios.get(`https://www.v2ex.com/api/topics/hot.json`)
        .then(res => res.data);
}

// 最新主题
// 相当于首页的“全部”这个 tab 下的最新内容。
// https://www.v2ex.com/api/topics/latest.json
// Method: GET
// Authentication: None
export async function getAllTabContents() {
    return await axios.get(`// https://www.v2ex.com/api/topics/latest.json`)
        .then(res => res.data);
}

//获取主题回复
// /replies/show.json?topic_id= （topic_id 参数必须） 通过主题 id 获取该主题下的所有回复
export async function getReplies(topic_id) {
    return await axios.get(`https://www.v2ex.com/api/replies/show.json?topic_id=${topic_id}`)
        .then(res => res.data);
}


//获取节点下的主题
//https://www.v2ex.com/api/topics/show.json?node_name=
export async function getTopicsUnderNode(node_name) {
    return await axios.get(`https://www.v2ex.com/api/topics/show.json?node_name=${node_name}`)
        .then(res => res.data);
}
export async function getTopicInfo(id) {
    return await axios.get(` https://www.v2ex.com/api/topics/show.json?id=${id}`)
        .then(res => res.data);
}
// 节点信息
// 获得指定节点的名字，简介，URL 及头像图片的地址。
// https://www.v2ex.com/api/nodes/show.json
// Method: GET
// Authentication: None
// 接受参数：
// name: 节点名（V2EX 的节点名全是半角英文或者数字）
// 例如：
// https://www.v2ex.com/api/nodes/show.json?name=python
exports.getNodeInfo = async function (name) {
    return await axios.get(`https://www.v2ex.com/api/nodes/show.json?name=${name}`)
        .then(res => res.data);
}



exports.getAllNodeName = async function getAllNodeName() {
    const response = await axios.get("https://www.v2ex.com/api/nodes/all.json")
        .then(json => {
            return json.data.map(val => ({ nodeName: val.name, title: val.title, nodeId: val.id }));
        });
    return response;
}
// getAllNodeName().then(res => console.log(res));



// 用户主页
// 获得指定用户的自我介绍，及其登记的社交网站信息。
// https://www.v2ex.com/api/members/show.json
// Method: GET
// Authentication: None
// 接受以下参数之一：
// username: 用户名
// id: 用户在 V2EX 的数字 ID
// 例如：
// https://www.v2ex.com/api/members/show.json?username=Livid
// https://www.v2ex.com/api/members/show.json?id=1
// exports.getUserInfo = async function getUserInfo(username) {

// };