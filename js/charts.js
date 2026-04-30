// charts.js - Chart.js chart definitions for SPED Staffing Data Brief
// All charts initialize on DOMContentLoaded.

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // Chart 1: workloadGapChart — Horizontal bar chart
  // Compares required weekly hours vs. full-time and half-time availability
  // ============================================================
  (function () {
    var ctx = document.getElementById('workloadGapChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Required Weekly Hours', 'Full-Time Available', 'Half-Time Available'],
        datasets: [{
          label: 'Hours per Week',
          data: [31.94, 31.0, 14.5],
          backgroundColor: ['#0d6efd', '#198754', '#dc3545'],
          borderWidth: 0,
          borderRadius: 3
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' ' + context.parsed.x.toFixed(2) + ' hrs/week';
              }
            }
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 36,
            title: {
              display: true,
              text: 'Hours per Week',
              font: { size: 13 }
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            },
            ticks: {
              stepSize: 5
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: { size: 13 }
            }
          }
        },
        animation: {
          onComplete: function () {
            var chart = this;
            var ctx2 = chart.ctx;
            ctx2.save();
            ctx2.font = 'bold 13px sans-serif';
            ctx2.fillStyle = '#212529';
            ctx2.textBaseline = 'middle';
            chart.data.datasets.forEach(function (dataset, datasetIndex) {
              var meta = chart.getDatasetMeta(datasetIndex);
              meta.data.forEach(function (bar, index) {
                var value = dataset.data[index];
                var x = bar.x + 6;
                var y = bar.y;
                ctx2.fillText(value.toFixed(2) + ' hrs', x, y);
              });
            });
            ctx2.restore();
          }
        }
      }
    });
  }());

  // ============================================================
  // Chart 3: placementPieChart — Doughnut chart
  // Granite SD student placement breakdown
  // ============================================================
  (function () {
    var ctx = document.getElementById('placementPieChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'General education with pullouts (63%)',
          '60-179 min/day in SPED setting (23%)',
          'Self-contained 180+ min/day (13%)'
        ],
        datasets: [{
          data: [63, 23, 13],
          backgroundColor: ['#0d6efd', '#6ea8fe', '#084298'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12 },
              padding: 14,
              boxWidth: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' ' + context.label;
              }
            }
          }
        }
      }
    });
  }());

  // ============================================================
  // Chart 4: caseloadCompareChart — Vertical bar chart
  // Morningside vs. Granite SD average caseload
  // ============================================================
  (function () {
    var ctx = document.getElementById('caseloadCompareChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Morningside\nCurrent (all grades)',
          'Morningside\nProjected (K-4 only)',
          'Granite SD\nAverage'
        ],
        datasets: [{
          label: 'Students per Teacher',
          data: [28, 21, 23.2],
          backgroundColor: ['#6c757d', '#0d6efd', '#adb5bd'],
          borderWidth: 0,
          borderRadius: 4,
          barPercentage: 0.55
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' ' + context.parsed.y + ' students';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 35,
            title: {
              display: true,
              text: 'Students per Teacher',
              font: { size: 13 }
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            },
            ticks: {
              stepSize: 5
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: { size: 12 }
            }
          }
        },
        animation: {
          onComplete: function () {
            var chart = this;
            var ctx2 = chart.ctx;
            ctx2.save();
            ctx2.font = 'bold 14px sans-serif';
            ctx2.fillStyle = '#212529';
            ctx2.textAlign = 'center';
            chart.data.datasets.forEach(function (dataset, datasetIndex) {
              var meta = chart.getDatasetMeta(datasetIndex);
              meta.data.forEach(function (bar, index) {
                var value = dataset.data[index];
                ctx2.fillText(value, bar.x, bar.y - 8);
              });
            });
            ctx2.restore();
          }
        }
      }
    });
  }());

  // ============================================================
  // Chart 5: costCompareChart — Vertical bar chart
  // Est. annual savings from half-time vs. cost of one due process case
  // ============================================================
  (function () {
    var ctx = document.getElementById('costCompareChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Est. Annual Savings (half-time)', 'Cost of One Due Process Case'],
        datasets: [{
          label: 'Amount (USD)',
          data: [35000, 70000],
          backgroundColor: ['#198754', '#dc3545'],
          borderWidth: 0,
          borderRadius: 4,
          barPercentage: 0.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' $' + context.parsed.y.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (USD)',
              font: { size: 13 }
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            },
            ticks: {
              callback: function (value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: { size: 13 }
            }
          }
        },
        animation: {
          onComplete: function () {
            var chart = this;
            var ctx2 = chart.ctx;
            ctx2.save();
            ctx2.font = 'bold 14px sans-serif';
            ctx2.fillStyle = '#212529';
            ctx2.textAlign = 'center';
            chart.data.datasets.forEach(function (dataset, datasetIndex) {
              var meta = chart.getDatasetMeta(datasetIndex);
              meta.data.forEach(function (bar, index) {
                var value = dataset.data[index];
                ctx2.fillText('$' + value.toLocaleString(), bar.x, bar.y - 8);
              });
            });
            ctx2.restore();
          }
        }
      }
    });
  }());

});
