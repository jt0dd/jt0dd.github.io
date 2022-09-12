const markdown1 = new Element('div', {})
markdown1.appendTo(document.body)
markdown1.setHTML(marked.parse(`
# Security Engineering with Chess: A Cybersecurity Learning Saga

### Bottom Line Up Front (BLUF)
*Communication is half of the battle.*

The first lesson of cybersecurity comes to us courtesy of the U.S. Army; a trick I learned in my time enlisted working at the National Security Agency: Begin every writing with a BLUF.

**Task One:** In cybersecurity and virtually every other complex profession, your absolute number one task is to identify value.

**Task Two:** Communicate that value effectively and quickly enough for the people listening to decide to keep listening.

In this saga, I've already introduced the most important skill of the professional world, and the rest of it will be spent identifying, exploring, and learning to communicate value in one of the most valuable roles in the cybersecurity field... and we'll do it all with Chess. And there was my BLUF!

**Task Three:** Execution... at scale. (...is *the other* half of the battle)

### Security Engineering
*The highest value adding role in the cybersecurity field.*

If you're still reading, the BLUF worked. Time for a hook: By the end of this saga, you're going to reimagine, thanks to Chess, the possibilities of engineering powerful cybersecurity solutions at scale. But don't just take it from me, every chapter I promise you a quote from someone smarter than I - for a total of 74 legendary lessons from great leaders and reknowned heroes, your Gandalfs and Dumbledores of the cyber world, as any good saga must have.

If you managage risk on a network in some way: identify vulnerability, apply controls, detect a threat, or perhaps create one, you're adding value to your cyber mission, once. If you engineer a tool for it, you're adding value to every cyber mission, many times over. Your time and effort **return on investment** (RoI) is *limitless*.

> Quote about adding and communicating value

Remember: Most leaders think in terms of value and cost. Always bring real value to the table, and communicate concisely why the RoI on cost to realize that value is higher than the alternatives. We're not in the business of security for security's sake. We're in the business of profit. *By adding limitless value (and effectively communicating it), a Security Engineer thrives in the business of profit.*

### You, Too, Can Be a Security Engineer
*Security engineering is the most powerful secondary discipline you can pick up in any cyber role.*

No matter your role...

- Identity & Access Management Analyst
- Security Operations Centre Analyst
- Chief Information Security Officer
- Governance Risk & Control
- Incident Response Analyst
- Security Education & Awareness Officer
- Vulnerability Management
- Attack Surface Reduction
- Security Architect
- Forensics Analyst
- Threat Hunter
- Cyber Auditor

...you probably do some work in your daily workflow which could be automated and could save the company time (money) across one or more departments of labor. If you hate the idea of writing code, read no further. But if you already code or are open to learn, this saga is for you.

> Quote about automation

#### Integration

Once you develop this skill (in addition to whatever your existing skill-set is), you will be a multi-discipline professional. This gives you a unique power to see value opportunities through integration of the tools, workflows, and systems of your department with those of another. Coding lets you speak the language of tools, and once you speak that language, infinite possibilities arise to integrate them with other tools in highly valuable ways.

#### Error Reduction

As we all know, we humans are prone to mistakes, so as a bonus: The automation of that task probably lowers the rate of error in the process, and that can often save money.

#### Optimization

That opportunity for optimization is called a gap. If you can recognize that capability gap, that opportunity to add value, communicate a worthwhile return on the investment to realize that value (cost of execution), and execute effectively, you'll generate value for your company, your boss, your customers.

#### Operation At Scale

Some capabilities, especially working with big data (which many networks are) are not feasible *without* automation. You can fill gaps people didn't even realize existed. And have fun doing it. Creativity can be endless fun, and very rewarding.

And if you're smart, you'll end up being compensated very well for that skillset. You might even build your own product, your own company even. *Regardless of your role, however technical or non-technical it might be, if you use a computer through some part of the process (and you probably do), you can become a multi-discipline security professional by just applying code to integrate, reduce error, optimize, and/or scale.*


`))


/**

Quote repo

> "We have this thing we talk about called The Perfect Solution Fallacy. The Perfect Solution Fallacy is when you have a good idea like 'Hey let's track malware by [tracking the ImpHash](https://www.mandiant.com/resources/blog/tracking-malware-import-hashing),' someone will often raise their hand and say 'Oh well of course a nation state would change the list of DLLs, they'd rearrange the order, they'd add a different one in just to throw that off, of course.'We call that the Perfect Solution Fallacy. The Perfect Solution Fallacy is a fallacy because it states: A solution is not useful unless it's perfect in all use-cases. And of course we don't believe that. If we believed that, we wouldn't use firewalls, we wouldn't use antivirus, we wouldn't use anything, because everything fails. That's why we have Defense in Depth." - Eric Conrad, [Threat Hunting via Sysmon - SANS Blue Team Summit](https://youtu.be/7dEfKn70HCI), 2019*



> "The malware is living off the land. We call these things 'LOLBINS' now, right, Living Off The Land Binaries. And malware has learned and good pentesters have learned: Don't install malware, just use what's there. PowerShell's gonna be whitelisted (if there is whitelisting). PowerShell's going to run in some form, right? So let's live off the land. Good pentesters do that and advanced malware does that too." - Eric Conrad, [Threat Hunting via Sysmon - SANS Blue Team Summit](https://youtu.be/7dEfKn70HCI), 2019*


The value of multi-discipline skillsets is stretching beyond the role of Security Engineer, anyhow:

> "If no one in your SOC is scripting, you have a sub-standard SOC. And now, that's a very unpopular statement, but I stand by it. [...] My wife was sitting in the back and people started kind of like 'boo'ing and muttering when I said that. \*laughs\* They didn't like what I said. [...] Adding some scriptability is a key element in your SOC." - Eric Conrad, [Threat Hunting via Sysmon - SANS Blue Team Summit](https://youtu.be/7dEfKn70HCI), 2019


Be aware of the battle ahead as you work towards building a better world. Your efforts will not be without friction:

> "So sometimes you come back to work on Monday, you have these ideas for new things to try, someone might try to shoot them down. Not because they're bad ideas, simply because they're different. People like to fight change, some IT people build entire careers fighting change. These people are actually harmful and toxic to your environment. They think they're well intended. But, um, it's merely a fight for status quo and, as I've told many of my clients, status quo isn't working." - Eric Conrad. *Senior Instructor, Co-Author SEC511 and SEC542, Author MGT514, SANS Institute. [Threat Hunting via Sysmon - SANS Blue Team Summit](https://youtu.be/7dEfKn70HCI), 2019*


The vulnerability of ignorance can be terrifying, yet we're better off facing our fears, no?

> "Be more concerned with not learning than not knowing. Far too often due to feelings of inadequacy, imposter syndrome, ego and so on, people will refrain from asking questions in meetings and on projects because they will get exposed as not knowing things. I prefer to flip this paradigm on its head and I'm far more concerned with not learning what I don't know, than keeping up the facade that I do know. People are eager to share their experience, insights and expertise, you just have to be willing to ask. The irony of this is, when you shed that defense tactic, you learn a hell of a lot more and are more competent in the long haul as well. If we don't learn, we don't grow, and if we don't grow, we lose." - Chris Hughes, CISO & Co-Founder, Aquia, 2022


The following quote was directed toward a young man seeking life advice, but we can look past gender specificity to recognize the value in these words (we should all work towards a culture where more women feel welcome in STEM fields):

> "Try not to become a man of success but rather try to become a man of value. He is considered successful in our day who gets more out of life than he puts in. But a man of value will give more than he receives.." - Albert Einstein, 1955

If you live by these words, you'll be compensated for your efforts, I suspect, generously.

> "I just screened over 100 security engineering and consulting candidates where the job description was very focused on technical skills and they had a plethora of commercial tools listed, but not a single resume included the words "scripting, powershell, bash, python, automation" or similar. If you are telling yourself you don't need these skills to be competitive, I hope you are not applying for technical roles." Tony Turner, Security Engineer, 20+ years experience, Fortress Information Security, 2022
**/
