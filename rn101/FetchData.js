

export default {
    async fetchUsers() {
        try {
                let response = await fetch('http://127.0.0.1:8081/components/users.json');
                let responseJsonData = await response.json();
                return responseJsonData.users;
            }
        catch(e) {
            console.log(e)
        }
    }
}