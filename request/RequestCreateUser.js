const { default: axios } = require("axios");

module.exports = async function requestCreateUser(req, res) {
    await axios.post(`http://localhost:5555/v1/user`, req.body, {headers: {"Content-Type": "application/json"}}).then(async (response)=> {
        await res.status(200).send(response.data);
    }).catch(error=> {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
}