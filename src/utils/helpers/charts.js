const CHART_DATA = {
    labels: ["Apr 1, 2022", "", "", "", "", "", "Apr 30, 2022"],
    datasets: [
        {
            data: [40000, 80000, 120000, 90000, 110000, 85000, 60000],
            borderColor: "#FF6B4A",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
        },
    ],
};

const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: "#999", font: { size: 11 } },
        },
        y: { display: false },
    },
};

export { CHART_DATA, CHART_OPTIONS };