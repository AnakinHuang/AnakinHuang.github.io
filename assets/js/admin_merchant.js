function searchNewMessages() {
    const filter = document.getElementById('newMessageSearch').value.toLowerCase();
    const rows = document.querySelectorAll("#newMessagesTableBody tr");
    rows.forEach(row => {
        const messageId = row.cells[0].textContent.toLowerCase();
        row.style.display = messageId.includes(filter) ? '' : 'none';
    });
}

function searchResolvedMessages() {
    const filter = document.getElementById('resolvedMessageSearch').value.toLowerCase();
    const rows = document.querySelectorAll("#resolvedMessagesTableBody tr");
    rows.forEach(row => {
        const messageId = row.cells[0].textContent.toLowerCase();
        row.style.display = messageId.includes(filter) ? '' : 'none';
    });
}

function resolveMessage(id) {
    alert('Message ' + id + ' resolved.');
    // You can update the backend and move this message to the "Resolved" section
}

function ignoreMessage(id) {
    alert('Message ' + id + ' ignored.');
    // You can update the backend to mark this message as ignored or remove it from the list
}

function searchInventory() {
    const filter = document.getElementById('inventorySearch').value.toLowerCase();
    const rows = document.querySelectorAll("#inventoryTableBody tr");
    rows.forEach(row => {
        const itemName = row.cells[0].textContent.toLowerCase();
        row.style.display = itemName.includes(filter) ? '' : 'none';
    });
}

function searchCustomer() {
    const filter = document.getElementById('customerSearch').value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
        const nameCell = row.cells[0].querySelector('input').value.toLowerCase();
        row.style.display = nameCell.includes(filter) ? '' : 'none';
    });
}

function updatePrice(itemId) {
    const itemSelect = document.getElementById(`item-${itemId}`);
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const quantity = document.getElementById(`quantity-${itemId}`).value;
    document.getElementById(`price-${itemId}`).textContent = `$${(price * quantity).toFixed(2)}`;
}

function updateTotal(itemId) {
    updatePrice(itemId);
}

function saveReservation() {
    alert('Reservation saved!');
    // Redirect back to the reservations list after saving
    window.location.href = './reservations.html';
}

function saveOrder() {
    alert('Order saved!');
    // Redirect back to the order list or reservation page after saving
    window.location.href = './orders.html';
}

let itemCount = 2;

function addItem() {
    itemCount++;
    const newItemRow = document.createElement('div');
    newItemRow.classList.add('item-row');
    newItemRow.setAttribute('data-item-id', itemCount);
    newItemRow.innerHTML = `
                <label for="item-${itemCount}">Item ${itemCount}:</label>
                <select id="item-${itemCount}" onchange="updatePrice(${itemCount})">
                    <option value="Kung Pao Chicken" data-price="20.00">Kung Pao Chicken - $20.00</option>
                    <option value="Spring Rolls" data-price="3.00">Spring Rolls - $3.00</option>
                    <option value="Fried Rice" data-price="10.00">Fried Rice - $10.00</option>
                    <option value="Sweet and Sour Pork" data-price="15.00">Sweet and Sour Pork - $15.00</option>
                </select>
                <input type="number" id="quantity-${itemCount}" value="1" min="1" onchange="updateTotal(${itemCount})">
                <span id="price-${itemCount}">$20.00</span>
            `;
    document.getElementById('order-items').appendChild(newItemRow);
}

function removeItem() {
    if (itemCount > 1) {
        const lastItem = document.querySelector(`[data-item-id="${itemCount}"]`);
        lastItem.remove();
        itemCount--;
    }
}

function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    row.remove();
    alert('Customer removed!');
}
