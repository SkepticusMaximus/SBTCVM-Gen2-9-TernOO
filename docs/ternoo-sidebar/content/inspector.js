(function() {
  'use strict';

  // ===== Balanced Ternary =====
  function decToBT(n) {
    if (n === 0) return "0";
    var result = "";
    var v = n;
    while (v !== 0) {
      var r = ((v % 3) + 3) % 3;
      if (r === 2) { result = "-" + result; v = (v + 1) / 3; }
      else if (r === 1) { result = "+" + result; v = (v - 1) / 3; }
      else { result = "0" + result; v = v / 3; }
    }
    return result;
  }
  function btToDec(s) {
    var sum = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      var p = Math.pow(3, s.length - 1 - i);
      if (c === '+' || c === '1' || c === 'p') sum += p;
      else if (c === '-' || c === 'T' || c === 'n') sum -= p;
    }
    return sum;
  }
  function padBT(bt, w) {
    if (bt.length >= w) return bt.slice(-w);
    return new Array(w - bt.length + 1).join('0') + bt;
  }

  // ===== Septemvigesimal (Balanced Base 27) =====
  // Thomas's character set from libbal27.py
  var BAL27_CHARS = {
    'D':13,'C':12,'B':11,'A':10,'9':9,'8':8,'7':7,'6':6,'5':5,'4':4,'3':3,'2':2,'1':1,
    '0':0,
    'Z':-1,'Y':-2,'X':-3,'W':-4,'V':-5,'U':-6,'T':-7,'S':-8,'R':-9,'Q':-10,'P':-11,'N':-12,'M':-13
  };
  var BAL27_REV = {};
  for (var k in BAL27_CHARS) BAL27_REV[BAL27_CHARS[k]] = k;

  function decToBal27(n) {
    if (n === 0) return '0';
    var negative = n < 0;
    var v = Math.abs(n);
    var digits = [];
    while (v > 0) {
      var r = v % 27;
      v = Math.floor(v / 27);
      if (r > 13) {
        r -= 27;
        v += 1;
      }
      digits.unshift(BAL27_REV[r]);
    }
    if (negative) {
      // Negate by mirroring each digit
      for (var i = 0; i < digits.length; i++) {
        digits[i] = BAL27_REV[-BAL27_CHARS[digits[i]]];
      }
    }
    return digits.join('');
  }
  function bal27ToDec(s) {
    var sum = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i].toUpperCase();
      if (!(c in BAL27_CHARS)) return NaN;
      sum = sum * 27 + BAL27_CHARS[c];
    }
    return sum;
  }

  // ===== Standard bases (binary, octal, hex, unbalanced ternary) =====
  function decToBase(n, base) {
    if (n === 0) return '0';
    var sign = n < 0 ? '-' : '';
    var v = Math.abs(n);
    return sign + v.toString(base).toUpperCase();
  }
  function baseToDec(s, base) {
    s = s.trim();
    if (s === '') return NaN;
    var negative = s[0] === '-';
    if (negative) s = s.slice(1);
    var v = parseInt(s, base);
    if (isNaN(v)) return NaN;
    return negative ? -v : v;
  }

  // ===== Universal converters =====
  function toString(n, base) {
    if (isNaN(n)) return '';
    switch (base) {
      case 'dec':   return n.toString();
      case 'bin':   return decToBase(n, 2);
      case 'oct':   return decToBase(n, 8);
      case 'hex':   return decToBase(n, 16);
      case 'ter':   return decToBase(n, 3);
      case 'bal3':  return n === 0 ? '0' : decToBT(n);
      case 'bal27': return decToBal27(n);
    }
    return '';
  }
  function fromString(s, base) {
    s = s.trim();
    if (s === '') return NaN;
    switch (base) {
      case 'dec':   var v = parseInt(s, 10); return isNaN(v) ? NaN : v;
      case 'bin':   return baseToDec(s, 2);
      case 'oct':   return baseToDec(s, 8);
      case 'hex':   return baseToDec(s, 16);
      case 'ter':   return baseToDec(s, 3);
      case 'bal3':
        s = s.replace(/T/gi, '-').replace(/p/gi, '+').replace(/n/gi, '-');
        if (!/^[+\-0]+$/.test(s)) return NaN;
        return btToDec(s);
      case 'bal27': return bal27ToDec(s);
    }
    return NaN;
  }

  // ===== Update everything from a decimal value =====
  function updateAllFrom(dec, sourceField) {
    if (isNaN(dec)) return;
    if (dec < -9841) dec = -9841;
    if (dec > 9841) dec = 9841;

    var baseA = document.getElementById('baseA').value;
    var baseB = document.getElementById('baseB').value;
    var valA = document.getElementById('valA');
    var valB = document.getElementById('valB');

    if (sourceField !== 'A') valA.value = toString(dec, baseA);
    if (sourceField !== 'B') valB.value = toString(dec, baseB);

    // Compute trit layout from decimal
    var bt = dec === 0 ? "0" : decToBT(dec);
    var padded = padBT(bt, 9);

    // Trit display
    var tritRow = document.getElementById('tritRow');
    tritRow.innerHTML = '';
    for (var i = 0; i < padded.length; i++) {
      var c = padded[i];
      var div = document.createElement('div');
      var cls = 'trit ';
      if (c === '+') cls += 'trit-pos';
      else if (c === '-') cls += 'trit-neg';
      else cls += 'trit-zero';
      if (i === 0) cls += ' trit-type';
      div.className = cls;
      div.textContent = c === '+' ? '1' : c === '-' ? 'T' : '0';
      tritRow.appendChild(div);
    }

    // Decode type and payload
    var typeChar = padded[0];
    var typeVal = typeChar === '+' ? 1 : typeChar === '-' ? -1 : 0;
    var payloadStr = padded.slice(1);
    var payloadDec = btToDec(payloadStr);

    // Decoded panel - now also shows bal27
    var bal27Val = decToBal27(dec);
    document.getElementById('dDec').textContent = dec;
    document.getElementById('dBT').textContent = padded;
    document.getElementById('dBal27').textContent = bal27Val;

    var typeName = typeVal === -1 ? 'EXEC (T)' : typeVal === 0 ? 'DATA (0)' : 'REF (1)';
    document.getElementById('dType').textContent = typeVal + ' → ' + typeName;
    document.getElementById('dPayload').textContent = payloadDec;

    // Banner
    var banner = document.getElementById('typeBanner');
    banner.className = 'type-banner ' + (typeVal === -1 ? 'type-exec' : typeVal === 0 ? 'type-data' : 'type-ref');
    banner.textContent = typeVal === -1 ? '⚡ EXECUTABLE' : typeVal === 0 ? '◆ DATA' : '→ REFERENCE';

    // Interpretation
    var interp = '';
    if (typeVal === 0) {
      interp = 'This is a literal data value. The payload <strong>' + payloadDec + '</strong> is the actual value.';
    } else if (typeVal === 1) {
      interp = 'This is a reference (pointer) to memory address <strong>' + payloadDec + '</strong>. To follow it, use TYPEDISPATCH which will jump to the address held in reg2.';
    } else {
      interp = 'This is an executable entry point at address <strong>' + payloadDec + '</strong>. TYPEDISPATCH on this tryte will jump directly to that address.';
    }
    document.getElementById('interp').innerHTML = interp;

    // Object/Exec view toggling
    var objSection = document.getElementById('objSection');
    var execSection = document.getElementById('execSection');

    if (typeVal === 1) {
      objSection.classList.remove('section-hidden');
      execSection.classList.add('section-hidden');
      var objView = document.getElementById('objView');
      objView.innerHTML =
        '<div class="obj-row"><span class="obj-addr">' + payloadDec + '</span><span class="obj-label">field_count (DATA)</span><span class="obj-value">N fields</span></div>' +
        '<div class="obj-row"><span class="obj-addr">' + (payloadDec + 1) + '</span><span class="obj-label">method_table_ref</span><span class="obj-value">REF or DATA 0</span></div>' +
        '<div class="obj-row"><span class="obj-addr">' + (payloadDec + 2) + '</span><span class="obj-label">field 0</span><span class="obj-value">typed tryte</span></div>' +
        '<div class="obj-row"><span class="obj-addr">' + (payloadDec + 3) + '</span><span class="obj-label">field 1</span><span class="obj-value">typed tryte</span></div>' +
        '<div class="obj-row"><span class="obj-addr">...</span><span class="obj-label">more fields</span><span class="obj-value">...</span></div>';
    } else if (typeVal === -1) {
      objSection.classList.add('section-hidden');
      execSection.classList.remove('section-hidden');
      document.getElementById('execAddr').textContent = payloadDec;
      var warn = document.getElementById('execWarn');
      if (Math.abs(payloadDec) > 3280) {
        warn.classList.remove('exec-warn-hidden');
        warn.textContent = '⚠ Payload exceeds 8-trit range';
      } else {
        warn.classList.add('exec-warn-hidden');
      }
    } else {
      objSection.classList.add('section-hidden');
      execSection.classList.add('section-hidden');
    }

    // Assembly construction
    var typeMnemonic = typeVal === -1 ? '-' : typeVal === 0 ? '0' : '+';
    var dispatchComment = typeVal === -1 ? 'jumps to ' + payloadDec : typeVal === 0 ? 'falls through' : 'jumps via reg2';
    var asm =
      '# Construct this tryte (' + typeName + ')\n' +
      'setreg1;' + typeMnemonic + '              # type trit\n' +
      'setreg2;10x' + payloadDec + '              # payload\n' +
      'typepack;0              # reg2 = ' + dec + '\n\n' +
      '# Inspect this tryte\n' +
      'setreg1;10x' + dec + '              # load tryte\n' +
      'typeunpack;0            # reg1=' + typeVal + ', reg2=' + payloadDec + '\n\n' +
      '# Three-way dispatch on it\n' +
      'setreg1;10x' + dec + '\n' +
      'setreg2;>handler        # for REF case\n' +
      'typedispatch;0          # ' + dispatchComment;
    document.getElementById('asm').textContent = asm;
  }

  function setVal(n) {
    document.getElementById('baseA').value = 'dec';
    document.getElementById('valA').value = n;
    updateAllFrom(n, null);
  }

  function init() {
    var baseA = document.getElementById('baseA');
    var baseB = document.getElementById('baseB');
    var valA = document.getElementById('valA');
    var valB = document.getElementById('valB');

    valA.addEventListener('input', function() {
      var dec = fromString(valA.value, baseA.value);
      if (!isNaN(dec)) updateAllFrom(dec, 'A');
    });
    valB.addEventListener('input', function() {
      var dec = fromString(valB.value, baseB.value);
      if (!isNaN(dec)) updateAllFrom(dec, 'B');
    });
    baseA.addEventListener('change', function() {
      var dec = fromString(valA.value, baseA.value);
      if (isNaN(dec)) {
        // try interpreting current val as the new base; if it fails, just refresh
        valA.value = '';
      } else {
        valA.value = toString(dec, baseA.value);
        updateAllFrom(dec, null);
      }
    });
    baseB.addEventListener('change', function() {
      var dec = fromString(valB.value, baseB.value);
      if (isNaN(dec)) {
        valB.value = '';
      } else {
        valB.value = toString(dec, baseB.value);
        updateAllFrom(dec, null);
      }
    });

    var buttons = document.querySelectorAll('button[data-val]');
    for (var i = 0; i < buttons.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          setVal(parseInt(btn.getAttribute('data-val'), 10));
        });
      })(buttons[i]);
    }

    // Initial render from default value
    updateAllFrom(parseInt(valA.value, 10), null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
