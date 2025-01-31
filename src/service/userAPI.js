import axios from "axios";

export const allUserPosts = async () => {
    try {
        const response = await axios.get(`/api/admin/users`);

        return response.data;
    } catch (error) {
        throw new Error("조회 실패함" + error.message);
    }
};