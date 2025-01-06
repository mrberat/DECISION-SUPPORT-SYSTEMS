(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";
 //-----------------------------------------------------------------------------------------------------   

    // Worldwide Sales Chart
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('queryForm');
        const yearSelect = document.getElementById('year');
        const restaurantSelect = document.getElementById('restaurant');
        const ctx1 = document.getElementById('myChart1').getContext('2d');
        let myChart1;
    
        // Yıl seçeneklerini doldurma
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2000; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const selectedYear = yearSelect.value;
            const selectedRestaurant = restaurantSelect.value;
    
            fetch(`/yogunluk?girilen_yil=${selectedYear}&girilen_restoran_adi=${selectedRestaurant}`)
                .then(response => response.json())
                .then(data => {
                    const monthNames = [
                        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
                    ];
    
                    // Veritabanı aylarını grafikteki aylarla eşleştirme
                    const chartData = Array.from({ length: 12 }, (_, index) => {
                        const monthIndex = index + 1; // Veritabanındaki ay indeksi
                        const found = data.find(item => parseInt(item.ay) === monthIndex);
                        return found ? found.aylik_ortalama_yogunluk : 0;
                    });
    
                    // Grafiği oluşturma
                    if (myChart1) {
                        myChart1.destroy();
                    }
    
                    const drawLineAtTwenty = {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 20,
                        borderColor: 'red',
                        borderWidth: 2,
                        borderDash: [5, 5],
                    };
    
                    myChart1 = new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: monthNames,
                            datasets: [{
                                label: `${selectedRestaurant} - ${selectedYear} Yogunluk`,
                                data: chartData,
                                backgroundColor: 'rgba(235, 22, 22, .5)',
                                borderColor: 'rgba(235, 22, 22, .5)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                annotation: {
                                    annotations: {
                                        lineAtTwenty: drawLineAtTwenty
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error('Hata:', error);
                });
        });
    });
    
 //-----------------------------------------------------------------------------------------------------   


    // Salse & Revenue Chart
// Grafik oluşturma kısmı
var dataSets = [
    [0, 0, 0, 0, 35.6, 28.1, 25.4, 28.5, 25.3, 0, 0, 0],
    [0, 0, 0, 0, 17, 16, 18, 15, 17, 0, 0, 0],
];

var lineDataSet = Array(12).fill(20); // 12 adet 20 değeri

var ctx2 = document.getElementById('chart2').getContext('2d');

var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ],
        datasets: [{
                label: 'Yoğunluk',
                backgroundColor: 'rgba(235, 22, 22, .5)',
                data: dataSets[0]
            },
            {
                label: 'Personel',
                backgroundColor: 'rgb(162, 0, 255, .7)',
                data: dataSets[1]
            },
            {
                label: 'Optimal Yoğunluk',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                type: 'line',
                fill: false,
                data: lineDataSet
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }]
        }
    }
});

// Veri güncelleme fonksiyonları
$("#yearSelect1").on("change", function () {
    var selectedYear = parseInt($(this).val(), 10);
    if (selectedYear === 2022) {
        myChart2.data.datasets[0].data = dataSets[0];
        myChart2.data.datasets[1].data = dataSets[1];
    } else if (selectedYear === 2023) {
        // 2023 veri setleri
        var dataSets2023 = [
            [0, 0, 0, 0, 33.7, 28.1, 30.4, 30.5, 30.7, 0, 0, 0], // Yoğunluk
            [0, 0, 0, 0, 18, 16, 16, 14, 14, 0, 0, 0] // Personel
        ];
        myChart2.data.datasets[0].data = dataSets2023[0];
        myChart2.data.datasets[1].data = dataSets2023[1];
    }
    myChart2.update();
});

$(document).ready(function () {
    $("#increaseBtn").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth").val(), 10);
        updateChartData(selectedMonth, 1);
    });

    $("#decreaseBtn").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth").val(), 10);
        updateChartData(selectedMonth, -1);
    });

    function updateChartData(month, changeValue) {
        if (month >= 0 && month < dataSets[0].length) {
            dataSets[1][month] += changeValue;
            myChart2.data.datasets[1].data[month] = dataSets[1][month];

            dataSets[0][month] -= changeValue + 0.15;
            if (dataSets[0][month] < 0) {
                dataSets[0][month] = 0;
            }
            myChart2.data.datasets[0].data[month] = dataSets[0][month];

            myChart2.update();
        }
    }
});





    
    
    
 //-----------------------------------------------------------------------------------------------------   
 
 var ctx3 = document.getElementById('chart3').getContext('2d');
 var dataSets1 = [
     [15.2, 16.1, 13.9, 16.4, 13.4, 12.5, 12.8, 14.1, 12, 13.5, 12.7, 15.7],
     [17, 16, 18, 15, 17, 16, 18, 15, 17, 16, 18, 15]
 ];
 
 var lineDataSet1 = Array(12).fill(20); // 12 adet 20 değeri
 
 var myChart3 = new Chart(ctx3, {
     type: 'bar',
     data: {
         labels: [
             'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
             'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
         ],
         datasets: [{
             label: 'Yoğunluk',
             backgroundColor: 'rgba(235, 22, 22, .5)',
             data: dataSets1[0]
         },
         {
             label: 'Personel',
             backgroundColor: 'rgb(162, 0, 255)',
             data: dataSets1[1]
         },
         {
             label: 'Optimal Yoğunluk',
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 2,
             type: 'line',
             fill: false,
             data: lineDataSet1
         }]
     },
     options: {
         responsive: true,
         scales: {
             xAxes: [{
                 gridLines: {
                     drawOnChartArea: false
                 }
             }]
         }
     }
 });

$("#yearSelect2").on("change", function () {
    var selectedYear = parseInt($(this).val(), 10);
    if (selectedYear === 2022) {
        myChart3.data.datasets[0].data = dataSets1[0];
        myChart3.data.datasets[1].data = dataSets1[1];
    } else if (selectedYear === 2023) {
        // 2023 veri setleri
        var dataSets2023 = [
            [15.2, 16.1, 13.9, 16.4, 13.4, 12.5, 15.4, 12.5, 12.8, 12, 15.3, 14.7], // Yoğunluk
            [17, 16, 18, 15, 17, 16, 15, 17, 16, 18, 15, 16] // Personel
        ];
        myChart3.data.datasets[0].data = dataSets2023[0];
        myChart3.data.datasets[1].data = dataSets2023[1];
    }
    myChart3.update();
});

$(document).ready(function () {
    $("#increaseBtn1").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth1").val(), 10);
        updateChartData(selectedMonth, 1);
    });

    $("#decreaseBtn1").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth1").val(), 10);
        updateChartData(selectedMonth, -1);
    });

    function updateChartData(month, changeValue) {
        if (month >= 0 && month < dataSets1[0].length) {
            dataSets1[1][month] += changeValue;
            myChart3.data.datasets[1].data[month] = dataSets1[1][month];

            dataSets1[0][month] -= changeValue + 0.15;
            if (dataSets1[0][month] < 0) {
                dataSets1[0][month] = 0;
            }
            myChart3.data.datasets[0].data[month] = dataSets1[0][month];

            myChart3.update();
        }
    }
});


 //-----------------------------------------------------------------------------------------------------   

    // Single Bar Chart
    var ctx4 = document.getElementById('chart4').getContext('2d');
    var dataSets2 = [
        [24.4, 23.1, 22.3, 23.2, 24.6, 20.4, 19.5, 18.7, 18.8, 20.4, 20.9, 20.3],
        [18, 19,  19,  18,  18,  19,  19,  18,  18,  19, 19, 18]
    ];
    
    var lineDataSet2 = Array(12).fill(20); // 12 adet 20 değeri
    
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ],
            datasets: [{
                label: 'Yoğunluk',
                backgroundColor: 'rgba(235, 22, 22, .5)',
                data: dataSets2[0]
            },
            {
                label: 'Personel',
                backgroundColor: 'rgb(162, 0, 255)',
                data: dataSets2[1]
            },
            {
                label: 'Optimal Yoğunluk',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                type: 'line',
                fill: false,
                data: lineDataSet2
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            }
        }
    });

$("#yearSelect3").on("change", function () {
    var selectedYear = parseInt($(this).val(), 10);
    if (selectedYear === 2022) {
        myChart4.data.datasets[0].data = dataSets2[0];
        myChart4.data.datasets[1].data = dataSets2[1];
    } else if (selectedYear === 2023) {
        // 2023 veri setleri
        var dataSets2023 = [
            [24.4, 23.1, 22.3, 23.2, 24.6, 20.4, 20.6, 18.7, 17.8, 20.4, 22, 21.5], // Yoğunluk
            [18, 19, 19, 18, 18, 19, 17, 18, 19, 19, 18, 17] // Personel
        ];
        myChart4.data.datasets[0].data = dataSets2023[0];
        myChart4.data.datasets[1].data = dataSets2023[1];
    }
    myChart4.update();
});

$(document).ready(function () {
    $("#increaseBtn2").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth2").val(), 10);
        updateChartData(selectedMonth, 1);
    });

    $("#decreaseBtn2").on("click", function () {
        var selectedMonth = parseInt($("#selectMonth2").val(), 10);
        updateChartData(selectedMonth, -1);
    });

    function updateChartData(month, changeValue) {
        if (month >= 0 && month < dataSets2[0].length) {
            dataSets2[1][month] += changeValue;
            myChart4.data.datasets[1].data[month] = dataSets2[1][month];

            dataSets2[0][month] -= changeValue + 0.15;
            if (dataSets2[0][month] < 0) {
                dataSets2[0][month] = 0;
            }
            myChart4.data.datasets[0].data[month] = dataSets2[0][month];

            myChart4.update();
        }
    }
});

    
     //-----------------------------------------------------------------------------------------------------   


     var ctx5 = document.getElementById('chart5').getContext('2d');
     var dataSets3 = [
         [21.3, 22.6, 19.4, 23, 21.4, 20.1, 16.1, 17.6, 16.8, 19.4, 17.8, 21.9],
         [17, 16, 18, 15, 17, 16, 18, 15, 17, 16, 18, 15],
     ];

     var lineDataSet = [
         20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 // 12 adet 20 değeri
     ];

     var myChart5 = new Chart(ctx5, {
         type: 'bar',
         data: {
             labels: [
                 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
             ],
             datasets: [{
                 label: 'Yoğunluk',
                 backgroundColor: 'rgba(235, 22, 22, .5)',
                 data: dataSets3[0]
             },
             {
                 label: 'Personel',
                 backgroundColor: 'rgb(162, 0, 255)',
                 data: dataSets3[1]
             },
             {
                 label: 'Optimal Yoğunluk',
                 borderColor: 'rgba(75, 192, 192, 1)',
                 borderWidth: 2,
                 type: 'line',
                 fill: false,
                 data: lineDataSet
             }]
         },
         options: {
             responsive: true,
             scales: {
                 xAxes: [{
                     gridLines: {
                         drawOnChartArea: false
                     }
                 }]
             }
         }
     });

     $("#yearSelect4").on("change", function () {
         var selectedYear = parseInt($(this).val(), 10);
         if (selectedYear === 2022) {
             myChart5.data.datasets[0].data = dataSets3[0];
             myChart5.data.datasets[1].data = dataSets3[1];
         } else if (selectedYear === 2023) {
             var dataSets2023 = [
                 [21.3, 24.1, 18.4, 20.3, 20.2, 20.1, 19.3, 18.9, 20.4, 17.2, 21.4, 20.5], // Yoğunluk
                 [17, 15, 19, 17, 18, 16, 15, 14, 14, 18, 15, 16] // Personel
             ];
             myChart5.data.datasets[0].data = dataSets2023[0];
             myChart5.data.datasets[1].data = dataSets2023[1];
         }
         myChart5.update();
     });

     $(document).ready(function () {
         $("#increaseBtn3").on("click", function () {
             var selectedMonth = parseInt($("#selectMonth3").val(), 10);
             updateChartData(selectedMonth, 1);
         });

         $("#decreaseBtn3").on("click", function () {
             var selectedMonth = parseInt($("#selectMonth3").val(), 10);
             updateChartData(selectedMonth, -1);
         });

         function updateChartData(month, changeValue) {
             if (month >= 0 && month < dataSets3[0].length) {
                 dataSets3[1][month] += changeValue;
                 myChart5.data.datasets[1].data[month] = dataSets3[1][month];

                 dataSets3[0][month] -= changeValue + 0.15;
                 if (dataSets3[0][month] < 0) {
                     dataSets3[0][month] = 0;
                 }
                 myChart5.data.datasets[0].data[month] = dataSets3[0][month];

                 myChart5.update();
             }
         }
     });
     
    
 //-----------------------------------------------------------------------------------------------------   

    // Doughnut Chart
    var ctx6 = $("#chart6").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Bar Dataset',
                data: [10, 20, 30, 40,12,13,14,23,23,15,16,16],
                // Background color for the bar dataset
                backgroundColor: "rgba(235, 22, 22, 0.5)", // Adjust the color and alpha value as needed
                // this dataset is drawn below
                order: 2
            }, {
                label: 'Line Dataset',
                data: [10, 10, 10, 10,10, 10, 10, 10,10, 10, 10, 10],
                type: 'line',
                // Background color for the line dataset
                backgroundColor: "rgba(235, 22, 22, 0.5)", // Adjust the color and alpha value as needed
                // this dataset is drawn on top
                order: 1
            }],
            labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        }
    });
    
    
})(jQuery);

