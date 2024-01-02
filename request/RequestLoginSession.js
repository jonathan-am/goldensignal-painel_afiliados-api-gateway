const { default: axios } = require("axios")

module.exports = async function requestLoginSession(req, res) {
    await axios.post('http://localhost:5555/v1/user/login', req.body, {headers: { "Content-Type": "application/json"}}).then(response => {
        res.status(200).send(response.data);
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: "500", error: "Error on perform login"});
    })
}