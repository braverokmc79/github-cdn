$(function() {
    // 모든 thermometer-container 요소를 가져옴
    const thermometerContainers = document.querySelectorAll('.thermometer-container');

    thermometerContainers.forEach(container => {
        const trustScore = container.getAttribute('data-value');
        adjustTrustScore(trustScore, container);
    });

    function adjustTrustScore(scoreChange, container) {
        let baseTemperature = 36.5;
        let trustScore = parseInt(scoreChange);
        const newTemperature = baseTemperature + (trustScore * 0.1);
        updateThermometer(newTemperature, container);
    }

    function updateThermometer(temp, container) {
        const mercuryElement = container.querySelector('.mercury');
        const temperatureLabel = container.querySelector('.temperature');
        const faceElement = container.querySelector('.face');

        const minTemp = 0.0;
        const maxTemp = 100.0;
        const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temp));

        const widthPercentage = ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
        mercuryElement.style.width = `${widthPercentage}%`;

        let color = '#36c'; // 기본 파란색
        if (clampedTemp >= 87.5) {
            color = '#f44336'; // 빨간색
        } else if (clampedTemp >= 75) {
            color = '#ff5722'; // 진한 주황색
        } else if (clampedTemp >= 62.5) {
            color = '#ff9800'; // 주황색
        } else if (clampedTemp >= 50) {
            color = '#ffeb3b'; // 노란색
        } else if (clampedTemp >= 43.5) {
            color = '#8bc34a'; // 연한 녹색
        } else if (clampedTemp >= 38.5) {
            color = '#4caf50'; // 녹색
        } else if (clampedTemp >= 25) {
            color = '#36c'; // 파란색
        } else if (clampedTemp >= 12.5) {
            color = '#2196f3'; // 연한 파랑
        }

        mercuryElement.style.backgroundColor = color;

        let face = '😐';
        if (clampedTemp >= 100) {
            face = '😍';
        } else if (clampedTemp >= 87.5) {
            face = '😎';
        } else if (clampedTemp >= 75) {
            face = '😃';
        } else if (clampedTemp >= 62.5) {
            face = '😀';
        } else if (clampedTemp >= 50) {
            face = '😊';
        } else if (clampedTemp >= 36.5) {
            face = '🙂';
        } else if (clampedTemp >= 30) {
            face = '😕';
        } else if (clampedTemp >= 25) {
            face = '😟';
        } else if (clampedTemp >= 15) {
            face = '😰';
        } else if (clampedTemp >= 10) {
            face = '😫';
        } else if (clampedTemp > 0) {
            face = '😵‍💫';
        } else if (clampedTemp <= 0) {
            face = '🩻';
        }
        faceElement.textContent = face;

        temperatureLabel.textContent = `${clampedTemp.toFixed(1)}°C`;
    }
});

