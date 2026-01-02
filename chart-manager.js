const ChartManager = {
    charts: {},

    destroyAll() {
        Object.values(this.charts).forEach(chart => chart.destroy());
        this.charts = {};
    },


    createMttrChart() {
        const ctx = document.getElementById('mttrChart')?.getContext('2d');
        if (!ctx) return;
        this.charts.mttr = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['DBA-2526SP15', 'DBA-2526SP16', 'DBA-2526SP17'],
                datasets: [
                    { label: 'Commited', data: [81, 83, 75], backgroundColor: '#4f46e5' },
                    { label: 'Delivered', data: [90, 81, 76], backgroundColor: '#10b981' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { beginAtZero: true, suggestedMax: 120, stacked: true } }, plugins: { legend: { display: true } } }
        });
    },

    createVelocityChart() {
        const ctx = document.getElementById('velocityChart')?.getContext('2d');
        if (!ctx) return;

        // Use the global velocity variable
        if (typeof velocity !== 'object') return;

        const labels = Object.keys(velocity);
        const commitedData = labels.map(label => velocity[label].commited);
        const completedData = labels.map(label => velocity[label].completed);

        // Calculate averages
        // const avgCommited = commitedData.length ? (commitedData.reduce((a, b) => a + b, 0) / commitedData.length) : 0;
        const avgCompleted = completedData.length ? (completedData.reduce((a, b) => a + b, 0) / completedData.length) : 0;

        this.charts.velocity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Commited', data: commitedData, backgroundColor: '#4f46e5' },
                    { label: 'Completed', data: completedData, backgroundColor: '#10b981' },
                    // Average lines as "line" datasets
                    // { 
                    //     label: 'Avg Commited', 
                    //     data: Array(labels.length).fill(avgCommited), 
                    //     type: 'line', 
                    //     borderColor: '#6366f1', 
                    //     borderDash: [6, 6], 
                    //     fill: false, 
                    //     pointRadius: 0 
                    // },
                    { 
                        label: 'Average: '+ avgCompleted.toFixed(2), 
                        data: Array(labels.length).fill(avgCompleted), 
                        type: 'line', 
                        borderColor: '#22c55e', 
                        borderDash: [6, 6], 
                        fill: false, 
                        pointRadius: 0 
                    }
                ]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { 
                    x: { stacked: false },
                    y: { beginAtZero: true, suggestedMax: 120, stacked: false } 
                }, 
                plugins: { legend: { display: true } } 
            }
        });
    },

    createOverviewDeploymentsChart() {
        const ctx = document.getElementById('deploymentsChart_overview')?.getContext('2d');
        if (!ctx) return;
        this.charts.overviewDeployments = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: ['Build', 'Run'], datasets: [{ label: 'Build & Run', data: [73, 27], backgroundColor: ['#4f46e5', '#10b981'] }] },
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

        // Populate the data table
        this.populateRunCausesTable(runCausesData);

        // Create the chart (with tooltips disabled)
        const dataKeys = Object.keys(runCausesData);
        this.charts.runCauses = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: dataKeys.map(key => key.replace(/([A-Z])/g, ' $1').trim()),
            datasets: [{
                label: 'Count',
                data: Object.values(runCausesData),
                backgroundColor: ['#ef4444', '#f59e0b', '#facc15', '#4f46e5', '#10b981', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1'],
                hoverOffset: Array(dataKeys.length).fill(4)
            }]
            },
            options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                position: 'top'
                },
                tooltip: {
                enabled: true
                }
            }
            }
        });
    },

    populateRunCausesTable(data) {
        const tableBody = document.querySelector('#runCausesDataTable tbody');
        if (!tableBody) return;

        // Clear any existing rows
        tableBody.innerHTML = '';

        // Iterate over the data and add rows to the table
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const cause = key.replace(/([A-Z])/g, ' $1').trim(); // Format the cause name
                const count = data[key];

                const row = tableBody.insertRow();
                const causeCell = row.insertCell();
                const countCell = row.insertCell();

                causeCell.textContent = cause;
                countCell.textContent = count;
            }
        }
    }
};
// Function to create a progress bar element
function createProgressBar(progress) {
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');

    const progressBar = document.createElement('div');
    progressBar.classList.add('epic-progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress}%`;

    // Add a class for different colors based on progress (optional)
    if (progress >= 70) {
        progressBar.style.backgroundColor = '#28a745'; // Darker green for complete
    } else if (progress >= 20 && progress < 70 ) {
        progressBar.style.backgroundColor = '#ffc107'; // Yellow for good progress
    } else {
        progressBar.style.backgroundColor = '#FFA500'; // Orange for low progress
    }

    progressContainer.appendChild(progressBar);
    return progressContainer;
}

// Function to render the epic data
function renderEpicData(data) {
    const projectListDiv = document.getElementById('project-list');
    if (!projectListDiv) {
        console.error("Element with ID 'project-list' not found.");
        return;
    }

    for (const projectTitle in data) {
        const project = data[projectTitle];

        const projectItemDiv = document.createElement('div');
        projectItemDiv.classList.add('project-item');

        const titleElement = document.createElement('div');
        titleElement.classList.add('project-title');
        titleElement.textContent = projectTitle;
        // Align title to the top
        titleElement.style.marginBottom = 'auto';

        const detailsElement = document.createElement('div');
        detailsElement.classList.add('project-details');
        detailsElement.textContent = `Stories: ${project.Stories} | Story Points: ${project["Story Points"]}`;
        // Make detailsElement stick to the bottom using flex
        projectItemDiv.style.display = 'flex';
        projectItemDiv.style.flexDirection = 'column';
        projectItemDiv.style.justifyContent = 'flex-end';
        // projectItemDiv.style.height = '180px'; // Adjust as needed for your card height

        const progressBarElement = createProgressBar(project.Progress);

        projectItemDiv.appendChild(titleElement);
        projectItemDiv.appendChild(detailsElement);
        projectItemDiv.appendChild(progressBarElement);

        projectListDiv.appendChild(projectItemDiv);
    }
}

// Check if epicData is defined (it should be, as data.js is loaded first)
if (typeof epicData !== 'undefined') {
    renderEpicData(epicData);
} else {
    console.error("epicData is not defined. Make sure 'data.js' is loaded before 'script.js'.");
}