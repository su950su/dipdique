window.addEventListener("DOMContentLoaded", () => {
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("section");
  const items = document.querySelectorAll(".fixed_item img");

  sections.forEach((section, index) => {
    // --- 1. 배경 이미지(.bg-img) 애니메이션 ---
    const sectionImages = section.querySelectorAll(".bg-img");

    if (sectionImages.length > 0) {
      gsap.fromTo(sectionImages, 
        { opacity: 0, y: 100 }, 
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            start: "top 30%", // 화면의 30% 지점에 섹션 상단이 오면 시작
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // --- 2. 고정 향수병(.fixed_item) 교체 ---
    ScrollTrigger.create({
      trigger: section,
      start: "top 30%", 
      end: "bottom 70%",
      onEnter: () => changeItem(index),      
      onEnterBack: () => changeItem(index),  
    });
  });

  // 이미지 교체 함수
  function changeItem(index) {
    gsap.to(items, { 
      opacity: 0, 
      duration: 0.3, 
      overwrite: "auto" // 진행 중인 애니메이션을 중단하고 새 애니메이션 실행
    });
    
    if (items[index]) {
      gsap.to(items[index], { 
        opacity: 1, 
        duration: 0.1, 
        overwrite: "auto" 
      });
    }
  }
});