import axios from "axios";


export const getYoutubeTitle = async (videoId, apiKey = "AIzaSyC1YWL8dlr_TJtqaA-P1XZ3ay9HZze7_8M") => { 
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`
    const response = await axios.get(url);
    const data = await response.data;
    return {
        title: data.items[0].snippet.title,
        channelName:data.items[0].snippet.channelTitle
    }
}   