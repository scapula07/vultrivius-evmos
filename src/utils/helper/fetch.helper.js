import axios from "axios";

const fetchData = async (...args) => {
    const res = await axios.get(...args);
    return await res.data;
}

export default fetchData