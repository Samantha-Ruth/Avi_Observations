async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/observers/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const observer_name = document.querySelector('#observer_name-signup').value.trim();
    const observer_url = document.querySelector('#observer_url-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const address = document.querySelector('#address-signup').value.trim();
    const address_city =  document.querySelector('#address_city-signup').value.trim();
    const address_state = document.querySelector('#address_state-signup').value.trim();
    const address_zip = document.querySelector('#address_zip-signup').value.trim();
    const specialization = document.querySelector('#specialization-signup').value.trim();


    if (observer_name && email && password) {
        const response = await fetch('/api/observers', {
            method: 'post',
            body: JSON.stringify({
                observer_name,
                observer_url,
                email,
                password,
                address,
                address_city,
                address_state,
                address_zip,
                specialization
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
