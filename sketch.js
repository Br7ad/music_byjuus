let m1;
let m2;
let musicStatus = "";

function preload() {
    // Carrega os arquivos de música
    m1 = loadSound('assets/music1.mp3');
    m2 = loadSound('assets/music2.mp3');
}

function setup() {
    createCanvas(400, 200);
    background(200);
    
    // Botões para tocar as músicas
    let playButton1 = createButton('Tocar Música 1');
    playButton1.position(10, 10);
    playButton1.mousePressed(() => {
        if (m1.isPlaying()) {
            m1.stop();
        } else {
            m1.play();
        }
    });

    let playButton2 = createButton('Tocar Música 2');
    playButton2.position(10, 40);
    playButton2.mousePressed(() => {
        if (m2.isPlaying()) {
            m2.stop();
        } else {
            m2.play();
        }
    });
}



function setup() {
    // Cria a tela e centraliza
    let canvas = createCanvas(640, 480);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    // Acessa a webcam
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide(); // Oculta o componente extra criado pelo p5.js
    poseNet = ml5.poseNet(capture, modelReady);
    poseNet.on('pose', function(results) {
        poses = results;
});
function modelReady() {
    console.log('Modelo PoseNet está pronto')};

function draw() {
    background(200);
    image(capture, 0, 0, width, height); // Exibe a imagem da webcam na tela
    image(video, 0, 0, 640, 480);

  // Verificar se os resultados do poseNet são maiores que 0
  if (poses.length > 0) {
    let leftWristX = poses[0].pose.keypoints[9].position.x;
    let leftWristY = poses[0].pose.keypoints[9].position.y;
    leftWristScore = poses[0].pose.keypoints[9].score;

    let rightWristX = poses[0].pose.keypoints[10].position.x;
    let rightWristY = poses[0].pose.keypoints[10].position.y;
    rightWristScore = poses[0].pose.keypoints[10].score;

    // Definir a cor da borda do círculo
    stroke(255, 0, 0);
    fill(255, 0, 0);

    // Obter o status de musica1
    let isMusic1Playing = song1.isPlaying();

    // Verificar se a pontuação do pulso esquerdo é maior que 0.2
    if (leftWristScore > 0.2) {
      // Desenhar um círculo nas coordenadas X e Y do pulso esquerdo
      circle(leftWristX, leftWristY, 20);

      // Parar a reprodução da musica2
      if (song2.isPlaying()) {
        song2.stop();
      }

      // Verificar se musica1 não está tocando
      if (!isMusic1Playing) {
        // Tocar musica1
        song1.play();
        // Atualizar a tag de cabeçalho com o nome da musica1
        document.getElementById('song').innerText = "Reproduzindo: music1";
      }
    }

    // Verificar se a pontuação do pulso direito é maior que 0.2
    if (rightWristScore > 0.2) {
      // Desenhar um círculo nas coordenadas X e Y do pulso direito
      circle(rightWristX, rightWristY, 20);

      // Parar a reprodução da musica1
      if (song1.isPlaying()) {
        song1.stop();
      }

      // Verificar se musica2 não está tocando
      if (!song2.isPlaying()) {
        // Tocar musica2
        song2.play();
        // Atualizar a tag de cabeçalho com o nome da musica2
        document.getElementById('song').innerText = "Reproduzindo: music2";
      }
    }
  }
}

}
var x  = 0
var y = 0
var x2 = 0
var y2 = 0


function got_poses () {
if (poses.length > 0) {
    let pose = poses[0].pose;
    leftWristScore = poses[0].pose.keypoints[9].score;
}
    // Verifica se os pontos de confiança são maiores que 0
    if (pose.keypoints.length > 0) {
        // Busca as coordenadas X e Y dos pulsos esquerdo e direito
        leftWristX = pose.keypoints.find(point => point.part === 'leftWrist').position.x;
        leftWristY = pose.keypoints.find(point => point.part === 'leftWrist').position.y;
        rightWristX = pose.keypoints.find(point => point.part === 'rightWrist').position.x;
        rightWristY = pose.keypoints.find(point => point.part === 'rightWrist').position.y;}
        fill(0, 255, 0);
        ellipse(leftWristX, leftWristY, 10, 10);
        ellipse(rightWristX, rightWristY, 10, 10);
    }
    
var leftWristScore = 0
var rightWristScore = 0
var leftWristX = 0
var leftWristY = 0
var rightWristX = 0
var rightWristY = 0
