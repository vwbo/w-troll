import json
from pathlib import Path

from fish_voice import load_env, voice_from_env

ROOT = Path(__file__).resolve().parent
PHRASES = [
    "That was a mistake",
    "Please don't go!",
    "The wheels on the bus go round and round, round and round, round and round. The wheels on the bus go round and round, all through the town!",
    "Dibidi ba didi dou dou, Di ba didi dou, Didi didldildidldidl houdihoudi dey dou",
    "I like fuzzy kittycats, warm eyes, and pretending household appliances have feelings",
    "I've never seen the inside of my own mouth because it scares me to death.",
    "hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw",
    "abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak",
    "eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo",
    "[laughing] oh my god you actually pressed it. you freak. [chuckling] stay.",
    "[whispering] hey. look at me. [soft] on your knees. now.",
    "[moaning] mm. that's it. [breathy] don't you dare close this.",
    "[excited] wait you thought this was a cute cat page? [audience laughing] baby...",
    "[chuckling] say please. [pause] louder. [laughing] that's so pathetic.",
    "[panting] i didn't say you could leave. [emphasis] stay.",
    "[laughing] good boy. wait. [sighing] no. you're not even that.",
    "[whispering] you like this? [moaning] of course you do. of course you do.",
    "[sighing] oh you poor thing. [soft] come here. [emphasis] no. stay down.",
    "[clear throat] hey idiot. [laughing] yeah you.",
    "[angry] don't close it. [pause] i wasn't done with you.",
    "[embarrassed] wait why am i getting like this. [moaning] shut up. don't talk.",
    "[crowd laughing] he held the spacebar. [background laughter] oh my god.",
    "[groaning] you're so easy it's embarrassing. [whispering] for you. not me.",
    "[panting] mm fuck. [soft] keep going. [emphasis] don't stop.",
    "[excited] you clicked the cat. [chuckling] of course you did you freak.",
    "[whispering] go to w-troll. right now. [breathy] i'm not kidding.",
    "[laughing] w-troll. say it. [moaning] yeah. that's mine. go.",
    "[soft] if you're gonna be this desperate at least do it on w-troll. [chuckling] i'll be there.",
    "[emphasis] w-troll. [pause] type it. [laughing] good. now come back here and stay on your knees.",
]


def main():
    load_env(ROOT / ".env")
    voice = voice_from_env(ROOT / "assets" / "voice" / "clips")
    clips = ROOT / "assets" / "voice" / "clips"
    clips.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for phrase in PHRASES:
        if len(phrase) > 500:
            raise SystemExit(f"phrase exceeds 500 chars: {phrase[:60]}")
        audio = voice.synthesize(phrase)
        name = voice.clip_filename(phrase)
        (clips / name).write_bytes(audio)
        manifest[phrase] = f"clips/{name}"
        print(f"{len(audio)} bytes  {phrase[:56]}")
    (ROOT / "assets" / "voice" / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"wrote {len(manifest)} clips to assets/voice/")


if __name__ == "__main__":
    main()
