const rand = (min, max) =>
  Math.round(Math.random() * (max - min + 1) + min).toString();

const showMessage = (message) => {
  if (message) {
    $('#btn-message').show();
    $('#btn-message-content').html(message);
  } else {
    $('#btn-message').hide();
  }
};

$('#random-btn').click(() => {
  showMessage('');
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
  showMessage('');
  setDna(defaultDNA);
});

$('#create-btn').click(() => {
  showMessage('');
  const newDna = getDna();
  console.log('newDna', newDna);

  instance.methods
    .createKittyGen0(newDna)
    .send({})
    .then((result) => {
      showMessage('Kitty created successfully');
      console.log('txhash', result.transactionHash);
    })
    .catch((error) => {
      console.error(error);
    });
});
