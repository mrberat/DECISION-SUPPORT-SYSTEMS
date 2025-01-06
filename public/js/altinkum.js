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


// Sunucudan verileri çekme
$.get("/altinkum2023aylikfis", function(data) {
    // Veri çekildikten sonra grafik oluşturma
    var countries = [];
    var countryData = [];

    // Verileri ayrıştırma
    data.forEach(function(item) {
        countries.push(item.ay);
        countryData.push(item.aylik_fis); // Burada "veri" alanı, ülkelere ait veriyi içermeli
    });

    // Grafik oluşturma
    var ctx1 = $("#bar-chart1").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: countries,
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: countryData
            }]
        },
        options: {
            responsive: true
        }
    });
});


//-------------------------------------------------------------
// Sunucudan verileri çekme
$.get("/altinkum2023aylikciro", function(data) {
    // Veri çekildikten sonra grafik oluşturma
    var labels = [];
    var datasetData = [];

    // Verileri ayrıştırma
    data.forEach(function(item) {
        labels.push(item.ay);
        datasetData.push(item.aylik_ciro);
    });

    // Grafik oluşturma
    var ctx2 = $("#line-chart1").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Aylık Ciro",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: datasetData
            }]
        },
        options: {
            responsive: true
        }
    });
});


//----------------------------------------------------------
// Sunucudan verileri çekme
$.get("/altinkum2022aylikciro", function(data) {
    // Veri çekildikten sonra grafik oluşturma
    var labels = [];
    var datasetData = [];

    // Verileri ayrıştırma
    data.forEach(function(item) {
        labels.push(item.ay);
        datasetData.push(item.aylik_ciro);
    });

    // Grafik oluşturma
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Aylık Ciro",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: datasetData
            }]
        },
        options: {
            responsive: true
        }
    });
});
//---------------------------------------------------------------

// Sunucudan verileri çekme
$.get("/altinkum2022aylikfis", function(data) {
    // Veri çekildikten sonra grafik oluşturma
    var countries = [];
    var countryData = [];

    // Verileri ayrıştırma
    data.forEach(function(item) {
        countries.push(item.ay);
        countryData.push(item.aylik_fis); // Burada "veri" alanı, ülkelere ait veriyi içermeli
    });

    // Grafik oluşturma
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: countries,
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: countryData
            }]
        },
        options: {
            responsive: true
        }
    });
});


    // Pie Chart
    document.addEventListener('DOMContentLoaded', fetchData);

    document.getElementById('yearSelect').addEventListener('change', fetchData);
    
    let myPieChart; // Grafik örneği için değişken tanımlaması
    
    function fetchData() {
      const selectedYear = document.getElementById('yearSelect').value;
    
      fetch(`/altinkum_yogunluk?yil=${selectedYear}`)
        .then(response => response.json())
        .then(data => {
          const aylar = data.map(item => {
            switch (item.ay) {
              case 1:
                return 'Ocak';
              case 2:
                return 'Şubat';
              case 3:
                return 'Mart';
              case 4:
                return 'Nisan';
              case 5:
                return 'Mayıs';
              case 6:
                return 'Haziran';
              case 7:
                return 'Temmuz';
              case 8:
                return 'Ağustos';
              case 9:
                return 'Eylül';
              case 10:
                return 'Ekim';
              case 11:
                return 'Kasım';
              case 12:
                return 'Aralık';
              default:
                return '';
            }
          });
          const yogunluk = data.map(item => item.aylik_ortalama_yogunluk);
    
          const ctx = document.getElementById('pie-chart').getContext('2d');
    
          // Eğer önceki bir grafik varsa, yok et
          if (myPieChart) {
            myPieChart.destroy();
          }
    
          myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: aylar,
              datasets: [{
                label: 'Aylık Ortalama Yoğunluk',
                data: yogunluk,
                backgroundColor: [
                  "rgba(235, 22, 22, .7)",
                  "rgba(235, 22, 22, .6)",
                  "rgba(235, 22, 22, .5)",
                  "rgba(235, 22, 22, .4)",
                  "rgba(235, 22, 22, .3)"
                  // Daha fazla renk eklenebilir
                ],
              }]
            },
            options: {
              responsive: true,
              plugins: {
                datalabels: {
                  color: 'white',
                  anchor: 'end',
                  align: 'start',
                  offset: 10,
                  font: {
                    weight: 'bold',
                    size: '14'
                  },
                  formatter: function(value, context) {
                    return value;
                  }
                }
              }
            }
          });
        })
        .catch(error => console.error('Hata:', error));
    }
    

    // Doughnut Chart
    $(document).ready(function() {
        var myChart; // Grafik değişkenini dışarı taşıdık
  
        fetchData('2022'); // Sayfa yüklendiğinde varsayılan olarak 2022 verisini al
  
        $("#yearSelect1").change(function() {
          var selectedYear = $(this).val();
          fetchData(selectedYear);
        });
  
        function fetchData(selectedYear) {
          $.ajax({
            url: '/altinkum_personel',
            method: 'GET',
            data: {
              secilen_yil: selectedYear
            },
            success: function(data) {
              if (myChart) {
                myChart.destroy();
              }
              createChart(data);
            },
            error: function(err) {
              console.error('Veri alınamadı:', err);
            }
          });
        }
  
        function createChart(data) {
          var labels = data.map(function(item) {
            var date = new Date(item.ay + '-01'); // Ayın ilk gününü al
            return date.toLocaleDateString('default', { month: 'long' }); // Ay ismini al
          });
  
          var values = data.map(function(item) {
            return item.toplam_personel;
          });
  
          var ctx = $("#doughnut-chart").get(0).getContext("2d");
          myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: labels,
              datasets: [{
                backgroundColor: [
                  "rgba(235, 22, 22, .7)",
                  "rgba(235, 22, 22, .6)",
                  "rgba(235, 22, 22, .5)",
                  "rgba(235, 22, 22, .4)",
                  "rgba(235, 22, 22, .3)"
                ],
                data: values
              }]
            },
            options: {
              responsive: true
            }
          });
        }
      });

    
})(jQuery);

