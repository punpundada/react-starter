import axios from "axios"

export const axisInstance = axios.create({
    headers:{
        "Content-Type":"application/json",
    },
    baseURL:import.meta.env.VITE_BASE_URL
})