const TOKEN_KEY = 'token'

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

const delToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export {
    getToken,
    setToken,
    delToken
}