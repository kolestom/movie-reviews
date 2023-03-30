import axios from 'axios'
const sendCode = async(code) => {
    // const resp = await axios.post('http://localhost:3004/api/login', {
    const resp = await axios.post('https://movie-reviews-znfor.ondigitalocean.app/api/login', {
                code
            })
    return resp.data;
}
 
export default sendCode;