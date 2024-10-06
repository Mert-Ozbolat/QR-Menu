const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../db.json");
    const data = await res.json();
    const product = data.menu.find((item) => item.id == id);
    if (!product) {
      renderNotFound();
    } else {
      renderPage(product);
    }
  } catch (error) {
    renderNotFound();
    alert("Üzgünüz Bir Hata Oldu!");
  }
});

const outlet = document.getElementById("outlet");

function renderPage(product) {
  outlet.innerHTML = `
     <div class="d-flex justify-content-between fs-6">
        <a href="/">
          <img width="35px" src="/images/home.png" />
        </a>

        <p>anasayfa / ${product.category} / ${product.title.toLowerCase()}</p>
      </div>

      <h1 class="text-center my-4">${product.title}</h1>

      <img
        src="${product.img}"
        style="max-height: 400px"
        class="rounded object-fit-cover shadow"
      />

      <h4 class="mt-4">
        <span>Ürünün Kategorisi: </span>
        <span class="text-success">${product.category}</span>
      </h4>

      <h4 class="mt-4">
        <span>Ürünün Fiyatı: </span>
        <span class="text-success">${(product.price * 30).toFixed(2)} ₺</span>
      </h4>

      <p class="lead">
       ${product.desc}
      </p>
    `;
}

function renderNotFound() {
  outlet.innerHTML = `
     <div style="height:90vh" class="d-flex justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center gap-3">
            <h1 class="text-center">Aradığınız ürün mevcut değil!!</h1>
            <a href="/">Ana Sayfaya Dönün</a>
        </div>
    </div> 
    `;
}
