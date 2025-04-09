let cart = [];

        // Add item to cart
        function addToCart(id, name, price) {
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
        }

        // Remove item from cart
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }

        // Update cart display and total
        function updateCart() {
            const cartContainer = document.getElementById('cartContainer');
            const totalElement = document.getElementById('cartTotal');

            // Display cart items
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <span> ${item.name} - ${item.price} x ${item.quantity}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');

            // Calculate and display total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalElement.textContent = total.toFixed(2);
        }
