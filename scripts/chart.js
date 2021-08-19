$(window).on('load', function () {
  var data = {
    newCases : [851, 735, 1265, 2412, 2897, 3575, 4215, 5869, 7138, 6123, 5894, 5527, 5671, 6234, 6881],
    recoveredCases: [345, 280, 266, 232, 815, 635, 542, 815, 1222, 2542, 2041, 2298, 2434, 1921, 2022],
    deaths: [15, 36, 12, 22, 38, 64, 108, 80, 163, 117, 51, 139, 101, 247, 151]
  }
  var chartLabel = ['Jun 12', 'Jul 4', 'Aug 9', 'Sep 4', 'Oct 15', 'Nov 13', 'Dev 10', 'Jan 11', 'Feb 19', 'Mar 27', 'Apr 21', 'May 14', 'Jun 1', 'Jul 5', 'Aug 13' ]

  function randomArray(min, max) {
    let data = [];
    let random = 0;
    let tem;
    for (let i = 0; i < chartLabel.length; i++) {
      random = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
      
      if (i === chartLabel.length-1) {
        random += Math.ceil(max/2.5);
      }
      data.push(random);
    }
    for (let i = 0; i < data.length-1; i++) {
      for (let j = 0; j < data.length-1; j++) {
        if (data[i] < data[j]) {
          tem = data[i]
          data[i] = data[j]
          data[j] = tem
        }
      }
    }
    console.log(data);
    return data;
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  
  $('.count-animation').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 3000,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  });

  const calChartFont = (context) => {
    let width = context.chart.width;
    if (width <= 350) {
      return {
        size: 12,
        family: "RobotoRegular"
      };
    } else if (width <= 850){
      return {
        size: 16,
        family: "RobotoRegular"
      };
    } else {
      return {
        size: 21,
        family: "RobotoRegular"
      };
    }
  }

  const calTickLength = (context) => {
    let width = context.chart.width;
    if (width <= 375) {
      return 5
    } else if (width <= 800){
      return 10
    } else {
      return 15
    }
  }

  const calGridBorderWidth = (context) => {
    let width = context.chart.width;
    if (width <= 800) {
      return 2
    } else {
      return 2
    }
  }





  setDefaultChart();

  function setDefaultChart() {
    let listChecked = [];
    let labelArray = []
    $('.list-checkbox').children('.checkbox').each(function() {
      if ($(this).attr('checked')) {
        $(this).children('.fa-square').css("display","none");
        $(this).children('.fa-check-square').css("display","inline-block");
        listChecked.push($(this).attr('value'));
        labelArray.push($(this).text());
      }
    })
    $('.select-checkbox').children('span').html(labelArray.join(', '))
    calcDatasets(listChecked)
  }
  
  

  $('.filter').on("mouseover", function () {
    $(this).children('.list-option').css("display","block");
  });
  $('.filter').on("mouseout", function () {
    $(this).children('.list-option').css("display","none");
  });
  $('.option').on("click", function () {
    $('.select-city').children('span').html($(this).html())
    $('.list-option').children('.option').each(function() {
      $(this).removeClass('active')
    })
    $(this).addClass('active')
    destroyChart();
    setData($(this).attr('value'));
    $(this).parent('.list-option').css("display","none");

  });

  $('.filter').on("mouseover", function () {
    $(this).children('.list-checkbox').css("display","block");
  });
  $('.filter').on("mouseout", function () {
    $(this).children('.list-checkbox').css("display","none");
  });

  $('.checkbox').on("click", function() {
    if ($(this).attr('checked')) {
      $(this).children('.fa-square').css("display","inline-block")
      $(this).children('.fa-check-square').css("display","none")
      $(this).removeAttr('checked')
    } else {
      $(this).children('.fa-square').css("display","none")
      $(this).children('.fa-check-square').css("display","inline-block")
      $(this).attr( "checked", true );
    }
  })
  $('#apply-check-box-btn').on('click', function() {
    let listChecked = [];
    let labelArray = []
    $(this).parent().parent('.list-checkbox').children('.checkbox').each(function() {
      if ($(this).attr('checked')) {
        listChecked.push($(this).attr('value'));
        labelArray.push($(this).text());
      }
    })
    if (labelArray.length === 0) {
      $('.select-checkbox').children('span').html("No filter")
    } else {
      $('.select-checkbox').children('span').html(labelArray.join(', '))
    }
    destroyChart();
    calcDatasets(listChecked)
    $(this).parent().parent('.list-checkbox').css("display","none");
  })
  

  function setData(select) {
    let listChecked = [];
    $('.list-checkbox').children('.checkbox').each(function() {
      if ($(this).attr('checked')) {
        listChecked.push($(this).attr('value'));
      }
    })
    data.newCases = randomArray(1545,6230)
    data.recoveredCases = randomArray(865,2566)
    data.deaths = randomArray(50,200)
    calcDatasets(listChecked);
  }

  function calcDatasets(listChecked) {
    let datasets = [];
    let lineNewCases = {
      label: 'New Cases',
      data: data.newCases,
      backgroundColor: [
        'rgba(115, 24, 180, 0.8)',
      ],
      borderColor: [
        'rgba(115, 24, 180, 0.8)',
      ],
      borderWidth: function(context) {
        var width = context.chart.width;
        if (width <= 400) {
          return 1
        } else if (width <= 800){
          return 1.85
        } else {
          return 2.4
        }
      },
      tension: 0.4,
    };
    let lineRecoveredCases = {
      label: 'Recovered Cases',
      data: data.recoveredCases,
      backgroundColor: [
        'rgba(249, 135, 27, 0.8)',
      ],
      borderColor: [
        'rgba(249, 135, 27, 0.8)',
      ],
      borderWidth: function(context) {
        var width = context.chart.width;
        if (width <= 400) {
          return 1
        } else if (width <= 800){
          return 1.85
        } else {
          return 2.4
        }
      },
      tension: 0.4,
    };
    let lineDeaths = {
      label: 'Deaths',
      data: data.deaths,
      backgroundColor: [
        'rgba(206, 0, 100, 0.8)',
      ],
      borderColor: [
        'rgba(206, 0, 100, 0.8)',
      ],
      borderWidth: function(context) {
        var width = context.chart.width;
        if (width <= 400) {
          return 1
        } else if (width <= 800){
          return 1.85
        } else {
          return 2.4
        }
      },
      tension: 0.4,
    };
    if (listChecked.includes("newCases")) {
      datasets.push(lineNewCases)
    }
    if (listChecked.includes("recoveredCases")) {
      datasets.push(lineRecoveredCases)
    }
    if (listChecked.includes("deaths")) {
      datasets.push(lineDeaths)
    }
    if (listChecked.length === 0) {
      datasets.push(lineNewCases)
      datasets.push(lineRecoveredCases)
      datasets.push(lineDeaths)
    }
    renderChart(datasets);
  }
  function destroyChart() {
    myChart.destroy();
  }

  function renderChart(datasets) {
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: chartLabel,
          datasets: datasets
      },
      options: {
        responsive: true,
        aspectRatio: function(context) {
          // var width = context.chart.width;
          // if (width <= 375) {
          //   return 1.75
          // } else if (width <= 1079){
          //   return 2.55
          // } else {
            return 2.75
          // }
        },
        elements: {
          point: {
            radius : 0
          }
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            
            onClick: function() {},
            labels: {
              padding: 20,
              boxWidth: 20,
              font: {
                size: 18
              }
            }
          },
          tooltip: {
            titleFont: {
              family: "RobotoRegular",
              size: 16
            },
            bodyFont: {
              family: "RobotoRegular",
              size: 15
            },
            callbacks: {
              label: function(tooltipItems) {
                let current = tooltipItems.dataset.data[tooltipItems.dataIndex];
                let previous = 0;
                if (tooltipItems.dataset.data[tooltipItems.dataIndex -1]) {
                  previous = tooltipItems.dataset.data[tooltipItems.dataIndex -1];
                }
                let diff = current - previous;
                if (diff > 0) {
                  diff = "+"+ diff;
                }
                return " " + tooltipItems.formattedValue + " (" + diff + ")";
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0)",
              lineWidth: 2,
              borderColor: "#707070",
              borderWidth: calGridBorderWidth,
              tickColor: "rgba(0, 0, 0, 0.2)",
              tickLength: calTickLength,
            },
            ticks: {
              font: calChartFont,
              maxTicksLimit: 6,
              autoSkip: true,
              maxRotation: 0,
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.2)",
              lineWidth: 2,
              borderColor: "#707070",
              borderWidth: calGridBorderWidth,
              tickColor: "rgba(0, 0, 0, 0.2)",
              tickLength: calTickLength,
            },
            ticks: {
              // stepSize: 2000,
              font: calChartFont,
              // callback: function(value, index, ticks) {
              //   let stringValue = this.getLabelForValue(value);
              //   let firstNumber = parseInt(stringValue.substring(0, stringValue.length - 1));
              //   // console.log(typeof(firstNumber));
              //   if (parseInt(stringValue) === 0 || firstNumber % 2 === 0) {
              //     return this.getLabelForValue(value);
              //   }
              // }
            }
          },
        }
      },
      plugins: [{
        id: 'backgorund-virus',
        beforeDraw: function (chart, option, args) {
            let virus_type1 = new Image();
            virus_type1.src = "../assets/images/virus_type1.png";

            let virus_type2 = new Image();
            virus_type2.src = "../assets/images/virus_type2.png";
            ctx.globalAlpha = 0.3
            chart.ctx.drawImage(virus_type2,-virus_type2.width*0.9,-virus_type2.height*0.9,virus_type1.width * 3, virus_type1.height * 3);
            chart.ctx.drawImage(virus_type2,1050,200,virus_type1.width * 2, virus_type1.height * 2);
            chart.ctx.drawImage(virus_type2,650,-100,virus_type1.width * 2, virus_type1.height * 2);
            chart.ctx.drawImage(virus_type2,277,300,virus_type1.width * 1.84, virus_type1.height * 1.84);
            ctx.globalAlpha = 1
        }
      }]
    });
  }















  

  // default
  // var myChart = new Chart(ctx, {
  //   type: 'line',
  //   data: {
  //       labels: ['12 Jun', 'Sep 4', 'Nov 27', 'Feb 19', 'May 14', 'June 1'],
  //       datasets: [{
  //           label: '# of Votes',
  //           data: [315, 334, 1265, 4412, 1897, 8175],
  //           backgroundColor: [
  //               'rgba(54, 162, 235, 0.2)',
  //           ],
  //           borderColor: [
  //               'rgba(54, 162, 235, 1)',
  //           ],
  //           borderWidth: function(context) {
  //             var width = context.chart.width;
  //             if (width <= 400) {
  //               return 1
  //             } else if (width <= 800){
  //               return 1.85
  //             } else {
  //               return 2.4
  //             }
  //           },
  //           tension: 0.4,
  //           // listInnerText: ["Mak kau hijau","#kerajaangagal","Balik kampung lagi la","Such cases"]
  //       },
  //       {
  //         label: '# of Votes',
  //         data: [500, 600, 450, 4000, 3500, 5000],
  //         backgroundColor: [
  //             'rgba(250, 162, 235, 0.2)',
  //         ],
  //         borderColor: [
  //             'rgba(250, 162, 235, 1)',
  //         ],
  //         borderWidth: function(context) {
  //           var width = context.chart.width;
  //           if (width <= 400) {
  //             return 1
  //           } else if (width <= 800){
  //             return 1.85
  //           } else {
  //             return 2.4
  //           }
  //         },
  //         tension: 0.4,
  //         // listInnerText: ["Mak kau hijau","#kerajaangagal","Balik kampung lagi la","Such cases"]
  //       },
  //       {
  //         label: '# of Votes',
  //         data: [100, 120, 880, 1350, 1455, 1620],
  //         backgroundColor: [
  //             'rgba(54, 250, 12, 0.2)',
  //         ],
  //         borderColor: [
  //             'rgba(54, 250, 12, 1)',
  //         ],
  //         borderWidth: function(context) {
  //           var width = context.chart.width;
  //           if (width <= 400) {
  //             return 1
  //           } else if (width <= 800){
  //             return 1.85
  //           } else {
  //             return 2.4
  //           }
  //         },
  //         tension: 0.4,
  //         // listInnerText: ["Mak kau hijau","#kerajaangagal","Balik kampung lagi la","Such cases"]
  //       }
  //     ]
  //   },
  //   options: {
  //     responsive: true,
  //     aspectRatio: function(context) {
  //       // var width = context.chart.width;
  //       // if (width <= 375) {
  //       //   return 1.75
  //       // } else if (width <= 1079){
  //       //   return 2.55
  //       // } else {
  //         return 2.75
  //       // }
  //     },
  //     elements: {
  //       point: {
  //         radius : 0
  //       }
  //     },
  //     plugins: {
  //       legend: {
  //         display: false
  //       },
  //       tooltip: {
  //         titleFont: {
  //           family: "RobotoRegular",
  //           size: 16
  //         },
  //         bodyFont: {
  //           family: "RobotoRegular",
  //           size: 15
  //         },
  //         callbacks: {
  //           label: function(tooltipItems) {
  //             return " " + tooltipItems.formattedValue;
  //           }
  //         }
  //       }
  //     },
  //     interaction: {
  //       intersect: false,
  //       mode: 'index',
  //     },
  //     scales: {
  //       x: {
  //         grid: {
  //           display: true,
  //           color: "rgba(0, 0, 0, 0)",
  //           lineWidth: 2,
  //           borderColor: "#707070",
  //           borderWidth: calGridBorderWidth,
  //           tickColor: "rgba(0, 0, 0, 0.2)",
  //           tickLength: calTickLength,
  //         },
  //         ticks: {
  //           font: calChartFont,
  //           maxTicksLimit: 5,
  //           autoSkip: true,
  //           maxRotation: 0,
  //           // callback: function(value, index, ticks) {
  //           //   if (props.selectTime === "7days") {
  //           //     return this.getLabelForValue(value);
  //           //   }
  //           //   if (props.selectTime === "1month") {
  //           //     console.log(value);
  //           //     return value % 3 === 0 ? this.getLabelForValue(value) : null;
  //           //   }
  //           //   // console.log(this.getLabelForValue(value));
  //             // let stringValue = this.getLabelForValue(value);
  //             // switch(stringValue) {
  //             //   case "1 Jan":
  //             //     return "1 Jan";
  //             //   // case "1 Feb":
  //             //   //   return "Feb";
  //             //   // case "1 Mar":
  //             //   //   return "Mar";
  //             //   case "1 Apr":
  //             //     return "1 Apr";
  //             //   // case "1 May":
  //             //   //   return "May";
  //             //   // case "1 Jun":
  //             //   //   return "Jun";
  //             //   case "1 Jul":
  //             //     return "1 Jul";
  //             //   // case "1 Aug":
  //             //   //   return "Aug";
  //             //   // case "1 Sep":
  //             //     // return "Sep";
  //             //   case "1 Oct":
  //             //     return "1 Oct";
  //             //   // case "1 Nov":
  //             //   //   return "Nov";
  //             //   // case "1 Dec":
  //             //   //   return "Dec";
  //             //   default:
  //             //     return null;
  //             // }      
  //           // }
  //         }
  //       },
  //       y: {
  //         beginAtZero: true,
  //         grid: {
  //           color: "rgba(0, 0, 0, 0.2)",
  //           lineWidth: 2,
  //           borderColor: "#707070",
  //           borderWidth: calGridBorderWidth,
  //           tickColor: "rgba(0, 0, 0, 0.2)",
  //           tickLength: calTickLength,
  //         },
  //         ticks: {
  //           // stepSize: 2000,
  //           font: calChartFont,
  //           // callback: function(value, index, ticks) {
  //           //   let stringValue = this.getLabelForValue(value);
  //           //   let firstNumber = parseInt(stringValue.substring(0, stringValue.length - 1));
  //           //   // console.log(typeof(firstNumber));
  //           //   if (parseInt(stringValue) === 0 || firstNumber % 2 === 0) {
  //           //     return this.getLabelForValue(value);
  //           //   }
  //           // }
  //         }
  //       },
  //     }
  //   },
  //   plugins: [{
  //     id: 'my-line-text-plugin',
  //     afterDatasetsDraw: function (chart, option, args) {
  //       if (window.innerWidth >= 1280 && chart.data.datasets[0].listInnerText) {
  //         chart.ctx.font = "16px RobotoRegular"
  //         chart.ctx.textAlign = 'center';
  //         chart.ctx.fillStyle = "#28BA0D";
  //         chart.ctx.fillText(chart.data.datasets[0].listInnerText[0], chart.scales.x._maxLength/6*1.25, chart.scales.y._maxLength/3);
  //         chart.ctx.fillStyle = "#FF9D00";
  //         chart.ctx.fillText(chart.data.datasets[0].listInnerText[1], chart.scales.x._maxLength/6*2.5, chart.scales.y._maxLength/2);
  //         chart.ctx.fillStyle = "#FF003B";
  //         chart.ctx.fillText(chart.data.datasets[0].listInnerText[2], chart.scales.x._maxLength/6*3.75, chart.scales.y._maxLength/3);
  //         chart.ctx.fillStyle = "#0A1EFF";
  //         chart.ctx.fillText(chart.data.datasets[0].listInnerText[3], chart.scales.x._maxLength/6*5, chart.scales.y._maxLength/6);
  //       }
  //     }
  //   }]
  // });
});