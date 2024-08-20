function $ (sel, root = document) {return root.querySelector(sel)}
function $$(sel, root = document) {return root.querySelectorAll(sel)}
function $H(ss, ...values) {
    const r = document.createElement('div');
    r.innerHTML = ss.reduce((r,s,i) => r+s + (values[i] || ''), '').trim();
    return r.firstElementChild;
}