import axios from 'axios';


export const getSlots = (req, res) => {

    const { params: {date, pin } } = req;

    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`, {
    headers: {
        'Accept-Language': 'hi_IN',
        'accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
})
    .then((response) => {
        console.log(response.data);
        res.send(response.data);
    })
    .catch((error) => console.log(error));
}


