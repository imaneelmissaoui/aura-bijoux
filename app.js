
const VINTED = "https://www.vinted.fr/member/92801331";

const products = [
  {id:"eclat", name:"Éclat", subFr:"Parure · pierres multicolores", subEn:"Set · multicolored stones", price:14, cat:"set", badgeFr:"LA PARURE", badgeEn:"THE SET", s1:"#786b9d", s2:"#d8a76e"},
  {id:"bleu", name:"Bleu de nuit", subFr:"Boucles longues · pierres & cristal", subEn:"Long earrings · stones & crystal", price:12, cat:"earrings", badgeFr:"FAIT MAIN", badgeEn:"HANDMADE", s1:"#354d70", s2:"#b8c8db"},
  {id:"nuance", name:"Nuance", subFr:"Collier · agate du Botswana", subEn:"Necklace · Botswana agate", price:17, cat:"necklace", badgeFr:"FAIT MAIN", badgeEn:"HANDMADE", s1:"#ad8e7f", s2:"#d7c7c0"},
  {id:"harmonie", name:"Harmonie", subFr:"Collier · pierres naturelles & acier", subEn:"Necklace · natural stones & steel", price:15, cat:"necklace", badgeFr:"FAIT MAIN", badgeEn:"HANDMADE", s1:"#72836d", s2:"#b9ad8c"},
  {id:"clarte", name:"Clarté", subFr:"Boucles · cristal & jade blanc", subEn:"Earrings · crystal & white jade", price:7, cat:"earrings", badgeFr:"FAIT MAIN", badgeEn:"HANDMADE", s1:"#eef0ed", s2:"#cbd6d0"},
  {id:"eclipse", name:"Éclipse", subFr:"Parure · agate rayée", subEn:"Set · striped agate", price:7, cat:"set", badgeFr:"LA PARURE", badgeEn:"THE SET", s1:"#6b5b55", s2:"#c6ae9f"},
  {id:"soleil", name:"Soleil", subFr:"Pendentif · esprit solaire", subEn:"Pendant · solar spirit", price:4, cat:"pendant", badgeFr:"FAIT MAIN", badgeEn:"HANDMADE", s1:"#dda34d", s2:"#eed7a8"},
  {id:"aurore", name:"Aurore", subFr:"Parure · cornaline & jade blanc", subEn:"Set · carnelian & white jade", price:8, cat:"set", badgeFr:"LA PARURE", badgeEn:"THE SET", s1:"#b4573e", s2:"#e7e5d9"}
];

let lang = localStorage.getItem("auraLang") || "fr";
let favs = JSON.parse(localStorage.getItem("auraFavs") || "[]");
let cart = JSON.parse(localStorage.getItem("auraCart") || "[]");
let filter = "all";

function t(fr,en){ return lang==="fr" ? fr : en; }
function save(){
  localStorage.setItem("auraFavs",JSON.stringify(favs));
  localStorage.setItem("auraCart",JSON.stringify(cart));
  updateCounts();
}
function updateCounts(){
  document.getElementById("favCount").textContent=favs.length;
  document.getElementById("cartCount").textContent=cart.length;
}
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-fr][data-en]").forEach(el=>{
    el.textContent = el.dataset[lang];
  });
  document.getElementById("search").placeholder = t("Rechercher un bijou","Search jewelry");
  render();
}
function render(){
  const q=document.getElementById("search").value.trim().toLowerCase();
  const list=products.filter(p=>(filter==="all"||p.cat===filter) && (p.name+" "+p.subFr+" "+p.subEn).toLowerCase().includes(q));
  document.getElementById("productGrid").innerHTML=list.map(p=>`
    <article class="card">
      <div class="visual" style="--stone1:${p.s1};--stone2:${p.s2}">
        <span class="badge">${lang==="fr"?p.badgeFr:p.badgeEn}</span>
        <div class="jewel-wire"></div>
        <div class="card-actions">
          <button aria-label="${t("Ajouter aux favoris","Add to favorites")}" onclick="toggleFav('${p.id}')">${favs.includes(p.id)?"♥":"♡"}</button>
          <button aria-label="${t("Ajouter au panier","Add to bag")}" onclick="addCart('${p.id}')">+</button>
        </div>
      </div>
      <div class="meta">
        <h3>${p.name}</h3>
        <p>${lang==="fr"?p.subFr:p.subEn}</p>
        <p class="price">${p.price} €</p>
        <a class="text-link" href="${VINTED}" target="_blank" rel="noopener">${t("Découvrir cette pièce ↗","View this piece ↗")}</a>
      </div>
    </article>
  `).join("") || `<p class="empty">${t("Aucun bijou trouvé.","No jewelry found.")}</p>`;
  updateCounts();
}
window.toggleFav=(id)=>{
  favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];
  save(); render();
}
window.addCart=(id)=>{
  if(!cart.includes(id)) cart.push(id);
  save(); openDrawer("cart");
}
function openDrawer(type){
  const isFav=type==="fav";
  const ids=isFav?favs:cart;
  document.getElementById("drawerTitle").textContent=isFav?t("Mes favoris","My favorites"):t("Mon panier","My bag");
  document.getElementById("drawerBody").innerHTML=ids.length?ids.map(id=>{
    const p=products.find(x=>x.id===id);
    return `<div class="line-item"><span><strong>${p.name}</strong><br>${lang==="fr"?p.subFr:p.subEn}</span><strong>${p.price} €</strong></div>`
  }).join(""):`<p class="empty">${t("Votre sélection est vide.","Your selection is empty.")}</p>`;
  document.getElementById("drawer").classList.add("open");
}
document.getElementById("favBtn").onclick=()=>openDrawer("fav");
document.getElementById("cartBtn").onclick=()=>openDrawer("cart");
document.getElementById("closeDrawer").onclick=()=>document.getElementById("drawer").classList.remove("open");
document.getElementById("drawer").onclick=e=>{if(e.target.id==="drawer") e.currentTarget.classList.remove("open")}

document.getElementById("langBtn").onclick=()=>{
  lang=lang==="fr"?"en":"fr"; localStorage.setItem("auraLang",lang); applyLang();
};

document.querySelectorAll("#filters button").forEach(btn=>btn.onclick=()=>{
  filter=btn.dataset.filter;
  document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("active",b===btn));
  render();
});
document.getElementById("search").addEventListener("input",render);

const modalCopy={
  shipping:{
    fr:["Commander & livraison","Les commandes se finalisent actuellement via Vinted. Le prix affiché sur Aura correspond au prix de la création hors livraison et frais éventuels de la plateforme. La disponibilité est confirmée sur l’annonce Vinted."],
    en:["Orders & shipping","Orders are currently completed through Vinted. The price shown on Aura is the jewelry price before shipping and any platform fees. Availability is confirmed on the Vinted listing."]
  },
  care:{
    fr:["Prendre soin de vos bijoux","Évitez l’eau, le parfum et les produits chimiques. Rangez chaque pièce au sec, idéalement séparément. Manipulez les fils et pierres avec délicatesse pour préserver leur forme et leur éclat."],
    en:["Jewelry care","Avoid water, perfume and chemicals. Store each piece dry, ideally separately. Handle wires and stones gently to preserve their shape and shine."]
  },
  privacy:{
    fr:["Confidentialité","Ce site vitrine ne collecte pas de données de paiement. Les favoris et le panier sont enregistrés uniquement dans votre navigateur. Les achats et messages sont traités sur Vinted."],
    en:["Privacy","This showcase site does not collect payment information. Favorites and bag selections are stored only in your browser. Purchases and messages are handled on Vinted."]
  }
};
document.querySelectorAll("[data-modal]").forEach(btn=>btn.onclick=()=>{
  const c=modalCopy[btn.dataset.modal][lang];
  document.getElementById("modalTitle").textContent=c[0];
  document.getElementById("modalBody").innerHTML=`<p style="line-height:1.7">${c[1]}</p>`;
  document.getElementById("modal").classList.add("open");
});
document.getElementById("closeModal").onclick=()=>document.getElementById("modal").classList.remove("open");
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal") e.currentTarget.classList.remove("open")}

applyLang();
