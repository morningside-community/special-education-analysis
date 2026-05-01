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

    // Per-student hours from research
    var perStudentLow = 1.54;
    var perStudentHigh = 2.42;
    var fullTime = 32.5;
    var halfTime = 14.5;

    // Scenarios
    var scenarios = ['Morningside K-4\n(20 students)', 'Morningside Current\n(28 students)', 'Granite SD Average\n(23.2 students)'];
    var studentCounts = [20, 28, 23.2];
    var lowHours = studentCounts.map(function(n) { return Math.round(n * perStudentLow * 10) / 10; });
    var highHours = studentCounts.map(function(n) { return Math.round(n * perStudentHigh * 10) / 10; });
    // For stacking: mid-range shows only the additional hours above conservative
    var extraHours = highHours.map(function(h, i) { return Math.round((h - lowHours[i]) * 10) / 10; });

    // Custom plugin to draw full-width dashed reference lines
    var refLinesPlugin = {
      id: 'refLines',
      afterDraw: function(chart) {
        var ctx2 = chart.ctx;
        var yScale = chart.scales.y;
        var chartArea = chart.chartArea;
        ctx2.save();

        // Full-time line
        var ftY = yScale.getPixelForValue(fullTime);
        ctx2.strokeStyle = '#198754';
        ctx2.lineWidth = 2.5;
        ctx2.setLineDash([10, 5]);
        ctx2.beginPath();
        ctx2.moveTo(chartArea.left, ftY);
        ctx2.lineTo(chartArea.right, ftY);
        ctx2.stroke();

        // Half-time line
        var htY = yScale.getPixelForValue(halfTime);
        ctx2.strokeStyle = '#dc3545';
        ctx2.beginPath();
        ctx2.moveTo(chartArea.left, htY);
        ctx2.lineTo(chartArea.right, htY);
        ctx2.stroke();

        ctx2.setLineDash([]);
        ctx2.restore();
      }
    };

    new Chart(ctx, {
      type: 'bar',
      plugins: [refLinesPlugin],
      data: {
        labels: scenarios,
        datasets: [
          {
            label: 'Conservative estimate',
            data: lowHours,
            backgroundColor: '#6ea8fe',
            borderWidth: 0,
            borderRadius: 0,
            barPercentage: 0.55,
            categoryPercentage: 0.65,
            stack: 'required'
          },
          {
            label: 'Mid-range estimate (additional)',
            data: extraHours,
            backgroundColor: '#084298',
            borderWidth: 0,
            borderRadius: {topLeft: 4, topRight: 4},
            barPercentage: 0.55,
            categoryPercentage: 0.65,
            stack: 'required'
          },
          {
            // Hidden dataset just for the legend entry
            label: 'Full-time available (' + fullTime + ' hrs)',
            data: [],
            borderColor: '#198754',
            backgroundColor: '#198754',
            borderWidth: 2.5,
            borderDash: [10, 5],
            pointRadius: 0,
            type: 'line'
          },
          {
            // Hidden dataset just for the legend entry
            label: 'Half-time available (' + halfTime + ' hrs)',
            data: [],
            borderColor: '#dc3545',
            backgroundColor: '#dc3545',
            borderWidth: 2.5,
            borderDash: [10, 5],
            pointRadius: 0,
            type: 'line'
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
              padding: 12,
              font: { size: 12 },
              usePointStyle: false,
              generateLabels: function(chart) {
                var datasets = chart.data.datasets;
                return datasets.map(function(ds, i) {
                  var isLine = ds.type === 'line';
                  return {
                    text: ds.label,
                    fillStyle: isLine ? 'transparent' : ds.backgroundColor,
                    strokeStyle: isLine ? ds.borderColor : ds.backgroundColor,
                    lineWidth: isLine ? 2.5 : 0,
                    lineDash: isLine ? [6, 3] : [],
                    hidden: false,
                    datasetIndex: i
                  };
                });
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                if (context.dataset.type === 'line') return null;
                // Show total (conservative + extra) for mid-range stack
                if (context.datasetIndex === 1) {
                  var total = highHours[context.dataIndex];
                  return ' Total (mid-range): ' + total.toFixed(1) + ' hrs/week';
                }
                return ' Conservative: ' + context.parsed.y.toFixed(1) + ' hrs/week';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 75,
            stacked: true,
            title: {
              display: true,
              text: 'Hours per Week',
              font: { size: 13 }
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            },
            ticks: {
              stepSize: 10
            }
          },
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              font: { size: 11 }
            }
          }
        },
        layout: {
          padding: { top: 25 }
        },
        animation: {
          onComplete: function () {
            var chart = this;
            var ctx2 = chart.ctx;
            ctx2.save();
            ctx2.font = 'bold 12px sans-serif';
            ctx2.fillStyle = '#212529';
            ctx2.textAlign = 'center';

            // Label on top of stacked bars: show total (high) value
            var meta1 = chart.getDatasetMeta(1); // top of stack
            meta1.data.forEach(function (bar, i) {
              ctx2.fillText(highHours[i].toFixed(1), bar.x, bar.y - 6);
            });

            // Label inside the conservative (bottom) segment
            var meta0 = chart.getDatasetMeta(0);
            ctx2.fillStyle = '#ffffff';
            ctx2.font = '11px sans-serif';
            meta0.data.forEach(function (bar, i) {
              var barHeight = bar.height;
              if (barHeight > 20) {
                ctx2.fillText(lowHours[i].toFixed(1), bar.x, bar.y + barHeight / 2 + 4);
              }
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
            label: 'K-4 Students (20)',
            data: [20, 23.2],
            backgroundColor: ['#0d6efd', '#adb5bd'],
            borderWidth: 0,
            borderRadius: 0,
            barPercentage: 0.55
          },
          {
            label: 'Grade 5 Departing (8)',
            data: [8, 0],
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
