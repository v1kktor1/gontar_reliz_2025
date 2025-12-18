document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);

    // ================= LANGUAGE SWITCHER =================
    let currentLang = 'ua';
    const langToggle = document.getElementById('langToggle');
    
    const renderBikes = () => {
        const slider = document.getElementById("modelsSlider");
        if (!slider || typeof bikesData === "undefined") return;
        
        slider.innerHTML = '';
        const t = translations[currentLang];
        
        bikesData.forEach(b => {
            const c = document.createElement("div");
            c.className = "model-item";
            c.innerHTML = `
              <div class="model-img-wrap">
                <img src="${b.image}">
                <div class="price-tag">${b.price}</div>
                <div class="stock-badge ${b.stock ? "in" : "out"}">
                  ${b.stock ? t.stock_in : t.stock_out}
                </div>
              </div>
              <div class="model-info">
                <h3>${b.name}</h3>
                <ul class="specs-minimal">${b.specs.map(s => `<li>${s}</li>`).join("")}</ul>
                <button class="btn-line" ${b.stock ? "" : "disabled"}>${t.btn_order}</button>
              </div>`;
            slider.appendChild(c);
        });
    };

    const updateText = () => {
        const t = translations[currentLang];
        
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if(t[key]) el.innerHTML = t[key];
        });

        document.querySelectorAll('[data-pl]').forEach(el => {
            const key = el.getAttribute('data-pl');
            if(t[key]) el.placeholder = t[key];
        });

        document.documentElement.lang = currentLang;
        renderBikes();
    };

    langToggle.addEventListener('change', () => {
        const heroVideo = document.querySelector('.hero-video');
        const marquees = document.querySelectorAll('.marquee-track');

        if (heroVideo) heroVideo.pause();
        marquees.forEach(el => el.style.animationPlayState = 'paused');
        document.body.style.pointerEvents = 'none';

        setTimeout(() => {
            currentLang = langToggle.checked ? 'en' : 'ua';
            updateText();

            if (heroVideo) heroVideo.play();
            marquees.forEach(el => el.style.animationPlayState = 'running');
            document.body.style.pointerEvents = 'auto';

        }, 1000);
    });
    updateText();

    /* ================= FEATURE 3D ================= */
    document.querySelectorAll(".feature-box").forEach(el => {
        el.onmousemove = e => {
            const r = el.getBoundingClientRect(),
                x = e.clientX - r.left,
                y = e.clientY - r.top;
            el.style.transform = `rotateX(${-(y - r.height / 2) / 12}deg) rotateY(${(x - r.width / 2) / 12}deg)`;
        };
        el.onmouseleave = () => el.style.transform = "rotateX(0) rotateY(0)";
    });

    /* ================= FAQ ================= */
    document.querySelectorAll(".faq-item").forEach(item => {
        const q = item.querySelector(".faq-question"),
              a = item.querySelector(".faq-answer");
        q.onclick = () => {
            document.querySelectorAll(".faq-item").forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                    i.querySelector(".faq-answer").style.maxHeight = null;
                }
            });
            item.classList.toggle("active");
            a.style.maxHeight = item.classList.contains("active") ? a.scrollHeight + "px" : null;
        };
    });

    /* ================= NAV ACTIVE ================= */
    const navLinks = [...document.querySelectorAll(".nav-link")],
          sections = [...document.querySelectorAll("section[id],header[id]")];

    const setActiveNav = () => {
        const pos = window.scrollY + 160;
        sections.forEach(s => {
            if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
                navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + s.id));
            }
        });
    };
    window.addEventListener("scroll", setActiveNav);
    window.addEventListener("load", setActiveNav);

    /* ================= ORDER MODAL ================= */
    const modal = document.getElementById("orderModal"),
          card = modal.querySelector(".order-card"),
          bikeName = document.getElementById("bikeName"),
          inName = document.getElementById("inputName"),
          inCity = document.getElementById("inputCity"),
          inPhone = document.getElementById("inputPhone"),
          wName = document.querySelector(".name-wrapper"),
          wCity = document.querySelector(".city-wrapper"),
          wPhone = document.querySelector(".phone-wrapper"),
          loader = modal.querySelector(".order-loader"),
          sendBtn = document.querySelector(".order-send"),
          inBranch = document.getElementById("inputBranch"),
          inZip = document.getElementById("inputZip"),
          wBranch = document.querySelector(".branch-wrapper"),
          wZip = document.querySelector(".zip-wrapper");

    document.addEventListener("click", e => {
        const btn = e.target.closest(".btn-line");
        if (!btn || btn.disabled) return;
        bikeName.textContent = btn.closest(".model-item").querySelector("h3").textContent;
        [inName, inCity, inBranch, inZip, inPhone].forEach(i => i.value = "");
        [wName, wCity, wBranch, wZip, wPhone].forEach(w => w.classList.remove("error"));
        card.classList.remove("success");
        modal.classList.add("active");
        setTimeout(() => inName.focus(), 80);
    });

    modal.onclick = e => {
        if (e.target === modal) modal.classList.remove("active");
    };

    card.onmousemove = e => {
        const r = card.getBoundingClientRect(),
            x = e.clientX - r.left,
            y = e.clientY - r.top;
        card.style.transform = `rotateX(${-(y - r.height / 2) / 12}deg) rotateY(${(x - r.width / 2) / 12}deg)`;
    };
    card.onmouseleave = () => card.style.transform = "rotateX(0) rotateY(0)";

    inPhone.oninput = () => {
        let d = inPhone.value.replace(/\D/g, "").slice(0, 9),
            f = "";
        if (d.length > 0) f += "(" + d.slice(0, 2);
        if (d.length >= 2) f += ") ";
        if (d.length > 2) f += d.slice(2, 5);
        if (d.length > 5) f += " " + d.slice(5, 7);
        if (d.length > 7) f += " " + d.slice(7, 9);
        inPhone.value = f;
        wPhone.classList.remove("error");
    };

    inName.oninput = () => wName.classList.remove("error");
    inCity.oninput = () => wCity.classList.remove("error");

    sendBtn.onclick = () => {
        let err = false;

        if (inName.value.trim().length < 2) {
            wName.classList.remove("error");
            void wName.offsetWidth;
            wName.classList.add("error");
            err = true;
        }

        if (inCity.value.trim().length < 2) {
            wCity.classList.remove("error");
            void wCity.offsetWidth;
            wCity.classList.add("error");
            err = true;
        }

        if (inBranch.value.trim().length < 1) {
            wBranch.classList.remove("error");
            void wBranch.offsetWidth;
            wBranch.classList.add("error");
            err = true;
        }

        if (inZip.value.trim().length < 4) {
            wZip.classList.remove("error");
            void wZip.offsetWidth;
            wZip.classList.add("error");
            err = true;
        }

        if (inPhone.value.replace(/\D/g, "").length !== 9) {
            wPhone.classList.remove("error");
            void wPhone.offsetWidth;
            wPhone.classList.add("error");
            err = true;
        }

        if (err) return;

        loader.style.display = "block";
        setTimeout(() => {
            loader.style.display = "none";
            card.classList.add("success");
        }, 2200);
        setTimeout(() => modal.classList.remove("active"), 5500);
    };

});