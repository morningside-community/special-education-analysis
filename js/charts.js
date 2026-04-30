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

    // Data: low estimate, high estimate, and fixed availability values
    var lowRequired = 31.94;
    var highRequired = 50.60;
    var fullTimeMid = 32.5;  // midpoint of 31-34 range
    var halfTimeMid = 14.5;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Required (conservative)',
          'Required (mid-range)',
          'Full-Time Available',
          'Half-Time Available'
        ],
        datasets: [{
          label: 'Hours per Week',
          data: [lowRequired, highRequired, fullTimeMid, halfTimeMid],
          backgroundColor: ['#0d6efd', '#084298', '#198754', '#dc3545'],
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
                return ' ' + context.parsed.x.toFixed(1) + ' hrs/week';
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 55,
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
              font: { size: 12 }
            }
          }
        },
        layout: {
          padding: { right: 70 }
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
                ctx2.fillText(value.toFixed(1) + ' hrs', x, y);
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
          'Morningside Current',
          'Granite SD Average'
        ],
        datasets: [
          {
            label: 'K-4 Students (21)',
            data: [21, 23.2],
            backgroundColor: ['#0d6efd', '#adb5bd'],
            borderWidth: 0,
            borderRadius: 0,
            barPercentage: 0.55
          },
          {
            label: 'Grade 5 Departing (7)',
            data: [7, 0],
            backgroundColor: ['#6c757d', 'transparent'],
            borderWidth: 0,
            borderRadius: {topLeft: 4, topRight: 4},
            barPercentage: 0.55
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 14,
              padding: 16,
              font: { size: 12 },
              filter: function (item) {
                return item.text !== '';
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ' ' + context.dataset.label + ': ' + context.parsed.y + ' students';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 35,
            stacked: true,
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
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              font: { size: 13 }
            }
          }
        },
        layout: {
          padding: {
            top: 25
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
            // Label total on top of each stacked bar
            var meta0 = chart.getDatasetMeta(0);
            var meta1 = chart.getDatasetMeta(1);
            meta0.data.forEach(function (bar, index) {
              var base = chart.data.datasets[0].data[index];
              var top = chart.data.datasets[1].data[index];
              var total = base + top;
              // Use the top segment's bar if it exists, otherwise the base
              var topBar = top > 0 ? meta1.data[index] : meta0.data[index];
              ctx2.fillText(total, topBar.x, topBar.y - 8);
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
            max: 80000,
            title: {
              display: true,
              text: 'Amount (USD)',
              font: { size: 13 }
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            },
            ticks: {
              stepSize: 10000,
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
        layout: {
          padding: {
            top: 25
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
