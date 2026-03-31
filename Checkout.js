window.renderCheckout = function(product) {
const rate = 1650;
const itemNGN = product.price.value * rate;
const shipping = 35000;
const total = itemNGN + shipping + (itemNGN * 0.12);
const html = `
<div class="max-w-6xl mx-auto px-6 py-20 fade-in">
<div class="grid lg:grid-cols-2 gap-20">
<div>
<h2 class="text-4xl font-bold mb-10 tracking-tight">Delivery Address</h2>
<form id="pay-form" class="space-y-4">
<input type="text" id="cust-name" placeholder="Full Name" class="w-full p-5 bg-gray-50 rounded-2xl outline-none" required>
<input type="email" id="cust-email" placeholder="Email Address" class="w-full p-5 bg-gray-50 rounded-2xl outline-none" required>
<textarea id="cust-addr" placeholder="Nigerian Street Address" class="w-full p-5 bg-gray-50 rounded-2xl h-32 outline-none" required></textarea>
<button type="submit" class="w-full py-6 bg-green-600 text-white rounded-full font-bold text-xl mt-6 hover:bg-green-700 transition-all">
Pay ₦${total.toLocaleString()} with Paystack
</button>
</form>
<button onclick='window.LuminaStorage.saveProduct(${JSON.stringify(product).replace(/'/g, "&apos;")})' class="w-full py-4 mt-4 border-2 border-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all">
Save for Later
</button>
</div>
<div class="bg-gray-50 p-10 rounded-[40px]">
<img src="${product.main_image}" class="w-24 h-24 object-contain rounded-xl mb-6 bg-white p-2">
<h3 class="text-xl font-bold mb-2">${product.name}</h3>
<p class="text-gray-400 text-sm mb-8">Estimated Delivery: 7-14 Working Days</p>
<div class="flex justify-between items-baseline pt-6 border-t border-gray-200">
<span class="text-gray-400 uppercase text-xs font-bold">Total</span>
<span class="text-5xl font-bold tracking-tighter">₦${total.toLocaleString()}</span>
</div>
</div>
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
document.getElementById('pay-form').onsubmit = (e) => {
e.preventDefault();
const handler = PaystackPop.setup({
key: 'pk_test_26bf9727fc629e0c7b7da9d7208a43609de8a678',
email: document.getElementById('cust-email').value,
amount: Math.round(total * 100),
currency: 'NGN',
callback: function(response) {
const saved = window.LuminaStorage.saveOrder({
productName: product.name,
productImg: product.main_image,
total: total,
customer: document.getElementById('cust-name').value,
productOriginal: product
});
window.renderSuccess(saved.total, saved.id);
}
});
handler.openIframe();
};
};
