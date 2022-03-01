
(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) scene(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작되는 순간 true로 변경
  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 각 기기에 대응할 수 있게, 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
  
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
      }
    },
    {
      // 1
      type: 'normal',
      // heightNum: 5, // type normal에서는 필요없음.
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin')
      },
      values: {
          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
          messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
          messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
          messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
          messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
          messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
          messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
          messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
          messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
          messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
          pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
          pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
          pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
          pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
          pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
      }
    },
    {
      // 3
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption')
      },
      values: {
  
      }
    },
  ];

  const setCanvasImages = () => {
    let imgElem;

    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      // imgElem = document.createElement('img');
      imgElem = new Image();
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
  };

  // 각 스크롤 섹션의 높이 세팅
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHieght;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  };
  
  // currentYOffset : 현재 currentScene에서 스크롤된 크기
  const calcValues = (values, currentYOffset) => {
    let rv;

    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // 현재 scene에서 scroll된 범위를 비율로 구하기
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  };

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight; // 현재 씬에서 스크롤된 높이
    const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 높이
    const scrollRatio = currentYOffset / scrollHeight; // 현재 씬에서 스크롤된 비율

    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
        // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
            // in
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
            // in
            objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
            objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
            objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;
      case 2:
        // console.log('2 play');
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
            // in
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
            objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
            // out
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
            // in
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
            // out
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        break;
      case 3:
        console.log('3')
        break;
    }
  };

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true; // scene이 바뀌는 순간
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    } 

    if (yOffset < prevScrollHeight) {
      enterNewScene = true; // scene이 바뀌는 순간
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  };
  

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', () => {
    setLayout();
    document.body.classList.remove('before-load');
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });

    document.querySelector('.loading').addEventListener('transitionend', (e) => {
      document.body.removeChild(e.currentTarget);
    });
  });

  window.addEventListener('resize', setLayout);

  setLayout();  
  setCanvasImages();
 

})();