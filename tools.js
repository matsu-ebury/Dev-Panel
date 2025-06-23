(
    function() {
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
    }
);
// Function to open links in a new tab
function openReport(target) {
    const urls = {
    'release': 'https://ebury.bank.ebury.com/jira/software/c/projects/DBA/boards/284/reports/version-report?version=10674',
    'burndown': 'https://ebury.bank.ebury.com/jira/software/c/projects/DBA/boards/284/reports/release-burndown?version=10674'
    };
    if (urls[target]) {
    window.open(urls[target], '_blank', 'noopener,noreferrer,width=1200,height=800');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});