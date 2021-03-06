var colors = allColors();

var defaultDNA = {
  headcolor: 10,
  mouthColor: 13,
  eyesColor: 96,
  earsColor: 10,
  //Cattributes
  eyesShape: '0',
  decorationPattern: '0',
  decorationMidcolor: 13,
  decorationSidescolor: 13,
  animation: '0',
  lastNum: '01',
};

function setDna(dna) {
  $('#dnahead').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);

  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnadecoration').html(defaultDNA.decorationPattern);
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor);
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor);
  $('#dnaanimation').html(defaultDNA.animation);
  $('#dnaspecial').html(defaultDNA.lastNum);

  renderCat(dna);
}

// when page load
$(document).ready(function () {
  setDna(defaultDNA);
});

function getDna() {
  var dna = '';
  dna += $('#dnahead').html();
  dna += $('#dnamouth').html();
  dna += $('#dnaeyes').html();
  dna += $('#dnaears').html();
  dna += $('#dnashape').html();
  dna += $('#dnadecoration').html();
  dna += $('#dnadecorationMid').html();
  dna += $('#dnadecorationSides').html();
  dna += $('#dnaanimation').html();
  dna += $('#dnaspecial').html();

  return parseInt(dna);
}

function renderCat(dna) {
  headColor(colors[dna.headcolor], dna.headcolor);
  $('#bodycolor').val(dna.headcolor);
  mouthColor(colors[dna.mouthColor], dna.mouthColor);
  $('#mouthcolor').val(dna.mouthColor);
  eyesColor(colors[dna.eyesColor], dna.eyesColor);
  $('#eyesColor').val(dna.eyesColor);
  earsColor(colors[dna.earsColor], dna.earsColor);
  $('#earsColor').val(dna.earsColor);
  eyesShape(dna.eyesShape);
  $('#eyesShape').val(dna.eyesShape);
  decorationPattern(dna.decorationPattern);
  $('#decorationPattern').val(dna.decorationPattern);
  decorationMidcolor(colors[dna.decorationMidcolor], dna.decorationMidcolor);
  $('#decorationMidcolor').val(dna.decorationMidcolor);
  decorationSidescolor(
    colors[dna.decorationSidescolor],
    dna.decorationSidescolor
  );
  $('#decorationSidescolor').val(dna.decorationSidescolor);
  animation(dna.animation);
  $('#animation').val(dna.animation);
}

// Changing cat colors
$('#bodycolor').change(() => {
  var colorVal = $('#bodycolor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  headColor(colors[colorKey], colorKey);
});
$('#mouthcolor').change(() => {
  var colorVal = $('#mouthcolor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  mouthColor(colors[colorKey], colorKey);
});
$('#eyesColor').change(() => {
  var colorVal = $('#eyesColor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  eyesColor(colors[colorKey], colorKey);
});
$('#earsColor').change(() => {
  var colorVal = $('#earsColor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  earsColor(colors[colorKey], colorKey);
});
$('#eyesShape').change(() => {
  var shapeVal = $('#eyesShape').val();
  eyesShape(shapeVal);
});
$('#decorationPattern').change(() => {
  var shapeVal = $('#decorationPattern').val();
  decorationPattern(shapeVal);
});
$('#decorationMidcolor').change(() => {
  var colorVal = $('#decorationMidcolor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  decorationMidcolor(colors[colorKey], colorKey);
});
$('#decorationSidescolor').change(() => {
  var colorVal = $('#decorationSidescolor').val();
  var colorKey = ('00' + colorVal).slice(-2);
  decorationSidescolor(colors[colorKey], colorKey);
});
$('#animation').change(() => {
  var shapeVal = $('#animation').val();
  animation(shapeVal);
});
