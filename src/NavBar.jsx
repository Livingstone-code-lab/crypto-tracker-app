import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar({searchInput, setSearchInput, selectCurrency, setSelectCurrency, selectLanguage, setSelectLanguage}) {
 
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    let sign;

    return (
         <nav className="fixed top-0 left-0 w-full bg-white flex justify-between items-center px-4 py-3 z-50">
            <h3 className="text-2xl font-bold">CryptoMarket</h3>
             

            <div className="hidden md:flex items-center gap-8">

             <div>
               <input className="w-auto outline outline-2 rounded-xs placeholder:text-xs p-1 text-xs outline-gray-100" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="🔍 Search cryptocurrency" />
             </div>

            <div className="flex gap-5 text-xs font-normal">
            <Link to="/">Homepage</Link>
            <Link to="/news">News</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/watchlist">Watchlist</Link>
            </div>
            
            <div className="text-xs font-medium">
            <select value={selectCurrency.code} onChange={(e) => {{
               if (e.target.value === "NGN") {
                 sign = "₦";
               } else if (e.target.value === "EUR") {
                 sign = "€";
               } else if (e.target.value === "GBP") {
                 sign = "£";
               } else if (e.target.value === "JPY") {
                 sign = "¥";
               } else if (e.target.value === "CAD") {
                 sign = "C$";
               } else if (e.target.value === "AUD") {
                 sign = "A$";
               } else if (e.target.value === "CNY") {
                 sign = "¥";
               } else {
                sign = "$";
               }
            };
            setSelectCurrency({code: e.target.value, sign: sign})}}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="NGN">NGN</option>
                <option value="JPY">JPY</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="CHF">CHF</option>
                <option value="CNY">CNY</option>
            </select>

            <select value={selectLanguage} onChange={(e) => setSelectLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="zh">Chinese</option>
                <option value="ko">korean</option>
                <option value="it">Italian</option>
            </select>
            </div>

            </div>

            <button className="md:hidden" onClick={() => setMenuIsOpen(prev => !prev )}>{menuIsOpen === true ? "✕" :  "☰"}</button>


            <div className={`${menuIsOpen ? "flex" : "hidden"} flex-col md:hidden`}>
               
               
             <div className="mb-3">
               <input className="w-full outline outline-2 rounded-xs placeholder:text-xs p-1 text-xs outline-gray-100" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="🔍 Search cryptocurrency" />
             </div>

            <div className="flex flex-col gap-5 text-xs font-normal">
            <Link to="/" onClick={() => setMenuIsOpen(false)}>Homepage</Link>
            <Link to="/news" onClick={() => setMenuIsOpen(false)}>News</Link>
            <Link to="/portfolio" onClick={() => setMenuIsOpen(false)}>Portfolio</Link>
            <Link to="/watchlist" onClick={() => setMenuIsOpen(false)}>Watchlist</Link>
            </div>
            
            <div className="text-xs font-medium mt-3">
            <select value={selectCurrency.code} onChange={(e) => {{
               if (e.target.value === "NGN") {
                 sign = "₦";
               } else if (e.target.value === "EUR") {
                 sign = "€";
               } else if (e.target.value === "GBP") {
                 sign = "£";
               } else if (e.target.value === "JPY") {
                 sign = "¥";
               } else if (e.target.value === "CAD") {
                 sign = "C$";
               } else if (e.target.value === "AUD") {
                 sign = "A$";
               } else if (e.target.value === "CNY") {
                 sign = "¥";
               } else {
                sign = "$";
               }
            };
            setSelectCurrency({code: e.target.value, sign: sign})}}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="NGN">NGN</option>
                <option value="JPY">JPY</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="CHF">CHF</option>
                <option value="CNY">CNY</option>
            </select>

            <select value={selectLanguage} onChange={(e) => setSelectLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="zh">Chinese</option>
                <option value="ko">korean</option>
                <option value="it">Italian</option>
            </select>
            </div>

            </div>
         </nav>
    );
}