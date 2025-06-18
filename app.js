document.addEventListener('DOMContentLoaded', () => {
    const Dashboard = {
        init() {
            this.cacheDom();
            this.initEventListeners();
            this.initHistorySection(); // Set up the history dropdown first
            this.loadInitialView();   // Then load the initial view
        },

        cacheDom() {
            this.nav = document.getElementById('main-nav');
            this.sections = document.querySelectorAll('.content-section');
            this.buttons = this.nav.querySelectorAll('button');
            this.sprintSelect = document.getElementById('sprint-select');
        },

        initEventListeners() {
            this.nav.addEventListener('click', this.handleNavClick.bind(this));
            if (this.sprintSelect) {
                this.sprintSelect.addEventListener('change', (e) => this.updateSprintView(e.target.value));
            }
        },
        
        handleNavClick(e) {
            const button = e.target.closest('button');
            if (!button) return;

            const targetId = button.dataset.target;
            this.buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            this.sections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
            
            ChartManager.destroyAll();
            this.loadView(targetId);
        },
        
        loadView(viewId) {
            if (viewId === 'release') {
                ChartManager.createBurndownChart();
            } else if (viewId === 'overview') {
                ChartManager.createMttrChart();
                ChartManager.createOverviewDeploymentsChart();
            } else if (viewId === 'history' && this.sprintSelect) {
                this.updateSprintView(this.sprintSelect.value);
            }
        },

        loadInitialView() {
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                this.loadView(activeSection.id);
            }
        },
        
        initHistorySection() {
            // This function now ONLY populates the dropdown menu.
            // It no longer loads the charts, preventing the initial view from being cleared.
            if (!this.sprintSelect) return;
            const sprints = Object.keys(sprintData);
            this.sprintSelect.innerHTML = sprints.map(sprint => `<option value="${sprint}">${sprint}</option>`).join('');
        },

        updateSprintView(sprintId) {
            const data = sprintData[sprintId];
            if (!data) return;

            // This function is now only called when the history tab is active.
            ChartManager.destroyAll(); 

            // Update DOM elements for Total Dev Effort & Run Effort
            const totalEffortMetric = document.getElementById('total-effort-metric');
            const runEffortMetric = document.getElementById('run-effort-metric');
            const developBar = document.getElementById('develop-bar');
            const refineBar = document.getElementById('refine-bar');

            if (totalEffortMetric) totalEffortMetric.textContent = data.effort.build;
            if (runEffortMetric) runEffortMetric.textContent = 100 - data.effort.build;
            
            if (developBar) {
                developBar.style.width = `${data.effort.develop}%`;
                developBar.textContent = `${data.effort.develop}%`;
            }
            if (refineBar) {
                refineBar.style.width = `${data.effort.refine}%`;
                refineBar.textContent = `${data.effort.refine}%`;
            }
            
            ChartManager.createEpicsStatusChart(data.epics);
            ChartManager.createRunCausesChart(data.run_causes);
            ChartManager.runCausesDataTable(data.run_causes);
        }
    };

    Dashboard.init();
});