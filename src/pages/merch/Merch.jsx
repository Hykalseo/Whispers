import React from 'react';
import './Merch.css';

const merchList = [
  {
    id: 1,
    name: 'T-Shirt Whispers',
    price: 'Rp 120.000',
    image: '/images/merch/tshirt.jpg',
    description: 'Kaos eksklusif pertunjukan Whispers. Bahan cotton combed 30s, nyaman dipakai sehari-hari.',
  },
  {
    id: 2,
    name: 'Totebag Whispers',
    price: 'Rp 85.000',
    image: '/images/merch/totebag.jpg',
    description: 'Totebag kanvas berkualitas tinggi dengan cetakan logo Whispers.',
  },
  {
    id: 3,
    name: 'Poster A3 Whispers',
    price: 'Rp 25.000',
    image: '/images/merch/poster.jpg',
    description: 'Poster eksklusif ukuran A3, cocok untuk koleksi dinding kamar atau ruang kerja.',
  },
];

function Merch() {
  const handlePreOrder = (item) => {
    const message = `Halo Admin, saya ingin pre-order merchandise:\n\n${item.name}\nHarga: ${item.price}\n\nNama saya: \nAlamat pengiriman: \nMetode pembayaran: `;
    const whatsappLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <main className="merch-container">
      <h1 className="merch-title">🛍️ Merchandise Resmi Whispers</h1>
      <p className="merch-subtitle">Pre-order sekarang untuk mendukung produksi kami dan mendapatkan koleksi eksklusif!</p>

      <div className="merch-grid">
        {merchList.map((item) => (
          <div key={item.id} className="merch-card">
            <img src={item.image} alt={item.name} className="merch-image" />
            <div className="merch-info">
              <h2 className="merch-name">{item.name}</h2>
              <p className="merch-price">{item.price}</p>
              <p className="merch-description">{item.description}</p>
              <button className="merch-button" onClick={() => handlePreOrder(item)}>Pre-Order</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Merch;
