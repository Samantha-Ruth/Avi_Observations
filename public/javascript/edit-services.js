async function editFormHandler(event) {
    event.preventDefault();

    const observations_name = document.querySelector('input[name="observations_name"]').value.trim();

    const observations_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/observations/${observations_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            observations_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-observations-form').addEventListener('submit', editFormHandler);
