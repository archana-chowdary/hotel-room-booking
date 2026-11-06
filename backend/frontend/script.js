const API = "http://localhost:5000/bookings";

// CREATE BOOKING
document.getElementById("bookingForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const booking = {

        customerName: document.getElementById("customerName").value,

        roomType: document.getElementById("roomType").value,

        guests: Number(document.getElementById("guests").value),

        checkIn: document.getElementById("checkIn").value,

        checkOut: document.getElementById("checkOut").value

    };

    const response = await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(booking)

    });

    const result = await response.json();

    alert(result.message);

    document.getElementById("bookingForm").reset();

    getBookings();

});


// READ BOOKINGS
async function getBookings(){

    const response = await fetch(API);

    const bookings = await response.json();

    const container = document.getElementById("bookings");

    container.innerHTML = "";

    bookings.forEach((booking)=>{

        container.innerHTML += `

        <div class="booking">

        <p><b>ID:</b> ${booking._id}</p>

        <p><b>Customer:</b> ${booking.customerName}</p>

        <p><b>Room:</b> ${booking.roomType}</p>

        <p><b>Guests:</b> ${booking.guests}</p>

        <p><b>Check In:</b> ${booking.checkIn}</p>

        <p><b>Check Out:</b> ${booking.checkOut}</p>

        <button class="updateBtn" onclick="updateBooking('${booking._id}')">
        Update
        </button>

        <button class="deleteBtn" onclick="deleteBooking('${booking._id}')">
        Cancel
        </button>

        </div>

        `;

    });

}


// UPDATE BOOKING
async function updateBooking(id){

    const guests = prompt("Enter New Number of Guests");

    if(guests==null) return;

    const response = await fetch(`${API}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            guests:Number(guests)

        })

    });

    const result = await response.json();

    alert(result.message);

    getBookings();

}


// DELETE BOOKING
async function deleteBooking(id){

    if(!confirm("Do you want to cancel this booking?")){

        return;

    }

    const response = await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

    const result = await response.json();

    alert(result.message);

    getBookings();

}


// Load bookings automatically
getBookings();
