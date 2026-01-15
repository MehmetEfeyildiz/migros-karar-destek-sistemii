// DOM yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    const targetSales = 38000; // Hedef satış
    const actualSales = 38517; // Gerçekleşen satış

    // İlerleme oranını hesapla
    const progressPercentage = (actualSales / targetSales) * 100;

    // İlerleme çubuğunu güncelle
    const progressBar = document.getElementById('progress-bar');
    
    // İlerleme çubuğunun genişliğini ayarla
    progressBar.style.width = `${progressPercentage}%`;

    // Yüzdeyi metin olarak ekle
    progressBar.textContent = `${Math.round(progressPercentage)}%`; // Yüzde göstergesi
});
