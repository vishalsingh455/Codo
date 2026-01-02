import axios from "../utils/axiosInstance";

export const createCompetition = (data) =>
    axios.post("/competition", data);

export const joinCompetition = (code) =>
    axios.post("/competition/join", { code });

export const getMyCompetitions = () =>
    axios.get("/competition/my");
