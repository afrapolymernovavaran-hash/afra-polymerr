document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // ---------- حالت روشن و تاریک ----------
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("afra-theme", theme);
    } catch (error) {
      // اگر ذخیره‌سازی مرورگر در دسترس نبود، خود تغییر تم همچنان انجام می‌شود.
    }

    if (themeToggle) {
      const darkMode = theme === "dark";
      themeToggle.setAttribute(
        "aria-label",
        darkMode ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"
      );

      if (themeIcon) themeIcon.textContent = darkMode ? "☀️" : "🌙";
      if (themeText) themeText.textContent = darkMode ? "حالت روشن" : "حالت تاریک";
    }
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("afra-theme") || "light";
  } catch (error) {
    // تم پیش‌فرض روشن باقی می‌ماند.
  }

  setTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // ---------- منوی موبایل ----------
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileMenu() {
    mobileNav?.classList.remove("active");
    hamburger?.setAttribute("aria-expanded", "false");
    hamburger?.setAttribute("aria-label", "باز کردن منو");
  }

  hamburger?.addEventListener("click", () => {
    const isOpen = mobileNav?.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", String(Boolean(isOpen)));
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "بستن منو" : "باز کردن منو"
    );
  });

  mobileNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // ---------- جزئیات محصولات ----------
  const productDetails = {
    chitosan: {
      title: "کیتوسان",
      description:
        "کیتوسان یکی از پلیمرهای زیستی شرکت افرا پلیمر نوآوران است و در سه وزن مولکولی بالا، متوسط و پایین عرضه می‌شود.",
      specs: [
        "پلیمر زیستی",
        "قابل عرضه در سه وزن مولکولی بالا، متوسط و پایین",
        "برای دریافت اطلاعات فنی و شرایط سفارش با شرکت تماس بگیرید."
      ]
    },
    chitin: {
      title: "کیتین",
      description:
        "کیتین زیستی با منشأ پوسته میگو، از محصولات شرکت افرا پلیمر نوآوران است.",
      specs: [
        "دارای منشأ پوسته میگو",
        "برای دریافت اطلاعات فنی و شرایط سفارش با شرکت تماس بگیرید."
      ]
    },
    nanowhisker: {
      title: "نانوویسکر کیتین",
      description:
        "نانوویسکر کیتین از محصولات نانومواد شرکت است.",
      specs: [
        "قطر: ۲۰ تا ۳۰ نانومتر",
        "طول: ۲۰۰ تا ۴۰۰ نانومتر",
        "برای دریافت اطلاعات فنی و شرایط سفارش با شرکت تماس بگیرید."
      ]
    },
    cellulose: {
      title: "میکروسلولز",
      description:
        "میکروسلولز عرضه‌شده توسط شرکت، از نوع سلولز میکروکریستالین است.",
      specs: [
        "سلولز میکروکریستالین",
        "برای دریافت اطلاعات فنی و شرایط سفارش با شرکت تماس بگیرید."
      ]
    },
    lignin: {
      title: "لیگنین",
      description:
        "لیگنین پایه (Basic) از محصولات شرکت افرا پلیمر نوآوران است.",
      specs: [
        "نوع محصول: لیگنین پایه (Basic)",
        "برای دریافت اطلاعات فنی و شرایط سفارش با شرکت تماس بگیرید."
      ]
    }
  };

  const dialog = document.getElementById("productDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDescription = document.getElementById("dialogDescription");
  const dialogSpecs = document.getElementById("dialogSpecs");
  const closeDialogButton = document.getElementById("closeProductDialog");

  function openProduct(productCard) {
    const details = productDetails[productCard.dataset.product];
    if (!details || !dialog || !dialogTitle || !dialogDescription || !dialogSpecs) {
      return;
    }

    dialogTitle.textContent = details.title;
    dialogDescription.textContent = details.description;
    dialogSpecs.replaceChildren(
      ...details.specs.map((spec) => {
        const item = document.createElement("li");
        item.textContent = spec;
        return item;
      })
    );

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  document.querySelectorAll(".product[data-product]").forEach((productCard) => {
    productCard.addEventListener("click", () => openProduct(productCard));

    productCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProduct(productCard);
      }
    });
  });

  closeDialogButton?.addEventListener("click", () => {
    if (dialog?.open) dialog.close();
    else dialog?.removeAttribute("open");
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // ---------- سال جاری در فوتر ----------
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric"
    }).format(new Date());
  }
});
