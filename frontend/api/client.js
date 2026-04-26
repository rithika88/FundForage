// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

// // ---------------- AUTH ----------------
// export const authAPI = {
//     login: (data) => API.post("/auth/login", data),
//     signup: (data) => API.post("/auth/signup", data),
// };

// // ---------------- CAMPAIGNS ----------------
// export const campaignsAPI = {
//     getAll: () => API.get("/campaigns"),
//     getById: (id) => API.get(`/campaigns/${id}`),
//     create: (data, token) =>
//         API.post("/campaigns", data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }),
// };

// // ---------------- MOCK DATA (optional) ----------------
// export const MOCK_CAMPAIGNS = [];
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// ---------------- AUTH ----------------
export const authAPI = {
    // login expects { email, password }
    login: (data) => API.post("/auth/login", data),

    // signup expects { name, email, password }
    signup: (data) => API.post("/auth/signup", data),

    // 🔥 THIS WAS MISSING (caused black screen)
    getMe: (token) =>
        API.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
};


// ---------------- CAMPAIGNS ----------------
export const campaignsAPI = {
    getAll: () => API.get("/campaigns"),

    getById: (id) => API.get(`/campaigns/${id}`),

    create: (data, token) =>
        API.post("/campaigns", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    pledge: (id, amount, token) =>
        API.post(
            `/campaigns/${id}/pledge`,
            { amount },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ),
};
export const pledgeAPI = {
    create: (data, token) =>
        API.post("/pledges", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
};

// ---------------- MOCK DATA (optional) ----------------
export const MOCK_CAMPAIGNS = [];