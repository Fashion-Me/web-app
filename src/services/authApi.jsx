import axios from "axios";

const api = axios.create({
    baseURL: "https://easyfashion.merlottera.com",
    withCredentials: true,
});

/* -------------------- INTERCEPTOR -------------------- */
let isRefreshing = false;
let queue = [];

function processQueue(error) {
    queue.forEach(({ reject }) => (error ? reject(error) : reject()));
    queue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response, config } = error;

        // Se não for 401, devolve o erro normalmente
        if (!response || response.status !== 401) {
            return Promise.reject(error);
        }

        // Se já tentamos nesta request, não tente de novo
        if (config._retry) {
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // Não tente refresh no próprio /auth/refresh ou /auth/login
        if (config.url.includes("/auth/refresh") || config.url.includes("/auth/login")) {
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // Se outro refresh já está em andamento, fila essa request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject });
            })
                .then(() => api(config)) // repete depois que o refresh terminar
                .catch(Promise.reject);
        }

        // Marca e dispara refresh
        config._retry = true;
        isRefreshing = true;

        try {
            await api.post("/auth/refresh");
            isRefreshing = false;
            processQueue(null);
            return api(config); // repete a requisição original
        } catch (refreshErr) {
            isRefreshing = false;
            processQueue(refreshErr);
            window.location.href = "/login";
            return Promise.reject(refreshErr);
        }
    }
);

export default api;