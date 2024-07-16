// place files you want to import through the `$lib` alias in this folder.
export function handleFetchError(status) {
    if (status === 403 || status === 401) {
        redirectToLogin();
    } else {
        console.error('Failed to fetch data');
    }
}

export function redirectToLogin() {
    localStorage.removeItem('MutterCorp');
    window.location.href = '/login';
}