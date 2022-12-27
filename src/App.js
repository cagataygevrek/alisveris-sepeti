import React, { createContext, useState } from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Urunler from "./bilesenler/Urunler";
import Sepet from "./bilesenler/Sepet";
import { veri } from "./veri";

export const KitaplarContext = createContext();

export default function App() {
  const [kitaplar, kitaplariGuncelle] = useState({
    kitapListesi: veri,
    sepet: [],
  });

  const sepeteEkle = (book) =>
    kitaplariGuncelle({
      ...kitaplar,
      sepet: kitaplar.sepet.find((sepetOgeleri) => sepetOgeleri.id === book.id)
        ? kitaplar.sepet.map((sepetOgeleri) =>
            sepetOgeleri.id === book.id
              ? { ...sepetOgeleri, sayac: sepetOgeleri.sayac + 1 }
              : sepetOgeleri
          )
        : [...kitaplar.sepet, { ...book, sayac: 1 }],
    });

  const arttir = (id) => {
    kitaplariGuncelle({
      ...kitaplar,
      sepet: kitaplar.sepet.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, sayac: cartItem.sayac + 1 }
          : cartItem
      ),
    });
  };

  const azalt = (id) => {
    kitaplariGuncelle({
      ...kitaplar,
      sepet: kitaplar.sepet.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, sayac: cartItem.sayac > 1 ? cartItem.sayac - 1 : 1 }
          : cartItem
      ),
    });
  };

  const sepettenCikar = (id) =>
    kitaplariGuncelle({
      ...kitaplariGuncelle,
      sepet: kitaplar.sepet.filter((cartItem) => cartItem.id !== id),
    });

  return (
    <BrowserRouter>
      <KitaplarContext.Provider
        value={{ kitaplar: kitaplar, sepeteEkle, arttir, azalt, sepettenCikar }}
      >
        <div className='App'>
          <h1>
            <img src='https://i.hizliresim.com/eympt2j.' alt='Kitap Listesi' />
            Yazılım Kitapları
          </h1>
          <Routes>
            <Route path='/' element={<Urunler />} />
            <Route path='/sepet' element={<Sepet />} />
          </Routes>
        </div>
      </KitaplarContext.Provider>
    </BrowserRouter>
  );
}
