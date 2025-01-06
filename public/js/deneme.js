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
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var initialData = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Sales",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: initialData
            }]
        },
        options: {
            responsive: true
        }
    });
    
    $("#selectMonth").change(function() {
        var selectedMonth = parseInt($(this).val(), 10);
        var slider = document.getElementById("slider");
        slider.value = initialData[selectedMonth];
        updateChartData(selectedMonth);
    });
    
    $("#slider").on("input", function() {
        var selectedMonth = parseInt($("#selectMonth").val(), 10);
        initialData[selectedMonth] = parseInt($(this).val(), 10);
        updateChartData(selectedMonth);
    });
    
    function updateChartData(monthIndex) {
        myChart1.data.datasets[0].data = initialData;
        myChart1.update();
    }
    
    
 //-----------------------------------------------------------------------------------------------------   


    // Salse & Revenue Chart
    document.getElementById('personelForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Formun default gönderimini engelle
  
        const formData = new FormData(this);
        
        fetch('/personel-ekle', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          alert(data.message); // Başarı veya hata mesajını göster
        })
        .catch(error => {
          console.error('Hata:', error);
        });
      });
    
 //-----------------------------------------------------------------------------------------------------   

    // Single Line Chart
// Veri almak için kullanılacak endpoint
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('queryForm');
    const yearSelect = document.getElementById('year');
    const restaurantSelect = document.getElementById('restaurant');
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    let myChart3;

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
                if (myChart3) {
                    myChart3.destroy();
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

                myChart3 = new Chart(ctx3, {
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

    // Single Bar Chart
    var ctx4 = document.getElementById('bar-chart').getContext('2d');
    var randomData = Array.from({ length: 12 }, () => getRandomInt(10, 20)); // Rastgele veri oluşturma
    
    var myChart4 = new Chart(ctx4, {
        type: 'polarArea',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [{
                backgroundColor: [
                    'rgba(235, 22, 22, .7)', 'rgba(235, 22, 22, .6)', 'rgba(235, 22, 22, .5)',
                    'rgba(235, 22, 22, .4)', 'rgba(235, 22, 22, .3)', 'rgba(235, 22, 22, .7)',
                    'rgba(235, 22, 22, .6)', 'rgba(235, 22, 22, .5)', 'rgba(235, 22, 22, .4)',
                    'rgba(235, 22, 22, .3)', 'rgba(235, 22, 22, .7)', 'rgba(235, 22, 22, .6)'
                ],
                data: randomData // Rastgele veri seti
            }]
        },
        options: {
            responsive: true,
            onRender: function (ctx) {
                // Sabit metin ekleyelim
                ctx.fillStyle = 'black';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('10', ctx.canvas.width / 2, ctx.canvas.height / 2 - 40); // 10'u grafiğin üst kısmına ekleyelim
                ctx.fillText('30', ctx.canvas.width / 2, ctx.canvas.height / 2 + 40); // 30'u grafiğin alt kısmına ekleyelim
            }
        }
    });
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    fetch('/ortalama_yogunluk') // API endpoint'inizi buraya yerleştirin
      .then(response => response.json())
      .then(data => {
        const ortalamaYogunluk = data.map(item => item.ortalama_yogunluk);
        
        // Mevcut grafik veri setini güncelleme
        myChart4.data.datasets[0].data = ortalamaYogunluk;
        
        // Grafik güncellendikten sonra yeniden çizme
        myChart4.update();
      })
      .catch(error => {
        console.error('Veri alınamadı:', error);
      });
    

    
     //-----------------------------------------------------------------------------------------------------   


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var initialDataPie = [55, 49, 44, 24, 15, 12, 12, 12, 12, 14, 14, 12];
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)",
                    "rgba(235, 22, 22, .2)",
                    "rgba(235, 22, 22, .2)",
                    "rgba(235, 22, 22, .2)",
                    "rgba(235, 22, 22, .2)",
                    "rgba(235, 22, 22, .3)",
                    "rgba(235, 22, 22, .3)",
                    "rgba(235, 22, 22, .2)"
                ],
                data: initialDataPie
            }]
        },
        options: {
            responsive: true
        }
    });
    
    $("#selectMonthPie").change(function() {
        updateChartDataPie(parseInt($(this).val(), 10));
    });
    
    $("#sliderPie").on("input", function() {
        var selectedMonth = parseInt($("#selectMonthPie").val(), 10);
        initialDataPie[selectedMonth] = parseInt($(this).val(), 10);
        updateChartDataPie(selectedMonth);
    });
    
    function updateChartDataPie(monthIndex) {
        myChart5.data.datasets[0].data = initialDataPie;
        myChart5.update();
    }
    
    
 //-----------------------------------------------------------------------------------------------------   

    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    
})(jQuery);

