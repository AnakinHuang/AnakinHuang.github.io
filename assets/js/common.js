function switchLanguage() {
    // Handle all elements with the data-lang attribute
    const elements = document.querySelectorAll("[data-lang]");

    elements.forEach(element => {
        // Check if the element has direct children (e.g., spans inside an <a>)
        if (element.querySelector("#message-text")) {
            // Update only the message-text, leaving message-count intact
            const messageText = element.querySelector("#message-text");
            const currentLang = messageText.textContent.trim();
            messageText.textContent = currentLang === element.dataset.en.trim()
                ? element.dataset.zh
                : element.dataset.en;
        } else {
            // Update other elements with data-lang
            const currentLang = element.textContent.trim();
            element.textContent = currentLang === element.dataset.en.trim()
                ? element.dataset.zh
                : element.dataset.en;
        }
    });
}

function logout() {
    if (window.location.href.includes('vip')) {
        window.location.href = '../../index.html';
    } else {
        window.location.href = '../index.html';
    }
}

function searchReservations() {
    const filter = document.getElementById('reservationSearch').value.toLowerCase();
    const rows = document.querySelectorAll("#reservationsTableBody tr");
    rows.forEach(row => {
        const reservationId = row.cells[0].textContent.toLowerCase();
        row.style.display = reservationId.includes(filter) ? '' : 'none';
    });
}

function searchOrders() {
    const filter = document.getElementById('orderSearch').value.toLowerCase();
    const rows = document.querySelectorAll("#ordersTableBody tr");
    rows.forEach(row => {
        const orderId = row.cells[0].textContent.toLowerCase();
        row.style.display = orderId.includes(filter) ? '' : 'none';
    });
}

function searchMenu() {
    const filter = document.getElementById('menuSearch').value.toLowerCase();
    const rows = document.querySelectorAll("#menuTableBody tr");
    rows.forEach(row => {
        const dishName = row.cells[0].querySelector('input').value.toLowerCase();
        row.style.display = dishName.includes(filter) ? '' : 'none';
    });
}

function viewOrEditReservation(id) {
    window.location.href = './reservation_example.html';
}

function viewOrEditOrder(id) {
    window.location.href = './order_example.html';
}

function toggleEdit(button, rowId) {
    const row = document.getElementById(rowId);
    const inputs = row.querySelectorAll('input, select');

    if (button.innerText === "Edit") {
        // Enable editing
        inputs.forEach(input => input.removeAttribute('disabled'));
        button.innerText = "Save Changes";
        button.classList.add('save-button');
    } else {
        // Disable editing and save changes
        inputs.forEach(input => input.setAttribute('disabled', true));
        button.innerText = "Edit";
        button.classList.remove('save-button');
        alert('Changes saved successfully!');
    }
}


