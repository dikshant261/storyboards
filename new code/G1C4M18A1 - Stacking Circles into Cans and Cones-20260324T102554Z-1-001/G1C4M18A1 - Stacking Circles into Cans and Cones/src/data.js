const appData = {
  en: {
    header: { title: "Stack circles one above the other in different ways…" },
    left: {
      equalButton: "Equal size circles",
      decreasingButton: "Decreasing size circles",
    },
    right: {
      title: "Choose stacking to show animation here…",
      captions: {
        equal: "Circles of the same size extending upward",
        decreasing: "Circles extending upward to a point",
      },
      hints: {
        idle: "Tap a button on the left and observe the object on the right…",
        drag: "Drag to rotate",
        equal: "This is a CYLINDER.",
        decreasing: "This is a CONE.",
      },
    },
    aria: {
      selectEqual: "Select equal size circles stack",
      selectDecreasing: "Select decreasing size circles stack",
      modelRegion: "3D stack preview area",
    },
    footer: {
      note: "Tap a button on the left and observe the object on the right…",
    },
  },
  id: {
    header: {
      title:
        "Tumpuk lingkaran satu di atas yang lain dengan cara yang berbeda…",
    },
    left: {
      equalButton: "Lingkaran berukuran sama",
      decreasingButton: "Lingkaran besar hingga lingkaran kecil",
    },
    right: {
      title: "Menampilkan animasi tumpukan yang terbentuk disini.",
      captions: {
        equal: "Lingkaran dengan ukuran sama ditumpuk ke atas.",
        decreasing:
          "Menumpuk lingkaran besar hingga lingkaran kecil ke atas hingga bertemu di satu titik",
      },
      hints: {
        idle: "Ketuk tombol di kiri dan amati!",
        drag: "Seret untuk memutar",
        equal: "Ini adalah TABUNG.",
        decreasing: "Ini adalah KERUCUT.",
      },
    },
    aria: {
      selectEqual: "Pilih tumpukan lingkaran sama besar",
      selectDecreasing: "Pilih tumpukan lingkaran mengecil",
      modelRegion: "Area pratinjau tumpukan 3D",
    },
    footer: {
      note: "Ketuk tombol di kiri dan amati bentuk bangun ruang yang terbentuk.",
    },
  },
};

// locale from <html lang>, persisted
(function initLocale() {
  const tag = (document.documentElement.lang || "en").toLowerCase();
  const saved = localStorage.getItem("applet.locale");
  const chosen = saved || tag;
  const valid = appData[chosen] ? chosen : "en";
  localStorage.setItem("applet.locale", valid);

  window.getLocale = () => document.documentElement.lang;
  window.t = (path) => {
    const segs = path.split(".");
    let cur = appData[getLocale()];
    for (const k of segs) cur = (cur || {})[k];
    return cur;
  };
})();
