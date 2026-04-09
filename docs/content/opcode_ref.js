const opcodes = [{"opcode": -9841, "bal27": "MMM", "name": "setreg1", "aliases": [], "group": "Register Operations"}, {"opcode": -9840, "bal27": "MMN", "name": "setreg2", "aliases": [], "group": "Register Operations"}, {"opcode": -9839, "bal27": "MMP", "name": "copy2to1", "aliases": [], "group": "Register Operations"}, {"opcode": -9838, "bal27": "MMQ", "name": "copy1to2", "aliases": [], "group": "Register Operations"}, {"opcode": -9837, "bal27": "MMR", "name": "regswap", "aliases": [], "group": "Register Operations"}, {"opcode": -9836, "bal27": "MMS", "name": "invert1", "aliases": [], "group": "Register Operations"}, {"opcode": -9835, "bal27": "MMT", "name": "invert2", "aliases": [], "group": "Register Operations"}, {"opcode": -9834, "bal27": "MMU", "name": "abs1", "aliases": [], "group": "Register Operations"}, {"opcode": -9833, "bal27": "MMV", "name": "abs2", "aliases": [], "group": "Register Operations"}, {"opcode": -9832, "bal27": "MMW", "name": "nabs1", "aliases": [], "group": "Register Operations"}, {"opcode": -9831, "bal27": "MMX", "name": "nabs2", "aliases": [], "group": "Register Operations"}, {"opcode": -9800, "bal27": "MN1", "name": "add", "aliases": [], "group": "Arithmetic"}, {"opcode": -9799, "bal27": "MN2", "name": "add2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9798, "bal27": "MN3", "name": "adddata1", "aliases": [], "group": "Arithmetic"}, {"opcode": -9797, "bal27": "MN4", "name": "adddata2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9796, "bal27": "MN5", "name": "sub", "aliases": [], "group": "Arithmetic"}, {"opcode": -9795, "bal27": "MN6", "name": "sub2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9794, "bal27": "MN7", "name": "subdata1", "aliases": [], "group": "Arithmetic"}, {"opcode": -9793, "bal27": "MN8", "name": "subdata2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9792, "bal27": "MN9", "name": "mul", "aliases": [], "group": "Arithmetic"}, {"opcode": -9791, "bal27": "MNA", "name": "mul2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9790, "bal27": "MNB", "name": "muldata1", "aliases": [], "group": "Arithmetic"}, {"opcode": -9789, "bal27": "MNC", "name": "muldata2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9788, "bal27": "MND", "name": "div", "aliases": [], "group": "Arithmetic"}, {"opcode": -9787, "bal27": "MPM", "name": "div2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9786, "bal27": "MPN", "name": "divdata1", "aliases": [], "group": "Arithmetic"}, {"opcode": -9785, "bal27": "MPP", "name": "divdata2", "aliases": [], "group": "Arithmetic"}, {"opcode": -9784, "bal27": "MPQ", "name": "divmod", "aliases": [], "group": "Arithmetic"}, {"opcode": -9600, "bal27": "MVC", "name": "goto", "aliases": ["gotodata"], "group": "Flow Control"}, {"opcode": -9599, "bal27": "MVD", "name": "gotoif", "aliases": ["gotodataif"], "group": "Flow Control"}, {"opcode": -9598, "bal27": "MWM", "name": "gotoifless", "aliases": [], "group": "Flow Control"}, {"opcode": -9597, "bal27": "MWN", "name": "gotoifmore", "aliases": ["gotoifgreater"], "group": "Flow Control"}, {"opcode": -9596, "bal27": "MWP", "name": "gotoreg1", "aliases": [], "group": "Flow Control"}, {"opcode": -9595, "bal27": "MWQ", "name": "gotoreg2", "aliases": [], "group": "Flow Control"}, {"opcode": -9500, "bal27": "MZ4", "name": "dataread1", "aliases": ["romread1"], "group": "Memory Read/Write"}, {"opcode": -9499, "bal27": "MZ5", "name": "dataread2", "aliases": ["romread2"], "group": "Memory Read/Write"}, {"opcode": -9498, "bal27": "MZ6", "name": "instread1", "aliases": [], "group": "Memory Read/Write"}, {"opcode": -9497, "bal27": "MZ7", "name": "instread2", "aliases": [], "group": "Memory Read/Write"}, {"opcode": -9496, "bal27": "MZ8", "name": "datawrite1", "aliases": ["setdata"], "group": "Memory Read/Write"}, {"opcode": -9495, "bal27": "MZ9", "name": "datawrite2", "aliases": [], "group": "Memory Read/Write"}, {"opcode": -9494, "bal27": "MZA", "name": "instwrite1", "aliases": ["setinst"], "group": "Memory Read/Write"}, {"opcode": -9493, "bal27": "MZB", "name": "instwrite2", "aliases": [], "group": "Memory Read/Write"}, {"opcode": -9492, "bal27": "MZC", "name": "iowrite1", "aliases": ["IOwrite1"], "group": "IO Read/Write"}, {"opcode": -9491, "bal27": "MZD", "name": "iowrite2", "aliases": ["IOwrite2"], "group": "IO Read/Write"}, {"opcode": -9490, "bal27": "M0M", "name": "ioread1", "aliases": ["IOread1"], "group": "IO Read/Write"}, {"opcode": -9489, "bal27": "M0N", "name": "ioread2", "aliases": ["IOread2"], "group": "IO Read/Write"}, {"opcode": -9460, "bal27": "M1Q", "name": "fopwri1", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9459, "bal27": "M1R", "name": "fopset1", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9458, "bal27": "M1S", "name": "fopwri2", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9457, "bal27": "M1T", "name": "fopset2", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9456, "bal27": "M1U", "name": "fopwri3", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9455, "bal27": "M1V", "name": "fopset3", "aliases": [], "group": "Fast Output Ports"}, {"opcode": -9000, "bal27": "NRR", "name": "stop", "aliases": [], "group": "Soft Stop"}, {"opcode": 0, "bal27": "0", "name": "null", "aliases": [], "group": "Other"}, {"opcode": 100, "bal27": "4S", "name": "excatch", "aliases": [], "group": "Exception Handling"}, {"opcode": 101, "bal27": "4T", "name": "expass", "aliases": [], "group": "Exception Handling"}, {"opcode": 102, "bal27": "4U", "name": "exreturn", "aliases": [], "group": "Exception Handling"}, {"opcode": 103, "bal27": "4V", "name": "exclear", "aliases": [], "group": "Exception Handling"}, {"opcode": 104, "bal27": "4W", "name": "exceptcode", "aliases": [], "group": "Exception Handling"}, {"opcode": 200, "bal27": "7B", "name": "typechk", "aliases": [], "group": "TernOO (extension)"}, {"opcode": 201, "bal27": "7C", "name": "typedispatch", "aliases": [], "group": "TernOO (extension)"}, {"opcode": 202, "bal27": "7D", "name": "typepack", "aliases": [], "group": "TernOO (extension)"}, {"opcode": 203, "bal27": "8M", "name": "typeunpack", "aliases": [], "group": "TernOO (extension)"}];
const tagColors = {
  'Register Operations': 'tag-reg',
  'Arithmetic': 'tag-alu',
  'Flow Control': 'tag-flow',
  'Memory Read/Write': 'tag-mem',
  'IO Read/Write': 'tag-io',
  'Fast Output Ports': 'tag-fop',
  'Stacks': 'tag-stack',
  'Soft Stop': 'tag-stop',
  'Exception Handling': 'tag-exc',
  'TernOO (extension)': 'tag-ternoo'
};

function render(filter) {
  filter = (filter || '').toLowerCase();
  var tbody = document.getElementById('opBody');
  tbody.innerHTML = '';
  var count = 0;
  opcodes.forEach(function(op) {
    var haystack = (op.name + ' ' + op.aliases.join(' ') + ' ' + op.opcode + ' ' + op.bal27 + ' ' + op.group).toLowerCase();
    if (filter && haystack.indexOf(filter) === -1) return;
    count++;
    var tr = document.createElement('tr');
    var groupClass = tagColors[op.group] || 'tag-other';
    tr.innerHTML =
      '<td><span class="group-tag ' + groupClass + '">' + op.group + '</span></td>' +
      '<td class="mono mnemonic">' + op.name + '</td>' +
      '<td class="mono aliases">' + (op.aliases.length ? op.aliases.join(', ') : '—') + '</td>' +
      '<td class="mono decimal">' + op.opcode + '</td>' +
      '<td class="mono bal27">' + op.bal27 + '</td>';
    tbody.appendChild(tr);
  });
}

function init() {
  document.getElementById('search').addEventListener('input', function(e) {
    render(e.target.value);
  });
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
