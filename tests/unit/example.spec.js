import { shallowMount } from '@vue/test-utils'
import Meetup from '@/views/Meetup'


describe('Meetup.vue', () => {
  it('should render meetings', async () => {
    const expected = 4;
    const wrapper = shallowMount(Meetup);

    const meetings = wrapper.findAll('ul > li').length
    expect(meetings).toBe(expected);
  })
});

it('triggers add meeting method on click', async () => {
  const Method = jest.spyOn(Meetup.methods, 'bookAMeeting');
  const wrapper = shallowMount(Meetup);
  await wrapper.find('button').trigger('click')
  expect(Method).toBeCalled();
})

it('should show a meeting in meetings', () => {
  const wrapper = shallowMount(Meetup, {
    data() {
      return {
       bookedMeetings: [
          {
            date: '03-01-2021',
            title: 'My meeting 4',
            review: ''
          }
        ]
      }
    }
  })
  const getBookedMeetings = wrapper.findAll('#meeting-test').length;
  expect(getBookedMeetings).toBe(1);
});

it('triggers add review method on click', async () => {
  const newMethod = jest.spyOn(Meetup.methods, 'reviewAMeeting');
  const wrapper = shallowMount(Meetup);
  await wrapper.find('button').trigger('click')
  expect(newMethod)
});

it('should get the meetings when server created', () => {
  const spy = jest.spyOn(Meetup.methods, 'getMeetings');
  shallowMount(Meetup)
  expect(spy).toBeCalled();
});

