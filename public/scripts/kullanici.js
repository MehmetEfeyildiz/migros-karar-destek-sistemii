document.addEventListener('DOMContentLoaded', async function() {
    // Grafik genel ayarları
    const chartHeight = window.innerWidth > 768 ? 300 : 250;
    const commonOptions = {
        chart: {
            height: chartHeight,
            toolbar: { show: false },
            foreColor: '#fff' // Tüm yazıları beyaz yap
        }
    };

    // Grafikleri oluştur
    const salesTrendChart = new ApexCharts(document.querySelector("#salesTrendChart"), {
        ...commonOptions,
        series: [], // Boş başlat, her mağaza türü için seri eklenecek
        chart: {
            ...commonOptions.chart,
            type: 'line',
            height: 350,
            background: 'transparent'
        },
        colors: ['#e7a01c', '#2196f3', '#00d084', '#ff6b6b', '#6c757d'],
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        },
        xaxis: {
            categories: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'],
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            labels: {
                colors: '#fff'
            }
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.1)',
            strokeDashArray: 3
        },
        tooltip: {
            theme: 'dark'
        }
    });
    salesTrendChart.render();

    const categoryChart = new ApexCharts(document.querySelector("#categoryPieChart"), {
        ...commonOptions,
        series: [],
        chart: {
            ...commonOptions.chart,
            type: 'donut',
        },
        labels: ['Gıda', 'Elektronik', 'Giyim', 'Kozmetik', 'Diğer'],
        colors: ['#e7a01c', '#2196f3', '#00d084', '#ff6b6b', '#6c757d']
    });
    categoryChart.render();

    // Mağaza türü - ortalama sepet grafiği
    const basketChart = new ApexCharts(document.querySelector("#basketChart"), {
        ...commonOptions,
        series: [{
            name: 'Ortalama Sepet',
            data: []
        }],
        chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
            background: 'transparent'
        },
        colors: ['#e7a01c'],
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return '₺' + val.toFixed(2);
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#fff"],
                fontWeight: 600
            }
        },
        xaxis: {
            categories: [],
            position: 'bottom',
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return '₺' + val.toFixed(0);
                },
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.1)',
            strokeDashArray: 3
        },
        tooltip: {
            theme: 'dark'
        }
    });
    basketChart.render();

    // Verileri güncelle
    async function updateDashboardData(storeType = 'all') {
        try {
            const response = await fetch(`/api/magaza-verileri?tur=${storeType}`);
            if (!response.ok) throw new Error('Veri alınamadı');
            
            const data = await response.json();
            if (!data.length) return;

            // Eğer "Tüm Mağazalar" seçiliyse, her mağaza türü için ayrı seri oluştur
            if (storeType === 'all') {
                // Tüm mağaza türlerinin verilerini çek
                const typesResponse = await fetch('/api/magaza-verileri?tur=all');
                const allTypes = ['5M', '3M', '2M', 'M', 'MIGROSJET'];
                const seriesData = [];

                // Her mağaza türü için ayrı istek gönder
                for (const type of allTypes) {
                    const typeResponse = await fetch(`/api/magaza-verileri?tur=${type}`);
                    const typeData = await typeResponse.json();
                    if (typeData.length > 0) {
                        seriesData.push({
                            name: type,
                            data: typeData[0].satis_miktari_trend || generateDummyData()
                        });
                    }
                }

                // Trend grafiğini tüm serileri içerecek şekilde güncelle
                salesTrendChart.updateOptions({
                    series: seriesData
                });
            } else {
                // Tek mağaza türü seçiliyse sadece o türün verilerini göster
                const seriesData = [{
                    name: data[0].magaza_turu,
                    data: data[0].satis_miktari_trend || generateDummyData()
                }];

                salesTrendChart.updateOptions({
                    series: seriesData
                });
            }

            // Stat kartlarını güncelle
            const store = data[0];
            updateStatCards({
                totalSales: store.toplam_satis,
                storeCount: store.aktif_magaza,
                customerCount: store.musteri_sayisi,
                avgBasket: store.sepet_ortalama
            });

            // Basket chart verilerini güncelle
            const basketData = {
                categories: data.map(item => item.magaza_turu),
                values: data.map(item => parseFloat(item.sepet_ortalama) || 0)
            };

            basketChart.updateOptions({
                xaxis: { categories: basketData.categories }
            });
            basketChart.updateSeries([{
                name: 'Ortalama Sepet',
                data: basketData.values
            }]);

        } catch (error) {
            console.error('Veri güncelleme hatası:', error);
            // Hata durumunda dummy data göster
            const dummyData = generateDummyData();
            salesTrendChart.updateSeries([{
                name: 'Satışlar',
                data: dummyData
            }]);
        }
    }

    // Geçici olarak dummy data oluştur (gerçek veri gelene kadar)
    function generateDummyData() {
        return Array.from({length: 9}, () => Math.floor(Math.random() * 1000) + 500);
    }

    // Para birimi formatı
    const formatCurrency = (value) => new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(value);

    // Animasyonlu sayaç güncelleme
    function updateStatCards(stats) {
        if (!stats) return;

        animateValue(document.getElementById('totalSales'), stats.totalSales, true);
        animateValue(document.getElementById('activeStores'), stats.storeCount);
        animateValue(document.getElementById('customerCount'), stats.customerCount);
        animateValue(document.getElementById('avgBasket'), stats.avgBasket, true);
    }

    // Sayaç animasyonu
    function animateValue(element, endValue, isCurrency = false) {
        if (!element || endValue === undefined || endValue === null) {
            console.error('Geçersiz değer:', endValue);
            return;
        }

        const startValue = parseInt(element.textContent.replace(/[^0-9-]/g, '')) || 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(startValue + (endValue - startValue) * progress);
            
            element.textContent = isCurrency ? 
                formatCurrency(current) : 
                new Intl.NumberFormat('tr-TR').format(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Event listeners
    document.getElementById('storeTypeSelect').addEventListener('change', (e) => {
        updateDashboardData(e.target.value);
    });

    // İlk yükleme
    await updateDashboardData('all');
});
