async function deleteFormHandler(event) {
    event.preventDefault();

    const observations_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/observations/${observations_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-observations-btn').addEventListener('click', deleteFormHandler);
