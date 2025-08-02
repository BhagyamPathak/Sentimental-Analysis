

async function handleSubmit() {
    const nameInput = document.getElementById('analysis').value;
    if (nameInput) {
        try {
            const response = await fetch('http://127.0.0.1:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nameInput }),
            });

            const data = await response.json();

            var mood = document.querySelector("#mood")
            mood.innerHTML = data.message
            dographs(data.pos, data.neg, data.neu, data.comp, data.a, data.b, data.c)
            fill_word(data.pw, data.nw, data.new)
            console.log(data.pw)

        } catch (error) {
            console.error("Error processing input:", error);
        }
    } else {
        alert("Please enter your name.");
    }

    const analysised = document.getElementById('analysis').value;
    if (nameInput) {
        try {

            const response = await fetch('http://127.0.0.1:5000/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: analysised }),
            });


            const data = await response.json();

            var mood = document.querySelector("#summary")
            mood.innerHTML = data.message
        } catch (error) {
            console.error("Error processing input:", error);
        }
    } else {
        alert("Please enter your name.");
    }
}

async function link() {
    const nameInput = document.getElementById('link').value;
    if (nameInput) {
        try {

            const response = await fetch('http://127.0.0.1:5000/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkdede: nameInput }),
            });

            const data = await response.json();
            var mood = document.querySelector("#analysis")
            mood.innerHTML = data.message
        } catch (error) {
            console.error("Error processing input:", error);
        }
    } else {
        alert("Please enter your name.");
    }
}



function dographs(a, b, c, d, e, f, g) {

    const ctx1 = document.getElementById('myChart1').getContext('2d');


    const data1 = {
        labels: ['Positive', 'Negative', 'Neutral', 'Compund'],
        datasets: [{
            label: 'mood',
            data: [a, b, c, d],
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)'

            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: data1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



    const ctx = document.getElementById('myDonutChart').getContext('2d');
    const data = {
        labels: ["positive", "negative", "neutral"],
        datasets: [{
            label: 'Number of words',
            data: [e, f, g],
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };
    const myDonutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            cutout: '70%'
        }
    });
}

function fill_word(x, y, z) {
    a = document.querySelector(".positive")
    b = document.querySelector(".negative")
    c = document.querySelector(".neutral")

    a.innerHTML = ""
    b.innerHTML = ""
    c.innerHTML = ""

    a.innerText = x
    b.innerText = y
    c.innerHTML = z
}


document.querySelector("button").addEventListener("click", () => {
    // Add animation to result boxes
    document.querySelectorAll(".p, .n, .ne").forEach(el => {
        el.classList.remove("animate-fade-in-up", "animate-pulse"); // reset
        void el.offsetWidth; // trick to restart animation
        el.classList.add("animate-fade-in-up", "animate-pulse");
    });

    // Optional: Add loader or delay before showing result
    // You can simulate processing here if needed
});




console.log("created by BHAGYAM PATHAK")