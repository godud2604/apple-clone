(() => {
  
  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 각 기기에 대응할 수 있게, 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
      },
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
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

    console.log(sceneInfo);
  };
  
  window.addEventListener('resize', setLayout);

  setLayout();
})();