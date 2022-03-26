const rand = (min, max) =>
  Math.round(Math.random() * (max - min + 1) + min).toString();

$('#random-btn').click(() => {
  var newDNA = {
    headcolor: rand(0, 99),
    mouthColor: rand(0, 99),
    eyesColor: rand(0, 99),
    earsColor: rand(0, 99),
    //Cattributes
    eyesShape: rand(0, 2),
    decorationPattern: rand(0, 2),
    decorationMidcolor: rand(0, 2),
    decorationSidescolor: rand(0, 99),
    animation: rand(0, 3),
    lastNum: '01',
  };
  setDna(newDNA);
});
$('#default-btn').click(() => {
  setDna(defaultDNA);
});
$('#create-btn').click(() => {
  console.log('create clicked');
});