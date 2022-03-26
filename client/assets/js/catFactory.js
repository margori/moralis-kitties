//Random color
function getColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function genColors() {
  var colors = [];
  for (var i = 10; i < 99; i++) {
    var color = getColor();
    colors[i] = color;
  }
  return colors;
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color, code) {
  $('.cat__head, .cat__chest, .cat__tail').css('background', '#' + color); //This changes the color of the cat
  $('#bodycode').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnahead').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color, code) {
  $('.cat__mouth-contour, .cat__chest_inner').css('background', '#' + color); //This changes the color of the cat
  $('#mouthcode').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnamouth').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor(color, code) {
  $('.pupil-right,.pupil-left').css('background', '#' + color); //This changes the color of the cat
  $('#eyescore').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnaeyes').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color, code) {
  $(
    '.cat__paw-left,.cat__paw-left_inner,.cat__paw-right,.cat__paw-right_inner,#leftEar,#rightEar'
  ).css('background', '#' + color); //This changes the color of the cat
  $('#earscore').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnaears').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function decorationMidcolor(color, code) {
  $('#midDot').css('background', '#' + color); //This changes the color of the cat
  $('#decorationMidcolorName').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnadecorationMid').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function decorationSidescolor(color, code) {
  $('#leftDot,#rightDot').css('background', '#' + color); //This changes the color of the cat
  $('#decorationSidescolorName').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnadecorationSides').html(code); //This updates the body color part of the DNA that is displayed below the cat
}
//###################################################
//Functions below will be used later on in the project
//###################################################
function eyesShape(num) {
  $('#dnashape').html(num);
  switch (num) {
    case '0':
      normalEyes();
      $('#eyesName').html('Basic');
      break;
    case '1':
      normalEyes();
      chillEyes();
      $('#eyesName').html('Chill');
      break;
    case '2':
      normalEyes();
      upEyes();
      $('#eyesName').html('Up');
      break;
  }
}

function decorationPattern(num) {
  $('#dnadecoration').html(num);
  switch (num) {
    case '0':
      $('#decorationPatternName').html('Basic');
      normalDecorationPatern();
      break;
    case '1':
      $('#decorationPatternName').html('Tilted');
      normalDecorationPatern();
      tiltedDecorationPatern();
      break;
    case '2':
      $('#decorationPatternName').html('Longer');
      normalDecorationPatern();
      longerDecorationPatern();
      break;
  }
}

async function normalEyes() {
  await $('.cat__eye').find('span').css('border', 'none');
}

async function chillEyes() {
  await $('.cat__eye').find('span').css('border-top', '15px solid');
}

async function upEyes() {
  await $('.cat__eye').find('span').css('border-bottom', '10px solid');
}

async function normalDecorationPatern() {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_left').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
  });
  $('.cat__head-dots_right').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
  });
}

async function tiltedDecorationPatern() {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  $('.cat__head-dots').css({
    transform: 'rotate(15deg) scaleY(1.1)',
    'border-radius': '20% 0 50% 50%',
  });
  $('.cat__head-dots_left').css({
    top: '5px',
  });
  $('.cat__head-dots_right').css({
    top: '-2px',
    'border-radius': '10% 50% 50% 50%',
  });
}

async function longerDecorationPatern() {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  $('.cat__head-dots').css({
    transform: 'rotate(0deg) scaleY(1.5)',
    top: '13px',
  });
}

function animation(num) {
  $('#head').removeClass('tiltHead');
  $('#head').removeClass('leftRightHead');
  $('#head').removeClass('upDownHead');

  switch (num) {
    case '0':
      $('#animationName').html('Still');
      break;
    case '1':
      $('#animationName').html('Tilt');
      $('#head').addClass('tiltHead');
      break;
    case '2':
      $('#animationName').html('Left Right');
      $('#head').addClass('leftRightHead');
      break;
    case '3':
      $('#animationName').html('Up Down');
      $('#head').addClass('upDownHead');
      break;
  }
}
