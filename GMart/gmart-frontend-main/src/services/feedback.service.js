import axios from 'axios';

const BASE_URL = "http://localhost:9090/feedback";

class FeedbackService{
    register(feedback){
        return axios.post(BASE_URL,feedback);
    }
}

export default new FeedbackService();