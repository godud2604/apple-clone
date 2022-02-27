(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) scene(scroll-section)

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
      },
      values: {
        messageA_opacity: [0, 1],
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  // 각 스크롤 섹션의 높이 세팅
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
  };
  
  // currentYOffset : 현재 currentScene에서 스크롤된 크기
  const calcValues = (values, currentYOffset) => {
    let rv;

    // 현재 scene에서 scroll된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0];

    return rv;
  };

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;

        break;
      case 1:
        console.log('1')
        break;
      case 2:
        console.log('2')
        break;
      case 3:
        console.log('3')
        break;
    }
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    } 

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    playAnimation();
  };
  
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', setLayout);

  setLayout();
})();