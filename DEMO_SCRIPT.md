                                                 #REFLEX DEMO SCRIPT   

Introduction
"Let me show you Reflex running live — a simple system that gives retailers, dispatchers, and riders one shared source of truth for deliveries."
1. Create a request (retailer)
[Fill form → submit]
"Retailer logs a request — status: Pending."
2. Assign a rider (dispatcher)
[Click "Assign Rider #1"]
"Dispatcher assigns it — status updates to Assigned."
3. Mark picked up (rider)
[Click "Mark Picked Up"]
"Rider picks it up — status updates again."
4. Mark delivered (rider)
[Click "Mark Delivered"]
"And finally, delivered."
5. The proof point
"Every one of those changes is logged with a timestamp behind the scenes — that's our audit trail, so we're not just showing current status, we can prove the whole journey happened."
6. What we know still needs work — edge cases
"We looked for our own weak points instead of waiting for you to find them. Two examples: right now, two dispatchers assigning the same delivery at once could both succeed silently. And the Assign button is currently hardcoded to one test rider — no picker yet."
7. Why we accepted these — trade-offs
"These were intentional trade-offs, not oversights. We kept the API open with no login yet, so we could prove the core logistics flow first — a WhatsApp OTP login is next. We also chose manual refresh over automatic syncing, since background polling drains data and battery on the budget phones our users actually have."
8. What's next — roadmap
"Next: role-based views so riders don't see dispatcher tools. After that, QR-code scanning to replace manual confirmation. Longer-term, full offline support for areas with no signal."
Closing
"That's Reflex — simple, working, and honest about what it does and doesn't do yet. Thanks, happy to take questions."            
Compiled by Keisha Ochieng


