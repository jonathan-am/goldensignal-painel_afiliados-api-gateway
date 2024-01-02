const { default: axios } = require("axios")

module.exports = async function requestPlataformList(req, res) {
    await axios.get('http://localhost:5555/panel/plataforms', { headers: { "affiliateid": req.headers.affiliateid , "Content-Type": "application/json"}}).then((response)=> {
        res.status(200).send(response.data);
    }).catch(error=> {
        console.log(error);
        res.status(500).send({ status: "500", error: "Error while getting plataforms"});
    });
}