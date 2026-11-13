<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Language](https://img.shields.io/badge/Python-logoColor=white)


# Annoying Site

**A recreation of "the annoying site"**

<img width="280" alt="preview" src="https://github.com/user-attachments/assets/d467c8ab-5242-4760-a569-115fabac234a">

</div>

## local setup
it needs needs [python 3](https://www.python.org/downloads/)

```
python server.py
```

once running, head to http://127.0.0.1:8080/

make sure to allow popups or most of it wont work
and close it from task manager if you have to

note, the  `.env` is only if you want a custom voice fish TTS

## env

only if you want your own fish voice. make a file named `.env` in this folder:

Create an API key @ https://fish.audio/app/api-keys/
to get a voice id, pick a voice and click this: https://imgur.com/kOlOzxv.png
<img width="2558" height="715" alt="image" src="https://github.com/user-attachments/assets/5d8af43a-8e4a-4e4e-89f9-4f09e4b3255d" />

```ini
FISH_API_KEY=sk-fish-myKey
FISH_VOICE_ID=ca3007f96ae7499ab87d27ea3599956a
FISH_MODEL=s2.1-pro-free
```

## publish and deploy

needs [node](https://nodejs.org/en/download) (for `npx`). run these in order from this folder

```
npx vercel login
npx vercel --yes
npx vercel env add FISH_API_KEY production
npx vercel env add FISH_VOICE_ID production
npx vercel env add FISH_MODEL production
npx vercel --prod --yes
```

if it asks for a project name use lowercase like `w-troll` and paste each env value when it asks

## license

[MIT](LICENSE) © w-troll
