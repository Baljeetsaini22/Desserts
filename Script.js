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

        // Adjust quantity
        function adjustQuantity(id, change) {
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
                updateCart();
            }
        }

        // Confirm order
        function confirmOrder() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderSummary = cart.map(item => 
                `${item.name} - ${item.price} x ${item.quantity}`
            ).join('\n');
            
            alert(`Order Confirmed!\n\nItems:\n${orderSummary}\n\nTotal: ₹${total.toFixed(2)}`);
            cart = [];
            updateCart();
        }

        // Update cart display and total
        function updateCart() {
            const cartContainer = document.getElementById('cartContainer');
            const totalElement = document.getElementById('cartTotal');
            const orderNow = document.getElementById('cartOrder');

            // Display cart items
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                    <div class="quantity-controls">
                        <button class="btn quantity-btn" onclick="adjustQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn quantity-btn" onclick="adjustQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');

            // Calculate and display total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalElement.textContent = total.toFixed(2);

            // Update confirm order button
            orderNow.innerHTML = cart.length > 0 ? `
                <button class="btn order-btn" onclick="confirmOrder()">Confirm Order</button>
            ` : '';
        }