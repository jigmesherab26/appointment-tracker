const STORAGE_KEY = "appointments"
const titleInput = document.getElementById("title")
const dateInput = document.getElementById("date")
const timeInput = document.getElementById("time")
const addBtn = document.getElementById("add-btn")
const ulList = document.getElementById("appointmentList")

let appointments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

// Add the appointment to the appointmentList
addBtn.addEventListener("click", function() {
    // if any of the these 3 input isn't available add button will not add
    if(!titleInput.value.trim() || !dateInput.value || !timeInput.value) return

    appointments.push({
        title : titleInput.value,
        date: dateInput.value,
        time: timeInput.value
    })

    titleInput.value = ''
    dateInput.value = ''
    timeInput.value = ''

    // Save the appointment to Local Storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))

    // Display the list of appointments below
    render()

})

function render() {
    ulList.innerHTML= ''
    appointments.forEach(app => {
        const li = document.createElement('li')

        const divTop = document.createElement('div')
        divTop.className = "top"

        const title = document.createElement('span')
        title.textContent = app.title
        title.style.fontWeight = 'bold'

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete-btn'
        deleteBtn.textContent = 'DELETE'
        deleteBtn.onclick = () => deleteAppointment(app)

        divTop.appendChild(title)
        divTop.appendChild(deleteBtn)

        const divDetails = document.createElement('div')
        divDetails.className = 'details'
        divDetails.textContent = `Date: ${app.date} | Time: ${app.time}`

        li.appendChild(divTop)
        li.appendChild(divDetails)

        ulList.appendChild(li)
    })

    function deleteAppointment(itemValue) {

        appointments = appointments.filter(item => item !== itemValue)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
        render()
    }
}

