const blogBody = new Element('div', {
  styles: {
    'max-width': '800px'
  },
  ready: self => {
    self.append(new Element('div', {
      styles: {
        'display': 'flex',
        'flex-direction': 'row'
      },
      ready: self => {
        self.append(new Element("div", {
          styles: {
            'display': 'flex',
            'padding': '20px',
            'flex-direction': 'row',
            'justify-content': 'center',
            'align-items': 'center'
          },
          ready: self => {
            self.append(new Element("i", {
              classes: ["fa-solid", 'fa-chess-knight'],
              styles: {
                "font-size": "55px",
                "color": "white"
              }
            }))
          }
        }))
        self.append(new Element("h1", {
          text: 'Security Engineering with Chess: A Cybersecurity Learning Saga'
        }))
      }
    }))

    self.append(new Element("div", {
      styles: {
        'display': 'flex',
        'flex-direction': 'column',
        'jusify-content': 'center',
        'align-items': 'center',
        'background-color': '#2a2b36'
      },
      ready: async self => {
        const board = new Board();
        self.append(board.element)
        board.element.style('margin', '0px 15px 0px 15px')
        await makeRandomTurnCycle(board, 5)
        console.log('board.pieces', board.pieces)
        const allPieces = board.pieces.white.concat(board.pieces.black)
        let kingFound = false
        for (const piece of allPieces) {
          console.log(piece.name)
          if (piece.name == 'King') kingFound = piece
        }

        // In this visual stunt, we need a king and a knight. The knight will
        // be made to break the rules (later demoed as an exploitation) and illegally
        // move to kill the king.

        if (kingFound) {
          let knightFound = false
          for (const piece of board.pieces[getOppositeColor(kingFound.color)]) {
            if (piece.name == 'Knight') knightFound = piece
          }
          if (knightFound) {

            // The stunt can proceed.

            const king = kingFound
            const knight = knightFound
            knight.element.style('transition-timing-function', 'linear')

            knight.element.children[0].style('transition', 'top 0.2s, left 0.2s, color 2s, transform 2s')
            knight.element.children[0].style('color', '#891717')
            knight.element.children[0].style('transform', 'rotate(360deg)')

            setTimeout(async () => {
              console.log('king', king)
              console.log('knight', knight)

              const yMove = knight.y - king.y
              const xMove = knight.x - king.x
              console.log('yMove', yMove)
              console.log('xMove', xMove)

              let moveQueue = []
              let directionY
              if (knight.y > king.y) {
                directionY = -1
              } else {
                directionY = 1
              }
              for (let y = knight.y; y >= king.y; y += directionY) {
                console.log('knight.move', knight.x, y)
                let collision = false
                for (const piece of allPieces) {
                  if (piece.x == knight.x && piece.y == y && piece != knight) collision = piece
                }
                moveQueue.push({piece: knight, x: knight.x, y: y, collisionEnemy: collision})
              }
              let directionX
              if (knight.x > king.x) {
                directionX = -1
              } else {
                directionX = 1
              }
              await iterateMoveQueue(moveQueue, 200)
              moveQueue = []
              for (let x = knight.x; x >= king.x; x += directionX) {
                console.log('knight.move', knight.y, x)
                let collision = false
                for (const piece of allPieces) {
                  if (piece.x == x && piece.y == knight.y && piece != knight) collision = piece
                }
                moveQueue.push({piece: knight, x: x, y: knight.y, collisionEnemy: collision})
              }
              await iterateMoveQueue(moveQueue, 200)
            }, 2000)
          }
        }
      }
    }))

    self.append((new Element("div", {
      styles: {
        'padding': '20px 15px'
      },
      ready: self => {
        self.setHTML(marked.parse(`
## Chapter 1 | Bottom Line Up Front (BLUF)
*Communication is half of every battle.*

The first lesson of cybersecurity comes to us courtesy of the U.S. Army; a trick I learned in my time enlisted working at the National Security Agency: Begin every professional writing with a BLUF.

- **Task One:** In cybersecurity and virtually every other complex profession, your absolute number one task is to identify value.

- **Task Two:** Communicate that value effectively and quickly enough for the people listening to decide to keep listening and perhaps lend you the authority or resources necessary to execute.

- **Task Three:** Execution... at scale. (...is *the other* half of the battle)

In this saga, I've *already* introduced the most important skills of the professional world, and the rest of it will be spent identifying, exploring, learning to communicate, and delivering value in one of the most valuable roles in the cybersecurity field... and we'll do it all with Chess. And that concludes my BLUF!

## Chapter 2 | Engineering *Outcome*, *Outcome*, *Outcome*

The reason we first pause the engineering aspect of this "Security Engineering" Saga to highlight these "soft-skill" aspects of the profession is simple: All the technical expertise and skill in the world will lead you nowhere if you don't first understand what you're really supposed to be *doing* with it. ***Outcome.*** If your only focus in your job is cybersecurity, *you will fail at cybersecurity.* From now on, you are a **multi-discipline** professional. Your new discipline? Enabling operational outcome. That's your job. Before analyzing network protocols, forensic endpoint analysis, reverse engineering, DevSecOps, you need to understand that the very core of your purpose (from the perspective of your employer) is either:

- Meet some perceived regulatory compliance requirements (security theater),
- (or) Enable the business to continue to operate its organizational objectives in order of priority under limited resource constraints.

Cybersecurity is simply the medium through which you're expected to fulfill that purpose. Once you understand this, the next thing you must realize is that you need two critical tools in your belt in addition to technical expertise:

- The ability to understand your organization's big picture objectives and prioritization of those objectives.
- The ability to effectively communicate the best strategy to meet the organization's risk appetite, the resources required to realistically achieve that mitigation strategy.

If you approach cyber security without those tools, you will instead:

- Attempt to execute "Security for Security's Sake",
- Fail to align with the goals of the organization.

And then from the misalignment of objectives between yourself and the organization, you'll become frustrated, stressed, and disenfranchised from the passion you once held for the profession. Even if your true role in an organization is Security Theater, by simply seeing the bigger picture and having this understanding will allow you to expect and shrug off the lack of necessary resources, authority to affect change, and organizational support rather than lament. Take the pay, polish your resume, learn, publish write-ups like this one to expand your reach and credibility, and relax. You'll soon find a real security job where you can express your passion for the profession.

## Chapter 3 | The Critical Role of Communication in Cybersecurity (And Everything Else)
*Accessibility: The. Most. Important. Thing.*

The content of this piece (and I suspect all communication for the rest of my lifetime) will be driven by this valuable piece of operational wisdom I recently had the pleasure of reading.

> "I'm not really sure how Bezos came to this realization -- the insight that he can't build one product and have it be right for everyone. But it doesn't matter, because he gets it. There's actually a formal name for this phenomenon. It's called Accessibility, and it's the most important thing in the computing world.

> The. Most. Important. Thing.

> If you're sorta thinking, 'huh? You mean like, blind and deaf people Accessibility?' then you're not alone, because I've come to understand that there are lots and LOTS of people just like you: people for whom this idea does not have the right Accessibility, so it hasn't been able to get through to you yet. It's not your fault for not understanding, any more than it would be your fault for being blind or deaf or motion-restricted or living with any other disability. When software -- or idea-ware for that matter -- fails to be accessible to anyone for any reason, it is the fault of the software or of the messaging of the idea. It is an Accessibility failure. [...] But I'll argue that Accessibility is actually more important than Security because dialing Accessibility to zero means you have no product at all, whereas dialing Security to zero can still get you a reasonably successful product such as the Playstation Network." - [Steve Yegge](https://www.linkedin.com/in/steveyegge/), Senior Software Engineer & Manager, [Stevey's Google Platforms Rant](https://gist.github.com/chitchcock/1281611)

For those who need it, we begin this saga with a substantial overview priceless mile-high lessons on how to approach security engineering (and more broadly, cybersecurity as a profession). If you prefer, feel free to skip straight ahead to the experiments and hand-on coding sections, depending on your interests:

- **Chapter 7 | Let's Exploit Chess (Basic JavaScript Analysis):** Discovering vulnerability in a simple web-app designed without security in mind (a common scenario).
- **Chapter 8 | Memory Forensics:** Forensic analysis (first manual, then automated) of a vulnerable peer-to-peer web app (Chess).
- **Chapter 9 | Remote Code Execution:** Engineering an attack to exploit vulnerable code and achieve Remote Code Execution (RCE).
- **Chapter 10 | Detection:** Building a memory forensics baseline of the JavaScript run-time environment within Google Chrome.

What I just did was take the lesson about operational accessibility and apply it, as I propose we all should, to communication (and everything else we do that involves other people). Even though a writer must establish a target audience, each member of that audience will still consume the writing from a remarkably different perspective. A different set of experiences, strengths, goals, and objectives. Introducing and facilitating choices enabling consumers of your content to quickly access sections that provide them the greatest value (and skip the rest) is an awesome way to apply that lesson to communication.

Popular wisdom: Use hooks in your communication content to highlight the most interesting feature (value). So here's an example:

This Saga culminates, after journeying through the many fundamental challenges of security (through the initially simple abstraction of a Chess game) in two practical outcomes far more remarkable than a shallow one-off exercise:

- Checkmate: A real, operational C2 framework operating within the memory run-time of Google Chrome, featuring some of the most effective detection counter-measures known to modern offensive cyber operations.
- Rematch: A real, comprehensive Detection-as-Code solution to Secure, Orachestrate, Automate, and Respond (SOAR) effectively against this state-of-the-art attack.

## Chapter 4 | Engineering Limitless Value
*The highest value adding role in the cybersecurity field.*

If you're still reading, the BLUF and hook worked. Let's try one more hook: By the end of this saga, you're going to reimagine, thanks to Chess, the possibilities of engineering powerful cybersecurity solutions at scale. But don't just take it from me, every chapter I promise you a quote from someone smarter than I - for a total of 74 legendary bits of wisdom from great leaders and reknowned heroes, your Gandalfs and Dumbledores of the cyber world, as any good saga must have.

If you managage risk on a network in some way: identify vulnerability, apply controls, detect a threat, or perhaps create one, you're adding value to your cyber mission, once. If you engineer a tool for it, you're adding value to every cyber mission, many times over. Your time and effort **return on investment** (RoI) has *limitless* potential.

> "In short, I conceive that great part of the miseries of mankind are brought upon them by the false estimates they have made of the value of things, and by their giving too much for their whistles." - Benjamin Franklin, 1779

When Ben was about seven years old, he bought a whistle for far more than it was worth. He later wrote a letter citing that lesson about how important that lesson had been throughout, to properly assess value against his time, effort, and attention.

Remember: Most leaders think in terms of risk, cost, and benefit (value). If you want to obtain buy-in for your work and your ideas, always bring real value to the table. Communicate concisely why the return on investment to realize that value is both higher than the alternatives and worthwhile. We're not in the business of security for security's sake. We're in the business of profit. *By adding limitless value potential (and effectively communicating it), a Security Engineer thrives in the business of profit.*

Limitless value *potential* never becomes tangible without execution. Don't spend all your time dreaming, lest you forget to transform your ideas into working code and tangible outcomes.

## Chapter 5 | You, Too, Can Be a Security Engineer
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

...you probably do or observe some task in your department's daily workflow which could be automated and could save the company time (money) across one or more departments of labor. If you hate the idea of writing code, read no further. But if you already code or are open to learn, this saga is for you.

But this isn't just a saga about automating a few SIEM queries. This is about embracing a new era of tooling driving a revolution in the way cybersecurity risk is managed at scale. This is about meeting a dire and growing need in the industry.

> "I think looking at the cognizant science in this field is really important because the work is really intense if you're doing it all the time. And that's another reason why people fall out of it [...] At Google, I don't know anyone who's been in my team who hasn't asked for a job change after 4 years. [...] The work gets repetitive, it gets boring, the assistants are not helpful enough. And this is a problem. If you're a manager and you're building your SOC, you've gotta know that your people aren't gonna stay for very long." - Heather Adkins, Director of Information Security, Google, 2017

Security engineering can and must be the cornerstone of solving problems like this one. Heather went on to make a prediction:

> "But let's look at the future, because I think that the future holds something quite valuable, and I'm going to be somewhat controversial with this. I think, ultimately, by 2050 or so, we will have put in place something to solve James Anderson's original problem. We will have systems that can defend themselves. And they'll be better constructed or they'll be self-healing."

And I believe Heather's prediction. I'll go a step further and predict that we'll be pretty close to this solution by 2030, if not sooner. To those in the audience who scoff at this idea, citing the extremely weak state of cyber security today and the apparent lack of interest in most organizations to address it: I counter that attack automation technology will radpidly evolve and with it, the frequency and severity of attack, leading to a rise in losses and therefore a rise in business interest in better defense. And I counter that this kind of automation, as has been the case with all industrial automation ventures throughout history, will cut costs and increase profit margins, further compounding the pressure for organizations to pursue it.

The only question is: Will you be leading the way to build that new era of value? Or will you sit on the sidelines as your job is automated away?

Before we move on, let's cover a few of the major ways automation can produce value for an organization, especially when it comes to cybersecurity where "the work is really intense" and the labor cost is extremely high.

#### Integration

Once you develop this skill (in addition to whatever your existing skill-set is), you will be a multi-discipline professional. This gives you a unique power to see value opportunities through integration of the tools, workflows, and systems of your department with those of another. Coding lets you speak the language of tools, and once you speak that language, infinite possibilities arise to integrate them with other tools in highly valuable ways.

#### Error Reduction

As we all know, we humans are prone to mistakes, so as a bonus: The automation of that task probably lowers the rate of error in the process, and that can often save money.

#### Optimization

That opportunity for optimization is called a gap. If you can recognize that capability gap, that opportunity to add value, communicate a worthwhile return on the investment to realize that value (cost of execution), and execute effectively, you'll generate value for your company, your boss, your customers.

#### Operation At Scale

Some capabilities, especially working with big data (which many networks are) are not feasible *without* automation. You can fill gaps people didn't even realize existed. And have fun doing it. Creativity can be endless fun, and very rewarding.

And if you're smart, you'll end up being compensated very well for that skillset. You might even build your own product, your own company even. *Regardless of your role, however technical or non-technical it might be, if you use a computer through some part of the process (and you probably do), you can become a multi-discipline security professional by just applying code to integrate, reduce error, optimize, and/or scale.*

## Chapter 6 | What This Saga Is Not
*This is not a cybersecurity & software engineering "noob-to-pro" tutorial.*

- Coding (in Python) will be demonstrated and briefly explained, but not elaborated on comprehensively.
- Basic cybersecurity concepts will be referenced, but not explained. Advanced concepts will be more thoroughly explained.

In other words, the reader is expected to know the basics of both subjects. Someone who has passed Sec+ and completed a few small Python projects with 6-12 months of experience coding should be fairly well prepared for this learning saga.

> "Be more concerned with not learning than not knowing. Far too often due to feelings of inadequacy, imposter syndrome, ego and so on, people will refrain from asking questions in meetings and on projects because they will get exposed as not knowing things. I prefer to flip this paradigm on its head and I'm far more concerned with not learning what I don't know, than keeping up the facade that I do know. People are eager to share their experience, insights and expertise, you just have to be willing to ask. The irony of this is, when you shed that defense tactic, you learn a hell of a lot more and are more competent in the long haul as well. If we don't learn, we don't grow, and if we don't grow, we lose." - Chris Hughes, CISO & Co-Founder, Aquia, 2022

## Chapter 7 | Let's Exploit Chess (Basic JavaScript Analysis)
*The JavaScript behind this Chess engine will not be an area of focus beyond very basic reverse engineering. If anyone wants to see the full, completed (and vulnerable!) Chess engine source code, it's on GitHub.*

`))
      }
    })))
  }
}).appendTo(document.body)

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
