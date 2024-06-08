function simulateMouseEvent(event, type) {
    const touch = event.changedTouches[0];
    const simulatedEvent = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1,
        screenX: touch.screenX,
        screenY: touch.screenY,
        clientX: touch.clientX,
        clientY: touch.clientY,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey,
        button: 0, // ЛКМ
        relatedTarget: null
    });

    touch.target.dispatchEvent(simulatedEvent);
}

// Обработчики касаний
function touchStartHandler(event) {
    event.preventDefault();
    simulateMouseEvent(event, 'mousedown');
}

function touchMoveHandler(event) {
    event.preventDefault();
    simulateMouseEvent(event, 'mousemove');
}

function touchEndHandler(event) {
    event.preventDefault();
    simulateMouseEvent(event, 'mouseup');
}

// Привязка обработчиков к элементам на странице
function initTouchEmulator() {
    document.addEventListener('touchstart', touchStartHandler, { passive: false });
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler, { passive: false });
}

// Инициализация эмулятора при загрузке страницы
window.addEventListener('load', initTouchEmulator);
