import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KitaplarContext } from "../App";

const Urunler = (props) => {
  const context = useContext(KitaplarContext);

  const toplamSepetSayisi = context.kitaplar.sepet.reduce(
    (toplam, kitap) => (toplam = toplam + kitap.sayac),
    0
  );

  const toplamSepetTutari = context.kitaplar.sepet
    .reduce((toplam, kitap) => (toplam = toplam + kitap.price * kitap.sayac), 0)
    .toFixed(2);

  return (
    <div>
      <h2>
        <span>Kitap Listesi</span>
        <span>
          <Link to='/sepet'>Sepetim ({toplamSepetSayisi})</Link>
          <br />
          Toplam Sepet Tutarı: &#8378;
          {toplamSepetTutari}
        </span>
      </h2>

      {context.kitaplar.kitapListesi.map((book) => (
        <div className='book' key={book.id}>
          <img src={book.image} alt={book.name} />

          <div>
            <h4>{book.name}</h4>
            <p>Yazar: {book.author}</p>
            <p>Fiyat: &#8378; {book.price}</p>
            <button onClick={() => context.sepeteEkle(book)}>
              Sepete Ekle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Urunler;
