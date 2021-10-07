<template>
  <main id="app">
    <section>
      <h2>Kommande Meetups!</h2>
      <ul>
        <li v-for="(meeting, i) in meetings" :key="i" class="meeting-list">
          <div>
            <p>{{ meeting.title }}</p>
            <p>{{ meeting.date }}</p>
          </div>
          <button type="button" @click="bookAMeeting(meeting)">Anmäl</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Avklarade Meetups</h2>
      <ul>
        <li id="meeting-test"
          v-for="(meeting, i) in bookedMeetings"
          :key="i"
          class ="meeting-list"
        >
          <div>
            <p>{{ meeting.title }}</p>
            <small>Recension: {{ meeting.review }}</small>
          </div>
          <button type="button" @click="reviewAMeeting(meeting, i)">
            Recensera
          </button>
        </li>
      </ul>
    </section>

    <div class="modal-scaffold" v-if="meeting !== null">
      <div class="modal">
        <div class="modal-header">Skriv ny recension</div>
        <div class="modal-body">
          <label for="review">Recension</label>
          <input
            type="text"
            id="review"
            class="modal-input"
            v-model="meeting.review"
          />
          <button type="button" class="modal-button" @click="addReview">
            Lägg till recension
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Meetup',
  created () {
    this.addItemsToLocalStorage()
    this.getMeetings()
  },
  data () {
    return {
      meetings: [],
      bookedMeetings: [],
      meeting: null,
      meetingIndex: null
    }
  },
  methods: {
    bookAMeeting (meeting) {
      const jsonBookedMeetings = localStorage.getItem('booked_meetings')
      const bookedMeetings = JSON.parse(jsonBookedMeetings)
      bookedMeetings.push(meeting)

      const asJsonBookedMeetings = JSON.stringify(bookedMeetings)
      localStorage.setItem('booked_meetings', asJsonBookedMeetings)
      this.getBookedMeetings()
    },
    reviewAMeeting (meeting, index) {
      this.meeting = meeting
      this.meetingIndex = index
    },
    addReview () {
      this.bookedMeetings[this.meetingIndex] = this.meeting

      const asJsonBookedMeetings = JSON.stringify(this.bookedMeetings)
      localStorage.setItem('booked_meetings', asJsonBookedMeetings)
      this.getBookedMeetings()

      this.meeting = null
      this.meetingIndex = null
    },
    getMeetings () {
      const jsonMeetings = localStorage.getItem('meetings')
      this.meetings = JSON.parse(jsonMeetings)
    },
    getBookedMeetings () {
      const jsonMeetings = localStorage.getItem('booked_meetings')
      this.bookedMeetings = JSON.parse(jsonMeetings)
    },
    addItemsToLocalStorage () {
      const meetings = [
        { date: '07-02-2021', title: 'My meeting 1', review: '' },
        { date: '09-03-2021', title: 'My meeting 2', review: '' },
        { date: '02-04-2021', title: 'My meeting 3', review: '' },
        { date: '03-01-2021', title: 'My meeting 4', review: '' }
      ]
      const meetingsJson = JSON.stringify(meetings)
      localStorage.setItem('meetings', meetingsJson)

      const existing = localStorage.getItem('booked_meetings')
      if (existing) {
        this.getBookedMeetings()
      } else {
        const bookedMeetings = []
        const bookedMeetingsJson = JSON.stringify(bookedMeetings)
        localStorage.setItem('booked_meetings', bookedMeetingsJson)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
}

.meeting-list {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  list-style: none;
  margin-left: -2rem;
  border-bottom: 1px #ccc solid;
  padding-bottom: 8px;
}

.modal-scaffold {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 1.5em;
  border-radius: 5px;
  width: 80%;
}

.modal-header {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.modal-input {
  padding: 0.5rem;
}

.modal-button {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #2c3e50;
  border: none;
  color: white;
  border-radius: 5px;
}
</style>
