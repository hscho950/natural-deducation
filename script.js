//복합명제
let newCompound = document.querySelector('#new-compound');
let addCompoundBtn = document.querySelector('#add-compound-btn');
let compoundList = document.querySelector('#compound-list');

addCompoundBtn.addEventListener('click', function() {
    if (!newCompound.value.trim()) return;
    let li = document.createElement('li');
    li.textContent = newCompound.value;

    let btn = document.createElement('button');
    btn.textContent = '[X]';
    btn.className = 'remove-btn';
    btn.addEventListener('click', function() {
        compoundList.removeChild(li);
    });
    li.appendChild(btn);
    compoundList.appendChild(li);
    newCompound.value = '';
    newCompound.focus();
});

newCompound.addEventListener('keydown', e => {
    if (e.key === 'Enter') addCompoundBtn.click();
});

//단순명제
let newPrimary = document.querySelector('#new-primary');
let addPrimaryBtn = document.querySelector('#add-primary-btn');
let primaryList = document.querySelector('#primary-list');

addPrimaryBtn.addEventListener('click', function() {
    if (!newPrimary.value.trim()) return;
    let li = document.createElement('li');
    li.textContent = newPrimary.value;

    let btn = document.createElement('button');
    btn.textContent = '[X]';
    btn.className = 'remove-btn';
    btn.addEventListener('click', function() {
        primaryList.removeChild(li);
    });
    li.appendChild(btn);
    primaryList.appendChild(li);
    newPrimary.value = '';
    newPrimary.focus();
});

newPrimary.addEventListener('keydown', e => {
    if (e.key === 'Enter') addPrimaryBtn.click();
});

//기호명제
let newSymbolic = document.querySelector('#new-symbolic');
let addSymbolicBtn = document.querySelector('#add-symbolic-btn');
let symbolicList = document.querySelector('#symbolic-list');
let lineCount = 0;

addSymbolicBtn.addEventListener('click', function() {
    if (!newSymbolic.value.trim()) return;

    lineCount++;
    const formula = newSymbolic.value;
    const rule = document.getElementById('natual-deduction-rule').value;
    const r1 = document.getElementById('ns1').value.trim();
    const r2 = document.getElementById('ns2').value.trim();
    const r3 = document.getElementById('ns3').value.trim();
    const refs = [r1, r2, r3].filter(Boolean).join(', ');

    let li = document.createElement('li');

    // 번호
    let numSpan = document.createElement('span');
    numSpan.className = 'proof-num';
    numSpan.textContent = lineCount + '.';

    // 수식
    let formulaSpan = document.createElement('span');
    formulaSpan.className = 'proof-formula';
    formulaSpan.textContent = formula;

    // 참조+규칙
    let ruleSpan = document.createElement('span');
    ruleSpan.className = 'proof-rule';
    ruleSpan.textContent = (refs ? refs + ', ' : '') + rule;

    // 삭제 버튼
    let btn = document.createElement('button');
    btn.textContent = '[X]';
    btn.className = 'remove-btn';
    btn.addEventListener('click', function() {
        symbolicList.removeChild(li);
        lineCount--;
        // 번호 재정렬
        const items = symbolicList.querySelectorAll('li');
        let n = 0;
        items.forEach(item => {
            const ns = item.querySelector('.proof-num');
            if (ns) ns.textContent = (++n) + '.';
        });
        lineCount = n;
    });

    li.appendChild(numSpan);
    li.appendChild(formulaSpan);
    li.appendChild(ruleSpan);
    li.appendChild(btn);
    symbolicList.appendChild(li);

    newSymbolic.value = '';
    document.getElementById('ns1').value = '';
    document.getElementById('ns2').value = '';
    document.getElementById('ns3').value = '';
    newSymbolic.focus();
});

newSymbolic.addEventListener('keydown', e => {
    if (e.key === 'Enter') addSymbolicBtn.click();
});

//가정 열기/닫기
document.getElementById('open-assumption-btn').addEventListener('click', function() {
    let li = document.createElement('li');
    li.className = 'assumption-bracket';
    li.innerHTML = '<span class="bracket-marker">[[</span>';
    let btn = document.createElement('button');
    btn.textContent = '[X]';
    btn.className = 'remove-btn';
    btn.addEventListener('click', () => symbolicList.removeChild(li));
    li.appendChild(btn);
    symbolicList.appendChild(li);
});

document.getElementById('close-assumption-btn').addEventListener('click', function() {
    let li = document.createElement('li');
    li.className = 'assumption-bracket';
    li.innerHTML = '<span class="bracket-marker">]]</span>';
    let btn = document.createElement('button');
    btn.textContent = '[X]';
    btn.className = 'remove-btn';
    btn.addEventListener('click', () => symbolicList.removeChild(li));
    li.appendChild(btn);
    symbolicList.appendChild(li);
});

//기호 삽입 버튼
function insertSymbol(sym) {
    newSymbolic.focus();
    const s = newSymbolic.selectionStart;
    const e = newSymbolic.selectionEnd;
    newSymbolic.value = newSymbolic.value.slice(0, s) + sym + newSymbolic.value.slice(e);
    newSymbolic.selectionStart = newSymbolic.selectionEnd = s + sym.length;
}

document.getElementById('not-btn').addEventListener('click', () => insertSymbol('∼'));
document.getElementById('and-btn').addEventListener('click', () => insertSymbol('∧'));
document.getElementById('or-btn').addEventListener('click', () => insertSymbol('∨'));
document.getElementById('imp-btn').addEventListener('click', () => insertSymbol('→'));
document.getElementById('bi-imp-btn').addEventListener('click', () => insertSymbol('↔'));