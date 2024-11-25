function toggleEditableFieldsAndVisibility() {
    const status = document.getElementById('status').value;
    const isPlaced = status === 'placed';
    const isPending = status === 'pending';
    const addOrderItemDiv = document.getElementById('addOrderItemDiv');

    // Enable/disable inputs and buttons based on status
    document.querySelectorAll('#orderTableBody button').forEach(el => {
        el.disabled = !isPlaced;
    });

    document.querySelectorAll('#reservationEditDiv button, #associatedOrderDiv button').forEach(el => {
        el.disabled = !isPending;
    });

    // Enable/disable add form fields
    document.querySelectorAll('#addOrderItemForm select, #addOrderItemForm input, #addOrderItemForm button').forEach(el => {
        el.disabled = !isPlaced;
    });

    document.querySelectorAll('#reservationEditDiv input, #reservationEditDiv select').forEach(el => {
        if (el.id !== 'customer-name' && el.id !== 'status') {
            el.disabled = !isPending;
        }
    });

    // Show/hide add form based on status
    if (isPlaced) {
        addOrderItemDiv.style.display = 'block'; // Show the div
    } else {
        addOrderItemDiv.style.display = 'none'; // Hide the div
    }
}

// Initialize on page load
window.onload = () => {
    toggleEditableFieldsAndVisibility();

    // Add event listener to status dropdown
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.addEventListener('change', toggleEditableFieldsAndVisibility);
    }
};
