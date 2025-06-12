(function() {
    const threshold = 160;

    const blocker = () => {
        setInterval(() => {
            debugger;
        }, 50);
    };

    const detectDevTools = () => {
        if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
            blocker();
        }
    };
    
    window.addEventListener('contextmenu', e => e.preventDefault(), false);

    window.addEventListener('keydown', e => {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
        }
    });

    setInterval(detectDevTools, 1000);
})();