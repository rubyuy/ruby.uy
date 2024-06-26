document.addEventListener("DOMContentLoaded", () => {
  const nextMeetupCallout = document.querySelector(".next-meetup-callout")

  if (nextMeetupCallout != null) {
    const nextMeetupCalloutTitle = document.querySelector(".next-meetup-callout__title")
    const nextMeetupCalloutIcon = document.querySelector(".next-meetup-callout__icon")

    for(let i = 0; i < 5; i++) {
      duplicate(nextMeetupCalloutTitle)
      duplicate(nextMeetupCalloutIcon)
    }

    duplicate(nextMeetupCallout)
    addAnimationToCallouts()
  }
})

function addAnimationToCallouts() {
  document.querySelectorAll(".next-meetup-callout").forEach(callout => {
    callout.classList.add("next-meetup-callout--infinite-horizontal-animation")
  })
}
