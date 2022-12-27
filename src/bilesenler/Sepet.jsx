import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { KitaplarContext } from "../App";

const Sepet = () => {
  const context = useContext(KitaplarContext);

  const toplamSepetTutari = context.kitaplar.sepet
    .reduce((toplam, kitap) => (toplam = toplam + kitap.price * kitap.sayac), 0)
    .toFixed(2);

  const toplamSepetSayisi = context.kitaplar.sepet.reduce(
    (toplam, kitap) => (toplam = toplam + kitap.sayac),
    0
  );

  console.log("toplamSepetSayisi", toplamSepetSayisi);
  return (
    <div>
      <h2>
        <Link to='/'>Kitap Listesi</Link>
        <span>
          Sepetim ({toplamSepetSayisi}) <br />
          Toplam Sepet Tutarı: &#8378;
          {toplamSepetTutari}
        </span>
      </h2>

      {context.kitaplar.sepet.map((book) => (
        <div className='book' key={book.id}>
          <img src={book.image} alt={book.name} />
          <div>
            <h4>{book.name}</h4>
            <p>Yazar: {book.name}</p>
            <p>Fiyat: &#8378;{book.price}</p>
            <p>Toplam: &#8378;{(book.price * book.sayac).toFixed(2)}</p>
            <p>Sepetinizde bu kitaptan toplam {book.sayac} adet var.</p>
            <button onClick={() => context.azalt(book.id)}>-</button>
            <button onClick={() => context.sepettenCikar(book.id)}>
              Sepetten Çıkar
            </button>
            <button onClick={() => context.arttir(book.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sepet;
