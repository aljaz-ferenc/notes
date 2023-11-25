import { json } from "react-router"

const API_URL = import.meta.env.VITE_API_URL

export async function authenticateUser() {
    try {
        const response = await fetch(`${API_URL}/auth`, {
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

export async function updateNote(noteId, updatedFields) {
    console.log(updatedFields)
    try {
        const response = await fetch(`${API_URL}/notes/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedFields)
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteNote(noteId) {
    try {
        const response = await fetch(`${API_URL}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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

export async function createNewNote(noteData) {
    try {
        const response = await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(noteData)
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function updatePassword(passData) {
    try {
        const response = await fetch(`${API_URL}/auth/updatePassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(passData)
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function logoutUser() {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

export async function getAllUsers() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getUser(userId) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getNotesByUser(userId) {
    try {
        const response = await fetch(`${API_URL}/notes/users/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getNoteById(noteId) {
    try {
        const response = await fetch(`${API_URL}/notes/${noteId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}

