const ChartManager = {
    charts: {},

    destroyAll() {
        Object.values(this.charts).forEach(chart => chart.destroy());
        this.charts = {};
    },

    createBurndownChart() {
        const ctx = document.getElementById('burndownChart')?.getContext('2d');
        if (!ctx) return;
        this.charts.burndown = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Start', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
                datasets: [
                    { label: 'Ideal', data: [310, 258, 206, 155, 103, 52, 0], borderColor: '#10b981', fill: false, tension: 0.2, pointRadius: 0 },
                    { label: 'Actual', data: [310, 270, 200, 200, 200, 200, 200], borderColor: '#4f46e5', backgroundColor: '#6366f1', fill: false, tension: 0.2, pointRadius: 4, pointBackgroundColor: '#4f46e5' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Story Points' } }, x: { title: { display: true, text: 'Week' } } } }
        });
    },

    createMttrChart() {
        const ctx = document.getElementById('mttrChart')?.getContext('2d');
        if (!ctx) return;
        this.charts.mttr = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['DBA-2025SP32', 'DBA-2025SP33', 'DBA-2025SP34', 'DBA-2025SP35', 'DBA-2526SP1'],
                datasets: [
                    { label: 'Average Story Points - DBA', data: [88, 98, 73, 89.5, 50.5], backgroundColor: '#4f46e5' },
                    { label: 'Story Points Team Z', data: [22, 45, 27, 33, 32], backgroundColor: '#10b981' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { beginAtZero: true, suggestedMax: 120, stacked: true } }, plugins: { legend: { display: true } } }
        });
    },

    createOverviewDeploymentsChart() {
        const ctx = document.getElementById('deploymentsChart_overview')?.getContext('2d');
        if (!ctx) return;
        this.charts.overviewDeployments = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: ['Build', 'Run'], datasets: [{ label: 'Build & Run', data: [74, 26], backgroundColor: ['#4f46e5', '#10b981'] }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } } }
        });
    },
    
    createEpicsStatusChart(epicsData) {
        const ctx = document.getElementById('epicsStatusChart')?.getContext('2d');
        if (!ctx) return;
        const epicLabels = Object.keys(epicsData);
        const statusKeys = ["Done", "Done in Sprint", "Pending", "Dropped"];
        const datasets = statusKeys.map(status => ({
            label: status,
            data: epicLabels.map(epic => epicsData[epic][status] || 0),
            backgroundColor: {"Done": "#304d1c", "Done in Sprint": "#02610f", "Pending": "#facc15", "Dropped": "#ef4444"}[status]
        }));
        this.charts.epicsStatus = new Chart(ctx, {
            type: 'bar',
            data: { labels: epicLabels, datasets: datasets },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { x: { stacked: true, title: { display: true, text: 'Story Count' } }, y: { stacked: true, ticks: { autoSkip: false } } } }
        });
    },

    createRunCausesChart(runCausesData) {
        const ctx = document.getElementById('runCausesChart')?.getContext('2d');
        if (!ctx) return;
        this.charts.runCauses = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(runCausesData).map(key => key.replace(/([A-Z])/g, ' $1').trim()),
                datasets: [{ label: 'Count', data: Object.values(runCausesData), backgroundColor: ['#ef4444', '#f59e0b', '#facc15', '#4f46e5'], hoverOffset: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }
        });
    }
};