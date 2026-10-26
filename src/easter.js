import { person, skills } from './data.js'

// Easter eggs for the curious: one in the Elements panel, one in the Console.
export function installEasterEggs() {
  if (typeof window === 'undefined') return

  // Inspect: a comment at the top of <body>
  document.body.prepend(
    document.createComment(
      `\n  Hey, you found the HTML comment.\n  Since you're reading the source: I'm ${person.name}, a Technical Lead who likes clean code.\n  Open the Console tab for something else.\n`
    )
  )

  // Console: styled greeting
  const badge = 'background:#1f7a4d;color:#f3f7f1;font:800 22px system-ui;padding:6px 14px;border-radius:10px 0 0 10px'
  const title = 'background:#12261c;color:#8fd16a;font:600 16px system-ui;padding:11px 14px;border-radius:0 10px 10px 0'
  const text = 'color:#4f6558;font:14px/1.6 system-ui'
  const code = 'color:#1f7a4d;font:600 14px ui-monospace,monospace'

  console.log('%cS%cSabil Valdano · Technical Lead', badge, title)
  console.log(
    "%cHi curious developer. Nice to meet you.\nThis site is built with Vite + React, and I'm open to new opportunities and collaboration.\nTry %csabil.help()%c to see what this console can do.",
    text, code, text
  )

  const commands = {
    help() {
      console.log('%csabil.about()  %c who I am', code, text)
      console.log('%csabil.skills() %c what I work with', code, text)
      console.log('%csabil.hire()   %c how to reach me', code, text)
      return 'Pick one.'
    },
    about() {
      return `${person.name}: ${person.title}`
    },
    skills() {
      console.table(skills.map((s) => ({ skill: s })))
      return `${skills.length} skills and counting.`
    },
    hire() {
      console.log('%cLet\u2019s talk: %c' + person.linkedin, text, code)
      return 'Message me on LinkedIn.'
    },
  }
  Object.defineProperty(window, 'sabil', { value: Object.freeze(commands), enumerable: false })
}
