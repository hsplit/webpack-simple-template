/* slider clients */
document.addEventListener('click', function(event) {
    if (event.target.closest('.client-said .slider__arrow')) {
        const target = event.target.closest('.client-said .slider__arrow');
        const arrows = document.querySelectorAll('.client-said .slider__arrow');
        const slidesList = document.querySelectorAll('.client-said .slide');
        const radioList = document.querySelectorAll('.client-said .controls__radio');
        const isRightArrow = target === arrows[1];
        
        const changeStyles = (direction) => {
            radioList[currentIndex + direction].checked = true;
            slidesList[currentIndex].classList.toggle('slide_active');
            slidesList[currentIndex + direction].classList.toggle('slide_active');
        };
        const moveSlides = (direction) => {
            for (let i = 0; i < slidesList.length; i++) {
                const step = window.innerWidth > 820 ? 50 : 100;
                slidesList[i].style = `left: ${-step*(currentIndex + direction)}%`;
            }
        };
        const shiftSlider = (direction) => {
            if (window.innerWidth > 820 && currentIndex === radioList.length - 2 && direction !== -1) {
                changeStyles(direction);
            } else if (window.innerWidth > 820 && currentIndex === radioList.length - 1) {
                changeStyles(direction);
            } else {
                changeStyles(direction);
                moveSlides(direction);
            }
        };
        let currentIndex;
        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                currentIndex = i;
                break;
            }
        }

        if (isRightArrow) {
            if (currentIndex === 0) {
                arrows[0].classList.remove('slider__arrow_disabled');
            }
            if (currentIndex + 1 === slidesList.length - 1) {
                arrows[1].classList.add('slider__arrow_disabled');
            }
            shiftSlider(1);
        } else {
            if (currentIndex === slidesList.length - 1) {
                arrows[1].classList.remove('slider__arrow_disabled');
            }
            if (currentIndex === 1) {
                arrows[0].classList.add('slider__arrow_disabled');
            }
            shiftSlider(-1);
        }
    }
});
window.addEventListener('resize', function() {
    const slidesList = document.querySelectorAll('.client-said .slide');
    const radioList = document.querySelectorAll('.client-said .controls__radio');
    
    let currentIndex;
    for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            currentIndex = i;
            break;
        }
    }
    if (currentIndex === radioList.length - 1 && window.innerWidth > 820) {
        currentIndex = currentIndex - 1;
    }
    
    for (let i = 0; i < slidesList.length; i++) {
        const step = window.innerWidth > 820 ? 50 : 100;
        slidesList[i].style = `left: ${-step*currentIndex}%`;
    }
});