const windowEl = document.querySelector('.window');
const titleBarEl = windowEl.querySelector('.titlebar');
let isDragging = false;
let mouseOffset = { x: 0, y: 0 };
let windowOffset = { x: 0, y: 0 };
let minLeft = 10;
let maxLeft = window.innerWidth - windowEl.offsetWidth - 10;
let minTop = 10;
let maxTop = window.innerHeight - windowEl.offsetHeight - 10;

function onMouseDown(event) {
  isDragging = true;
  mouseOffset.x = event.clientX;
  mouseOffset.y = event.clientY;
  windowOffset.x = parseInt(window.getComputedStyle(windowEl).getPropertyValue('left')) || 0;
  windowOffset.y = parseInt(window.getComputedStyle(windowEl).getPropertyValue('top')) || 0;
}

function onMouseMove(event) {
  if (isDragging) {
    const newLeft = windowOffset.x + event.clientX - mouseOffset.x;
    const newTop = windowOffset.y + event.clientY - mouseOffset.y;
    if (newLeft >= minLeft && newLeft <= maxLeft) {
      windowEl.style.left = newLeft + 'px';
    } else if (newLeft < minLeft) {
      windowEl.style.left = minLeft + 'px';
    } else {
      windowEl.style.left = maxLeft + 'px';
    }
    if (newTop >= minTop && newTop <= maxTop) {
      windowEl.style.top = newTop + 'px';
    } else if (newTop < minTop) {
      windowEl.style.top = minTop + 'px';
    } else {
      windowEl.style.top = maxTop + 'px';
    }
  }
}

function onMouseUp() {
  isDragging = false;
}

window.addEventListener('resize', function() {
  maxLeft = window.innerWidth - windowEl.offsetWidth - 10;
  maxTop = window.innerHeight - windowEl.offsetHeight - 10;
  if (parseInt(window.getComputedStyle(windowEl).getPropertyValue('left')) > maxLeft) {
    windowEl.style.left = maxLeft + 'px';
  }
  if (parseInt(window.getComputedStyle(windowEl).getPropertyValue('top')) > maxTop) {
    windowEl.style.top = maxTop + 'px';
  }
});

windowEl.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);