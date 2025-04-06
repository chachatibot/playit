<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>按顺序定格照片</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script>
    let video;
    let capturedPhotos = [];
    
    // 定义可选尺寸数组，每个对象包含宽和高
    const sizes = [
      { w: 80,  h: 80 },
      { w: 80,  h: 160 },
      { w: 80,  h: 60 },
      { w: 160, h: 80 },
      { w: 60,  h: 80 }
    ];

    // 变量来记录当前使用的尺寸索引
    let currentSizeIndex = 0;
    
    function setup() {
      createCanvas(640, 480);
      video = createCapture(VIDEO);
      video.size(width, height);
      video.hide();
    }
    
    function draw() {
      image(video, 0, 0, width, height);
      
      // 绘制已捕捉的照片
      for (let i = 0; i < capturedPhotos.length; i++) {
        let photoObj = capturedPhotos[i];
        image(photoObj.img, photoObj.x, photoObj.y, photoObj.w, photoObj.h);
      }
    }
    
    function mousePressed() {
      // 获取当前尺寸
      let chosenSize = sizes[currentSizeIndex];
      let regionW = chosenSize.w;
      let regionH = chosenSize.h;

      // 输出调试信息，查看当前选择的尺寸
      console.log("Chosen size: ", regionW, "x", regionH);
      
      // 以鼠标点击位置为中心，计算截图区域坐标
      let x = mouseX - regionW / 2;
      let y = mouseY - regionH / 2;
      
      // 防止区域超出画布边界
      x = constrain(x, 0, width - regionW);
      y = constrain(y, 0, height - regionH);
      
      // 截取定格区域
      let captured = get(x, y, regionW, regionH);
      
      // 保存截图及其位置和尺寸
      capturedPhotos.push({ img: captured, x: x, y: y, w: regionW, h: regionH });
      console.log("Captured photo at", x, y, "with size", regionW, "x", regionH);
      
      // 更新当前尺寸索引，按顺序循环
      currentSizeIndex = (currentSizeIndex + 1) % sizes.length;
    }
  </script>
</body>
</html>
