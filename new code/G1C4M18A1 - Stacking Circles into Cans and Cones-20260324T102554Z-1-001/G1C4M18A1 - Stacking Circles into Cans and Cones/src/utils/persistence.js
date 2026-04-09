// tiny namespaced persistence helper (optional to extend later)
window.Persistence = (() => {
  const NS = "applet.v1.";
  const k = (x) => NS + x;
  const save = (key, val) => {
    try {
      localStorage.setItem(k(key), JSON.stringify(val));
    } catch {}
  };
  const load = (key, def) => {
    try {
      const v = localStorage.getItem(k(key));
      return v == null ? def : JSON.parse(v);
    } catch {
      return def;
    }
  };
  return { save, load };
})();
