import axios from "axios";

const FetchUsers = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: { "Content-Type": "application/json" },
});

FetchUsers.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// FetchUsers.interceptors.response.use(
//     (response) => {
      
//         return response;
//     },
//     (error) => {
        
//         if (error.response && error.response.status === 401) {
           
//             localStorage.removeItem("token");
//             alert("Session expired. Please log in again.");
//         } else {
         
//             alert(error.response?.data?.message || "An error occurred.");
//         }
        
//         return Promise.reject(error);
//     }
// );

export const fetchUserData = async () => {
    const response = await axios.get("https://dummyjson.com/users"); 
    return response.data;
};

export const loginUser = async (formData) => {
    const response = await FetchUsers.post("/login", formData);
    return response.data;  
};

export const fetchAllUsers = async () => {
    const response = await axios.get("https://67eb80a4aa794fb3222a7536.mockapi.io/users/user", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

export const addUser = async (newUser) => {
    const response = await axios.post("https://67eb80a4aa794fb3222a7536.mockapi.io/users/user", newUser, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${"https://67eb80a4aa794fb3222a7536.mockapi.io/users/user"}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

export const updateUser = async (updatedUser) => {
    const response = await axios.put(`${"https://67eb80a4aa794fb3222a7536.mockapi.io/users/user"}/${updatedUser.id}`, updatedUser, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};