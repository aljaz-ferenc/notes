const API_URL = import.meta.env.VITE_API_URL

export async function verifyUser() {
    console.log(API_URL)
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
            body: null
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function loginUser(userData) {
    const { email, password } = userData

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function registerUser(userData) {
    const { email, password, passwordConfirm } = userData

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, passwordConfirm }),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}