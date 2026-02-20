document.addEventListener('DOMContentLoaded', () => {
	const cartList = document.getElementById('cart-list');
	const cartEmptyMsg = document.getElementById('cart-empty-msg');
	const clearCartBtn = document.getElementById('clear-cart-btn');

	let cart = JSON.parse(localStorage.getItem('cart') || '[]');

	function save() {
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	function render() {
		cartList.innerHTML = '';
		
		// Show/hide empty message and clear button
		if (cart.length === 0) {
			cartEmptyMsg.style.display = 'block';
			clearCartBtn.style.display = 'none';
		} else {
			cartEmptyMsg.style.display = 'none';
			clearCartBtn.style.display = 'block';
		}

		cart.forEach(item => {
			const li = document.createElement('li');
			li.className = 'cart-item';

			const info = document.createElement('div');
			info.className = 'cart-item-info';

			const title = document.createElement('div');
			title.className = 'cart-item-title';
			title.textContent = item.title;

			const meta = document.createElement('div');
			meta.className = 'cart-item-meta';
			meta.textContent = item.meta;

			info.appendChild(title);
			info.appendChild(meta);

			const actions = document.createElement('div');
			actions.className = 'cart-actions';

			const del = document.createElement('button');
			del.type = 'button';
			del.textContent = 'Delete';
			del.className = 'delete-btn';
			del.addEventListener('click', () => {
				cart = cart.filter(c => c.id !== item.id);
				save();
				render();
			});

			actions.appendChild(del);

			li.appendChild(info);
			li.appendChild(actions);

			cartList.appendChild(li);
		});
	}

	// Add event listeners to all Apply Now buttons
	const applyButtons = document.querySelectorAll('.apply-btn');
	applyButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			
			// Get the parent job-card element
			const jobCard = btn.closest('.job-card');
			
			// Extract job information
			const title = jobCard.querySelector('h3').textContent;
			const meta = jobCard.querySelector('.meta').textContent;
			
			// Create cart item
			const cartItem = {
				id: Date.now(),
				title: title,
				meta: meta
			};

			// Check if job is already in cart
			const isAlreadyInCart = cart.some(item => item.title === title && item.meta === meta);
			
			if (!isAlreadyInCart) {
				cart.unshift(cartItem);
				save();
				render();
				alert(`"${title}" has been added to your cart!`);
			} else {
				alert('This job is already in your cart!');
			}
		});
	});

	// Clear cart button functionality
	clearCartBtn.addEventListener('click', () => {
		cart = [];
		save();
		render();
	});

	render();
});
