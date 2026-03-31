window.renderAdmin = function() {
const orders = window.LuminaStorage.getOrders();
window.handleProofUpload = function(orderId, input) {
const file = input.files[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => {
window.LuminaStorage.updateOrder(orderId, { proofImage: reader.result });
alert("Proof of purchase uploaded.");
window.renderAdmin();
};
reader.readAsDataURL(file);
}
};
window.saveTracking = function(orderId) {
const num = document.getElementById(`tr-num-${orderId}`).value;
const carrier = document.getElementById(`tr-car-${orderId}`).value;
window.LuminaStorage.updateOrder(orderId, {
trackingNumber: num,
trackingCarrier: carrier,
status: 'Shipped'
});
alert("Tracking updated.");
window.renderAdmin();
};
const html = `
<div class="max-w-7xl mx-auto px-6 py-20 fade-in">
<div class="flex justify-between items-end mb-16">
<div>
<h1 class="text-5xl font-bold tracking-tighter">Fulfillment.</h1>
<p class="text-gray-400 mt-2">Upload receipts and add tracking numbers.</p>
</div>
<button onclick="location.reload()" class="text-sm font-bold border-b-2 border-black pb-1">Storefront</button>
</div>
<div class="grid gap-8">
${orders.length === 0 ? '<p class="text-center py-20 text-gray-300">No orders to fulfill.</p>' : ''}
${orders.reverse().map(order => `
<div class="bg-gray-50 p-10 rounded-[40px] border border-gray-100 shadow-sm">
<div class="flex flex-wrap justify-between gap-10">
<div class="flex gap-6">
<img src="${order.productImg}" class="w-20 h-20 bg-white rounded-3xl p-2 object-contain">
<div>
<p class="text-[10px] font-black uppercase text-gray-400 mb-1">${order.id}</p>
<h3 class="font-bold text-xl">${order.productName}</h3>
<p class="text-sm text-gray-400">${order.customer}</p>
</div>
</div>
<div class="flex-1 min-w-[300px] grid md:grid-cols-2 gap-8">
<div class="space-y-3">
<p class="text-xs font-black uppercase tracking-widest text-gray-400">Proof of Purchase</p>
<input type="file" onchange="handleProofUpload('${order.id}', this)" class="text-xs">
${order.proofImage ? `<img src="${order.proofImage}" class="w-16 h-16 object-cover rounded-lg border border-green-200">` : ''}
</div>
<div class="space-y-3">
<p class="text-xs font-black uppercase tracking-widest text-gray-400">Tracking Details</p>
<div class="flex flex-col gap-2">
<input id="tr-num-${order.id}" type="text" placeholder="Tracking #" value="${order.trackingNumber || ''}" class="p-3 bg-white border border-gray-200 rounded-xl text-sm">
<select id="tr-car-${order.id}" class="p-3 bg-white border border-gray-200 rounded-xl text-sm">
<option value="">Select Carrier</option>
<option ${order.trackingCarrier === 'DHL' ? 'selected' : ''}>DHL</option>
<option ${order.trackingCarrier === 'GIG Logistics' ? 'selected' : ''}>GIG Logistics</option>
<option ${order.trackingCarrier === 'Other' ? 'selected' : ''}>Other</option>
</select>
<button onclick="saveTracking('${order.id}')" class="bg-black text-white py-3 rounded-xl text-xs font-bold">Update Shipment</button>
</div>
</div>
</div>
</div>
</div>
`).join('')}
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
};
