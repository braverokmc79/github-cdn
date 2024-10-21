
const baseTemperature = 36.5;
let trustScore = 0;
if(document.getElementById("trustScore")){
    const trustScoreInput = document.getElementById("trustScore").value;
    adjustTrustScore(trustScoreInput);
}
function adjustTrustScore(scoreChange) {
    trustScore += parseInt(scoreChange);
    const newTemperature = parseFloat(baseTemperature) + (parseFloat(trustScore) * 0.1);

    updateThermometer(newTemperature);
}

function updateThermometer(temp) {
    const mercuryElement = document.querySelector('.mercury');
    const temperatureLabel = document.getElementById('temperature');
    const faceElement = document.getElementById('face');

    // 체온 범위 설정 (0 ~ 100도)
    const minTemp = 0.0;
    const maxTemp = 100.0;

    // 체온이 최소 및 최대값을 넘지 않도록 설정
    const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temp));

    // 온도에 맞는 프로그레스 바의 너비 계산
    const widthPercentage = ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
    mercuryElement.style.width = `${widthPercentage}%`;

    // 온도에 맞는 색상 설정 (8단계 색상)
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

    // 표정 설정 (8단계 표정)
    let face = '😐'; // 기본 웃는 얼굴
    if (clampedTemp >= 100) {
        face = '😍'; // 하트 얼굴
    }else if (clampedTemp >= 87.5) {
        face = '😎'; // 시원한 얼굴
    } else if (clampedTemp >= 75) {
        face = '😃'; // 활짝 웃는 얼굴
    } else if (clampedTemp >= 62.5) {
        face = '😀'; // 환하게 웃는 얼굴
    } else if (clampedTemp >= 50) {
        face = '😊'; // 약간 미소
    } else if (clampedTemp >= 36.5) {
        face = '🙂'; // 무표정
    } else if (clampedTemp >= 30) {
        face = '😕'; // 약간 실망한 얼굴
    } else if (clampedTemp >= 25) {
        face = '😟'; // 걱정하는 얼굴
    } else if (clampedTemp >= 15) {
        face = '😰'; // 불안한 얼굴
    } else if (clampedTemp >= 10) {
        face = '😫'; // 불안한 얼굴
    }else if (clampedTemp > 0){
        face = '😵‍💫'; // 죽을상 얼굴
    }else if (clampedTemp <= 0){
        face = '🩻'; // 사망
    }
    faceElement.textContent = face;

    // 온도 라벨 업데이트
    temperatureLabel.textContent = `${clampedTemp.toFixed(1)}°C`;
}