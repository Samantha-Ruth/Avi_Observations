async function newFormHandler(event) {
    event.preventDefault();

    const observations_name = document.querySelector('input[name="observations_name"]').value;

    const response = await fetch(`/api/observationss`, {
        method: 'POST',
        body: JSON.stringify({
            observations_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-observations-form').addEventListener('submit', newFormHandler);
