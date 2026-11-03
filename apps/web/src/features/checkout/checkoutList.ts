import { EMAIL } from "@/lib/contact";
import { FACTS } from "@/lib/site";

/**
 * Checkout's words. Until a payment provider is chosen, checking out sends
 * the order to us by email with the delivery details, and we reply with a
 * link to pay; nothing is charged here, and the page says so plainly.
 */
export const CHECKOUT = {
  title: "Check out",
  line: `Send us your order and where it goes. We check it, confirm the price and delivery, and email you a link to pay, within ${FACTS.replyTime}.`,
  details: "Delivery",
  fields: {
    name: "Name",
    email: "Email",
    phone: "Phone, for the delivery day",
    address: "Street and block",
    unit: "Unit number",
    postal: "Postal code",
    lift: "Getting it in",
    when: "When suits you",
    note: "Anything we should know",
  },
  lifts: ["A lift stops at my floor", "No lift: stairs only", "Ground floor"],
  whens: ["Weekdays", "Weekends", "Either"],
  notePlaceholder: "A tight corner, a parking spot, a door code",
  send: "Send my order",
  sent: "Your email app should now open with the order written out. Send it, and we reply with a link to pay.",
  noMail: `If nothing opened, email the order to ${EMAIL}.`,
  estimate: "A size of your own is an estimate; we confirm it before you pay.",
  nothing: "Nothing to check out yet.",
  subject: "Order",
};
