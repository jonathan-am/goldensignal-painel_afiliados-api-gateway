const { default: axios } = require("axios")

module.exports = async function requestUpdateConfiguration(req, res) {
    await axios.post('http://localhost:5555/panel/configuration', JSON.stringify(req.body), {headers: {"affiliateid": req.headers.affiliateid, "Content-Type": "application/json"}}).then(response => {
        res.status(200).send({"status": "success"});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: "500", error: "Error updating configuration"});
    })
}