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
                // ChartManager.createBurndownChart();
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
            const plannedDroppedMetric = document.getElementById('planned-dropped-metric');
            const runTicketsMetric = document.getElementById('run-tickets-metric'); 
            const notPlannedMetric = document.getElementById('not-planned-metric');
            const velocityCommitedMetric = document.getElementById('velocity-commited-metric');
            const velocityCompletedMetric = document.getElementById('velocity-completed-metric');
            const velocityDonePercentage = document.getElementById('velocity-done-percentage');
            const velocityCompletedBar = document.getElementById('velocity-completed-bar');
            const velocityRemainingBar = document.getElementById('velocity-remaining-bar');
            const velocityOverrunMetric = document.getElementById('velocity-overrun-metric');

            if (plannedDroppedMetric) plannedDroppedMetric.textContent = data.effort.plannedDropped;
            if (runTicketsMetric) runTicketsMetric.textContent = data.effort.runTickets;
            if (notPlannedMetric) notPlannedMetric.textContent = data.effort.notPlanned;

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

            const velocityData = typeof velocity === 'object' ? velocity[sprintId] : null;
            if (velocityData) {
                const commited = Number(velocityData.commited) || 0;
                const completed = Number(velocityData.completed) || 0;
                const completedPctRaw = commited > 0 ? (completed / commited) * 100 : 0;
                const completedPct = Math.min(completedPctRaw, 100);
                const remainingPct = commited > 0 ? Math.max(100 - completedPct, 0) : 0;
                const overrun = completed - commited;

                if (velocityCommitedMetric) velocityCommitedMetric.textContent = commited;
                if (velocityCompletedMetric) velocityCompletedMetric.textContent = completed;
                if (velocityDonePercentage) velocityDonePercentage.textContent = `${completedPctRaw.toFixed(0)}`;

                if (velocityCompletedBar) {
                    velocityCompletedBar.style.width = `${completedPct}%`;
                    velocityCompletedBar.textContent = completedPct >= 18 ? `${completedPct.toFixed(0)}%` : '';
                }

                if (velocityRemainingBar) {
                    velocityRemainingBar.style.width = `${remainingPct}%`;
                    velocityRemainingBar.textContent = remainingPct >= 18 ? `${remainingPct.toFixed(0)}%` : '';
                }

                if (velocityOverrunMetric) {
                    if (overrun > 0) {
                        velocityOverrunMetric.textContent = `+${overrun} above planned`;
                        velocityOverrunMetric.classList.remove('hidden');
                    } else {
                        velocityOverrunMetric.classList.add('hidden');
                        velocityOverrunMetric.textContent = '';
                    }
                }
            } else {
                if (velocityCommitedMetric) velocityCommitedMetric.textContent = '--';
                if (velocityCompletedMetric) velocityCompletedMetric.textContent = '--';
                if (velocityDonePercentage) velocityDonePercentage.textContent = '--';
                if (velocityCompletedBar) {
                    velocityCompletedBar.style.width = '0%';
                    velocityCompletedBar.textContent = '';
                }
                if (velocityRemainingBar) {
                    velocityRemainingBar.style.width = '0%';
                    velocityRemainingBar.textContent = '';
                }
                if (velocityOverrunMetric) {
                    velocityOverrunMetric.classList.add('hidden');
                    velocityOverrunMetric.textContent = '';
                }
            }
            
            ChartManager.createEpicsStatusChart(data.epics);
            ChartManager.createRunCausesChart(data.run_causes);
            ChartManager.populateRunCausesTable(data.run_causes);
            ChartManager.createVelocityChart();
        }
    };

    Dashboard.init();
});