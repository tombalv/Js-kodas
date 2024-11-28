document.addEventListener("DOMContentLoaded", () => {
    const orderList = document.querySelector(".order-list");
    const totalDisplay = document.getElementById("total");
    let total = 0;

    // Load saved orders from localStorage
    function loadOrders() {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        total = parseFloat(localStorage.getItem("total")) || 0;

        savedOrders.forEach(order => {
            const orderItem = document.createElement("li");
            orderItem.innerHTML = `
                ${order.name} - $${order.price.toFixed(2)}
                <button class="remove">Remove</button>
            `;
            orderList.appendChild(orderItem);

            // Add remove functionality to each item
            orderItem.querySelector(".remove").addEventListener("click", () => {
                removeOrder(order, orderItem);
            });
        });

        totalDisplay.textContent = total.toFixed(2);
    }

    // Save orders to localStorage
    function saveOrders() {
        const orderItems = [...orderList.children].map(item => {
            const [name, price] = item.textContent.split(" - $");
            return {
                name: name.trim(),
                price: parseFloat(price)
            };
        });
        localStorage.setItem("orders", JSON.stringify(orderItems));
        localStorage.setItem("total", total.toFixed(2));
    }

    // Add order to the list and localStorage
    function addOrder(dishName, dishPrice) {
        const orderItem = document.createElement("li");
        orderItem.innerHTML = `
            ${dishName} - $${dishPrice.toFixed(2)}
            <button class="remove">Remove</button>
        `;
        orderList.appendChild(orderItem);

        // Update total and save to localStorage
        total += dishPrice;
        totalDisplay.textContent = total.toFixed(2);
        saveOrders();

        // Add remove functionality
        orderItem.querySelector(".remove").addEventListener("click", () => {
            removeOrder({ name: dishName, price: dishPrice }, orderItem);
        });
    }

    // Remove order from the list and localStorage
    function removeOrder(order, orderItem) {
        orderItem.remove();
        total -= order.price;
        totalDisplay.textContent = total.toFixed(2);
        saveOrders();
    }

    // Attach event listeners to all "Add" buttons
    const addButtons = document.querySelectorAll(".add-to-order");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const dishCard = e.target.parentElement;
            const dishName = dishCard.querySelector("h3").textContent;
            const dishPrice = parseFloat(dishCard.querySelector("p:nth-child(3)").textContent.replace('$', ''));

            addOrder(dishName, dishPrice);
        });
    });

    // Load saved orders when the page loads
    loadOrders();
});
